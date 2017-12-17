const mongoose 	= require('mongoose');

const shipSchema = new mongoose.Schema({
	shippingId: new mongoose.Types.ObjectId(),
	
	status: {
		type: String
	}
});

module.exports = mongoose.model('Shipment', shipSchema);
		