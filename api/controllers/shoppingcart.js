const User = require('../models/user.js'),
			Product = require('../models/product.js');

module.exports = {

	showCart: //show the shopping cart
		function(req, res) {
			//get data from request
			var userid = req.user.id

			//find related user
			User.findById(userid).populate({path: 'items.products'}).exec(function(err, foundUser) {
				if (err) {
					res.status(500).json({status: 'error', message: err});
				}
				else {
					var msg = {
						total: foundUser.totalPrice,
						items: foundUser.items
					};
					res.status(200).json({message: msg});
				}
			});
		},

	addProduct: //add products to shopping cart
		function(req, res) {
			//get data from request
			var prod_id = req.body.prod_id;
			var quantity = req.body.quantity;
			var userid = req.user.id;

			//find related user
			User.findById(userid, function(err, foundUser) {
				if (err) {
					res.status(500).json({error: err});
				}
				else {
					//find related product
					Product.findOne({prod_id: prod_id}, function(err2, foundProduct) {
						if (err2) {
							res.status(500).json({status: "error", message: err2});
						}
						else {
							if (!foundProduct) { 
								res.status(400).json({status: "error", message: "Product not found"});
							}
							else 
							if (foundProduct.stock <= 0) {
								res.status(400).json({status: "error", message: "Product out of stock"});
							}
							else {
								foundUser.items.push({
									products: foundProduct._id,
									quantity: quantity
								});
								foundUser.totalPrice = foundProduct.price * quantity;
								foundUser.save();
								res.status(200).json({status: "success", message: "Product succesfully added to the cart"});
							}
						}
					});
				}
			});
		},

	deleteProduct: //delete a product from shopping cart
		function(req, res) {

		}
};