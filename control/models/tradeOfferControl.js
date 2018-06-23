var offer = require('./tradeOffer.js');
var assert = require('assert');
var date = new Date();

exports.create=function(tradeid,id,botNum,theirItems,botItems){
	
	var _offer = new offer();
	_offer.tradeid = tradeid;
	_offer.customerID = id;
	_offer.botNumber = botNum;
	_offer.theirItems = theirItems;
	_offer.botItems = botItems;
	_offer.offerStatus=0;
	
	_offer.validate(function(err){
			assert.equal(null,err);
			_offer.save(function(err){
				assert.equal(null,err);
			});
	});
}
exports.remove = function(id){
	offer.where({tradeid:id}).remove(function(err){
		assert.equal(null,err);
	});
}
exports.getData = function(id,callback){
	offer.where({tradeid:id}).findOne(function(err,data){
		if(err){
			return callback(err,null);
		}else{
			return callback(null,data);
		}
	});
}
exports.update = function(id,data){
	offer.where({tradeid:id}).update(data,function(err){
		assert.equal(null,err);
	});
}