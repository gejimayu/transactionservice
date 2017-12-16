const mongoose 	= require('mongoose'),
			bcrypt 		= require('bcryptjs');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},

	password: {
		type: String,
		required: true
	}

	role: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', userSchema);