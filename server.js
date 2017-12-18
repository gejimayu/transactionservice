const express 						= require('express'),
			morgan 							= require('morgan'),
			bodyParser 					= require('body-parser'),
			passport				 		= require('passport'),
			mongoose 						= require('mongoose'),
			UserRoutes 					= require('./api/routes/users.js'),
			ShoppingcartRoutes 	= require('./api/routes/shoppingcart.js'),
			CouponRoutes 				= require('./api/routes/coupon.js'),
			OrderRoutes					= require('./api/routes/order.js'),
			AdminRoutes					= require('./api/routes/admin.js'),
			ShipmentRoutes			= require('./api/routes/shipment.js'),
			seedCoupon					= require('./seeds/coupon.js'),
			seedProduct					= require('./seeds/product.js'),
			seedUser						= require('./seeds/user.js'),
			app									= express(),
			config 							= require('config');


//INITIALIZATION

//db connection      
mongoose.connect('mongodb://localhost/salestock');

//body parser for post request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('dev')); 
}

// Use the passport package in our application
app.use(passport.initialize());

//seed database
// seedCoupon();
// seedProduct();
// seedUser();

//SET ROUTING
app.use('/', UserRoutes);
app.use('/coupons', CouponRoutes);
app.use('/shoppingcart', ShoppingcartRoutes);
app.use('/order', OrderRoutes);
app.use('/admin', AdminRoutes);
app.use('/track', ShipmentRoutes);

//lLISTEN TO REQUEST
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server listening at ' + port);

module.exports = app; // for testing
