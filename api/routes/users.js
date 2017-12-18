const express 								= require('express'),
			router 									= express.Router(),
			passport 								= require('passport'),
			passportConf 						= require('../passport.js'),
			UserController 					= require('../controllers/users.js');

//Users can register
router.post('/register', UserController.register);

//Users can login
router.post('/login', passport.authenticate('local', { session: false }), UserController.login);

module.exports = router;