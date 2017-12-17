const mongoose 	= require('mongoose'),
			User 		  = require('../api/models/user.js');

var data = [
    {
      username: 'wedew',
      password: 'asdbc',
      role: 'user'
    },

    {
      username: 'admin',
      password: 'asdbc',
      role: 'admin'
    }
];    

// function seedDB() {
// 	User.remove({}, function(err) {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			console.log('all users removed succesfully')
// 			data.forEach(function(item) {
// 				User.create(item, function(err, createdUser){
// 					if (err) {
// 						console.log(err);
// 					console.log('User ' + createdUser.username + 'inserted');
// 					}
// 				});
// 			});
// 		}
// 	})
// }

// module.exports = seedDB;