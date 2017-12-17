const mongoose 	= require('mongoose'),
			Product		= require('../api/models/product.js');

var data = [
    {
      prod_id: 'MS2M9D',
      name: 'Hippo Power Bank 10000MAH Eve Simple',
      price: 419500,
      quantity: 100
    },

    {
      prod_id: 'GAGD3D',
      name: 'Powerbank Romoss ACE 10000mAh',
      price: 189000,
      quantity: 0
    },

    {
      prod_id: 'XX2X2S',
      name: 'Xiaomi Mi PowerBank Pro 2 10000 mAh',
      price: 219000,
      quantity: 5
    }
];    

function seedDB() {
	Product.remove({}, function(err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('all product removed succesfully')
			data.forEach(function(item) {
				Product.create(item, function(err, createdItem){
					if (err) {
						console.log(err);
					console.log('Product ' + createdItem.name + 'inserted');
					}
				});
			});
		}
	})
}

module.exports = seedDB;