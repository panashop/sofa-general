function saveSector(req){
var url = require('url');
var Sector = require('../db').Sector;
var OurBatt = require('../db').OurBatt;
var data = JSON.parse(url.parse(req.url).query.split('%22').join('"'));
var ourFields = [];
var enemyFields = [];
    
//    console.log(data)
    
data.map.forEach(function(field){
    if(field.side == 'our'){
        ourFields.push(field.position);
    }
    if(field.side == 'enemy'){
        enemyFields.push(field.position);
    }
});

Sector.findOneAndUpdate({name: data.sector}, 
                                      { $set: { "enemyFields" : enemyFields,
                                                "ourFields" : ourFields }} 
                                      ,{ new: true }
                                      ,function(err, doc) {}
                       );

data.our.forEach(function(unit){
    OurBatt.findOneAndUpdate({name: unit.name},
                        {$set:{"position": unit.position,
                              "trench": unit.trench,
                              "walked": unit.walked}}
                            ,{ new: true } 
                            ,function(err, doc) {}
                            );
    });
    
data.our.forEach(function(unit){ //сохраняем новые батальоны в базу данных
    OurBatt.find({name: unit.name}, {"name":1,
                                    "_id": 0}, 
        function(err, batt){
            if(err) console.log(err);
            else{
                if(batt.length == 0){
            var ourBattDescription = new OurBatt({
            name: unit.name,
            side: unit.side,
            type: unit.type,
            sector: unit.sector,
            position: unit.position,
            trench: unit.trench,
            walked: unit.walked,
            rota: unit.rota    
            });
            ourBattDescription.save();
            }
            }
    }); 
});    
}


module.exports = saveSector;