const mongoose 	= require('mongoose');

const shipSchema = new mongoose.Schema({
	shippingId: new mongoose.Types.ObjectId(),

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

	status: {
		type: String
	}
});

module.exports = mongoose.model('Shipment', shipSchema);
		