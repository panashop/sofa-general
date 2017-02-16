var Zone = require('../db').Zone;
var url = require('url');

function JSONZone(zoneName, res){
    Zone.findOne({name: zoneName}, {
                            "name":  1,
                            "sector": 1,
                            "position": 1,
                            "geoX" : 1,
                            "geoY" : 1, 
                            "water": 1,
                            "city": 1,
                            "base": 1,
                            "russia": 1,
                            "_id": 0},
            function(err, date){
                if(err) {console.log(err)}
                else{
                    res.json(date);;
                }
            });
}

module.exports =  JSONZone;
