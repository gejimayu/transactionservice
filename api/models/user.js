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
	},

	role: {
		type: String,
		required: true
	}
});

//hash password on save
userSchema.pre('save', function(next) {
	try {
		const salt = bcrypt.genSaltSync(10);
		const passwordHash = bcrypt.hashSync(this.password, salt);
		this.password = passwordHash;
		next();
	} catch(err) {
		next(err);
	}
});

//add method which checks password using hashing
userSchema.methods.isValidPassword = function (newPassword) {
  return bcrypt.compareSync(newPassword, this.password)
};

module.exports = mongoose.model('User', userSchema);