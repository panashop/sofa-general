var router_zone = function(req, res){


var JSONZone = require('./LIB/json_zone');
var openZone = require('./LIB/open_zone');
var saveBattle = require('./LIB/save_battle');
var loadOurBattle = require('./LIB/load_our_battle');
var loadEnemyBattle = require('./LIB/load_enemy_battle');
var path = req.path;
var url = require('url');    

//console.log(req.url)    
if(/-zone/.test(path)){ 
        openZone(path, res)
    }
    
if(path == '/zone/json/'){

    JSONZone(req.query.zoneName, res);
    }
    
if(/save-battle/.test(path)){
var data = JSON.parse(url.parse(req.url).query.split('%22').join('"'));
    saveBattle(data);
    res.end()
}
    
if(/load-our-battle/.test(path)){
    loadOurBattle(res);
}
    
if(/load-enemy-battle/.test(path)){
    loadEnemyBattle(res);
}
    
}

module.exports = router_zone;   