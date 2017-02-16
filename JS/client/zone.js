//var zone = {};
var data = {};
var zoneName = document.location.href.slice(-6);
var url = 'http://localhost:8080/zone/json/?zoneName=' + zoneName;


$(function(){
var load1 = $.getJSON(url, function(zona_data){            
//            zone = zona_data; //получаем данные о zone (дома, вода...)
            data = zona_data;
        load1.complete(function(){
//============ЗАКАМЕНТИТЬ ДЛЯ ПРОРИСОВКИ ЗОНЫ==================================================            
            var load2 = $.getJSON('http://localhost:8080/zone/load-our-battle/', function(our_battle){
                data.our = our_battle; // подгружаем наши войска
                load2.complete(function(){
                    var load3 = $.getJSON('http://localhost:8080/zone/load-enemy-battle/', function(enemy_battle){
                        data.enemy = enemy_battle; // подгружаем войска противника
                        load3.complete(function(){
                            allZoneFunctins();
                        });                        
                    });
                });
            });
             
//============ЗАКАМЕНТИТЬ ДЛЯ ПРОРИСОВКИ ЗОНЫ==================================================             
        })
        }); 
    });//отправка GET запроса и получение zone.json


function allZoneFunctins(){
    createAllFieldInZone();
//    drawAllObjectInZone();
    randomTroopsInZone();
    emulationDataFunction();
    
    createOurBasePoins(getUrlVars()[1]);
    createEnemyBasePoins(getUrlVars()[1]);
    
//==========Переписано из zone_main.js====================
    drawUnitsOfTwoSize();

    startRealQuantity();

    buttonShowFunction();

    window.onload = init(); 
    
    
//==========Переписано из zone_main.js====================
}

function createAllFieldInZone(){
var firstLine = 62;
var lastColumn = 23;
var attackDirection = getUrlVars()[1];
    
var startOurPosition1_4=['5111', '5112', '5113', '5114', '5115', '5116', '5117', '5118',  '5119',
                       '5211','5311', '5411', '5511', '5611','5711', '5811', '5911','6011','6111', 
                       '6211', '6212', '6213', '6214'];    
var startOurPosition2_5=['5111', '5112', '5113', '5114', '5115', '5116',
                       '5211','5311', '5411', '5511', '5611','5711', '5811', '5911','6011','6111', 
                       '6211', '6212', '6213', '6214', '6215', '6216'];
var startOurPosition3_6=['5111', '5112', '5113', '5114', 
                       '5211','5311', '5411', '5511', '5611','5711', '5811', '5911','6011','6111', 
                       '6211', '6212', '6213', '6214', '6215', '6216', '6217', '6218', '6219'];    
var startEnemyPosition1_4=['5120', '5121', '5122', '5123',
                       '5223','5323', '5423', '5523', '5623','5723', '5823', '5923','6023','6123', 
                       '6215', '6216','6217', '6218', '6219', '6220', '6221', '6222', '6223'];
var startEnemyPosition2_5=['5118','5119', '5120', '5121', '5122', '5123',
                       '5223','5323', '5423', '5523', '5623','5723', '5823', '5923','6023','6123', 
                        '6218', '6219', '6220', '6221', '6222', '6223'];
var startEnemyPosition3_6=['5115', '5116', '5117', '5118','5119', '5120', '5121', '5122', '5123',
                       '5223','5323', '5423', '5523', '5623','5723', '5823', '5923','6023','6123', 
                        '6220', '6221', '6222', '6223'];
    
    
data.allField = [];
data.ourFields = [];
data.enemyFields = [];

for(var i =firstLine; i>=51; i=i-1){
    allFieldsLine(i, lastColumn)
};
    
if (attackDirection == 1){
    startOurPosition1_4.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.ourFields.push(field);
        }
    })
    startEnemyPosition1_4.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.enemyFields.push(field);
        }
    })
}  
if (attackDirection == 4){
    startEnemyPosition1_4.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.ourFields.push(field);
        }
    })
    startOurPosition1_4.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.enemyFields.push(field);
        }
    })
}
if (attackDirection == 2){
    startOurPosition2_5.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.ourFields.push(field);
        }
    })
    startEnemyPosition2_5.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.enemyFields.push(field);
        }
    })
}  
if (attackDirection == 5){
    startEnemyPosition2_5.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.ourFields.push(field);
        }
    })
    startOurPosition2_5.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.enemyFields.push(field);
        }
    })
}
if (attackDirection == 3){
    startOurPosition3_6.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.ourFields.push(field);
        }
    })
    startEnemyPosition3_6.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.enemyFields.push(field);
        }
    })
}  
if (attackDirection == 6){
    startEnemyPosition3_6.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.ourFields.push(field);
        }
    })
    startOurPosition3_6.forEach(function(field){
        if((data.water.indexOf(field)<0)&&(data.russia.indexOf(field)<0)){
            data.enemyFields.push(field);
        }
    })
}
    
for(var i=0; i<=20; i++){//40
    addOurField(3);
    addEnemyField(3);
} 
for(var i=0; i<=40; i++){//20
    addOurField(2);
    addEnemyField(2);
} 

    
//========================================================= 
function addOurField(edge){
    
    var allRandom = random(data.allField)
    
    for(var i=0; i<allRandom.length; i++){
        if((data.ourFields.indexOf(allRandom[i])<0)&&(data.enemyFields.indexOf(allRandom[i])<0)&&(data.water.indexOf(allRandom[i])<0)&&(data.russia.indexOf(allRandom[i])<0)){
            var temp = oneStepFunction(allRandom[i]);
            var counter = 0;
            temp.forEach(function(temp_field){
                if(data.ourFields.indexOf(temp_field)>=0){
                    counter +=1;
                }
            })
            if(counter>=edge){
                data.ourFields.push(allRandom[i]);
                return;
            }
        }
    }
} 

function addEnemyField(edge){
    
    var allRandom = random(data.allField)
    
    for(var i=0; i<allRandom.length; i++){
        if((data.ourFields.indexOf(allRandom[i])<0)&&(data.enemyFields.indexOf(allRandom[i])<0)&&(data.water.indexOf(allRandom[i])<0)&&(data.russia.indexOf(allRandom[i])<0)){
            var temp = oneStepFunction(allRandom[i]);
            var counter = 0;
            temp.forEach(function(temp_field){
                if(data.enemyFields.indexOf(temp_field)>=0){
                    counter +=1;
                }
            })
            if(counter>=edge){
                data.enemyFields.push(allRandom[i]);
                return;
            }
        }
    }
} 

function allFieldsLine(line, column){ // line - (линия 11хх)  column - (количество столбцов на карте xx12)
//    var result = [];
        for(var i=11; i<=column; i++){
            data.allField.push('' + line + i);
        }
        return;
} 
} //создаем все поля зоны

function randomTroopsInZone(){
    var ourFields_Troops = copyArray(random(data.ourFields));
    data.our.forEach(function(unit){
        unit.position = ourFields_Troops.pop();
        $('#' + unit.position).addClass('our_'+unit.type)
    });
    var enemyFields_Troops = copyArray(random(data.enemyFields));
    data.enemy.forEach(function(unit){
        unit.position = enemyFields_Troops.pop();
        $('#' + unit.position).addClass('enemy_'+unit.type)
    });
}

function emulationDataFunction(){
    data.allFields = function(){        
        return data.allField;
    };
    data.ourField = function(){
        var arr =[];
        data.map.forEach(function(field){
            if(field.side == 'our'){
                arr.push(field.position)
            }
        })
        return arr;
    };
    data.enemyField = function(){
        var arr =[];
        data.map.forEach(function(field){
            if(field.side == 'enemy'){
                arr.push(field.position)
            }
        })
        return arr;
    };
//    data.calculationMapFirst = function(){
//        data.map=[]
//        data.allField.forEach(function(field){
//            var obj={};
//            obj.position = field;
//            if(data.ourFields.indexOf(field)>=0){
//                obj.side = 'our'
//            }if(data.enemyFields.indexOf(field)>=0){
//                obj.side = 'enemy'
//            }if(data.water.indexOf(field)>=0){
//                obj.side = 'water'
//            }if(data.russia.indexOf(field)>=0){
//                obj.side = 'russia'
//            }
//            data.map.push(obj)
//        });
//    };
//    data.calculationMapFirst();
    data.calculationMap = function(){
        data.map=[]
        data.allField.forEach(function(field){
            var obj={};
            obj.position = field;
            if(data.ourFields.indexOf(field)>=0){
                obj.side = 'our'
            }if(data.enemyFields.indexOf(field)>=0){
                obj.side = 'enemy'
            }if(data.water.indexOf(field)>=0){
                obj.side = 'water'
            }if(data.russia.indexOf(field)>=0){
                obj.side = 'russia'
            }
            data.map.push(obj)
        })
    };
    data.calculationMap();
    data.dangerFields = function(){
        var arr=[];
        data.our.forEach(function (unit){
            if(unit.type == 'infantery'){
            var temp = [];
                temp = (oneStepFunction(unit.position));
                temp.forEach(function (field){
                    arr.push(field);
                });
            }
            if((unit.type == 'tank')||(unit.type == 'BTR')){
            var temp1 = [];
            var temp2 = [];
                temp1 = (oneStepFunction(unit.position));
                temp1.forEach(function (field1){
                    temp2 = (oneStepFunction(field1));
                    temp2.forEach(function (field2){
                        arr.push(field2);
                    });                    
                });
            }
            
        });
        arr = deleteRepeat(arr).sort();
        return arr;
    }
    data.enemyTroops = function(){
        var arr =[];
        data.enemy.forEach(function(elem){
            arr.push(elem.position)
        });
        return arr;
    }
    data.ourTroops = function(){
        var arr =[];
        data.our.forEach(function(elem){
            arr.push(elem.position)
        });
        return arr;
    }
    data.waterField = function(){
        var arr =[];
        data.water.forEach(function(elem){
            arr.push(elem)
        });
        return arr;
    }
//=====Добавляем свойство ID для всех юнитов==============
    data.our.forEach(function(unit){
        unit.ID = unit.name;
    });
    data.enemy.forEach(function(unit){
        unit.ID = unit.name;
    })
    
//=====Добавляем свойство ID для всех юнитов==============
    
}


function createOurBasePoins(direction){
    if(direction == 1){
        var first = random(['5313', '5413']).pop();
        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 2){
        var first = random(['5613', '5713']).pop();
        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 3){
        var first = random(['5913', '6013']).pop();

        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 4){
        var first = random(['5921', '6021']).pop();

        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 5){
        var first = random(['5621', '5721']).pop();

        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 6){
        var first = random(['5321', '5421']).pop();

        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'our'){
                data.ourBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
};

function createEnemyBasePoins(direction){
    if(direction == 4){
        var first = random(['5313', '5413']).pop();
        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 5){
        var first = random(['5613', '5713']).pop();
        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 6){
        var first = random(['5913', '6013']).pop();
        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 1){
        var first = random(['5921', '6021']).pop();
        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 2){
        var first = random(['5621', '5721']).pop();
        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
    if(direction == 3){
        var first = random(['5321', '5421']).pop();
        var arr = random(oneStepFunction(first));
        for(var i=0; i<arr.length; i++){
            if(findField(arr[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        for(var j=0; j<arr.length; j++){
            var arr2 = random(oneStepFunction(arr[j]));
            for(var i=0; i<arr2.length; i++){
            if(findField(arr2[i]).side == 'enemy'){
                data.enemyBasePoint = arr[i];
                return;
            }
        }
        }
        
    };
}


//===================================================
function oneStepFunction(position){
    temp = []; 
    if(position.substring(0, 2) % 2 == 0)
    {
        temp.push(calculationPosition(position, 1, -1));
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 0, -1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, -1, -1));  
    } else 
    {
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 1, 1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, 0, -1));
    }
        return temp;
}

function calculationPosition(position, delta_X, delta_Y){ //получаем новые координаты в понятном виде
    var newX = position.substring(0, 2);
    newX = +newX + delta_X;
    if (newX<10){
       newX = String('0' + newX); 
    }
    var position_X = String (newX + position.substring(2, 4));
    var newY = position.substring(2, 4);
    newY = +newY + delta_Y;
    if (newY<10){
        newY = String('0' + newY);
    }
    var position_Y = String (position_X.substring(0, 2) + newY);
    return position_Y;
} //получаем новые координаты в понятном виде

function random(arr){
    
  function compareRandom(a, b) {
        return Math.random() - 0.5;
    }
    
   return arr.sort(compareRandom);
}

function deleteRepeat(arr){
    var newArr =[];
    newArr.push(arr[0]);
    for(var i=1; i<arr.length; i++){
        if(newArr.indexOf(arr[i]) < 0){
            newArr.push(arr[i]);
        }
    }
    return newArr;
} // удаляем повторяющиеся элементы массива

function getUrlVars(){
    return window.location.href.slice(window.location.href.indexOf('?')).split(/[&?]{1}[\w\d]+=/);
} //распарсить URL страницы