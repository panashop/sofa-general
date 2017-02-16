var express = require('express');
var app = express();
var router_sector = require('./router_sector');
var router_zone = require('./router_zone');
var change_direction = require('./change_direction');
var db = require('./db');


app.use(express.static(__dirname +'/'));
app.use(express.static(__dirname +'/CSS/'));
app.use(express.static(__dirname +'/JS/'));

app.get('/', function(req, res) {
    res.sendfile('main.html');
});

app.get(/sector/, function(req, res) { 
    router_sector(req, res);
});

app.get(/zone/, function(req, res) { 
    router_zone(req, res);
});

app.get(/direction/, function(req, res) { 
    change_direction(req, res);
});

app.listen(8080);

//тест для git

