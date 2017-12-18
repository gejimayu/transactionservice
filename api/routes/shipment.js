const express 					= require('express'),
			router 						= express.Router(),
			passport 					= require('passport'),
			passportConf 			= require('../passport.js'),
			ShipmentController 	= require('../controllers/shipment.js');

//Customer can track order
router.get('/:order_id', passport.authenticate('jwt', { session: false }), ShipmentController.trackOrder);

module.exports = router;