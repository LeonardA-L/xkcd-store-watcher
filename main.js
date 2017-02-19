var request = require('request');
var Spooky = require('spooky');
var Repeat = require('repeat');

var config = require('./config');


function warnAvailability (config) {
    request.post(
        config.webhook,
        { json: config.payload },
        function (error, response, body) {
            if(error) {
                console.error(error);
            }
        }
    );
}

function runScript() {
    var spooky = new Spooky({
        child: {
            command: "./node_modules/.bin/casperjs",
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    },
    function (err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        console.log('Running test')
        spooky.start(config.productPage);

        spooky.then(function() {
            this.echo('Reached Page: ' + this.getTitle());
        });

        if (config.size) {
            spooky.thenEvaluate(function(config) {
                $('#product-select-option-1').val(config.size).change();
            }, config);
        }

        spooky.then(function(){
            var isAvailable = this.getHTML('.price') !== 'Sold Out';
            this.echo(isAvailable);
            this.emit('result', isAvailable);
        });

        spooky.run();
    });

    spooky.on('result', function(result) {
        console.log('Product available:', result);
        if(result) {
            warnAvailability(config);
        }
    });
}

function schedule(config){
    Repeat(runScript).every(config.repeat.time, config.repeat.unit).start.in(1, 'sec');
}

schedule(config);