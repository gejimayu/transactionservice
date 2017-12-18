const express 					= require('express'),
			router 						= express.Router(),
			passport 					= require('passport'),
			passportConf 			= require('../passport.js'),
			OrderController 	= require('../controllers/order.js');

router.post('/', passport.authenticate('jwt', { session: false }), OrderController.submitOrder);
router.post('/:order_id/verify', passport.authenticate('jwt', { session: false }), OrderController.verifyPayment);

module.exports = router;