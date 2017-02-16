var Sector = require('../db').Sector;

function JSONSector(sectorName, res){
    Sector.findOne({name: sectorName}, {
                                "name":1, 
                                "russiaFields": 1, 
                                "geoX": 1, 
                                "geoY": 1,
                                "map_file": 1,
                                "height" : 1,
                                "width": 1,
                                "waterFields": 1,
                                "enemyFields": 1,
                                "ourFields" : 1,
                                "road" : 1,
                                "_id": 0},
            function(err, date){
                if(err) {console.log(err)}
                else{
                    res.json(date);;
                }
            });
}

module.exports =  JSONSector;