var mongoose = require('mongoose');
var schema = mongoose.Schema;

var pricesSchema = new schema({
	name:String,
	price:Number,
	appID:Number
});

var prices;
if(mongoose.models.prices){
	prices = mongoose.model('prices');
}else{
	prices = mongoose.model('prices',pricesSchema);
}

module.exports = prices;
