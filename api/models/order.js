const mongoose 	= require('mongoose');

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	name: {
		type: String, 
		required: true
	},

	phonenumber: {
		type: String, 
		required: true
	},

	email: {
		type: String, 
		required: true
	},

	address: {
		type: String, 
		required: true
	},

	order_date: {
		type: Date,
		default: Date.now()
	},

	status: {
		type: String,
		default: 'Unconfirmed'
	},

	totalPrice: Number,

	coupon: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Coupon'
	},

	items: [
		id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
		},
		quantity: Number
	],

	shipmentInfo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Shipment'
	}
});

module.exports = mongoose.model('Order', orderSchema);