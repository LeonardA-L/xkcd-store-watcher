var request = require('request');
var Spooky = require('spooky');

var config = require('./config');

console.log('ok')

var spooky = new Spooky({
    child: {
    	command: "./node_modules/.bin/casperjs",
        transport: 'http'
    },
    casper: {
        logLevel: 'debug',
        verbose: true
    }
}, function (err) {
    if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        throw e;
    }
    console.log('ok2')

    spooky.start(config.productPage);

	spooky.then(function() {
	    this.echo('First Page: ' + this.getTitle());
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
	if(result) {
		warnAvailability(config);
	}
})


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