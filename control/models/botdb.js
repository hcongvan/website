var mongoose = require('mongoose');
var schema = mongoose.Schema;

var botSchema = new schema({
	ID:Number,
	SteamID:String,
	Status:Number
});

var bot;
if(mongoose.models.bot){
	bot = mongoose.model('bot');
}else{
	bot = mongoose.model('bot',botSchema);
}

module.exports = bot;