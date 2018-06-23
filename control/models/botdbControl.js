var bot = require('./botdb.js');
var assert = require('assert');

exports.create = function(id,steamid){
	
	var _bot = new bot();
	_bot.ID 		= id;
	_bot.SteamID 	= steamid;
	_bot.Status 	= 0;
	
	
	_bot.validate(function(err){
			assert.equal(null,err);
			_bot.save(function(err){
				assert.equal(null,err);
			});
	});
}

exports.getStatus = function(name,callback){
	bot.where({ID:name}).findOne(function(err,data){
		if(err){
			return callback(err,null);
		}else{
			return callback(null,data);
		}
	});
}
exports.update = function(name,st){
	bot.where({ID:name}).update(st,function(err){
		assert.equal(null,err);
	});
}
