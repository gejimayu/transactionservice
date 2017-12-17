const mongoose 	= require('mongoose'),
			Coupon		= require('../api/models/coupon.js');

var data = [
    {
      code: 'XMASHOHO',
      percentage_discount: 20,
      quantity: 100,
      start_valid: new Date('2017-12-01'),
      end_valid: new Date('2017-12-31')
    },

    {
    	code: 'KUPONWOW',
      percentage_discount: 90,
      quantity: 1,
      start_valid: new Date('2017-01-01'),
      end_valid: new Date('2017-12-31')
    },

    {
    	code: 'KUPONWOW2',
      percentage_discount: 50,
      quantity: 5,
      start_valid: new Date('2016-12-01'),
      end_valid: new Date('2016-12-01')
    }
];    

function seedDB() {
	Coupon.remove({}, function(err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('all coupon removed succesfully')
			data.forEach(function(item) {
				Coupon.create(item, function(err, createdItem){
					if (err) {
						console.log(err);
					console.log('Coupon ' + createdItem.code + 'inserted');
					}
				});
			});
		}
	})
}

module.exports = seedDB;