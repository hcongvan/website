var mongoose = require('mongoose');
var schema = mongoose.Schema;

var tradeOfferSchema = new schema({
	tradeid : String,
	customerID:String,
	botNumber:Number,
	theirItems:[{
		appID:Number,
		assetID:Array
	}],
	botItems:[{
		appID:Number,
		assetID:Array
	}],
	offerStatus:Number
});

var tradeOffer;
if(mongoose.models.tradeOffer){
	tradeOffer = mongoose.model('tradeOffer');
}else{
	tradeOffer = mongoose.model('tradeOffer',tradeOfferSchema);
}

module.exports = tradeOffer;
