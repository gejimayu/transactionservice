const Order = require('../models/order.js'),
			Product = require('../models/product.js'),
			Coupon = require('../models/coupon.js'),
			Payment = require('../models/payment.js'),
			User = require('../models/user.js');

module.exports = {

	showAllOrders:
		function(req, res) {
			if (req.user.role !== 'admin') {
				res.status(401).json({status:'error', message: 'Unauthorized access, admin only'});
			}
			else {
				//find related user and populate its data
				Order.find({}).populate({path: 'items.products'})
																				.populate('coupon')	
																				.populate('payment')
																				.exec(function(err, foundOrder) {
					if (err) {
						res.status(500).json({status: 'error', message: err});
					}
					else {
						res.status(200).json({status: 'success', message: foundOrder});
					}
				});
			}
		},

};