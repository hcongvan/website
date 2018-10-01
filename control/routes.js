var date = new Date();
var fs = require('fs');
var config = require('./configWebsite.js');
var ctr = require('./controller.js');
var url = require('url');

var resWeb = function(res,header,path,encode,flag){
	if(flag){
		res.writeHead(200,header);
		res.write(fs.readFileSync(__dirname + path), encode);
		res.end();
	}else{
		res.writeHead(200,header);
		res.end(fs.readFileSync(__dirname + path),encode);
	}
	
}
var resBody = function(res,statusCode,header,body){
		res.writeHead(statusCode,header);
		for(var i = 0 ;i<body.length;i++){
			res.write(body[i]);
		}
		res.end();
}
var routes = {
	'/'		: 	function(req,res){
		ctr.processCookies(req,function(header,img,name,id,flag){	//flag describe request logout or not
			if(!flag){
				resWeb(res,header,'/../assets/view/index.html','utf8',true);	//no login request
			}else{
				console.log("info");
				res.writeHead(200,header);											//
				res.write(fs.readFileSync(__dirname + '/../assets/view/index.html'), 'uft8');
				res.write(`<script type="text/javascript">info("${img}","${name}","${id}");</script>`);
				res.end();
			}		
		});
	},
	'/login':function(req,res){
		var _tmpdate = date.getTime()+86400000;
		var tmr = new Date(_tmpdate);
		var _query = url.parse(req.url);
		if(_query.query != null){
			var header = {'Set-Cookie':_query.query+',_expires='+_tmpdate+';Expires='+tmr.toISOString().replace(/T/, ' ').replace(/\..+/, ''),	//set-cookie and redirect
							'Content-Type': 'text/html'};
			var body = '<script type="text/javascript">window.location.replace("'+config.getHOSTLink()+'/");</script>';
			resBody(res,200,header,[body]);
		}
	},
	'/trade/bot': 	function(req,res){
		if(req.method == 'POST'){
			req.on('data',function(data){
				var dd = JSON.parse(data);
				console.log("data from client: "+data);
				if((dd[0].items.length > 0)&&(dd[1].items.length > 0)){
					ctr.sendMessage('/trade/bot',data,function(err,resData){
						res.writeHead(200,{'Content-Type': 'text/JSON'});
						res.end("{message sent}");
					});
				}else{
					res.writeHead(200,{'Content-Type': 'text/JSON'});
					res.end("{Bad Request}");
				}
			});
		}
		// res.writeHead(200,{'Content-Type': 'text/JSON'});    
		// res.end("{Hello api}");
		// resWeb(res,{'Content-Type': 'text/css'},path,'utf8',true);
	},
	'.css'	:	function(req,res,path){
		resWeb(res,{'Content-Type': 'text/css'},'/../'+path,'utf8',true);
	},
	'.js'	:	function(req,res,path){
		resWeb(res,{'Content-Type': 'text/javascript'},'/../'+path,'utf8',true);
	},
	'.png'	:	function(req,res,path){
		resWeb(res,{'Content-Type': 'image/png'},'/../'+path,'binary',false);
	},
	'.ico'	:	function(req,res,path){
		resWeb(res,{'Content-Type': 'image/x-icon'},'/../'+path,'binary',false);
	},
	'.woff'	:	function(req,res,path){
		resWeb(res,{'Content-Type': 'font/woff'},'/../'+path,'utf8',false);
	},
	'.tff'	:	function(req,res,path){
		resWeb(res,{'Content-Type': 'font/tff'},'/../'+path,'utf8',false);
	},
	'/auth/openid':ctr.execPassport,
	'/auth/openid/return':function(req, res) {
		ctr.processPassport(req,function(id){
			res.writeHead(301,{
				Location:config.getHOSTLink()+'/login?steamid='+id,
			});
			res.end();
		})
	},
	'/auth/failure'	:	function(req,res){
		res.writeHead(404);    
		res.end(http.STATUS_CODES[404]);
	},
	'/logout': function(req,res){						//ERRORRRRRRRRRRRRRRR!!!!!!!!!!!!!!!!!!!!!
		console.log("delete Cookie");
		var header = {'Content-Type': 'text/html'};
		var body2 = `<script type="text/javascript">deleteCookies("steamid","${config.HOST}","${config.PORT}");</script>`;
		resBody(res,200,header,[body2]);
	},
	'/getinven':function(req,res,path){
		console.log(req.url);
		var params = new url.URLSearchParams(path.query);
		if(params.get('steamid') == 'undefined'){
			console.log('empty items')
		}else{
			ctr.getUserInventory(params.get('steamid'),params.get('appid'),function(list){
					res.writeHead(200);
					res.end(JSON.stringify(list));//.concat(_list)
			});
		}
	},
	'/checkStatus':function(req,res,path){
		// ctr.getProcess()
		var header = {'Content-Type': 'text/xml'};
		resWeb(res,header,'/skippable.xml','utf8',true);
	}
}
module.exports = routes;