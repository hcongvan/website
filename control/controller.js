var date = new Date();
var url = require('url'),
	reqBot = require('./requestBot.js');
	fs = require('fs'),
	test = require('assert'),
	SteamCommunity = require('steamcommunity'),
	userControl = require('./models/steamUserControl.js'),
	price		= require('./models/pricesControl.js'),
	botdb		= require('./models/botdbControl.js'),
	config = require('./configWebsite.js'),
	community = new SteamCommunity(),
	steamID = SteamCommunity.SteamID,
	passport = require('passport'),
	OpenIDStrategy = require('passport-openid').Strategy,
	SteamStrategy = new OpenIDStrategy({
	// OpenID provider configuration
	providerURL: config.OPENIDLINK ,
	stateless: true,
	// How the OpenID provider should return the client to us
	returnURL: config.getHOSTLink()+'/auth/openid/return',
	realm: config.getHOSTLink()+'/',
	} ,
	function(identifier, done) {
		done(null,identifier);
	});
var SteamUser = require('steam-user');
var client = new SteamUser();

var TradeOfferManager = require('steam-tradeoffer-manager');
var manager = new TradeOfferManager({
    "steam": client,
    "domain": "example.com", // Fill this in with your own domain
    "language": "en"
});
passport.use(SteamStrategy);
var parseCookies = function (request) {
    var list = {},
        rc = request.headers.cookie;
    rc&&rc.split(',').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    return list;
}

exports.processCookies = function(req,callback){
	var _tmpdate = date.getTime()+86400000;
	var tmr = new Date(_tmpdate);
	var userCookies = parseCookies(req);
	// console.log(userCookies);
	if(Object.keys(userCookies).length > 0){
		userControl.getData(userCookies['steamid'],function(err,data){
			test.equal(null,err);
			if(userCookies['_expires'] >= date.getTime()){
					//update
				userControl.update(data.SteamID,{$set:{Expires:_tmpdate}});
				var header = {
					'Set-Cookie':'steamid='+data.SteamID+',_expires='+_tmpdate+';Expires='+tmr.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
					'Content-Type': 'text/html'
					}
				community.getSteamUser(new steamID(data.SteamID),function(err,user){
					var img = user.getAvatarURL();
					var name = user.name
					callback(header,img,name,data.SteamID,true);
				});
			}
		});
		
	}else{
		console.log("new customer visit");
		var header = {
			//'Set-Cookie':'steamid="",_expires='+_tmpdate+';Expires='+tmr.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
			'Content-Type': 'text/html'
			}
		callback(header,null,null,null,false);
		
	}
}
exports.execPassport = passport.authenticate('openid');
exports.processPassport = function(req,callback){
	var claimid = new url.URLSearchParams(url.parse(req.url).search).get('openid.claimed_id');
	var id = claimid.match(/\d+/)[0];
	community.getSteamUser(new steamID(id),function(err,user){
		test.equal(null,err);
		console.log("username :"+user.name);
		userControl.getData(id,function(err,data){
			var _tmpdate = date.getTime()+86400000;
			if(data != null){
				console.log("Update expires");
				userControl.update(id,{$set:{Expires:_tmpdate}});
			}else{
				console.log("create usr");
				userControl.create(id);
			}
			callback(id);
		});
		
	});
		
}
var getTags = function(tags){
	var _tmp = [];
	for(var i=0;i<tags.length;i++){
		_tmp.push(tags[i].name);
	}
	return _tmp;
}
exports.sendMessage = reqBot.requestBot
exports.getUserInventory = function(id,appid,callback){
	manager.getUserInventoryContents(new TradeOfferManager.SteamID(id),appid,2,true,function(err,items){
		if (!items) return;
		var list = [];
		var _position = 0;
		items.forEach(function(_item,index,array){
			price.getPrice(_item.market_hash_name,function(err,_p){
				_position++;
				list.push({
					name	: _item.market_hash_name,
					appID 	: _item.appid,
					assetID	: _item.assetid,
					img		: _item.icon_url,
					tags	: getTags(_item.tags),
					price	: _p.price,
					flt		: null
				});
				
				if(_position == array.length){
					// console.log(list);
					callback(list);
				}
			});
			
		});
		
	});
}
exports.getProcess = function(bot,callback){
	botdb.getStatus(bot,function(err,st){
		if(err){console.log("ERROR");return;}
		callback(data.Status);
	});
}