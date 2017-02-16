var router_sector = function(req, res){

var openSector = require('./LIB/open_sector');
var JSONSector = require('./LIB/json_sector');
var JSONOurBattInSector = require('./LIB/json_our_batt').JSONOurBattInSector;
var JSONEnemyBattInSector = require('./LIB/json_our_batt').JSONEnemyBattInSector;
var openZone = require('./LIB/open_zone');
var path = req.path;
var url = require('url');
    

if(path == '/sector/A/'){ 
    openSector("A", res);
    sectorName = "A";    
}
if(path == '/sector/B/'){
    openSector("B", res);
    sectorName = "B";
}
if(path == '/sector/C/'){
    openSector("C", res);
    sectorName = "C";
}
if(path == '/sector/M/'){
    openSector("M", res);
    sectorName = "M";
}
    
if(path == '/sector/json/'){
    JSONSector(sectorName, res);
}
if(path == '/sector/our_batts/'){
    JSONOurBattInSector(sectorName, res);
}
    if(path == '/sector/enemy_batts/'){
    JSONEnemyBattInSector(sectorName, res);
}
if(path == '/sector/save/'){
    var saveSector = require('./LIB/save_sector');
    saveSector(req);
}
    
}


module.exports = router_sector;    
    