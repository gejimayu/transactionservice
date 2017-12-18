const express 					= require('express'),
			router 						= express.Router(),
			passport 					= require('passport'),
			passportConf 			= require('../passport.js'),
			AdminController 	= require('../controllers/admin.js');

//Admin can view all of submitted orders
router.get('/', passport.authenticate('jwt', { session: false }), AdminController.showAllOrders);

//Customer can submit an order
// router.post('/', passport.authenticate('jwt', { session: false }), OrderController.submitOrder);

//Customer can verify payment of an order
// router.post('/:order_id', passport.authenticate('jwt', { session: false }), OrderController.verifyPayment);

module.exports = router;