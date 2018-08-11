const http = require('http');
var path = require('path');
var url = require('url');
var config = require('./control/configWebsite.js');
var routes = require('./control/routes.js');
var monogoose = require('mongoose');
monogoose.connect(config.getDBLink());

const server = http.createServer((req, res) => {
    var url_link = url.parse(req.url);
    var pathname = url_link.pathname;
    var ext = path.extname(pathname);
    console.log(pathname);
    if (ext in routes) {
        return routes[ext](req, res, pathname);
    }
    if (pathname in routes) {
        return routes[pathname](req, res, url_link);
    }
    res.writeHead(404);
    res.end(http.STATUS_CODES[404]);
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

var io = require("socket.io")(server);
server.listen(config.PORT, (err) => {
    if (err) throw err;
    console.log('Sever running at ' + config.PORT);
});


io.on("connection", function(socket) {
    console.log("client id :" + socket.id + ' connection');

    socket.emit('setCustomerID', socket.id); // set customer id

    socket.on('tradeOffer', function(data) {
        console.log('client id :' + socket.id + ' send');
        console.log(data);
        var statusServerFake = fakeRequestBot();
        if (statusServerFake) {
            //not busy : respone client success trade
            socket.emit('server-respose', { customerID: socket.id, status: statusServerFake });

        } else {
            //busy : respone client busy implement later
            socket.emit('server-respose', { customerID: socket.id, status: statusServerFake });
        }

    });

    socket.on("disconnect", function() {
        console.log("client id :" + socket.id + ' disconnection');
    });

});

function fakeRequestBot() {
    return Math.floor((Math.random() * 2));
}