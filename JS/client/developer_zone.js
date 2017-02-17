//var zone = {};
var data = {};
var zoneName = document.location.href.slice(-6);
var url = 'http://localhost:8080/zone/json/?zoneName=' + zoneName;
var water = [];
var city = [];
var clicker = 'none';



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
    firstDraw()

    window.onload = init(); 
    
    
//==========Переписано из zone_main.js====================
}

function init(){//Создать обработчики и бросить сяда
    var fireField1 = $(".line_1_cell");
    var fireField2 = $(".line_2_cell");
    for (var i = 0; i < fireField1.length; i++) {
        if(fireField1[i].innerHTML != 'help'){
          fireField1[i].onclick = clickFunction;  
        }
        }
    for (var i = 0; i < fireField2.length; i++) {
        if(fireField2[i].innerHTML != 'help'){
          fireField2[i].onclick = clickFunction;  
        }
        }
    $('#our_trench').on('click', clickFunction);
    $('#our_mine').on('click', clickFunction);
}

function clickFunction(event){
    
    var target = event.target.id;
    
    if(target == 'our_trench'){//water
        clicker = 'water';
    }
    if(target == 'our_mine'){//city
        clicker = 'city';
    }
    if(clicker != 'none'){
        if(clicker == 'water'&&target != 'our_trench'){
            $('#'+target).addClass('water');
            water.push(target)
        }
        if(clicker == 'city'&&target != 'our_mine'){
            $('#'+target).append('<div class="city" style = "background: url(../../IMG/enemy_sprite_big.png) no-repeat center center; position: absolute; display: inline-block; width: 54px; height: 61px; top: 10px; left: 3px; background-position: -500px -300px;"></div>');
            city.push(target)
        }
    }
    
}

function ourSave(){
    var zona = {};
    
    deleteRepeat(city);
    deleteRepeat(water);
    
    zona.name = data.name;
    zona.sector = data.sector;
    zona.position = data.position;
    zona.geoX = data.geoX;
    zona.geoY = data.geoY;
    zona.russia = data.russia;
    zona.city = copyArray(city);
    zona.water = copyArray(water);
        
    console.log(zona)    
        
 
    
    var sendData = JSON.stringify(zona).toString();
    $.get('http://localhost:8080/sector/developer/', sendData)
    
    
}

function firstDraw(){
    if(data.russia){
        data.russia.forEach(function(field){
        $('#'+field).addClass('russia');        
        });
    }
    if(data.water){
        data.water.forEach(function(field){
        $('#'+field).addClass('water');        
        });
    }
    delete1111()
    if(data.city){
        data.city.forEach(function(field){        
        $('#'+field).append('<div class="city" style = "background: url(../../IMG/enemy_sprite_big.png) no-repeat center center; position: absolute; display: inline-block; width: 54px; height: 61px; top: 10px; left: 3px; background-position: -500px -300px;"></div>');
        });
    }
}

function createAllFieldInZone(){
var firstLine = 62;
var lastColumn = 23;
    

    
    
data.allField = [];

for(var i =firstLine; i>=51; i=i-1){
    allFieldsLine(i, lastColumn)
};

function allFieldsLine(line, column){ // line - (линия 11хх)  column - (количество столбцов на карте xx12)
//    var result = [];
        for(var i=11; i<=column; i++){
            data.allField.push('' + line + i);
        }
        return;
} 
} //создаем все поля зоны


function delete1111(){
    var cityArr = []
    data.city.forEach(function(field){
        if(field != '1111') cityArr.push(field)
    });
    data.city.length = 0;
    cityArr.forEach(function(city){
        data.city.push(city)
    })
}

function copyArr(arr){
    var newArr = [];
    for(i=0; i<arr.length; i++){
      var obj = {};
        for(key in arr[i]){
          obj[key] = arr[i][key];
        }
      newArr[i] = obj;
    }
    return newArr;
} //функция копирует массив состоящий из объектов

function copyArray(arr){ //функция копирует простой массив 
    var newArr = [];
    arr.forEach(function(step){
        newArr.push(step)
    })
    return newArr;
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