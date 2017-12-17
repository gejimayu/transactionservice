const express 								= require('express'),
			router 									= express.Router(),
			passport 								= require('passport'),
			passportConf 						= require('../passport.js'),
			UserController 					= require('../controllers/users.js'),
			ShoppingCartController 	= require('../controllers/shoppingcart.js');

router.post('/register', UserController.register);
router.post('/login', passport.authenticate('local', { session: false }), UserController.login);
router.post('/shoppingcart', passport.authenticate('jwt', { session: false }), ShoppingCartController.addProduct);

module.exports = router;