const express 		= require('express'),
			morgan 			= require('morgan'),
			bodyParser 	= require('body-parser'),
			mongoose 		= require('mongoose');

//initialization
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/salestock');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

//listen to request
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server listening at ' + port);