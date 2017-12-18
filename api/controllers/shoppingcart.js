const User = require('../models/user.js'),
			Product = require('../models/product.js');

module.exports = {

	showCart: //show the shopping cart
		function(req, res) {
			var userid = req.user.id;

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
			var currentUser = req.user;

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
						currentUser.items.push({
							products: foundProduct._id,
							quantity: quantity
						});
						currentUser.totalPrice = foundProduct.price * quantity;
						currentUser.save();

						res.status(200).json({status: "success", message: "Product succesfully added to the cart"});
					}
				}
			});
		},

	deleteProduct: //delete a product from shopping cart
		function(req, res) {
			//get data from parameter
			var product_id = req.params.product_id;
			var currentUser = req.user;

			//populate user's product
			User.findById(currentUser.id).populate({path: 'items.products'}).exec(function(err, foundUser) {
				if (err) {
					res.status(500).json({status: 'error', message: err});
				}
				else {
					//find particular product in user's cart
					var found = false;
					for (var i = 0; i < foundUser.items.length; i++) {
						console.log(foundUser.items[i].products.prod_id);
						if (foundUser.items[i].products.prod_id == product_id) {
							found = true;
							foundUser.items.splice(i, 1); //remove
							foundUser.save();
							res.status(200).json({status: 'success', message: "Item " + product_id + "succesfully removed from cart"});
						}
					}
					if (!found)
						res.status(400).json({status: 'error', message: "Product " + product_id + " not found"});
				}
			});
		}
};