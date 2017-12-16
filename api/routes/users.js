const express = require('express'),
			router = express.Router(),
			UserController 	= require('../controllers/users.js');

router.post('/register', UserController.register);

module.exports = router;