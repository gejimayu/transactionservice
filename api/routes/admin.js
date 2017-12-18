const express 					= require('express'),
			router 						= express.Router(),
			passport 					= require('passport'),
			passportConf 			= require('../passport.js'),
			AdminController 	= require('../controllers/admin.js');

//Admin can view all of submitted orders
router.get('/', passport.authenticate('jwt', { session: false }), AdminController.showAllOrders);

//Admin can view a specific order
router.get('/:order_id', passport.authenticate('jwt', { session: false }), AdminController.showAnOrder);

//Admin can update a particular order's status
router.post('/:order_id', passport.authenticate('jwt', { session: false }), AdminController.validateOrder);

//Admin can change order's status to shipped and create shipment data
router.put('/:order_id', passport.authenticate('jwt', { session: false }), AdminController.shipOrder);

module.exports = router;