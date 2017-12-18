const express 								= require('express'),
			router 									= express.Router(),
			passport 								= require('passport'),
			passportConf 						= require('../passport.js'),
			ShoppingCartController 	= require('../controllers/shoppingcart.js');

router.post('/', passport.authenticate('jwt', { session: false }), ShoppingCartController.addProduct);
router.get('/', passport.authenticate('jwt', { session: false }), ShoppingCartController.showCart);
router.delete('/:product_id', passport.authenticate('jwt', { session: false }), ShoppingCartController.deleteProduct);

module.exports = router;