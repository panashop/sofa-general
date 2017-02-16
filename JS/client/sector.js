var sector = {
    enemyTroops: function(){
        var arr=[];
        for(i=0; i<sector.enemy.length; i++){
            arr.push(sector.enemy[i].position)
        }
        return arr;
    }
};//в конечном варианте убрать объект sector из глобальной области
//sector.enemy = [];
var ourBatts = [];
var enemyBatts = [];
var allBatts = [];
//var ourTargetUnit = {};



$(function(){ 
        var jqxhr = $.getJSON('http://localhost:8080/sector/json/', function(records){ 
//console.log(records)
            sector = records; //в конечном варианте убрать объект sector из глобальной области
            
        jqxhr.complete(function(){
            getEnemyBatts();
        })
        }); 
    });//отправка GET запроса и получение sector.json

function getEnemyBatts(){
$(function(){ 
        var jqxhr = $.getJSON('http://localhost:8080/sector/enemy_batts/', function(records){   
        jqxhr.complete(function(){
            enemyBatts = records;
            sector.enemy = [];
            enemyBatts.forEach(function(batt){
                sector.enemy.push(batt);
            });
                    
            getOurBatts();
            drawAllEnemyTroopsInSector();
            
                 
//        allSectorFunctins()    
        })
        }); 
    });//отправка GET запроса и получение enemy_batt.json
}

function getOurBatts(){
$(function(){ 
        var jqxhr = $.getJSON('http://localhost:8080/sector/our_batts/', function(records){   
        jqxhr.complete(function(){
            ourBatts = records;
            var dir_request = $.get('http://localhost:8080/direction/1/'); //правильное направление юнитов в sector
            dir_request.complete(function(){
                createAllFieldsInSector();
                sector.our = []; 
                allBattsFunctions();
                allSectorFunctins();
            })
        })
        }); 
    });//отправка GET запроса и получение our_batt.json
}


function allSectorFunctins(){
    $("#big_map img").attr("src", "../../IMG/" + sector.map_file);
    $("#big_map img").attr("height", (sector.height*50+5) + "px");
    
    emulationSectorFunction();
    drawAllZoneInSector();
    //=====================

    drawUnitsOfTwoSize();
    window.onload = init();
    
    //=========================
}

function allBattsFunctions(){
    drawAllOurTroopsInSector();
    drawAllEnemyTroopsInSector();
    knowingWithTroops();
//    createClickOnFieldsInSector(sector); //удалить в конечном варианте(нужна для заполнения карт)
}



function createAllFieldsInSector(){
var firstLine = sector.height + 20;
var lastColumn = sector.width + 10;

sector.allField = [];

for(var i =firstLine; i>=21; i=i-1){
    allFieldsLine(i, lastColumn)
}

function allFieldsLine(line, column){ // line - (линия 11хх)  column - (количество столбцов на карте xx12)
//    var result = [];
        for(var i=11; i<=column; i++){
            sector.allField.push('' + line + i);
        }
        return;
} 
} //создаем все поля сектора

function drawAllZoneInSector(){
    
//    sector.ourFields.forEach(function(field){
//        $('#'+field).addClass('our');
//    })
//    sector.enemyFields.forEach(function(field){
//        $('#'+field).addClass('enemy');
//    });
//    if(sector.russiaFields){
//        sector.russiaFields.forEach(function(field){
//        $('#'+field).addClass('russia');
//        });    
//    }
//    if(sector.waterFields){
//        sector.waterFields.forEach(function(field){
//        $('#'+field).addClass('water');
//        });    
//    }
//    sector.calculationMap();
    
    if(sector.height == 12){
        $('#buttonNewCourse').css("bottom", "-665px");
    }
    if(sector.height == 14){
        $('#buttonNewCourse').css("bottom", "-765px");
    }
}

function createClickOnFieldsInSector(sector){
    
    sector.allField.forEach(function(ID){        
        $('#'+ID).on('click', function(){ 
            
//        if(sector.ourTroopsPositions.indexOf(ID)>=0){//выбрали наше подразделение
//            console.log("Наше подразделение")
//        }
            
            var url = '/zone/' + sector.name + '-zone/' + ID + '?zoneName=' + sector.name + '-' + ID;
            var jqxhr = $.get(url);        
            jqxhr.complete(function(){
                location.href = url;
            })         
            
            
        })    

  

    })
}

function drawAllOurTroopsInSector(){
    sector.ourTroopsPositions = [];
    ourBatts.forEach(function(batt){
        sector.ourTroopsPositions.push(batt.position)
        var inf = 0;
        var btr = 0;
        var tank = 0;
        var arta = 0;
        var grad = 0;
        batt.rota.forEach(function(rota){
            if(rota.type == 'infantery'){inf +=1}
            if(rota.type == 'BTR'){btr +=1}
            if(rota.type == 'tank'){tank +=1}
            if(rota.type == 'ARTA'){arta +=1}
            if(rota.type == 'GRAD'){grad +=1}
        })
        if(inf >=1){
            batt.type = 'infantery';
            batt.steps = 1;
            $('#'+batt.position).addClass('our_infantery');
            if(batt.trench == "yes"){
                $('#'+batt.position).toggleClass("our_infantery our_infantery_trench")
            }
            return;
        }if((inf ==0)&&(btr>=1)){
            batt.type = 'BTR';
            batt.steps = 2;
            $('#'+batt.position).addClass('our_BTR');
            if(batt.trench == "yes"){
                $('#'+batt.position).toggleClass("our_BTR our_infantery_trench")
            }
            return;
        }if((inf ==0)&&(btr==0)&&(tank>=1)){
            batt.type = 'tank';
            batt.steps = 2;
            $('#'+batt.position).addClass('our_tank');
            return;
        }if((inf ==0)&&(btr==0)&&(tank==0)&&(arta>=1)){
            batt.type = 'ARTA';
            batt.steps = 1;
            $('#'+batt.position).addClass('our_ARTA');
            return;
        }if((inf ==0)&&(btr==0)&&(tank==0)&&(arta==0)&&(grad>=1)){
            batt.type = 'GRAD';
            batt.steps = 2;
            $('#'+batt.position).addClass('our_GRAD');
            return;
        }
        
    })    
}

function drawAllEnemyTroopsInSector(){
    sector.enemyTroopsPositions = [];
    enemyBatts.forEach(function(batt){
        sector.enemyTroopsPositions.push(batt.position)
        var inf = 0;
        var btr = 0;
        var tank = 0;
        var arta = 0;
        var grad = 0;
        batt.rota.forEach(function(rota){
            if(rota.type == 'infantery'){inf +=1}
            if(rota.type == 'BTR'){btr +=1}
            if(rota.type == 'tank'){tank +=1}
            if(rota.type == 'ARTA'){arta +=1}
            if(rota.type == 'GRAD'){grad +=1}
        })
        if(inf >=1){
            batt.type = 'infantery';
            batt.steps = 1;
            $('#'+batt.position).addClass('enemy_infantery');
            if(batt.trench == "yes"){
                $('#'+batt.position).toggleClass("enemy_infantery enemy_infantery_trench")
            }
            return;
        }if((inf ==0)&&(btr>=1)){
            batt.type = 'BTR';
            batt.steps = 2;
            $('#'+batt.position).addClass('enemy_BTR');
            if(batt.trench == "yes"){
                $('#'+batt.position).toggleClass("enemy_BTR enemy_infantery_trench")
            }
            return;
        }if((inf ==0)&&(btr==0)&&(tank>=1)){
            batt.type = 'tank';
            batt.steps = 2;
            $('#'+batt.position).addClass('enemy_tank');
            return;
        }if((inf ==0)&&(btr==0)&&(tank==0)&&(arta>=1)){
            batt.type = 'ARTA';
            batt.steps = 1;
            $('#'+batt.position).addClass('enemy_ARTA');
            return;
        }if((inf ==0)&&(btr==0)&&(tank==0)&&(arta==0)&&(grad>=1)){
            batt.type = 'GRAD';
            batt.steps = 2;
            $('#'+batt.position).addClass('enemy_GRAD');
            return;
        }
        
    })    //добавить расчет типов батальонов
}

function knowingWithTroops(){
    ourBatts.forEach(function(batt){
        sector.our.push(batt);
    });
}

function emulationSectorFunction(){
    sector.allFields = function(){        
        return sector.allField;
    };
    sector.ourField = function(){
        var arr =[];
        sector.map.forEach(function(field){
            if(field.side == 'our'){
                arr.push(field.position)
            }
        })
        return arr;
    };
    sector.enemyField = function(){
        var arr =[];
        sector.map.forEach(function(field){
            if(field.side == 'enemy'){
                arr.push(field.position)
            }
        })
        return arr;
    };
    sector.calculationMap = function(){
        sector.map=[]
        sector.allField.forEach(function(field){
            var obj={};
            obj.position = field;
            obj.sector = sector.name;
            if(sector.ourFields.indexOf(field)>=0){
                obj.side = 'our'
            }if(sector.enemyFields.indexOf(field)>=0){
                obj.side = 'enemy'
            }if(sector.waterFields.indexOf(field)>=0){
                obj.side = 'water'
            }if(sector.russiaFields.indexOf(field)>=0){
                obj.side = 'russia'
            }
            sector.map.push(obj)
        })
    };
    sector.calculationMap();
    sector.enemyTroops = function(){
        var arr=[];
        for(i=0; i<sector.enemy.length; i++){
            arr.push(sector.enemy[i].position)
        }
        return arr;
    }
    sector.ourTroops = function(){
        var arr=[];
        for(i=0; i<sector.our.length; i++){
            arr.push(sector.our[i].position)
        }
        return arr;
    }
    sector.waterField = function(){
        var arr=[];
        for(i=0;i<this.map.length; i++){
            if(sector.map[i].side == 'water'){
                arr.push(this.map[i].position);
            }
        }
        return arr;
    };
//=====Добавляем свойство ID для всех юнитов==============
    sector.our.forEach(function(unit){
        unit.ID = unit.name;
    });
    sector.enemy.forEach(function(unit){
        unit.ID = unit.name;
    })
    
//=====Добавляем свойство ID для всех юнитов==============
    sector.ourFields = copyArray(sector.ourField());
    sector.enemyFields = copyArray(sector.enemyField());
}
    
function copyArray(arr){ //функция копирует простой массив 
    var newArr = [];
    arr.forEach(function(step){
        newArr.push(step)
    })
    return newArr;
}
