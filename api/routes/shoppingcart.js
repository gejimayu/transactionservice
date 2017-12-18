const express 								= require('express'),
			router 									= express.Router(),
			passport 								= require('passport'),
			passportConf 						= require('../passport.js'),
			ShoppingCartController 	= require('../controllers/shoppingcart.js');

//Customer can add a product to shopping cart
router.post('/', passport.authenticate('jwt', { session: false }), ShoppingCartController.addProduct);

//Customer can show their shopping cart
router.get('/', passport.authenticate('jwt', { session: false }), ShoppingCartController.showCart);

//customer can product a particular data from their shopping cart
router.delete('/:product_id', passport.authenticate('jwt', { session: false }), ShoppingCartController.deleteProduct);

module.exports = router;