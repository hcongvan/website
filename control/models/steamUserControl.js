var user = require('./steamUser.js');
var assert = require('assert');
var date = new Date();

exports.create=function(id){
	var usr = new user();
	usr.SteamID = id;
	usr.Expires = date.getTime()+86400000;
	
	usr.validate(function(err){
			assert.equal(null,err);
			usr.save(function(err){
				assert.equal(null,err);
			});
	});
}
exports.remove=function(id){
	user.where({SteamID:id}).remove(function(err){
		assert.equal(null,err);
	});
}
exports.getData=function(id,callback){
	user.where({SteamID:id}).findOne(function(err,data){
		if(err){
			return callback(err,null);
		}else{
			return callback(null,data);
		}
	});
}
exports.update=function(id,data){
	user.where({SteamID:id}).update(data,function(err){
		assert.equal(null,err);
	});
}

