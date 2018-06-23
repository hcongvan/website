var http = require("http");

exports.requestBot = function(path,msg,callback){
	var options = {
	  hostname: 'localhost',//'martketbot.herokuapp.com',	//host bot		
	  port:4000,//port
	  path: path,
	  method: 'POST',
	  headers: {
		  'Content-Type': 'application/json',
	  }
	};
	var req = http.request(options, function(res) {
	  console.log('Status: ' + res.statusCode);
	  res.setEncoding('utf8');
	  res.on('data', function (body) {
		callback(null,body);
	  });
	});
	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	  callback(e,null);
	});
	// write data to request body
	req.write(msg);
	req.end();
}
