var prices = require('./prices.js');
var assert = require('assert');

exports.create = function(appid,name,price){
	
	var _prices = new prices();
	_prices.name 	= name;
	_prices.appID 	= appid;
	_prices.price 	= price;
	
	
	_prices.validate(function(err){
			assert.equal(null,err);
			_prices.save(function(err){
				assert.equal(null,err);
			});
	});
}
exports.remove = function(name){
	prices.where({name:name}).remove(function(err){
		assert.equal(null,err);
	});
}
exports.getPrice = function(name,callback){
	prices.where({name:name}).findOne(function(err,data){
		if(err){
			return callback(err,null);
		}else{
			return callback(null,data);
		}
	});
}
exports.update = function(name,newPrice){
	prices.where({name:name}).update(newPrice,function(err){
		assert.equal(null,err);
	});
}

exports.getPrices = function(name,callback){
	prices.find({name:{$in :name}},function(err,data){
		if(err){
			return callback(err,null);
		}else{
			return callback(null,data);
		}
	});
}