const mongoose 	= require('mongoose');

const orderSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},

	shipmentInfo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Shipment'
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
	}

	items: [
		id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
		},
		quantity: Number
	]
});

module.exports = mongoose.model('Order', orderSchema);