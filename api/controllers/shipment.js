const Shipment 	= require('../models/shipment.js');

module.exports = {

	trackOrder:
		function(req, res) {
			var shipping_id = req.params.shipping_id;

			//find related order and populate its data
			Shipment.findById(shipping_id, function(err, foundShipment) {
				if (err) {
					res.status(500).json({status: 'error', message: err});
				}
				else {
					if (!foundShipment) {
						res.status(200).json({status: 'error', message: 'Shipment '+ orderid + ' is not found'});
					}
					else {
						res.status(200).json({status: 'success', message: foundShipment});
					}
				}
			});
		}

};