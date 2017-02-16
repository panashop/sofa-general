function loadOurBattle(res){
    var Battle = require('../db').Battle;
    var OurRota = require('../db').OurRota;
    var ourRotasShort =[];
    var ourRotasFull =[];
    Battle.find({},{"ourRotas":1,
                    "_id": 0},                          
            function(err, data){
                if(err) {console.log(err)}
                else{
                    ourRotasShort = data[0].ourRotas;
                    var temp = [];
                    ourRotasShort.forEach(function(elem){
                        temp.push(elem.name)
                    });
                     OurRota.find({name: {$in: temp}},{ARTA:1,
                                    BTR:1,
                                    GRAD:1,
//                                    ID: String,
                                    PTUR:1,
                                    health:1,
                                    infantery:1,
                                    level:1,
                                    maxARTA:1,
                                    maxBTR:1,
                                    maxGRAD:1,
                                    maxInfantery:1,
                                    maxMortar:1,
                                    maxPTUR:1,
                                    maxTank:1,
                                    mortar:1,
                                    name:1,
                                    position:1,
                                    realPTUR:1,
                                    realinfantery:1,
                                    realmortar:1,
                                    retreatPosition: 1,
                                    round:1,
                                    steps:1,
                                    side:1,
                                    tank:1,
                                    trench: 1,
                                    type: 1,
                                    walked: 1,
                                    "_id": 0}, 
                                    function(err, rota){
                                        if(err) {
                                            console.log(err)
                                        }else{                      
                                            res.json(rota);
                                            res.end();
                                    };
                            });
                    };
                });
}

module.exports = loadOurBattle;