function saveDeveloper(req){
var url = require('url');
var Zone = require('../db').Zone;
//var OurBatt = require('../db').OurBatt;
var data = JSON.parse(url.parse(req.url).query.split('%22').join('"'));
//var ourFields = [];
//var enemyFields = [];
    
//    console.log(data)
    


Zone.findOneAndUpdate({name: data.name}, 
                                      { $set: { "city" : data.city,
                                                "water" : data.water }} 
                                      ,{ new: true }
                                      ,function(err, doc) {}
                       );

//data.our.forEach(function(unit){
//    OurBatt.findOneAndUpdate({name: unit.name},
//                        {$set:{"position": unit.position,
//                              "trench": unit.trench,
//                              "walked": unit.walked}}
//                            ,{ new: true } 
//                            ,function(err, doc) {}
//                            );
//    });
//    
//data.our.forEach(function(unit){ //сохраняем новые батальоны в базу данных
//    OurBatt.find({name: unit.name}, {"name":1,
//                                    "_id": 0}, 
//        function(err, batt){
//            if(err) console.log(err);
//            else{
//                if(batt.length == 0){
//            var ourBattDescription = new OurBatt({
//            name: unit.name,
//            side: unit.side,
//            type: unit.type,
//            sector: unit.sector,
//            position: unit.position,
//            trench: unit.trench,
//            walked: unit.walked,
//            rota: unit.rota    
//            });
//            ourBattDescription.save();
//            }
//            }
//    }); 
//});    
}


module.exports = saveDeveloper;