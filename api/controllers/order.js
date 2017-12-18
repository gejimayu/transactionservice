const Order = require('../models/order.js'),
			Product = require('../models/product.js'),
			Coupon = require('../models/coupon.js'),
			Payment = require('../models/payment.js');

module.exports = {

	submitOrder: 
		function(req, res) {
			var currentUser = req.user;
			//check if all information required are given
			var check = req.body.name && req.body.phonenumber && req.body.email && req.body.address;

			if (!check) {
				res.status(400).json({status:'error', message: 'Please fill all the information'});
			}
			else
			if (currentUser.items.length == 0) { 
				//check if there is ordered item
				res.status(400).json({status:'error', message: 'There is no items ordered'});
			}
			else { //order valid
				//create order data from request body
				var newOrder = {
					user: currentUser.id,
					name: req.body.name,
					phonenumber: req.body.phonenumber,
					email: req.body.email,
					address: req.body.address,
					totalPrice: currentUser.totalPrice,
					items: currentUser.items,
					coupon: currentUser.coupon
				};

				Order.create(newOrder, function(err, createdOrder) {
					if (err) {
						res.status(500).json({status: 'error', message: err});
					}
					else {
						//decrease the quantity of ordered products by quantity
						newOrder.items.forEach(function(item) {
							Product.findById(item.products, function(err2, foundProduct) {
								if (err2) {
									res.status(500).json({status: 'error', message: err2});
								}
								else {
									foundProduct.stock -= item.quantity;
									foundProduct.save();
								}
							});
						});

						//if there's coupon used
						if (newOrder.coupon) { 
							//decrease the quantity of used coupon by 1
							Coupon.findById(newOrder.coupon, function(err2, foundCoupon) {
								if (err2) {
									res.status(500).json({status: 'error', message: err2});
								}
								else {
									foundCoupon.stock -= 1;
									foundCoupon.save();
								}
							});
						}

						//delete current user's shopping cart
						currentUser.totalPrice = 0;
						currentUser.items = [];
						currentUser.coupon = null;
						currentUser.save();

						res.status(200).json({status: 'success', message: 'Order submitted, ready for payment'});
					}
				});
			}
		},

	verifyPayment:
		function(req, res) {
			//get data from body request
			var order_id = req.params.order_id;
			var newPayment = {
				bank: req.body.bank,
				account_number: req.body.account_number,
				name: req.body.name
			};

			//validate input
			if (!bank || !account_number || !name) {
				res.status(400).json({status:'error', message: 'Please fill all the information'});
			}
			else {
				Payment.create(newPayment, function(err, createdPayment) {
					if (err) {
						res.status(500).json({status: 'error', message: err});
					}
					else {
						//find related order and change its status
						Order.findById(order_id, function(err2, foundOrder) {
							if (err) {
								res.status(500).json({status: 'error', message: err});
							}
							else {
								foundOrder.payment = createdPayment.id;
								foundOrder.status = 'Waiting for verification';
								foundOrder.save();						
							}
						});
					}
				});
			}
		}
};