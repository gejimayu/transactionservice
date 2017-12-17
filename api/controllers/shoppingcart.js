const User = require('../models/user.js'),
			Product = require('../models/product.js');

module.exports = {

	showCart: //show the shopping cart
		function(req, res) {
			//get data from request
			var userid = req.user.id

			//find related user
			User.findById(userid).populate({path: 'items.productid'}).exec(function(err, foundUser) {
				if (err) {
					res.status(500).json({error: err});
				}
				else {
					res.status(200).json({message: foundUser.items});
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
							res.status(500).json({error: err2});
						}
						else {
							if (!foundProduct) { 
								res.status(400).json({error: "Product not found"});
							}
							else 
							if (foundProduct.quantity <= 0) {
								res.status(400).json({error: "Product out of stock"});
							}
							else {
								foundUser.items.push({
									productid: foundProduct._id,
									quantity: quantity
								});
								foundUser.totalPrice = foundProduct.price * quantity;
								foundUser.save();
								res.status(200).json({success: "Product succesfully added to the cart"});
							}
						}
					});
				}
			});
		},
};