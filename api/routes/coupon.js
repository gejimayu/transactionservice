const express 								= require('express'),
			router 									= express.Router(),
			passport 								= require('passport'),
			passportConf 						= require('../passport.js'),
			UserController 					= require('../controllers/users.js'),
			ShoppingCartController 	= require('../controllers/shoppingcart.js'),
			CouponController				= require('../controllers/coupon.js');

router.post('/', passport.authenticate('jwt', { session: false }), CouponController.addCoupon);

module.exports = router;