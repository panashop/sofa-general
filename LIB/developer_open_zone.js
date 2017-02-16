var sectorGeoX, sectorGeoY;
var zoneName;

function openZone(path, res){ 

var Sector = require('../db').Sector;
var Zone = require('../db').Zone;
var create_zone = require('../developer_create_zone');
    
var line = path.slice(-4).substr(0, 2);
var row = path.slice(-2);
var position = path.slice(-4);
var sectorName = path.slice(6,7);
    
var zone = {};
    
        Sector.findOne({name: sectorName}, {
                        "geoX": 1,
                        "geoY": 1,
                        "_id": 0}, 
            function(err, date){
                sectorGeoX = date.geoX;
                sectorGeoY = date.geoY;

            Zone.findOne({sector: sectorName, position: position},{
                    "name":1,
                    "base": 1,
                    "city": 1,
                    "water": 1,
                    "geoX" : 1,
                    "geoY" : 1,
                    "russia" : 1,
                    "_id": 0},                                   
        function(err, date){
            if(err) {console.log(err)}
            else{
                zone = date;
                
                if((zone.geoX ==0)&&(zone.geoY ==0)){
                    zone.geoX = sectorGeoX;
                    zone.geoY = sectorGeoY;
                if(line%2 != 0){
                    zone.geoX = +(zone.geoX + 0.08*(row - 11)).toFixed(3);
                    zone.geoY = +(zone.geoY + 0.045*(line - 21)).toFixed(3);
                }if(line%2 == 0){
                    zone.geoX = +(zone.geoX -0.025 + 0.08*(row - 11)).toFixed(3);
                    zone.geoY = +(zone.geoY + 0.045*(line - 21)).toFixed(3);
                }
                }
                
                Zone.findOneAndUpdate({sector: sectorName, position: position}, 
                                      { $set: { "geoX" : zone.geoX,
                                                "geoY" : zone.geoY } }, 
                                      { new: true }, 
                                      function(err, doc) {
                        });
                
                zoneName = zone.name;
                
                res.send(create_zone(zone));
                
            }
        });
            
            });
}

module.exports = openZone;
module.exports.zoneName = zoneName;