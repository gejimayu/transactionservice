const mongoose 	= require('mongoose');

const shoppingcartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	totalPrice: Number,

	items: [
		id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
		},
		quantity: Number
	]
});

module.exports = mongoose.model('Order', orderSchema);