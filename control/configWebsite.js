var config = {
	URL : process.env.IP||'http://172.16.2.32',
	HOST: process.env.IP||'172.16.2.32',//'localhost',
	PORT: process.env.PORT||3000,
	DB:{
		USER:'hocong',
		PASSWORD:'nfs197310',
		HOST:'ds111638.mlab.com',
		PORT:'11638',
		DATABASE:'martketbot'
	},
	OPENIDLINK:'http://steamcommunity.com/openid',
	getDBLink:function(){
		if (this.DB.USER == ''){
			return 'mongodb://'+this.DB.HOST+':'+this.DB.PORT+'/'+this.DB.DATABASE;
		}else{
			return 'mongodb://'+this.DB.USER+':'+this.DB.PASSWORD+'@'+this.DB.HOST+':'+this.DB.PORT+'/'+this.DB.DATABASE;
		}
	},
	getHOSTLink:function(){
		if(typeof process.env.IP == 'undefined')
			return this.URL+':'+this.PORT;
		else
			return this.URL;
	}
}
// console.log(config.getHOSTLink());
module.exports = config;