const Order 		= require('../models/order.js'),
			Product 	= require('../models/product.js'),
			Coupon 		= require('../models/coupon.js'),
			Payment 	= require('../models/payment.js'),
			User 			= require('../models/user.js'),
			Shipment 	= require('../models/shipment.js');

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

	showAnOrder:
		function(req, res) {
			var orderid = req.params.order_id;

			if (req.user.role !== 'admin') {
				res.status(401).json({status:'error', message: 'Unauthorized access, admin only'});
			}
			else {
				//find related order and populate its data
				Order.findById(orderid).populate({path: 'items.products'})
																				.populate('coupon')	
																				.populate('payment')
																				.exec(function(err, foundOrder) {
					if (err) {
						res.status(500).json({status: 'error', message: err});
					}
					else {
						if (!foundOrder) {
							res.status(200).json({status: 'error', message: 'Order '+ orderid + ' is not found'});
						}
						else {
						res.status(200).json({status: 'success', message: foundOrder});
						}
					}
				});
			}
		},

	validateOrder:
		function(req, res) {
			//get required data from request
			var orderid = req.params.order_id;
			var status = req.body.status;

			//validated data
			if (status !== 'valid' && status !== 'invalid') {
				res.status(400).json({status:'error', message: 'Please fill the status order correctly (valid/invalid)'});
			}
			else
			if (req.user.role !== 'admin') {
				res.status(401).json({status:'error', message: 'Unauthorized access, admin only'});
			}
			else {
				//find related order and populate its data
				Order.findById(orderid, function(err, foundOrder) {
					if (err) {
						res.status(500).json({status: 'error', message: err});
					}
					else {
						if (!foundOrder) {
							res.status(400).json({status: 'error', message: 'Order '+ orderid + ' is not found'});
						}
						else {
							foundOrder.status = status;
							foundOrder.save();
							res.status(200).json({status: 'error', message: 'Order '+ orderid + ' status has been updated'});
						}
					}
				});
			}
		},

	shipOrder:
		function(req, res) {
			//get required data
			var orderid = req.params.order_id;

			if (req.user.role !== 'admin') {
				res.status(401).json({status:'error', message: 'Unauthorized access, admin only'});
			}
			else {
				//find related order and populate its data
				Order.findById(orderid, function(err, foundOrder) {
					if (err) {
						res.status(500).json({status: 'error', message: err});
					}
					else {
						if (!foundOrder) {
							res.status(400).json({status: 'error', message: 'Order '+ orderid + ' is not found'});
						}
						else {
							foundOrder.status = 'Shipped';

							//create shipment data
							var newShip = {
								user: req.user.id,
								order: orderid,
								name: foundOrder.name,
								address: foundOrder.address,
								shipment_status: 'In Bandung'
							};
							Shipment.create(newShip, function(err2, createdShipment) {
								if (err2) {
									res.status(500).json({status: 'error', message: err2});
								}
								else {
									//insert shipping id to order
									foundOrder.shipping_id = createdShipment.id;
									foundOrder.save();
									
									res.status(200).json({
										status: 'error', 
										message: 'Order '+ orderid + ' status has been updated',
										shipping_id: createdShipment.id
									});
								}
							});
						}
					}
				});
			}
		},

};