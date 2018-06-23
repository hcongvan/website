var mongoose = require('mongoose');
var schema = mongoose.Schema;
var SteamUserSchema = new schema({
	SteamID:String,
	Expires:Number
});
var steamUser;
if(mongoose.models.steamUser){
	steamUser = mongoose.model('steamUser');
}else{
	steamUser = mongoose.model('steamUser',SteamUserSchema);
}

module.exports = steamUser;