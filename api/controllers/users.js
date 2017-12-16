const User = require('../models/user.js');

exports.register = function(req, res) {
	var newUser = new User({
		username: req.body.username,
		password: req.body.password,
		role: req.body.role
	});

	User.findOne({username: newUser.username}, function(err, result) {
		if (err)
			res.status(500).json({ error: 'Error in finding user' });

		if (result)
			res.status(403).json({ error: 'Username is already in use' });

		newUser.save(function(err, savedUser){
			if (err)
				res.status(500).json({ error: 'Error in saving user' });
			else
				res.status(200).json({ msg: 'succeded'});
		});
	});
};