const express 				= require('express'),
			router 					= express.Router(),
			passport 				= require('passport'),
			passportConf 		= require('../passport.js'),
			UserController 	= require('../controllers/users.js');

router.post('/register', UserController.register);

module.exports = router;