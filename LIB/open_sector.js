var Sector = require('../db').Sector;
var create_sector = require('../create_sector');

function openSector(name, res){
    
    Sector.findOne({name: name}, {"name":1, 
                                 "russiaFields": 1, 
                                 "geoX": 1, 
                                 "geoY": 1,
                                 "map_file": 1,
                                 "height" : 1,
                                 "width": 1,
                                 "grayFields": 1,
                                 "enemyFields": 1,
                                 "ourFields" : 1,
                                 "_id": 0},
            function(err, date){
                if(err) {console.log(err)}
                else{
                    res.send(create_sector(date));
                }
            });
}


module.exports =  openSector;