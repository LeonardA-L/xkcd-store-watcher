var casper = require('casper').create();

var config = require('./config');

casper.start(config.productPage);

if(config.size) {
	casper.thenEvaluate(function(config) {
		$('#product-select-option-1').val(config.size).change();
	}, config);
}

casper.then(function(){
	// scrape something else
	var isAvailable = this.getHTML('.price') !== 'Sold Out';
	this.echo(isAvailable);
});

casper.run();