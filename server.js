const express 			= require('express'),
			morgan 				= require('morgan'),
			bodyParser 		= require('body-parser'),
			mongoose 			= require('mongoose'),
			UserRoutes 		= require('./api/routes/users.js'),
			seedCoupon		= require('./seeds/coupon.js'),
			seedProduct		= require('./seeds/product.js'),
			app						= express();


//INITIALIZATION

//connect to DB
mongoose.connect('mongodb://localhost/salestock');

//log with morgan
app.use(morgan('dev'));

//body parser for post request
app.use(bodyParser.json());

//seed database
seedCoupon();
seedProduct();

//SET ROUTING
app.use('/users', UserRoutes);

//lLISTEN TO REQUEST
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server listening at ' + port);