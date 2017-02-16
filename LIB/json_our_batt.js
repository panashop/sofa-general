//Сохраняем наши батальоны в базе данных
var OurBatt = require('../db').OurBatt;
var EnemyBatt = require('../db').EnemyBatt;

function JSONOurBatt(battName, res){
    OurBatt.findOne({name: battName}, {
                                "name":1, 
                                "side": 1,
                                "sector": 1, 
                                "position": 1, 
                                "rota": 1,
                                "trench": 1,
                                "walked": 1,
                                "_id": 0},
            function(err, date){
                if(err) {console.log(err)}
                else{
                    res.json(date);;
                }
            });
};

function JSONOurBattInSector(sectorName, res){
    OurBatt.find({sector: sectorName}, {
                                "name":1,  
                                "side": 1,
                                "sector": 1, 
                                "position": 1, 
                                "rota": 1,
                                "trench": 1,
                                "walked": 1,
                                "_id": 0},
            function(err, data){
                if(err) {console.log(err)}
                else{
                    res.json(data);
//                    return data;
                }
            });
}

function JSONEnemyBattInSector(sectorName, res){
    EnemyBatt.find({sector: sectorName}, {
                                "name":1,  
                                "side": 1,
                                "sector": 1, 
                                "position": 1, 
                                "rota": 1,
                                "trench": 1,
                                "walked": 1,
                                "_id": 0},
            function(err, data){
                if(err) {console.log(err)}
                else{
                    res.json(data);
//                    return data;
                }
            });
}

module.exports = JSONOurBatt;
module.exports.JSONOurBattInSector = JSONOurBattInSector;
module.exports.JSONEnemyBattInSector = JSONEnemyBattInSector;