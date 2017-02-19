module.exports = {
	productPage: 'https://store.xkcd.com/products/self-reference',
	size: 'medium',

	webhook: 'https://webhook-endpoint.com',
	payload: {
		text: 'Item is available, <https://store.xkcd.com/products/self-reference|Click here>'
	},

	repeat: {
		time: 2,
		unit: 'h'
	}
}