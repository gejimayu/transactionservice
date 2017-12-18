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
			seedCoupon					= require('./seeds/coupon.js'),
			seedProduct					= require('./seeds/product.js'),
			seedUser						= require('./seeds/user.js'),
			app									= express();


//INITIALIZATION

//connect to DB
mongoose.connect('mongodb://localhost/salestock');

//body parser for post request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

//seed database
// seedCoupon();
// seedProduct();
// seedUser();

//SET ROUTING
app.use('/users', UserRoutes);
app.use('/coupons', CouponRoutes);
app.use('/shoppingcart', ShoppingcartRoutes);
app.use('/order', OrderRoutes);
app.use('/admin', AdminRoutes);

//lLISTEN TO REQUEST
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server listening at ' + port);