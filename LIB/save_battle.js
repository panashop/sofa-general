function saveBattle(data){
var Battle = require('../db').Battle;
    if(Battle.find().count() != 0){
        Battle.find().remove().exec();
    }
    
        var battleDescription = new Battle({
            position: data.position,
            sector: data.sector,
//            whoAttack: String,
            ourRotas: foo(data.ourRotas),
            enemyRotas: foo(data.enemyRotas)
        })
console.log("Save battle in DB")
            battleDescription.save();
            
            function foo(arr){
              var arr1 = [];
              arr.forEach(function(elem){
                arr1.push(elem)
              })
              return arr1;
            }
  
}


module.exports = saveBattle;