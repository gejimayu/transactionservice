const express 		= require('express'),
			morgan 			= require('morgan'),
			bodyParser 	= require('body-parser'),
			mongoose 		= require('mongoose'),
			UserRoutes 	= require('./api/routes/users.js'),
			app					= express();


//initialization
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/salestock');

app.use(morgan('dev'));
app.use(bodyParser.json());

//set routing
app.use('/users', UserRoutes);

//listen to request
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server listening at ' + port);