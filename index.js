const http = require('http');
var path = require('path');
var url = require('url');
var config = require('./control/configWebsite.js');
var routes = require('./control/routes.js');
var monogoose = require('mongoose');
monogoose.connect(config.getDBLink());

const server = http.createServer((req,res)=>{
	var url_link = url.parse(req.url);
	var pathname = url_link.pathname;
	var ext = path.extname(pathname);
	console.log(pathname);
	if(ext in routes){
		return routes[ext](req,res,pathname);
	}
	if(pathname in routes){
		return routes[pathname](req,res,url_link);
	}
	res.writeHead(404);    
	res.end(http.STATUS_CODES[404]);
});

server.on('clientError',(err,socket)=>{
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(config.PORT,(err)=>{
	if(err) throw err;
	console.log('Sever running at '+config.PORT);
});