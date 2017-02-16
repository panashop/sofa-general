//-----------------------------------------------------------------------------------------------------//
//ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ//
//-----------------------------------------------------------------------------------------------------//

var battleFieldHeight = 18;
var battleFieldWidth = 18;    

var ourQuantityTank = 0;
var ourQuantityBTR = 0;
var ourQuantityGun = 0;
var ourQuantityInfantry = 0;
var ourQuantityARTA =0;
var ourQuantityGRAD =0;

var enemyQuantityTank=0 ;
var enemyQuantityBTR=0 ;
var enemyQuantityGun =0;
var enemyQuantityInfantry=0 ;
var enemyQuantityARTA=0;
var enemyQuantityGRAD=0;

var enemyQuantityTankKIll = 0; //не заполнять
var enemyQuantityBTRKIll = 0; //не заполнять
var enemyQuantityGunKIll = 0; //не заполнять 
var enemyQuantityInfantryKIll = 0; //не заполнять
var enemyQuantityGRADKIll = 0; //не заполнять
var enemyQuantityARTAKIll = 0; //не заполнять

var ourQuantityTankKIll = 0; //не заполнять
var ourQuantityBTRKIll = 0; //не заполнять
var ourQuantityGunKIll = 0; //не заполнять
var ourQuantityInfantryKIll = 0; //не заполнять
var ourQuantityGRADKIll = 0; //не заполнять
var ourQuantityARTAKIll = 0; //не заполнять

var shorts = 0; //не заполнять
var OurShorts = 0; //не заполнять
var EnemyShorts = 0; //не заполнять
var counterOfWins = 0; //не заполнять
var counterOfDefeat = 0; //не заполнять
var fieldsWhereEnemyFire = [];
var fieldsWhereWeFire = [];
var ourWholeGRAD = 0;
var ourWholeARTA = 0;
var enemyWholeGRAD = 0;
var enemyWholeARTA = 0;

var quantityOurPTUR ;
var quantityEnemyPTUR = 3;

var needToKill; //переменная используется для добития подранков
var fireFieldForEnemyPosition = [];
var timeFireField;
var finishOurTroopsFields =[];
var numberOfShorts = 'first';
var resultOfBattle = 'equality';

var ourFirstGradFire = 1;
var ourFirstArtaFire = 1;
var numberOfOurShort = 0;
var numberOfEnemyShort = 0;

var enemy_00 = { //объект противника
    enemyField: [],
    enemyTanks: [],
    enemyBTR: [],
    enemyGuns: [],
    enemyARTA: [],
    enemyGRAD: [],
    enemyInfantry: [],
    enemyTroops: [],
    enemyEmptyField: [],
    
    createEnemyField: function (){
        this.enemyField.length = 0;
        
            for(var i = 1; i <= battleFieldWidth; i++){
                var coordinatesX = String(i);
             if (coordinatesX<10){
                    coordinatesX = "0" + String(coordinatesX);
             }
              for(var j = 1; j <= battleFieldHeight; j++){
                  var coordinatesY = j;
             if (coordinatesY<10){
                    coordinatesY = "0" + String(coordinatesY);

             }
                  var coordinatesXY = coordinatesX + coordinatesY;
                  var elem = document.getElementById(coordinatesXY);

                  if (elem.classList.contains("enemy_00")){
                     this.enemyField.push(coordinatesXY);
                }
              }  
            }
            return this.enemyField;
        }, // создает массив из полей противника
    generateOneEnemyTanks: function (){
    do {var firstPosition = this.enemyField[Math.floor(this.enemyField.length*Math.random())];
        
        var secondPosition = firstPosition.substring(0, 2);
        secondPosition = +secondPosition+1;
        if (secondPosition < 10){
            secondPosition = String('0' + secondPosition);
        }
        secondPosition = String(secondPosition + firstPosition.substring(2, 4));
        
                
    } while ((this.enemyField.indexOf(firstPosition) < 0) || (this.enemyField.indexOf(secondPosition) < 0)
        || (this.enemyEmptyField.indexOf(firstPosition) >= 0) || (this.enemyEmptyField.indexOf(secondPosition) >= 0));
    
        
        var oneTankPosition =[];        
        oneTankPosition[0] = firstPosition;
        oneTankPosition[1] = secondPosition;
        oneTankPosition[2] = 'not-hit';
        oneTankPosition[3] = 'not-hit';
        oneTankPosition[4] = 'live';
        this.enemyTroops.push(firstPosition);
        this.enemyTroops.push(secondPosition);
        
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, 0));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        this.enemyEmptyField.push(firstPosition);
        this.enemyEmptyField.push(secondPosition);
        
        var tank_1 = document.getElementById(firstPosition);
        var tank_2 = document.getElementById(secondPosition);
    
    
        return oneTankPosition;
}, // создает случайное расположение танка противника
    generateOneEnemyBTR: function (){ // создает случайное расположение БТР противника
    do {var firstPosition = this.enemyField[Math.floor(this.enemyField.length*Math.random())];
    
        var secondPosition = firstPosition.substring(0, 2);
        secondPosition = +secondPosition+1;
        if (secondPosition < 10){
            secondPosition = String('0' + secondPosition);
        }
        secondPosition = String(secondPosition + firstPosition.substring(2, 4));
        
                
    } while ((this.enemyField.indexOf(firstPosition) < 0) || (this.enemyField.indexOf(secondPosition) < 0)
        || (this.enemyEmptyField.indexOf(firstPosition) >= 0) || (this.enemyEmptyField.indexOf(secondPosition) >= 0));
    
        
        var oneBTRPosition =[];        
        oneBTRPosition[0] = firstPosition;
        oneBTRPosition[1] = secondPosition;
        oneBTRPosition[2] = 'not-hit';
        oneBTRPosition[3] = 'not-hit';
        oneBTRPosition[4] = 'live';
        this.enemyTroops.push(firstPosition);
        this.enemyTroops.push(secondPosition);
        
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, 0));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        this.enemyEmptyField.push(firstPosition);
        this.enemyEmptyField.push(secondPosition);
        
        var BTR_1 = document.getElementById(firstPosition);
        var BTR_2 = document.getElementById(secondPosition);
    
    
        return oneBTRPosition;
}, // создает случайное расположение БТР противника
    generateOneEnemyGuns: function (){
    do {var firstPosition = this.enemyField[Math.floor(this.enemyField.length*Math.random())];
    
        var secondPosition = firstPosition.substring(2, 4);
        secondPosition = +secondPosition+1;
        if (secondPosition < 10){
            secondPosition = String('0' + secondPosition);
        }
        secondPosition = String(firstPosition.substring(0, 2) + secondPosition);
        
                
    } while ((this.enemyField.indexOf(firstPosition) < 0) || (this.enemyField.indexOf(secondPosition) < 0)
        || (this.enemyEmptyField.indexOf(firstPosition) >= 0) || (this.enemyEmptyField.indexOf(secondPosition) >= 0));
    
        
        var oneGunPosition =[];        
        oneGunPosition[0] = firstPosition;
        oneGunPosition[1] = secondPosition;
        oneGunPosition[2] = 'not-hit';
        oneGunPosition[3] = 'not-hit';
        oneGunPosition[4] = 'live';
        this.enemyTroops.push(firstPosition);
        this.enemyTroops.push(secondPosition);
        
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, -1, 1));
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, 0, 1));
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, 1, 1));
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, 1, 0));
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, 1, -1));
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, 1, -2));
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, 0, -2));
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, -1, -2));
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, -1, -1));
        this.enemyEmptyField.push(calculationPosition_00(secondPosition, -1, 0));
        this.enemyEmptyField.push(firstPosition);
        this.enemyEmptyField.push(secondPosition);
        
        var gun_1 = document.getElementById(firstPosition);
        var gun_2 = document.getElementById(secondPosition);
    
    return oneGunPosition;
}, // создает случайное расположение артилерию противника 
    generateOneEnemyInfantry: function  (){
    do {var firstPosition = this.enemyField[Math.floor(this.enemyField.length*Math.random())];
       } while ((this.enemyField.indexOf(firstPosition) < 0) || (this.enemyEmptyField.indexOf(firstPosition) >= 0));
            
        var oneInfanteryPosition =[];        
        oneInfanteryPosition[0] = firstPosition;
        oneInfanteryPosition[1] = 'not-hit';
        oneInfanteryPosition[2] = 'live';
        this.enemyTroops.push(firstPosition);
                      
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, 0));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        this.enemyEmptyField.push(firstPosition);
        
        var infantry_1 = document.getElementById(firstPosition);
        
    
    return oneInfanteryPosition;
}, // создает случайное расположение пехоты противника    
    generateOneEnemyARTA: function (){
    do {var firstPosition = this.enemyField[Math.floor(this.enemyField.length*Math.random())];
        
        var secondPosition = calculationPosition_00(firstPosition, 1, 0);
        var thirdPosition = calculationPosition_00(firstPosition, 0, -1);   
        var fourthPosition = calculationPosition_00(firstPosition, 1, -1);    
         
                
    } while ((this.enemyField.indexOf(firstPosition) < 0) || (this.enemyField.indexOf(secondPosition) < 0)||(this.enemyField.indexOf(thirdPosition) < 0) || (this.enemyField.indexOf(fourthPosition) < 0)
        || (this.enemyEmptyField.indexOf(firstPosition) >= 0) || (this.enemyEmptyField.indexOf(secondPosition) >= 0)||(this.enemyEmptyField.indexOf(thirdPosition) >= 0) || (this.enemyEmptyField.indexOf(fourthPosition) >= 0));
    
        
        var oneARTAPosition =[];        
        oneARTAPosition[0] = firstPosition;
        oneARTAPosition[1] = secondPosition;
        oneARTAPosition[2] = thirdPosition;
        oneARTAPosition[3] = fourthPosition;
        oneARTAPosition[4] = 'not-hit';
        oneARTAPosition[5] = 'not-hit';
        oneARTAPosition[6] = 'not-hit';
        oneARTAPosition[7] = 'not-hit';
        oneARTAPosition[8] = 'live';
        this.enemyTroops.push(firstPosition);
        this.enemyTroops.push(secondPosition);
        this.enemyTroops.push(thirdPosition);
        this.enemyTroops.push(fourthPosition);
        
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, 0));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, -1));        
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, -2));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, -2));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, -2));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, -2));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        
        this.enemyEmptyField.push(firstPosition);
        this.enemyEmptyField.push(secondPosition);
        this.enemyEmptyField.push(thirdPosition);
        this.enemyEmptyField.push(fourthPosition);
        
        var ARTA_1 = document.getElementById(firstPosition);
        var ARTA_2 = document.getElementById(secondPosition);
        var ARTA_3 = document.getElementById(thirdPosition);
        var ARTA_4 = document.getElementById(fourthPosition);
    
        return oneARTAPosition;
}, // создает случайное расположение АРТЫ противника    
    generateOneEnemyGRAD: function (){
    do {var firstPosition = this.enemyField[Math.floor(this.enemyField.length*Math.random())];
        
        var secondPosition = calculationPosition_00(firstPosition, 1, 0);
        var thirdPosition = calculationPosition_00(firstPosition, 0, -1);   
        var fourthPosition = calculationPosition_00(firstPosition, 1, -1);    
         
                
    } while ((this.enemyField.indexOf(firstPosition) < 0) || (this.enemyField.indexOf(secondPosition) < 0)||(this.enemyField.indexOf(thirdPosition) < 0) || (this.enemyField.indexOf(fourthPosition) < 0)
        || (this.enemyEmptyField.indexOf(firstPosition) >= 0) || (this.enemyEmptyField.indexOf(secondPosition) >= 0)||(this.enemyEmptyField.indexOf(thirdPosition) >= 0) || (this.enemyEmptyField.indexOf(fourthPosition) >= 0));
    
        
        var oneGRADPosition =[];        
        oneGRADPosition[0] = firstPosition;
        oneGRADPosition[1] = secondPosition;
        oneGRADPosition[2] = thirdPosition;
        oneGRADPosition[3] = fourthPosition;
        oneGRADPosition[4] = 'not-hit';
        oneGRADPosition[5] = 'not-hit';
        oneGRADPosition[6] = 'not-hit';
        oneGRADPosition[7] = 'not-hit';
        oneGRADPosition[8] = 'live';
        this.enemyTroops.push(firstPosition);
        this.enemyTroops.push(secondPosition);
        this.enemyTroops.push(thirdPosition);
        this.enemyTroops.push(fourthPosition);
        
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, 1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, 0));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, -1));        
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 2, -2));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 1, -2));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, 0, -2));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, -2));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.enemyEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        
        this.enemyEmptyField.push(firstPosition);
        this.enemyEmptyField.push(secondPosition);
        this.enemyEmptyField.push(thirdPosition);
        this.enemyEmptyField.push(fourthPosition);
        
        var GRAD_1 = document.getElementById(firstPosition);
        var GRAD_2 = document.getElementById(secondPosition);
        var GRAD_3 = document.getElementById(thirdPosition);
        var GRAD_4 = document.getElementById(fourthPosition);
    
        return oneGRADPosition;
}, // создает случайное расположение ГРАДа противника

} //объект противника
var our_00 ={   //наш объект
    ourField: [],
    ourTanks: [],
    ourBTR: [],
    ourARTA: [],
    ourGRAD: [],
    ourGuns: [],
    ourInfantry: [],
    ourTroops: [],
    ourEmptyField: [],
    
    createOurField: function (){
        this.ourField.length = 0;
            for(var i = 1; i <= battleFieldWidth; i++){
                var coordinatesX = String(i);
             if (coordinatesX<10){
                    coordinatesX = "0" + String(coordinatesX);
             }
              for(var j = 1; j <= battleFieldHeight; j++){
                  var coordinatesY = j;
             if (coordinatesY<10){
                    coordinatesY = "0" + String(coordinatesY);

             }
                  var coordinatesXY = coordinatesX + coordinatesY;
                  var elem = document.getElementById(coordinatesXY);

                  if (elem.classList.contains("our_00")){
                     this.ourField.push(coordinatesXY);
                }
              }  
            }
            return this.ourField;
        }, // создает массив из наших полей
    generateOneOurTanks: function  (){
    do {var firstPosition = this.ourField[Math.floor(this.ourField.length*Math.random())];
    
        var secondPosition = firstPosition.substring(0, 2);
        secondPosition = +secondPosition+1;
        if (secondPosition < 10){
            secondPosition = String('0' + secondPosition);
        }
        secondPosition = String(secondPosition + firstPosition.substring(2, 4));
        
                
    } while ((this.ourField.indexOf(firstPosition) < 0) || (this.ourField.indexOf(secondPosition) < 0)
        || (this.ourEmptyField.indexOf(firstPosition) >= 0) || (this.ourEmptyField.indexOf(secondPosition) >= 0));
    
        
        var oneOurTankPosition =[];        
        oneOurTankPosition[0] = firstPosition;
        oneOurTankPosition[1] = secondPosition;
        oneOurTankPosition[2] = 'not-hit';
        oneOurTankPosition[3] = 'not-hit';
        this.ourTroops.push(firstPosition);
        this.ourTroops.push(secondPosition);
        
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, 0));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        this.ourEmptyField.push(firstPosition);
        this.ourEmptyField.push(secondPosition);
        
        var tank_1 = document.getElementById(firstPosition);
        tank_1.setAttribute("class", "tank72-1");
        var tank_2 = document.getElementById(secondPosition);
        tank_2.setAttribute("class", "tank72-2");
    
    
        return oneOurTankPosition;
}, // создает случайное расположение нашего танка
    generateOneOurBTR: function  (){
    do {var firstPosition = this.ourField[Math.floor(this.ourField.length*Math.random())];
    
        var secondPosition = firstPosition.substring(0, 2);
        secondPosition = +secondPosition+1;
        if (secondPosition < 10){
            secondPosition = String('0' + secondPosition);
        }
        secondPosition = String(secondPosition + firstPosition.substring(2, 4));
        
                
    } while ((this.ourField.indexOf(firstPosition) < 0) || (this.ourField.indexOf(secondPosition) < 0)
        || (this.ourEmptyField.indexOf(firstPosition) >= 0) || (this.ourEmptyField.indexOf(secondPosition) >= 0));
    
        
        var oneOurBTRPosition =[];        
        oneOurBTRPosition [0] = firstPosition;
        oneOurBTRPosition [1] = secondPosition;
        oneOurBTRPosition [2] = 'not-hit';
        oneOurBTRPosition [3] = 'not-hit';
        this.ourTroops.push(firstPosition);
        this.ourTroops.push(secondPosition);
        
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, 0));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        this.ourEmptyField.push(firstPosition);
        this.ourEmptyField.push(secondPosition);
        
        var BTR_1 = document.getElementById(firstPosition);
        BTR_1.setAttribute("class", "our-btr-4-1");
        var BTR_2 = document.getElementById(secondPosition);
        BTR_2.setAttribute("class", "our-btr-4-2");
    
    
        return oneOurBTRPosition;
}, // создает случайное расположение нашего БТР
    generateOneOurGuns: function  (){
    do {var firstPosition = this.ourField[Math.floor(this.ourField.length*Math.random())];
    
        var secondPosition = firstPosition.substring(2, 4);
        secondPosition = +secondPosition+1;
        if (secondPosition < 10){
            secondPosition = String('0' + secondPosition);
        }
        secondPosition = String(firstPosition.substring(0, 2) + secondPosition);
        
                
    } while ((this.ourField.indexOf(firstPosition) < 0) || (this.ourField.indexOf(secondPosition) < 0)
        || (this.ourEmptyField.indexOf(firstPosition) >= 0) || (this.ourEmptyField.indexOf(secondPosition) >= 0));
    
        
        var oneOurGunPosition =[];        
        oneOurGunPosition[0] = firstPosition;
        oneOurGunPosition[1] = secondPosition;
        oneOurGunPosition[2] = 'not-hit';
        oneOurGunPosition[3] = 'not-hit';
        this.ourTroops.push(firstPosition);
        this.ourTroops.push(secondPosition);
        
        this.ourEmptyField.push(calculationPosition_00(secondPosition, -1, 1));
        this.ourEmptyField.push(calculationPosition_00(secondPosition, 0, 1));
        this.ourEmptyField.push(calculationPosition_00(secondPosition, 1, 1));
        this.ourEmptyField.push(calculationPosition_00(secondPosition, 1, 0));
        this.ourEmptyField.push(calculationPosition_00(secondPosition, 1, -1));
        this.ourEmptyField.push(calculationPosition_00(secondPosition, 1, -2));
        this.ourEmptyField.push(calculationPosition_00(secondPosition, 0, -2));
        this.ourEmptyField.push(calculationPosition_00(secondPosition, -1, -2));
        this.ourEmptyField.push(calculationPosition_00(secondPosition, -1, -1));
        this.ourEmptyField.push(calculationPosition_00(secondPosition, -1, 0));
        this.ourEmptyField.push(firstPosition);
        this.ourEmptyField.push(secondPosition);
        
        var gun_1 = document.getElementById(firstPosition);
        gun_1.setAttribute("class", "gun-1");
        var gun_2 = document.getElementById(secondPosition);
        gun_2.setAttribute("class", "gun-2");
    
    return oneOurGunPosition;
}, // создает случайное расположение нашего миномета
    generateOneOurInfantry: function  (){
    do {var firstPosition = this.ourField[Math.floor(this.ourField.length*Math.random())];
       } while ((this.ourField.indexOf(firstPosition) < 0) || (this.ourEmptyField.indexOf(firstPosition) >= 0));
            
        var oneInfanteryPosition =[];        
        oneInfanteryPosition[0] = firstPosition;
        oneInfanteryPosition[1] = 'not-hit';
        this.ourTroops.push(firstPosition);
                      
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, 0));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        this.ourEmptyField.push(firstPosition);
        
        var infantry_1 = document.getElementById(firstPosition);
        infantry_1.setAttribute("class", "infantry");
        
    
    return oneInfanteryPosition;
}, // создает случайное расположение нашей пехоты  
    generateOneOurARTA: function (){
    do {var firstPosition = this.ourField[Math.floor(this.ourField.length*Math.random())];
        
        var secondPosition = calculationPosition_00(firstPosition, 1, 0);
        var thirdPosition = calculationPosition_00(firstPosition, 0, -1);   
        var fourthPosition = calculationPosition_00(firstPosition, 1, -1);    
         
                
    } while ((this.ourField.indexOf(firstPosition) < 0) || (this.ourField.indexOf(secondPosition) < 0)||(this.ourField.indexOf(thirdPosition) < 0) || (this.ourField.indexOf(fourthPosition) < 0)
        || (this.ourEmptyField.indexOf(firstPosition) >= 0) || (this.ourEmptyField.indexOf(secondPosition) >= 0)||(this.ourEmptyField.indexOf(thirdPosition) >= 0) || (this.ourEmptyField.indexOf(fourthPosition) >= 0));
    
        
        var oneARTAPosition =[];        
        oneARTAPosition[0] = firstPosition;
        oneARTAPosition[1] = secondPosition;
        oneARTAPosition[2] = thirdPosition;
        oneARTAPosition[3] = fourthPosition;
        oneARTAPosition[4] = 'not-hit';
        oneARTAPosition[5] = 'not-hit';
        oneARTAPosition[6] = 'not-hit';
        oneARTAPosition[7] = 'not-hit';
        oneARTAPosition[8] = 'live';
        this.ourTroops.push(firstPosition);
        this.ourTroops.push(secondPosition);
        this.ourTroops.push(thirdPosition);
        this.ourTroops.push(fourthPosition);
        
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, 0));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, -1));        
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, -2));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, -2));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, -2));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, -2));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        
        this.ourEmptyField.push(firstPosition);
        this.ourEmptyField.push(secondPosition);
        this.ourEmptyField.push(thirdPosition);
        this.ourEmptyField.push(fourthPosition);
        
        var ARTA_1 = document.getElementById(firstPosition);
        ARTA_1.setAttribute("class", "our-ARTA-1");
        var ARTA_2 = document.getElementById(secondPosition);
        ARTA_2.setAttribute("class", "our-ARTA-2");
        var ARTA_3 = document.getElementById(thirdPosition);
        ARTA_3.setAttribute("class", "our-ARTA-3");
        var ARTA_4 = document.getElementById(fourthPosition);
        ARTA_4.setAttribute("class", "our-ARTA-4");
    
        return oneARTAPosition;
}, // создает случайное расположение нашей АРТЫ  
    generateOneOurGRAD: function (){
    do {var firstPosition = this.ourField[Math.floor(this.ourField.length*Math.random())];
        
        var secondPosition = calculationPosition_00(firstPosition, 1, 0);
        var thirdPosition = calculationPosition_00(firstPosition, 0, -1);   
        var fourthPosition = calculationPosition_00(firstPosition, 1, -1);    
         
                
    } while ((this.ourField.indexOf(firstPosition) < 0) || (this.ourField.indexOf(secondPosition) < 0)||(this.ourField.indexOf(thirdPosition) < 0) || (this.ourField.indexOf(fourthPosition) < 0)
        || (this.ourEmptyField.indexOf(firstPosition) >= 0) || (this.ourEmptyField.indexOf(secondPosition) >= 0)||(this.ourEmptyField.indexOf(thirdPosition) >= 0) || (this.ourEmptyField.indexOf(fourthPosition) >= 0));
    
        
        var oneGRADPosition =[];        
        oneGRADPosition[0] = firstPosition;
        oneGRADPosition[1] = secondPosition;
        oneGRADPosition[2] = thirdPosition;
        oneGRADPosition[3] = fourthPosition;
        oneGRADPosition[4] = 'not-hit';
        oneGRADPosition[5] = 'not-hit';
        oneGRADPosition[6] = 'not-hit';
        oneGRADPosition[7] = 'not-hit';
        oneGRADPosition[8] = 'live';
        this.ourTroops.push(firstPosition);
        this.ourTroops.push(secondPosition);
        this.ourTroops.push(thirdPosition);
        this.ourTroops.push(fourthPosition);
        
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, 1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, 0));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, -1));        
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 2, -2));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 1, -2));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, 0, -2));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, -2));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, -1));
        this.ourEmptyField.push(calculationPosition_00(firstPosition, -1, 0));
        
        this.ourEmptyField.push(firstPosition);
        this.ourEmptyField.push(secondPosition);
        this.ourEmptyField.push(thirdPosition);
        this.ourEmptyField.push(fourthPosition);
        
        var GRAD_1 = document.getElementById(firstPosition);
        GRAD_1.setAttribute("class", "our-GRAD-1");
        var GRAD_2 = document.getElementById(secondPosition);
        GRAD_2.setAttribute("class", "our-GRAD-2");
        var GRAD_3 = document.getElementById(thirdPosition);
        GRAD_3.setAttribute("class", "our-GRAD-3");
        var GRAD_4 = document.getElementById(fourthPosition);
        GRAD_4.setAttribute("class", "our-GRAD-4");
    
        return oneGRADPosition;
}, // создает случайное расположение нашего ГРАДА
    
} //наш объект
var map_00 = {
    ourStart1:['0101','0102','0103','0104','0105','0106','0107','0108','0109','0110','0111','0112','0113','0114','0115','0116','0117','0118'],
    ourStart2:['0101','0102','0103','0104','0105','0106','0107','0108','0109','0110','0111','0201','0301','0401','0501','0601','0701','0801','0901','1001'],
    ourStart3:['0218','0318','0418','0518','0618','0718','0818','0918','1018','0110','0111','0112','0113','0114','0115','0116','0117','0118'],
    ourMap: [],
    ourFields: [],
    
    createOurMap: function (){ // создает массив из всех полей
        this.ourMap.length = 0;
            for(var i = 1; i <= battleFieldWidth; i++){
                var coordinatesX = String(i);
             if (coordinatesX<10){
                    coordinatesX = "0" + String(coordinatesX);
             }
              for(var j = 1; j <= battleFieldHeight; j++){
                  var coordinatesY = j;
             if (coordinatesY<10){
                    coordinatesY = "0" + String(coordinatesY);

             }
                  var coordinatesXY = coordinatesX + coordinatesY;
                                    
                  var elem = document.getElementById(coordinatesXY);

                  if (elem.classList.contains("map_cell")){
                     this.ourMap.push(coordinatesXY);
                }
              }  
            }
            return this.ourMap;
        }, // создает массив из всех полей
    
    createOurField: function (){
        
        var ourStartPoint = [];
        var quantityOfOurFields = 0;
        this.ourFields.length = 0;
        var cointer = [Math.floor(3 * Math.random() + 1)];
        
        if(cointer == 1){ourStartPoint = this.ourStart1}
        if(cointer == 2){ourStartPoint = this.ourStart2}
        if(cointer == 3){ourStartPoint = this.ourStart3}
    
        for(var i=0; i < ourStartPoint.length; i++ ){                 
            this.ourFields[i] = ourStartPoint[i];
            document.getElementById(ourStartPoint[i]).setAttribute('class', 'our_00'); 
        }
    
        quantityOfOurFields = 1+ (battleFieldHeight * battleFieldWidth)/2;    
        quantityOfOurFields = quantityOfOurFields - this.ourFields.length;
    
        for (i=0; i <= quantityOfOurFields; i++){  
            
         
        var cointer1 = Math.floor(this.ourFields.length * Math.random());
        var firstPoint = this.ourFields[cointer1];
        var secondPoint;
        
            var cointer2 = [Math.floor(4*Math.random() + 1)];
            if(cointer2 == 1){secondPoint = calculationPosition_00(firstPoint, 0, 1)}
            if(cointer2 == 2){secondPoint = calculationPosition_00(firstPoint, 1, 0)}
            if(cointer2 == 3){secondPoint = calculationPosition_00(firstPoint, 0, -1)}
            if(cointer2 == 4){secondPoint = calculationPosition_00(firstPoint, -1, 0)}
            
            
            if ((this.ourFields.indexOf(secondPoint) < 0)&&(this.ourMap.indexOf(secondPoint) >= 0)){
                
                this.ourFields.push(secondPoint);
                document.getElementById(secondPoint).setAttribute('class', 'our_00');
                
                
            } else {
                if(i <= 1){i = 1} else {i = i - 1}              
            }
        }
            for(j = 0; j < this.ourMap.length; j++){ //создаем поля противника
               var elem = document.getElementById(this.ourMap[j]);
                
                if (elem.classList.contains("map_cell")){
                 elem.setAttribute('class', 'enemy_00');
                }
           } //создаем поля противника 
        quantityOfOurFields = 0;
    }, // присваеваем классы нашим полям и полям противника
    
    cleanMapAfterBattle: function(){
    this.ourMap.length = 0;
            for(var i = 1; i <= battleFieldWidth; i++){
                var coordinatesX = String(i);
             if (coordinatesX<10){
                    coordinatesX = "0" + String(coordinatesX);
             }
              for(var j = 1; j <= battleFieldHeight; j++){
                  var coordinatesY = j;
             if (coordinatesY<10){
                    coordinatesY = "0" + String(coordinatesY);

             }
                  var coordinatesXY = coordinatesX + coordinatesY;
                                    
                  var elem = document.getElementById(coordinatesXY);
                  
                  $("#" + coordinatesXY).removeClass();
                  $("#" + coordinatesXY).addClass("map_cell");
              }  
            }
            return this.ourMap;
    } // чистим карту после боя
    
} //карта тактического боя





//-----------------------------------------------------------------------------------------------------//
// ТЕЛО ПРОГРАММЫ---ТЕЛО ПРОГРАММЫ---ТЕЛО ПРОГРАММЫ---ТЕЛО ПРОГРАММЫ---ТЕЛО ПРОГРАММЫ---ТЕЛО ПРОГРАММЫ //
//-----------------------------------------------------------------------------------------------------//



//-----------------------------------------------------------------------------------------------------//
//  ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ  //
//-----------------------------------------------------------------------------------------------------//

//  -= ОБЩИЕ ФУНКЦИИ =- //

function init_00(){ // задаем обработчики событий
    
    fireFieldForEnemyPosition = document.getElementsByClassName("enemy_00");
    for (var i = 0; i < fireFieldForEnemyPosition.length; i++) {
        fireFieldForEnemyPosition[i].onclick = crazyFireFunction;
        fireFieldForEnemyPosition[i].onmouseover = firstShotOfArtaOrGrad;
        }
    
    } // задаем обработчики событий

function firstShotOfArtaOrGrad(event){
    if((shorts == 0 )&&((ourGRADChecked()||ourGRADCheckedInDefend())||(ourARTAChecked())||ourARTACheckedInDefend())){
        
         for(key in enemy_00.enemyField){
            elem = document.getElementById(enemy_00.enemyField[key]);
            if (elem.getAttribute("class") == "enemy_00"){
            elem.setAttribute("class", "grad_arta");
            }
        }
    }
    if((shorts == 0 )&&(ourGRADChecked()||ourGRADCheckedInDefend())){
        leftGradDraw();
    }
    if((shorts == 0 )&&((ourARTAChecked()||ourARTACheckedInDefend()))&&((!ourGRADChecked())&&(!ourGRADCheckedInDefend()))){
        leftArtaDraw();
    }
}

function calculationPosition_00(position, delta_X, delta_Y){ //получаем новые координаты в понятном виде
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

// -= ФУНКЦИИ НАШИХ ВОЙСК =-//

function crazyFireFunction(event){ //функция стрельбы по противнику
    if (autoBattleCheck == 'no'){
    $('#auto_icon').hide();
    if (enemyQuantityTank == enemyQuantityTankKIll && enemyQuantityBTR == enemyQuantityBTRKIll && enemyQuantityInfantryKIll == enemyQuantityInfantry && enemyQuantityGun == enemyQuantityGunKIll && enemyQuantityARTA == enemyQuantityARTAKIll && enemyQuantityGRAD == enemyQuantityGRADKIll){
        resultOfBattle = 'victory';
        captureEnemyField(globalTarget);
        addOurNewField(globalTarget)
        alert('ВЫ ПОБЕДИЛИ!!!');
        
    }
    if (ourQuantityTank == ourQuantityTankKIll && ourQuantityBTR == ourQuantityBTRKIll && ourQuantityInfantry ==  ourQuantityInfantryKIll && ourQuantityGun == ourQuantityGunKIll && ourQuantityARTA == ourQuantityARTAKIll && ourQuantityGRAD == ourQuantityGRADKIll){
        resultOfBattle = 'defeat';
        captureOurField(globalTarget);
        addEnemyNewField(globalTarget)
        alert('ВЫ ПРОИГРАЛИ!!!');
    }
    
    if((resultOfBattle == 'equality')&&(nobodyRetreat())){
    
    
    if((OurShorts == 0)&&(EnemyShorts == 0)){ 
        calculationOurShorts();
        calculationEnemyShorts();
        ourFirstGradFire = 1;
        ourFirstArtaFire = 1;
        numberOfOurShort = 0;
        numberOfEnemyShort = 0;
    } 
    
    shorts = shorts + 1;
        
        
    function newTarget(event){
        if(enemy_00.enemyField.indexOf(event.target.id)>=0){
           return event.target.id; 
        }else{
           return 'no' 
        }
    }   
    if(newTarget(event) != 'no') {
        var target = event.target.id;
    }
    
    if(target){
        
    
    if(OurShorts > 0){ 

        numberOfOurShort = +numberOfOurShort + 1;
        
    if((ourGRADChecked()||ourGRADCheckedInDefend())&&(numberOfOurShort == 1)){  
        targetGrad = ourGradFire(target);
        for(var i=0; i < targetGrad.length; i++){
          
        targetG = targetGrad[i];

        ourFireForEnemy(targetG);
            
           
    }
        ourFirstGradFire = 2;
    } 
 
    if(((ourARTAChecked()||ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend())&&(numberOfOurShort == 1))||((ourARTAChecked()||ourARTACheckedInDefend())&&(ourGRADChecked()||ourGRADCheckedInDefend())&&(numberOfOurShort == 2))){
        targetArta = (ourArtaFire(target));
        
        for(var i=0; i < targetArta.length; i++){
        targetA = targetArta[i];
        ourFireForEnemy(targetA);        
    }     
    }

    if(((ourARTAChecked()||ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend())&&(numberOfOurShort > 1))||((ourARTAChecked()||ourARTACheckedInDefend())&&(ourGRADChecked()||ourGRADCheckedInDefend())&&(numberOfOurShort > 2))||((!ourARTAChecked()&&!ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend())&&(numberOfOurShort > 0))||((!ourARTAChecked()&&!ourARTACheckedInDefend())&&(ourGRADChecked()||ourGRADCheckedInDefend())&&(numberOfOurShort > 1)))
    
    {
        ourFireForEnemy(target);
    }
   
    OurShorts = OurShorts -1;
    if(OurShorts < 0){
        OurShorts = 0;
    }
    }
    
    if((EnemyShorts > 0)&&(OurShorts > 0)){ 
  
    setTimeout(function (){enimyFinedTargetFunction()}, 50);
    EnemyShorts = EnemyShorts -1;
 

 
    if(EnemyShorts < 0){
        EnemyShorts = 0;
    }
    }
        
    if ((OurShorts == 0)&&(EnemyShorts > 0)){  
        var counter = EnemyShorts;
        var timerShorts = 0;
    while((counter > 0)&&(resultOfBattle == 'equality')){
        setTimeout(function (){enimyFinedTargetFunction()}, timerShorts);
        timerShorts = timerShorts + 100;
        counter = counter - 1 ;
        EnemyShorts = EnemyShorts -1;
    }
            if(EnemyShorts < 0){
                EnemyShorts = 0;
        }
        
    }// выполняем выстрел противника
    
    
   
    
    if((EnemyShorts == 0)&&(OurShorts == 0)&&(ourGRADChecked()||ourGRADCheckedInDefend())){
        
        for(key in enemy_00.enemyField){
            elem = document.getElementById(enemy_00.enemyField[key]);
            if (elem.getAttribute("class") == "enemy_00"){
            elem.setAttribute("class", "grad_arta");
            }
        }
        leftGradDraw();
       } else {
    
    if(((EnemyShorts == 0)&&(OurShorts == 0)&&(ourARTAChecked()||ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend()))||((ourGRADChecked()||ourGRADCheckedInDefend())&&(ourARTAChecked()||ourARTACheckedInDefend())&&(numberOfOurShort == 1))){
       
        for(key in enemy_00.enemyField){
            elem = document.getElementById(enemy_00.enemyField[key]);
            if (elem.getAttribute("class") == "enemy_00"){
            elem.setAttribute("class", "grad_arta");
            
            }
        }
        $("#left_ARTA_GRAD").removeClass();
        leftArtaDraw();        
       
    }else{
       
        for(key in enemy_00.enemyField){
            elem = document.getElementById(enemy_00.enemyField[key]);
            if (elem.getAttribute("class") == "grad_arta"){
            elem.setAttribute("class", "enemy_00");
            }
            } 
        $("#left_ARTA_GRAD").removeClass();
       } 
    }
    }
}
    
    }
} //функция стрельбы по противнику (нажатие мышью на поле противника)

function ourFireForEnemy(target){ //проверка на попадание нашего выстрела
   
    if(target){ 

    fieldsWhereWeFire.push(target);
    
    if (enemy_00.enemyTroops.indexOf(target)<0){
        var mimo = document.getElementById(target);
        mimo.setAttribute("class", "enemy-mimo");
        
    } else {      
        inspectionOurFireForEnemyBTR(target);
        inspectionOurFireForEnemyTanks(target);
        inspectionOurFireForEnemyGun(target); 
        inspectionOurFireForEnemyInfantery(target);
        inspectionOurFireForEnemyARTA(target);
        inspectionOurFireForEnemyGRAD(target);
    }
    }

} //проверка на попадание нашего выстрела

function inspectionOurFireForEnemyInfantery(target){ //проверка попадания в пехоту противника
    
    for (var key in enemy_00.enemyInfantry ){ //блок пехоты
               
        if (enemy_00.enemyInfantry[key][0] == target){ 

            var enemyKill = document.getElementById(target);
            enemyKill.setAttribute("class", "infantry-kill");
            enemy_00.enemyInfantry[key][1] = 'kill';
            
            if(enemy_00.enemyInfantry[key][2] == 'live'){
               enemyQuantityInfantryKIll = enemyQuantityInfantryKIll +1; 
               enemy_00.enemyInfantry[key][2] = 'no-live';
                
                    fieldsWhereWeFire.push(calculationPosition_00(target, -1, 1));
                    fieldsWhereWeFire.push(calculationPosition_00(target, 0, 1));
                    fieldsWhereWeFire.push(calculationPosition_00(target, 1, 1));
                    fieldsWhereWeFire.push(calculationPosition_00(target, 1, 0));
                    fieldsWhereWeFire.push(calculationPosition_00(target, 1, -1));
                    fieldsWhereWeFire.push(calculationPosition_00(target, 0, -1));
                    fieldsWhereWeFire.push(calculationPosition_00(target, -1, -1));
                    fieldsWhereWeFire.push(calculationPosition_00(target, -1, 0));
            }
            
            if (allEnemyKillFunction()){
                break;
                }
            } 
        }
    } //проверка попадания в пехоту противника

function inspectionOurFireForEnemyGun(target){
 
    for (var key2 in enemy_00.enemyGuns){ 

         if (enemy_00.enemyGuns[key2][0] == target){

            var enemyKill1 = document.getElementById(target);
            enemyKill1.setAttribute("class", "wounded");
            enemy_00.enemyGuns[key2][2] = 'kill';
           
            if (enemy_00.enemyGuns[key2][2] == 'kill' && enemy_00.enemyGuns[key2][3] == 'kill'){
                document.getElementById(enemy_00.enemyGuns[key2][0]).setAttribute("class", "gun-1-kill"); 
                document.getElementById(enemy_00.enemyGuns[key2][1]).setAttribute("class", "gun-2-kill");
                
                
                 if (enemy_00.enemyGuns[key2][4] == 'live'){
                    enemyQuantityGunKIll = enemyQuantityGunKIll + 1;
                    enemy_00.enemyGuns[key2][4] = 'no-live';
                     
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], -1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 0, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 1, 0));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 1, -2));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 0, -2));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], -1, -2));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], -1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], -1, 0));
                    }
                       
                }
            if (allEnemyKillFunction()){ 
            break;
            }
            } else {
        if (enemy_00.enemyGuns[key2][1] == target){
            var enemyKill2 = document.getElementById(target);
            enemyKill2.setAttribute("class", "wounded");
            enemy_00.enemyGuns[key2][3] = 'kill';
            
            if (enemy_00.enemyGuns[key2][2] == 'kill' && enemy_00.enemyGuns[key2][3] == 'kill'){                
                document.getElementById(enemy_00.enemyGuns[key2][0]).setAttribute("class", "gun-1-kill"); 
                document.getElementById(enemy_00.enemyGuns[key2][1]).setAttribute("class", "gun-2-kill");
                
                
                if (enemy_00.enemyGuns[key2][4] == 'live'){
                    enemyQuantityGunKIll = enemyQuantityGunKIll + 1;
                    enemy_00.enemyGuns[key2][4] = 'no-live';
                    
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], -1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 0, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 1, 0));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 1, -2));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], 0, -2));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], -1, -2));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], -1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGuns[key2][1], -1, 0));
                    }
                }
            if (allEnemyKillFunction()){
            break; 
            }
            } 
        }
        }  
} //проверка попадания в артилерию противника

function inspectionOurFireForEnemyTanks(target){ //проверка попадания в танки противника
    for (var key1 in enemy_00.enemyTanks){ 
         if (enemy_00.enemyTanks[key1][0] == target){             
            var enemyKill1 = document.getElementById(target);
            enemyKill1.setAttribute("class", "wounded");
            enemy_00.enemyTanks[key1][2] = 'kill';
             if(ourAttackObject.PTUR>0){
                 ourPTUR(enemy_00.enemyTanks[key1]);
             }
            
            if (enemy_00.enemyTanks[key1][2] == 'kill' && enemy_00.enemyTanks[key1][3] == 'kill') {
                enemyKill1.setAttribute("class", "tank72-1-kill");
                
                document.getElementById(enemy_00.enemyTanks[key1][1]).setAttribute("class", "tank72-2-kill");
                if (enemy_00.enemyTanks[key1][4] == 'live'){
                    enemyQuantityTankKIll = enemyQuantityTankKIll +1;
                    enemy_00.enemyTanks[key1][4] = 'no-live';
                    
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], -1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 0, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 2, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 2, 0));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 2, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 0, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], -1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], -1, 0)); 
                }
                }
            if (allEnemyKillFunction()){ 
            break;
            }
            } else {
        if (enemy_00.enemyTanks[key1][1] == target){
            var enemyKill1 = document.getElementById(target);
            enemyKill1.setAttribute("class", "wounded");
            enemy_00.enemyTanks[key1][3] = 'kill';
            if(ourAttackObject.PTUR>0){
                 ourPTUR(enemy_00.enemyTanks[key1]);
             }
            
            if (enemy_00.enemyTanks[key1][2] == 'kill' && enemy_00.enemyTanks[key1][3] == 'kill'){
                enemyKill1.setAttribute("class", "tank72-2-kill");
                        
                 if (enemy_00.enemyTanks[key1][4] == 'live'){
                    enemyQuantityTankKIll = enemyQuantityTankKIll +1;;
                    enemy_00.enemyTanks[key1][4] = 'no-live';
                     
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], -1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 0, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 2, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 2, 0));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 2, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], 0, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], -1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyTanks[key1][0], -1, 0)); 
                }
                
                document.getElementById(enemy_00.enemyTanks[key1][0]).setAttribute("class", "tank72-1-kill");
                }
            if (allEnemyKillFunction()){
            break;            
            }
            } 
        }
        } 
}//проверка попадания в танки противника

function inspectionOurFireForEnemyARTA(target){ //проверка попадания в АРТУ противника
    
    for (var key1 in enemy_00.enemyARTA){ 
         var enemyKill1 = document.getElementById(target);
         if ((enemy_00.enemyARTA[key1][0] == target)&&(enemy_00.enemyARTA[key1][8] != 'no-live')){             
            enemyKill1.setAttribute("class", "wounded");
            enemy_00.enemyARTA[key1][4] = 'kill';
         }if ((enemy_00.enemyARTA[key1][1] == target)&&(enemy_00.enemyARTA[key1][8] != 'no-live')){
            enemyKill1.setAttribute("class", "wounded");
            enemy_00.enemyARTA[key1][5] = 'kill';
         }if ((enemy_00.enemyARTA[key1][2] == target)&&(enemy_00.enemyARTA[key1][8] != 'no-live')){
            enemyKill1.setAttribute("class", "wounded");
            enemy_00.enemyARTA[key1][6] = 'kill';
         }if ((enemy_00.enemyARTA[key1][3] == target)&&(enemy_00.enemyARTA[key1][8] != 'no-live')){
            enemyKill1.setAttribute("class", "wounded");
            enemy_00.enemyARTA[key1][7] = 'kill';
         }
        if(((enemy_00.enemyARTA[key1][0] == target)||(enemy_00.enemyARTA[key1][1] == target)||(enemy_00.enemyARTA[key1][2] == target)||(enemy_00.enemyARTA[key1][3] == target))&&((enemy_00.enemyARTA[key1][4] == 'kill')&&(enemy_00.enemyARTA[key1][5] == 'kill')&&(enemy_00.enemyARTA[key1][6] == 'kill')&&(enemy_00.enemyARTA[key1][7] == 'kill')&&(enemy_00.enemyARTA[key1][8] != 'no-live'))){
            
            enemy_00.enemyARTA[key1][8] = 'no-live';
            document.getElementById(enemy_00.enemyARTA[key1][0]).setAttribute("class", "enemy-ARTA-1-kill");
            document.getElementById(enemy_00.enemyARTA[key1][1]).setAttribute("class", "enemy-ARTA-2-kill");
            document.getElementById(enemy_00.enemyARTA[key1][2]).setAttribute("class", "enemy-ARTA-3-kill");
            document.getElementById(enemy_00.enemyARTA[key1][3]).setAttribute("class", "enemy-ARTA-4-kill");
            
            enemyQuantityARTAKIll = enemyQuantityARTAKIll +1;
            
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], -1, 1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], 0, 1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], 1, 1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], 2, 1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], 2, 0));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], 2, -1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], 2, -2));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], 1, -2));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], 0, -2));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], -1, -2));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], -1, -1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyARTA[key1][0], -1, 0));
            
        } 
        if (allEnemyKillFunction()){ 
            break;
            }
        } 
}//проверка попадания в АРТУ противника

function inspectionOurFireForEnemyGRAD(target){ //проверка попадания в ГРАД противника
    for (var key1 in enemy_00.enemyGRAD){ 
         var enemyKill3 = document.getElementById(target);
         if ((enemy_00.enemyGRAD[key1][0] == target)&&(enemy_00.enemyGRAD[key1][8] != 'no-live')){             
            enemyKill3.setAttribute("class", "wounded");
            enemy_00.enemyGRAD[key1][4] = 'kill';
         }if ((enemy_00.enemyGRAD[key1][1] == target)&&(enemy_00.enemyGRAD[key1][8] != 'no-live')){
            enemyKill3.setAttribute("class", "wounded");
            enemy_00.enemyGRAD[key1][5] = 'kill';
         }if ((enemy_00.enemyGRAD[key1][2] == target)&&(enemy_00.enemyGRAD[key1][8] != 'no-live')){
            enemyKill3.setAttribute("class", "wounded");
            enemy_00.enemyGRAD[key1][6] = 'kill';
         }if ((enemy_00.enemyGRAD[key1][3] == target)&&(enemy_00.enemyGRAD[key1][8] != 'no-live')){
            enemyKill3.setAttribute("class", "wounded");
            enemy_00.enemyGRAD[key1][7] = 'kill';
         }
        if(((enemy_00.enemyGRAD[key1][0] == target)||(enemy_00.enemyGRAD[key1][1] == target)||(enemy_00.enemyGRAD[key1][2] == target)||(enemy_00.enemyGRAD[key1][3] == target))&&((enemy_00.enemyGRAD[key1][4] == 'kill')&&(enemy_00.enemyGRAD[key1][5] == 'kill')&&(enemy_00.enemyGRAD[key1][6] == 'kill')&&(enemy_00.enemyGRAD[key1][7] == 'kill')&&(enemy_00.enemyGRAD[key1][8] != 'no-live'))){
            enemy_00.enemyGRAD[key1][8] = 'no-live';
            document.getElementById(enemy_00.enemyGRAD[key1][0]).setAttribute("class", "enemy-GRAD-1-kill");
            document.getElementById(enemy_00.enemyGRAD[key1][1]).setAttribute("class", "enemy-GRAD-2-kill");
            document.getElementById(enemy_00.enemyGRAD[key1][2]).setAttribute("class", "enemy-GRAD-3-kill");
            document.getElementById(enemy_00.enemyGRAD[key1][3]).setAttribute("class", "enemy-GRAD-4-kill");
            
            enemyQuantityGRADKIll = enemyQuantityGRADKIll +1;
            
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], -1, 1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], 0, 1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], 1, 1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], 2, 1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], 2, 0));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], 2, -1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], 2, -2));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], 1, -2));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], 0, -2));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], -1, -2));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], -1, -1));
            fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyGRAD[key1][0], -1, 0));
            
        } 
        if (allEnemyKillFunction()){ 
            break;
            }
        } 
}//проверка попадания в ГРАД противника

function inspectionOurFireForEnemyBTR(target){ //проверка попадания в БТР противника
    for (var key1 in enemy_00.enemyBTR){

        if (enemy_00.enemyBTR[key1][0] == target){
            var enemyKill1 = document.getElementById(target);
            enemyKill1.setAttribute("class", "wounded");
            enemy_00.enemyBTR[key1][2] = 'kill';           
            if(quantityOurPTUR>0){
                 ourPTUR(enemy_00.enemyBTR[key1]);
             }
            
            if (enemy_00.enemyBTR[key1][2] == 'kill' && enemy_00.enemyBTR[key1][3] == 'kill') {
                document.getElementById(enemy_00.enemyBTR[key1][0]).setAttribute("class", "enemy-btr-90-1-kill");
                document.getElementById(enemy_00.enemyBTR[key1][1]).setAttribute("class", "enemy-btr-90-2-kill");
               
                if (enemy_00.enemyBTR[key1][4] == 'live'){
                    enemyQuantityBTRKIll = enemyQuantityBTRKIll +1;
                    enemy_00.enemyBTR[key1][4] = 'no-live';
                    
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], -1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 0, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 2, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 2, 0));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 2, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 0, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], -1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], -1, 0)); 
                }
                }
            if (allEnemyKillFunction()){ 
            break;
            }
            } else {
        if (enemy_00.enemyBTR[key1][1] == target){
            var enemyKill1 = document.getElementById(target);
            enemyKill1.setAttribute("class", "wounded");
            enemy_00.enemyBTR[key1][3] = 'kill';           
            if(quantityOurPTUR>0){
                 ourPTUR(enemy_00.enemyBTR[key1]);
             }
            
            if (enemy_00.enemyBTR[key1][2] == 'kill' && enemy_00.enemyBTR[key1][3] == 'kill'){
                document.getElementById(enemy_00.enemyBTR[key1][0]).setAttribute("class", "enemy-btr-90-1-kill");
                document.getElementById(enemy_00.enemyBTR[key1][1]).setAttribute("class", "enemy-btr-90-2-kill");
                        
                 if (enemy_00.enemyBTR[key1][4] == 'live'){
                    enemyQuantityBTRKIll = enemyQuantityBTRKIll +1;
                    enemy_00.enemyBTR[key1][4] = 'no-live';
                     
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], -1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 0, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 1, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 2, 1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 2, 0));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 2, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], 0, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], -1, -1));
                        fieldsWhereWeFire.push(calculationPosition_00(enemy_00.enemyBTR[key1][0], -1, 0)); 
                }
                
            if (allEnemyKillFunction()){
            break;
            }
            }} 
        }
        } 
} //проверка попадания в БТР противника

function allEnemyKillFunction(){ //проверка на наличие живого противника
    if (enemyQuantityTank == enemyQuantityTankKIll && enemyQuantityBTR == enemyQuantityBTRKIll && enemyQuantityInfantryKIll == enemyQuantityInfantry && enemyQuantityGun == enemyQuantityGunKIll && enemyQuantityARTA == enemyQuantityARTAKIll && enemyQuantityGRAD == enemyQuantityGRADKIll){
        
                
        
        if (counterOfWins == 0){  // убираем лишние сообщения
            counterOfWins = counterOfWins + 1;
            
            resultOfBattle = 'victory';
            addOurNewField(globalTarget);
            alert('Вы победили за ' + shorts + ' ходов.');
          
        data.map[findNumberOfDataMapField(battleFieldTarget)].side = 'our';
        
        // удалить объект противника
        deleteEnemyTroops();
           
        // пересчитать и переместить наш объект
         ourAttackObject.position =  battleFieldTarget;
         if(whoAttack == 'our'){
             ourAttackObject.walked = 'yes';
             ourAttackObject.trench = 'no';
         }
            
        
         ourTankHelpIndicator = 'no';   
        
        ourWholeGRAD = 0;
        ourWholeARTA = 0;
        enemyWholeGRAD = 0;
        enemyWholeARTA = 0;
        
        informAboutOurUnits();
        
        endOfBattleFunction();
        $("#our_back_step_off").css("display", "inline-block");
        $("#our_back_step").hide();
        $("#our_mine_off").css("display", "inline-block");
        $("#our_mine").hide();
        $("#our_trench_off").css("display", "inline-block");
        $("#our_trench").hide();
            return true;
        }
     } 
   } //проверка на наличие живого противника

function ourGradFire(fireField){//функция расчеты залпа нашего града (возвращает до??? 4 координат)
    var arr =[];
    ourWholeAGRAD = ourWholeGRADFunction();
    if(ourWholeGRAD>9){
       ourWholeGRAD = 9; 
    }
        while (arr.length < ourWholeGRAD) 
        {
             var random = Math.floor(9*Math.random());
            if (arr.indexOf(random) < 0){
              arr.push(random);
            } 
        }
    var newfireFields =[];
    
    for(i=0; i < ourWholeGRAD; i++){
        var newfireField;
         if (arr[i] == 0){
            newfireField = calculationPosition_00(fireField, -1, -1);
        }if (arr[i] == 1){
           newfireField = calculationPosition_00(fireField, -1, 0); 
        }if (arr[i] == 2){
           newfireField = calculationPosition_00(fireField, -1, 1); 
        }if (arr[i] == 3){
           newfireField = calculationPosition_00(fireField, 0, -1); 
        }if (arr[i] == 4){
            newfireField = calculationPosition_00(fireField, 0, 0);
        }if (arr[i] == 5){
           newfireField = calculationPosition_00(fireField, 0, 1); 
        }if (arr[i] == 6){
           newfireField = calculationPosition_00(fireField, 1, -1); 
        }if (arr[i] == 7){
           newfireField = calculationPosition_00(fireField, 1, 0); 
        }if (arr[i] == 8){
           newfireField = calculationPosition_00(fireField, 1, 1); 
        }
        if(enemy_00.enemyField.indexOf(newfireField) >= 0){
            newfireFields.push(newfireField);
        }
        } 
    return newfireFields;
} //функция расчеты залпа нашего града (возвращает до??? 4 координат)

function ourPTUR(enemyTank){ //функция запуска ПТУР по танкам и БТР противника
    if (quantityOurPTUR > 0){
    if (((ourARTAChecked()||ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend())&&(numberOfOurShort > 1))||((ourARTAChecked()||ourARTACheckedInDefend())&&(ourGRADChecked()||ourGRADCheckedInDefend())&&(numberOfOurShort > 2))||((!ourARTAChecked()&&!ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend())&&(numberOfOurShort > 0))||((!ourARTAChecked()&&!ourARTACheckedInDefend())&&(ourGRADChecked()||ourGRADCheckedInDefend())&&(numberOfOurShort > 1))) {    
    if ((enemyTank[2] == 'kill')&&(enemyTank[3] != 'kill')){
        enemyTank[3] = 'kill';
        var enemyKill2 = document.getElementById(enemyTank[1]);
        enemyKill2.setAttribute("class", "tank72-2-kill"); 
        var enemyKill1 = document.getElementById(enemyTank[0]);
        enemyKill1.setAttribute("class", "tank72-1-kill");
        fieldsWhereWeFire.push(enemyTank[1]);
        quantityOurPTUR = quantityOurPTUR-1;
        leftPturDraw();
    } else  if((enemyTank[3] == 'kill')&&(enemyTank[2] != 'kill')){
        enemyTank[2] = 'kill';
        var enemyKill1 = document.getElementById(enemyTank[0]);
        enemyKill1.setAttribute("class", "tank72-1-kill"); 
        var enemyKill2 = document.getElementById(enemyTank[1]);
        enemyKill2.setAttribute("class", "tank72-2-kill");
        fieldsWhereWeFire.push(enemyTank[0]);
        quantityOurPTUR = quantityOurPTUR-1;
        leftPturDraw();
    }
    }
    }
} //функция запуска ПТУР по танкам и БТР противника

function ourArtaFire(fireField){
            var newfireFields =[];
            var tempfireFields =[];
            var endfireFields =[];

            newfireFields.push(fireField);
            newfireFields.push(calculationPosition_00(fireField, -2, 2));
            newfireFields.push(calculationPosition_00(fireField, -1, 2)); 
            newfireFields.push(calculationPosition_00(fireField, 0, 2)); 
            newfireFields.push(calculationPosition_00(fireField, 1, 2)); 
            newfireFields.push(calculationPosition_00(fireField, 2, 2));
            newfireFields.push(calculationPosition_00(fireField, -2, 1)); 
            newfireFields.push(calculationPosition_00(fireField, -1, 1)); 
            newfireFields.push(calculationPosition_00(fireField, 0, 1)); 
            newfireFields.push(calculationPosition_00(fireField, 1, 1)); 
            newfireFields.push(calculationPosition_00(fireField, 2, 1));
            newfireFields.push(calculationPosition_00(fireField, -2, 0)); 
            newfireFields.push(calculationPosition_00(fireField, -1, 0)); 
            newfireFields.push(calculationPosition_00(fireField, 1, 0)); 
            newfireFields.push(calculationPosition_00(fireField, 2, 0));
            newfireFields.push(calculationPosition_00(fireField, -2, -1)); 
            newfireFields.push(calculationPosition_00(fireField, -1, -1)); 
            newfireFields.push(calculationPosition_00(fireField, 0, -1)); 
            newfireFields.push(calculationPosition_00(fireField, 1, -1)); 
            newfireFields.push(calculationPosition_00(fireField, 2, -1)); 
            newfireFields.push(calculationPosition_00(fireField, -2, -2)); 
            newfireFields.push(calculationPosition_00(fireField, -1, -2)); 
            newfireFields.push(calculationPosition_00(fireField, 0, -2));
            newfireFields.push(calculationPosition_00(fireField, 1, -2)); 
            newfireFields.push(calculationPosition_00(fireField, 2, -2)); 

            for(i=0; i<newfireFields.length; i++){
                 if((enemy_00.enemyField.indexOf(newfireFields[i]) >= 0)&&(fieldsWhereWeFire.indexOf(newfireFields[i])<0)){ 
               tempfireFields.push(newfireFields[i]);  
            }
            }
            
            function compareRandom(a, b) {
              return Math.random() - 0.5;
            }

            tempfireFields.sort(compareRandom);
            
            ourWholeARTA = ourWholeARTAFunction();
            for(j=0; j<ourWholeARTA; j++){
                if(tempfireFields[j]!= undefined){
                endfireFields.push(tempfireFields[j]);
            }
            }
            return endfireFields;
} //функция расчеты залпа нашей 152 артилерии

function ourMineField(){  //функция нашего минного поля   
    var mineField = [];
    for(i=0; i<10; i++){ 
        mineField.push(enemy_00.enemyField[Math.floor(enemy_00.enemyField.length*Math.random())]);
    }
    mineField.forEach(function (field){
        ourFireForEnemy(field);
    })
    
} //функция нашего минного поля 

function calculationOurShorts(){
    OurShorts = (ourQuantityTank - ourQuantityTankKIll) + (ourQuantityBTR - ourQuantityBTRKIll) + (ourQuantityGun - ourQuantityGunKIll) + (ourQuantityInfantry - ourQuantityInfantryKIll) + (ourQuantityARTA - ourQuantityARTAKIll) + (ourQuantityGRAD - ourQuantityGRADKIll);

    if(ourGRADChecked()||ourGRADCheckedInDefend()){
        OurShorts = OurShorts + 1;        
    }
    if(ourARTAChecked()||ourARTACheckedInDefend()){
        OurShorts = OurShorts + 1;        
    }
    if((ourQuantityTank - ourQuantityTankKIll) > 0){
        OurShorts = OurShorts + (ourQuantityTank - ourQuantityTankKIll);        
    }
    if(enemyTrenchCheckedInDefend(battleFieldTarget)){
        OurShorts = OurShorts - Math.floor((ourQuantityInfantry - ourQuantityInfantryKIll)/2);        
    }
    if((ourQuantityTank == 0)&&(ourQuantityBTR == 0)&&(ourQuantityGun == 0)&&(ourQuantityInfantry == 0)&&(ourQuantityARTA == 0)&&(ourQuantityGRAD == 0)){
        OurShorts = 0;
    }
}

// -= ФУНКЦИИ ВОЙСК ПРОТИВНИКА =-//

function enimyFinedTargetFunction(){  //enimyFinedTargetFunction(target)
       
     numberOfEnemyShort += 1;   
    function randomTarget(){
        var numberOfField = Math.floor(our_00.ourField.length*Math.random());
        var randomTarget = our_00.ourField[numberOfField];
        return randomTarget;
      }
    
    do{
        target = randomTarget();
        } while(fieldsWhereEnemyFire.indexOf(target) != -1);
    
    if((enemyGRADChecked()) && (EnemyShorts == 0)){ 
        rightGradDraw();
    }
       
     if((enemyGRADChecked()) && (numberOfEnemyShort == 1)){
                 
        targetGrad = (enemyGradFire(target));
        
        for(var i=0; i < targetGrad.length; i++){
            fireField = targetGrad[i];
            if(nobodyRetreat()){
            enemyFire(fireField);
            }
    }
    }
    
    if((enemyARTAChecked()&&(!enemyGRADChecked())&&(EnemyShorts == 0))||((enemyARTAChecked())&&(enemyGRADChecked())&&(EnemyShorts == 1))||(enemyARTAChecked()&&(enemyGRADChecked())&&(numberOfEnemyShort == 1))){
        rightArtaDraw();
    }
    if((enemyARTAChecked()&&(!enemyGRADChecked())&&(numberOfEnemyShort == 1))||((enemyARTAChecked())&&(enemyGRADChecked())&&(numberOfEnemyShort == 2))||(!enemyARTAChecked()&&(enemyGRADChecked())&&(numberOfEnemyShort == 1))){
        $("#right_ARTA_GRAD").removeClass();
    }
    
    if((enemyARTAChecked()&&(!enemyGRADChecked())&&(numberOfOurShort == 1))||((enemyARTAChecked())&&(enemyGRADChecked())&&(numberOfOurShort == 2))){
        
        targetArta = (enemyArtaFire(target));
        for(i=0; i < targetArta.length; i++){
        targetA = targetArta[i];
            
        if(nobodyRetreat()){
        enemyFire(targetA);
        }
    } 
    }
    
    
    if((enemyARTAChecked()&&(!enemyGRADChecked())&&(numberOfEnemyShort > 1))||(enemyARTAChecked()&&(enemyGRADChecked())&&(numberOfEnemyShort > 2))||((!enemyARTAChecked())&&(!enemyGRADChecked())&&(numberOfEnemyShort > 0))||((!enemyARTAChecked())&&(enemyGRADChecked())&&(numberOfEnemyShort > 1))){    
        if(nobodyRetreat()){
        enemyFire(target); 
        }
    }
}

function enemyFire(target){         
    if (resultOfBattle == 'equality'){
      var fireField = target;  
   
        
    //проверка на необходимость добить наш юнит
   
    
    if (needToKill == 'need'){
        fireField = finishOurTroopsFields.pop();
    }
        
      if (our_00.ourTroops.indexOf(fireField) < 0){
          var mimoField = document.getElementById(fireField);
          mimoField.setAttribute("class", "fire");
          fieldsWhereEnemyFire.push(fireField);
      }else{
          
          inspectionEnemyFireForOurInfantery(fireField);
          inspectionEnemyFireForOurTanks(fireField);
          inspectionEnemyFireForOurBTR(fireField);
          inspectionEnemyFireForOurGun(fireField);
          inspectionEnemyFireForOurARTA(fireField);
          inspectionEnemyFireForOurGRAD(fireField);
         
      }
      
        // убираем внешний вид курсора ГРАД и АРТА //
        
        for(key in enemy_00.enemyField){
            elem = document.getElementById(enemy_00.enemyField[key]);
            if (elem.getAttribute("class") == "grad_arta"){
            elem.setAttribute("class", "enemy_00");
            }            
            } 
                
        allOurKillFunction();
    }
} //функция стрельбы противника по нам

function inspectionEnemyFireForOurInfantery(fireField){ //проверка попадания в нашу пехоту
    for(keys in our_00.ourInfantry){  
              if (our_00.ourInfantry[keys][0] == fireField &&  our_00.ourInfantry[keys][2]!="killed" ){
                  var ourInfantryDie = document.getElementById(fireField);
                  ourInfantryDie.setAttribute("class", "our-infantry-kill");
                  fieldsWhereEnemyFire.push(fireField);
                    fieldsWhereEnemyFire.push(calculationPosition_00(fireField, -1, 1));
                    fieldsWhereEnemyFire.push(calculationPosition_00(fireField, 0, 1));
                    fieldsWhereEnemyFire.push(calculationPosition_00(fireField, 1, 1));
                    fieldsWhereEnemyFire.push(calculationPosition_00(fireField, 1, 0));
                    fieldsWhereEnemyFire.push(calculationPosition_00(fireField, 1, -1));
                    fieldsWhereEnemyFire.push(calculationPosition_00(fireField, 0, -1));
                    fieldsWhereEnemyFire.push(calculationPosition_00(fireField, -1, -1));
                    fieldsWhereEnemyFire.push(calculationPosition_00(fireField, -1, 0));
                
                  ourQuantityInfantryKIll = ourQuantityInfantryKIll + 1;
                  our_00.ourInfantry[keys][2] = "killed";
                  
                  if (ourQuantityInfantryKIll > ourQuantityInfantry){ //решаем проблему минусового количества
                          ourQuantityInfantryKIll = ourQuantityInfantry
                      }//решаем проблему минусового количества
                  
                 }
          }     
} //проверка попадания в нашу пехоту

function inspectionEnemyFireForOurTanks(fireField){ //проверка попадания в наши танки
    for(keys in our_00.ourTanks){ 
        if (our_00.ourTanks[keys][0] == fireField ){
                  var ourTankDie = document.getElementById(fireField);
                  ourTankDie.setAttribute("class", "our-tank72-1-kill");
                  our_00.ourTanks[keys][2] = 'kill';
                  fieldsWhereEnemyFire.push(fireField);
                  if(quantityEnemyPTUR>0){
                        enemyTankPTUR(our_00.ourTanks[keys]);
                        }
                  
                  if(our_00.ourTanks[keys][2] == 'kill' && our_00.ourTanks[keys][3] == 'kill' &&  our_00.ourTanks[keys][4]!="killed"){
                 
                  ourQuantityTankKIll = ourQuantityTankKIll + 1;
                      our_00.ourTanks[keys][4] = "killed";
                      
                      if (ourQuantityTankKIll > ourQuantityTank){ //решаем проблему минусового количества
                          ourQuantityTankKIll = ourQuantityTank
                      }//решаем проблему минусового количества
                      
                  needToKill = 'not-need'; 
                      
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], -1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 0, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 2, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 2, 0));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 2, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 0, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], -1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], -1, 0));
                      
                  }
                      if (our_00.ourTanks[keys][4] !="killed"){
                          needToKill = 'need';
                      }
                  
                      finishOurTroops(fireField);
                     
        }
        if (our_00.ourTanks[keys][1] == fireField ){
                  var ourTankDie = document.getElementById(fireField);
                  ourTankDie.setAttribute("class", "our-tank72-2-kill");
                  our_00.ourTanks[keys][3] = 'kill';
                  fieldsWhereEnemyFire.push(fireField);
                  
                  if(quantityEnemyPTUR>0){
                        enemyTankPTUR(our_00.ourTanks[keys]);
                        }
                  
                  if(our_00.ourTanks[keys][2] == 'kill' && our_00.ourTanks[keys][3] == 'kill' &&  our_00.ourTanks[keys][4]!="killed"){
                    
                  ourQuantityTankKIll = ourQuantityTankKIll + 1;
                    our_00.ourTanks[keys][4] = "killed";
                      
                      if (ourQuantityTankKIll > ourQuantityTank){ //решаем проблему минусового количества
                          ourQuantityTankKIll = ourQuantityTank
                      }//решаем проблему минусового количества
                      
                  needToKill = 'not-need'; 
                      
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], -1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 0, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 2, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 2, 0));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 2, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], 0, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], -1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourTanks[keys][0], -1, 0));
                    
                      }
                       if (our_00.ourTanks[keys][4] !="killed"){
                          needToKill = 'need';
                      }
                      finishOurTroops(fireField);
                                            
                  }                            
        }
} //проверка попадания в наши танки

function inspectionEnemyFireForOurBTR(fireField){ //проверка попадания в наши БТР
    for(keys in our_00.ourBTR){
        if (our_00.ourBTR[keys][0] == fireField ){
                  var ourBTRDie = document.getElementById(fireField);
                  ourBTRDie.setAttribute("class", "our-btr-4-1-kill");
                  our_00.ourBTR[keys][2] = 'kill';
                  fieldsWhereEnemyFire.push(fireField);
                  if(quantityEnemyPTUR>0){
                        enemyBTRPTUR(our_00.ourBTR[keys]);
                        }
                  
                  if(our_00.ourBTR[keys][2] == 'kill' && our_00.ourBTR[keys][3] == 'kill'&&  our_00.ourBTR[keys][4]!="killed"){
                  
                  ourQuantityBTRKIll = ourQuantityBTRKIll + 1;
                      our_00.ourBTR[keys][4] ="killed";
                  
                      if (ourQuantityBTRKIll > ourQuantityBTR){ //решаем проблему минусового количества 
                          ourQuantityBTRKIll = ourQuantityBTR
                      }  //решаем проблему минусового количества
                      
                    needToKill = 'not-need'; 
                      
                  
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], -1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 0, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 2, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 2, 0));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 2, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 0, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], -1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], -1, 0));
                        } 
                      if (our_00.ourBTR[keys][4] !="killed"){
                          needToKill = 'need';
                      
                         
                      finishOurTroops(fireField);                     
                  } 
                  }         
        if (our_00.ourBTR[keys][1] == fireField ){
                  var ourBTRDie = document.getElementById(fireField);
                  ourBTRDie.setAttribute("class", "our-btr-4-2-kill");
                  our_00.ourBTR[keys][3] = 'kill';
                  fieldsWhereEnemyFire.push(fireField);
                  if(quantityEnemyPTUR>0){
                        enemyBTRPTUR(our_00.ourBTR[keys]);
                        }
                  
                  if(our_00.ourBTR[keys][2] == 'kill' && our_00.ourBTR[keys][3] == 'kill' &&  our_00.ourBTR[keys][4]!="killed"){
                      
                  ourQuantityBTRKIll = ourQuantityBTRKIll + 1;
                      our_00.ourBTR[keys][4] ="killed";
                   
                      
                      if (ourQuantityBTRKIll > ourQuantityBTR){ //решаем проблему двойного попадания 
                          ourQuantityBTRKIll = ourQuantityBTR
                      }  //решаем проблему двойного попадания
                      
                      needToKill = 'not-need';       
                      
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], -1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 0, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 2, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 2, 0));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 2, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], 0, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], -1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourBTR[keys][0], -1, 0)); 
                  }
                     if (our_00.ourBTR[keys][4] !="killed"){
                          needToKill = 'need';
                      }
                     
                      finishOurTroops(fireField);
                                            
                  }                      
        }
} //проверка попадания в наши БТР

function inspectionEnemyFireForOurGun(fireField){ //проверка попадания в наши минометы
    for(keys in our_00.ourGuns){
        if (our_00.ourGuns[keys][0] == fireField ){
                  var ourGunDie = document.getElementById(fireField);
                  ourGunDie.setAttribute("class", "our-gun-1-kill");
                  our_00.ourGuns[keys][2] = 'kill';
                  fieldsWhereEnemyFire.push(fireField);
                  
                  if(our_00.ourGuns[keys][2] == 'kill' && our_00.ourGuns[keys][3] == 'kill'&&  our_00.ourGuns[keys][4]!="killed"){
                      
                  
                  ourQuantityGunKIll = ourQuantityGunKIll + 1;
                      our_00.ourGuns[keys][4] ="killed";
                  
                      
                      if (ourQuantityGunKIll > ourQuantityGun){ //решаем проблему минусового количества 
                          ourQuantityGunKIll = ourQuantityGun
                      }  //решаем проблему минусового количества
                      
                      needToKill = 'not-need';
                      
                 
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], -1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 0, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 1, 0));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 1, -2));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 0, -2));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], -1, -2));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], -1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], -1, 0));
                    } 
                      if (our_00.ourGuns[keys][4] !="killed"){
                          needToKill = 'need';
                      }
                      finishOurTroops(fireField);                   
                                         
                  }     
        if (our_00.ourGuns[keys][1] == fireField ){
                  var ourGunDie = document.getElementById(fireField);
                  ourGunDie.setAttribute("class", "our-gun-2-kill");
                  our_00.ourGuns[keys][3] = 'kill';
                  fieldsWhereEnemyFire.push(fireField);
                  
                  if(our_00.ourGuns[keys][2] == 'kill' && our_00.ourGuns[keys][3] == 'kill' &&  our_00.ourGuns[keys][4]!="killed"){
                 
                                      
                  ourQuantityGunKIll = ourQuantityGunKIll + 1;
                      our_00.ourGuns[keys][4] ="killed";
                      
                      if (ourQuantityGunKIll > ourQuantityGun){ //решаем проблему минусового количества 
                          ourQuantityGunKIll = ourQuantityGun
                      }  //решаем проблему минусового количества
                      
                  needToKill = 'not-need';
                 
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], -1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 0, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 1, 1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 1, 0));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 1, -2));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], 0, -2));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], -1, -2));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], -1, -1));
                        fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGuns[keys][1], -1, 0));   
                    } 
                      if (our_00.ourGuns[keys][4] !="killed"){
                          needToKill = 'need';
                      }
                      finishOurTroops(fireField);                     
                                         
                  } 
          }
} //проверка попадания в наши минометы

function inspectionEnemyFireForOurGRAD(fireField){ //проверка попадания в наши ГРАДЫ
    
    for (var key1 in our_00.ourGRAD){ 
         var ourKill1 = document.getElementById(fireField);
         if ((our_00.ourGRAD[key1][0] == fireField)&&(our_00.ourGRAD[key1][8] != 'no-live')){             
            ourKill1.setAttribute("class", "our-GRAD-1-wounded");
            our_00.ourGRAD[key1][4] = 'kill';
         }if ((our_00.ourGRAD[key1][1] == fireField)&&(our_00.ourGRAD[key1][8] != 'no-live')){
            ourKill1.setAttribute("class", "our-GRAD-2-wounded");
            our_00.ourGRAD[key1][5] = 'kill';
         }if ((our_00.ourGRAD[key1][2] == fireField)&&(our_00.ourGRAD[key1][8] != 'no-live')){
            ourKill1.setAttribute("class", "our-GRAD-3-wounded");
            our_00.ourGRAD[key1][6] = 'kill';
         }if ((our_00.ourGRAD[key1][3] == fireField)&&(our_00.ourGRAD[key1][8] != 'no-live')){
            ourKill1.setAttribute("class", "our-GRAD-4-wounded");
            our_00.ourGRAD[key1][7] = 'kill';
         }
        if(((our_00.ourGRAD[key1][0] == fireField)||(our_00.ourGRAD[key1][1] == fireField)||(our_00.ourGRAD[key1][2] == fireField)||(our_00.ourGRAD[key1][3] == fireField))&&((our_00.ourGRAD[key1][4] == 'kill')&&(our_00.ourGRAD[key1][5] == 'kill')&&(our_00.ourGRAD[key1][6] == 'kill')&&(our_00.ourGRAD[key1][7] == 'kill')&&(our_00.ourGRAD[key1][8] != 'no-live'))){
            
            our_00.ourGRAD[key1][8] = 'no-live';
            needToKill = 'not-need';
            document.getElementById(our_00.ourGRAD[key1][0]).setAttribute("class", "our-GRAD-1-kill");
            document.getElementById(our_00.ourGRAD[key1][1]).setAttribute("class", "our-GRAD-2-kill");
            document.getElementById(our_00.ourGRAD[key1][2]).setAttribute("class", "our-GRAD-3-kill");
            document.getElementById(our_00.ourGRAD[key1][3]).setAttribute("class", "our-GRAD-4-kill");
            
            ourQuantityGRADKIll = ourQuantityGRADKIll +1;
            
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], -1, 1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], 0, 1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], 1, 1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], 2, 1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], 2, 0));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], 2, -1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], 2, -2));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], 1, -2));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], 0, -2));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], -1, -2));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], -1, -1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourGRAD[key1][0], -1, 0));
            
        } 
        
        if(((our_00.ourGRAD[key1][0] == fireField)||(our_00.ourGRAD[key1][1] == fireField)||(our_00.ourGRAD[key1][2] == fireField)||(our_00.ourGRAD[key1][3] == fireField))&&(our_00.ourGRAD[key1][8] == 'live')){
            needToKill = 'need'; 
            finishOurTroops(fireField);
        }
        
        } 
    
    
} //проверка попадания в наши ГРАДЫ

function inspectionEnemyFireForOurARTA(fireField){ //проверка попадания в нашу АРТУ
    for (var key1 in our_00.ourARTA){ 
         var ourKill1 = document.getElementById(fireField);
         if ((our_00.ourARTA[key1][0] == fireField)&&(our_00.ourARTA[key1][8] != 'no-live')){             
            ourKill1.setAttribute("class", "our-ARTA-1-wounded");
            our_00.ourARTA[key1][4] = 'kill';
         }if ((our_00.ourARTA[key1][1] == fireField)&&(our_00.ourARTA[key1][8] != 'no-live')){
            ourKill1.setAttribute("class", "our-ARTA-2-wounded");
            our_00.ourARTA[key1][5] = 'kill';
         }if ((our_00.ourARTA[key1][2] == fireField)&&(our_00.ourARTA[key1][8] != 'no-live')){
            ourKill1.setAttribute("class", "our-ARTA-3-wounded");
            our_00.ourARTA[key1][6] = 'kill';
         }if ((our_00.ourARTA[key1][3] == fireField)&&(our_00.ourARTA[key1][8] != 'no-live')){
            ourKill1.setAttribute("class", "our-ARTA-4-wounded");
            our_00.ourARTA[key1][7] = 'kill';
         }
        if(((our_00.ourARTA[key1][0] == fireField)||(our_00.ourARTA[key1][1] == fireField)||(our_00.ourARTA[key1][2] == fireField)||(our_00.ourARTA[key1][3] == fireField))&&((our_00.ourARTA[key1][4] == 'kill')&&(our_00.ourARTA[key1][5] == 'kill')&&(our_00.ourARTA[key1][6] == 'kill')&&(our_00.ourARTA[key1][7] == 'kill')&&(our_00.ourARTA[key1][8] != 'no-live'))){
            
            our_00.ourARTA[key1][8] = 'no-live';
            needToKill = 'not-need';
            document.getElementById(our_00.ourARTA[key1][0]).setAttribute("class", "our-ARTA-1-kill");
            document.getElementById(our_00.ourARTA[key1][1]).setAttribute("class", "our-ARTA-2-kill");
            document.getElementById(our_00.ourARTA[key1][2]).setAttribute("class", "our-ARTA-3-kill");
            document.getElementById(our_00.ourARTA[key1][3]).setAttribute("class", "our-ARTA-4-kill");
            
            ourQuantityARTAKIll = ourQuantityARTAKIll +1;
            
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], -1, 1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], 0, 1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], 1, 1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], 2, 1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], 2, 0));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], 2, -1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], 2, -2));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], 1, -2));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], 0, -2));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], -1, -2));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], -1, -1));
            fieldsWhereEnemyFire.push(calculationPosition_00(our_00.ourARTA[key1][0], -1, 0));
            
        }   
        
        if(((our_00.ourARTA[key1][0] == fireField)||(our_00.ourARTA[key1][1] == fireField)||(our_00.ourARTA[key1][2] == fireField)||(our_00.ourARTA[key1][3] == fireField))&&(our_00.ourARTA[key1][8] == 'live')){
            needToKill = 'need'; 
            finishOurTroops(fireField);
        }
    
        } 
    
    
} //проверка попадания в нашу АРТУ

function finishOurTroops(fireField){
    var newfireFields =[];
   
    if ((ourAttackObject.type == 'infantery')||(ourAttackObject.type == 'BTR')||(ourAttackObject.type == 'tank')){
    var arr =[];
        while (arr.length < 4)
        {
             var random = Math.floor(4*Math.random());
            if (arr.indexOf(random) < 0){
              arr.push(random);
            } 
        }
    
    
    for(i=0; i<=3; i++){
        var newfireField;
         if (arr[i] == 0){
            newfireField = calculationPosition_00(fireField, 0, 1);
        }if (arr[i] == 1){
           newfireField = calculationPosition_00(fireField, 1, 0); 
        }if (arr[i] == 2){
           newfireField = calculationPosition_00(fireField, 0, -1); 
        }if (arr[i] == 3){
           newfireField = calculationPosition_00(fireField, -1, 0); 
        }
        if ((our_00.ourField.indexOf(newfireField) >= 0) && (fieldsWhereEnemyFire.indexOf(newfireField) < 0)){
            newfireFields.push(newfireField);
        }
        }
    
        numberOfShorts = 'second';       
        finishOurTroopsFields = newfireFields;
        return finishOurTroopsFields; 
    }
    
    if (ourAttackObject.type == 'ARTA'){
        var tempFireField = [];
        for (var key in our_00.ourARTA){
           if((our_00.ourARTA[key][4] == 'kill')&&(our_00.ourARTA[key][5] == 'kill')&&(our_00.ourARTA[key][6] == 'kill')&&(our_00.ourARTA[key][7] != 'kill')){
               newfireFields.push(our_00.ourARTA[key][3]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourARTA[key][5] == 'kill')&&(our_00.ourARTA[key][7] == 'kill')&&(our_00.ourARTA[key][6] == 'kill')&&(our_00.ourARTA[key][4] != 'kill')){
               newfireFields.push(our_00.ourARTA[key][0]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourARTA[key][7] == 'kill')&&(our_00.ourARTA[key][6] == 'kill')&&(our_00.ourARTA[key][4] == 'kill')&&(our_00.ourARTA[key][5] != 'kill')){
               newfireFields.push(our_00.ourARTA[key][1]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourARTA[key][4] == 'kill')&&(our_00.ourARTA[key][5] == 'kill')&&(our_00.ourARTA[key][7] == 'kill')&&(our_00.ourARTA[key][6] != 'kill')){
               newfireFields.push(our_00.ourARTA[key][2]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }
           
           if((our_00.ourARTA[key][4] == 'kill')&&(our_00.ourARTA[key][7] == 'kill')&&(our_00.ourARTA[key][5] != 'kill')&&(our_00.ourARTA[key][6] != 'kill')){
               newfireFields.push(our_00.ourARTA[key][1]);
               newfireFields.push(our_00.ourARTA[key][2]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourARTA[key][5] == 'kill')&&(our_00.ourARTA[key][6] == 'kill')&&(our_00.ourARTA[key][4] != 'kill')&&(our_00.ourARTA[key][7] != 'kill')){
               newfireFields.push(our_00.ourARTA[key][0]);
               newfireFields.push(our_00.ourARTA[key][3]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }
           
            if((our_00.ourARTA[key][4] == 'kill')&&(our_00.ourARTA[key][6] == 'kill')&&(our_00.ourARTA[key][5] != 'kill')&&(our_00.ourARTA[key][7] != 'kill')){
               tempFireField.push(calculationPosition_00(our_00.ourARTA[key1][0], -1, 0));
               tempFireField.push(calculationPosition_00(our_00.ourARTA[key1][0], 1, 0));
                if ((our_00.ourField.indexOf(tempFireField) >= 0) && (fieldsWhereEnemyFire.indexOf(tempFireField) < 0)){
                    newfireFields.push(tempFireField);
                }
                finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourARTA[key][5] == 'kill')&&(our_00.ourARTA[key][7] == 'kill')&&(our_00.ourARTA[key][4] != 'kill')&&(our_00.ourARTA[key][6] != 'kill')){
               tempFireField.push(calculationPosition_00(our_00.ourARTA[key1][3], -1, 0));
               tempFireField.push(calculationPosition_00(our_00.ourARTA[key1][3], 1, 0));
               if ((our_00.ourField.indexOf(tempFireField) >= 0) && (fieldsWhereEnemyFire.indexOf(tempFireField) < 0)){
                    newfireFields.push(tempFireField);
                }
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }  
            if((our_00.ourARTA[key][4] == 'kill')&&(our_00.ourARTA[key][5] == 'kill')&&(our_00.ourARTA[key][6] != 'kill')&&(our_00.ourARTA[key][7] != 'kill')){
               tempFireField.push(calculationPosition_00(our_00.ourARTA[key1][0], 0, 1));
               tempFireField.push(calculationPosition_00(our_00.ourARTA[key1][0], 0, -1));
                if ((our_00.ourField.indexOf(tempFireField) >= 0) && (fieldsWhereEnemyFire.indexOf(tempFireField) < 0)){
                    newfireFields.push(tempFireField);
                }
                finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           } if((our_00.ourARTA[key][6] == 'kill')&&(our_00.ourARTA[key][7] == 'kill')&&(our_00.ourARTA[key][4] != 'kill')&&(our_00.ourARTA[key][5] != 'kill')){
               tempFireField.push(calculationPosition_00(our_00.ourARTA[key1][3], 0, 1));
               tempFireField.push(calculationPosition_00(our_00.ourARTA[key1][3], 0, -1));
               if ((our_00.ourField.indexOf(tempFireField) >= 0) && (fieldsWhereEnemyFire.indexOf(tempFireField) < 0)){
                    newfireFields.push(tempFireField);
                }
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           } 
        }
       
        
        
        var arr =[];
        while (arr.length < 4)
        {
            var random = Math.floor(4*Math.random());
            if (arr.indexOf(random) < 0){
                arr.push(random);
            } 
        }  
     var newfireFields =[];
        for(i=0; i<=3; i++){
        var newfireField;
         if (arr[i] == 0){
            newfireField = calculationPosition_00(fireField, 1, 1);
        }if (arr[i] == 1){
           newfireField = calculationPosition_00(fireField, 1, -1); 
        }if (arr[i] == 2){
           newfireField = calculationPosition_00(fireField, -1, 1); 
        }if (arr[i] == 3){
           newfireField = calculationPosition_00(fireField, -1, -1); 
        }
        if ((our_00.ourField.indexOf(newfireField) >= 0) && (fieldsWhereEnemyFire.indexOf(newfireField) < 0)){
            newfireFields.push(newfireField);
        }
        }         
        finishOurTroopsFields = newfireFields;
        return finishOurTroopsFields; 
        
    }
    
    if (ourAttackObject.type == 'GRAD'){
        var tempFireField = [];
        for (var key in our_00.ourGRAD){
           if((our_00.ourGRAD[key][4] == 'kill')&&(our_00.ourGRAD[key][5] == 'kill')&&(our_00.ourGRAD[key][6] == 'kill')&&(our_00.ourGRAD[key][7] != 'kill')){
               newfireFields.push(our_00.ourGRAD[key][3]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourGRAD[key][5] == 'kill')&&(our_00.ourGRAD[key][7] == 'kill')&&(our_00.ourGRAD[key][6] == 'kill')&&(our_00.ourGRAD[key][4] != 'kill')){
               newfireFields.push(our_00.ourGRAD[key][0]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourGRAD[key][7] == 'kill')&&(our_00.ourGRAD[key][6] == 'kill')&&(our_00.ourGRAD[key][4] == 'kill')&&(our_00.ourGRAD[key][5] != 'kill')){
               newfireFields.push(our_00.ourGRAD[key][1]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourGRAD[key][4] == 'kill')&&(our_00.ourGRAD[key][5] == 'kill')&&(our_00.ourGRAD[key][7] == 'kill')&&(our_00.ourGRAD[key][6] != 'kill')){
               newfireFields.push(our_00.ourGRAD[key][2]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }
           
           if((our_00.ourGRAD[key][4] == 'kill')&&(our_00.ourGRAD[key][7] == 'kill')&&(our_00.ourGRAD[key][5] != 'kill')&&(our_00.ourGRAD[key][6] != 'kill')){
               newfireFields.push(our_00.ourGRAD[key][1]);
               newfireFields.push(our_00.ourGRAD[key][2]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourGRAD[key][5] == 'kill')&&(our_00.ourGRAD[key][6] == 'kill')&&(our_00.ourGRAD[key][4] != 'kill')&&(our_00.ourGRAD[key][7] != 'kill')){
               newfireFields.push(our_00.ourGRAD[key][0]);
               newfireFields.push(our_00.ourGRAD[key][3]);
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }
           
            if((our_00.ourGRAD[key][4] == 'kill')&&(our_00.ourGRAD[key][6] == 'kill')&&(our_00.ourGRAD[key][5] != 'kill')&&(our_00.ourGRAD[key][7] != 'kill')){
               tempFireField.push(calculationPosition_00(our_00.ourGRAD[key1][0], -1, 0));
               tempFireField.push(calculationPosition_00(our_00.ourGRAD[key1][0], 1, 0));
                if ((our_00.ourField.indexOf(tempFireField) >= 0) && (fieldsWhereEnemyFire.indexOf(tempFireField) < 0)){
                    newfireFields.push(tempFireField);
                }
                finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }if((our_00.ourGRAD[key][5] == 'kill')&&(our_00.ourGRAD[key][7] == 'kill')&&(our_00.ourGRAD[key][4] != 'kill')&&(our_00.ourGRAD[key][6] != 'kill')){
               tempFireField.push(calculationPosition_00(our_00.ourGRAD[key1][3], -1, 0));
               tempFireField.push(calculationPosition_00(our_00.ourGRAD[key1][3], 1, 0));
               if ((our_00.ourField.indexOf(tempFireField) >= 0) && (fieldsWhereEnemyFire.indexOf(tempFireField) < 0)){
                    newfireFields.push(tempFireField);
                }
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           }  
            if((our_00.ourGRAD[key][4] == 'kill')&&(our_00.ourGRAD[key][5] == 'kill')&&(our_00.ourGRAD[key][6] != 'kill')&&(our_00.ourGRAD[key][7] != 'kill')){
               tempFireField.push(calculationPosition_00(our_00.ourGRAD[key1][0], 0, 1));
               tempFireField.push(calculationPosition_00(our_00.ourGRAD[key1][0], 0, -1));
                if ((our_00.ourField.indexOf(tempFireField) >= 0) && (fieldsWhereEnemyFire.indexOf(tempFireField) < 0)){
                    newfireFields.push(tempFireField);
                }
                finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           } if((our_00.ourGRAD[key][6] == 'kill')&&(our_00.ourGRAD[key][7] == 'kill')&&(our_00.ourGRAD[key][4] != 'kill')&&(our_00.ourGRAD[key][5] != 'kill')){
               tempFireField.push(calculationPosition_00(our_00.ourGRAD[key1][3], 0, 1));
               tempFireField.push(calculationPosition_00(our_00.ourGRAD[key1][3], 0, -1));
               if ((our_00.ourField.indexOf(tempFireField) >= 0) && (fieldsWhereEnemyFire.indexOf(tempFireField) < 0)){
                    newfireFields.push(tempFireField);
                }
               finishOurTroopsFields = newfireFields;
               return(finishOurTroopsFields);
           } 
        }
       
        
        
        var arr =[];
        while (arr.length < 4)
        {
            var random = Math.floor(4*Math.random());
            if (arr.indexOf(random) < 0){
                arr.push(random);
            } 
        }  
     var newfireFields =[];
        for(i=0; i<=3; i++){
        var newfireField;
         if (arr[i] == 0){
            newfireField = calculationPosition_00(fireField, 1, 1);
        }if (arr[i] == 1){
           newfireField = calculationPosition_00(fireField, 1, -1); 
        }if (arr[i] == 2){
           newfireField = calculationPosition_00(fireField, -1, 1); 
        }if (arr[i] == 3){
           newfireField = calculationPosition_00(fireField, -1, -1); 
        }
        if ((our_00.ourField.indexOf(newfireField) >= 0) && (fieldsWhereEnemyFire.indexOf(newfireField) < 0)){
            newfireFields.push(newfireField);
        }
        }      
        finishOurTroopsFields = newfireFields;
        return finishOurTroopsFields; 
        
    }
        
} //функция добития наших раненых юнитов

function enemyGradFire(fireField){
    var arr =[];
    if(enemyWholeGRAD>9){
        enemyWholeGRAD = 9;
    }
        while (arr.length < enemyWholeGRAD) //заменить 4 на enemyWholeGRAD
        {
             var random = Math.floor(9*Math.random());
            if (arr.indexOf(random) < 0){
              arr.push(random);
            } 
        }
    var newfireFields =[];
    
    for(i=0; i< enemyWholeGRAD; i++){ //заменить 4 на enemyWholeGRAD
        var newfireField;
         if (arr[i] == 0){
            newfireField = calculationPosition_00(fireField, -1, -1);
        }if (arr[i] == 1){
           newfireField = calculationPosition_00(fireField, -1, 0); 
        }if (arr[i] == 2){
           newfireField = calculationPosition_00(fireField, -1, 1); 
        }if (arr[i] == 3){
           newfireField = calculationPosition_00(fireField, 0, -1); 
        }if (arr[i] == 4){
            newfireField = calculationPosition_00(fireField, 0, 0);
        }if (arr[i] == 5){
           newfireField = calculationPosition_00(fireField, 0, 1); 
        }if (arr[i] == 6){
           newfireField = calculationPosition_00(fireField, 1, -1); 
        }if (arr[i] == 7){
           newfireField = calculationPosition_00(fireField, 1, 0); 
        }if (arr[i] == 8){
           newfireField = calculationPosition_00(fireField, 1, 1); 
        }
        if(our_00.ourField.indexOf(newfireField) >= 0){
            newfireFields.push(newfireField);
        }
        }  
    return newfireFields
} //функция расчеты залпа вражеского града

function enemyTankPTUR(ourTank){ //функция запуска ПТУР по нашему танку
    if(((enemyGRADChecked())&&(!enemyARTAChecked())&&(numberOfOurShort > 1))||((!enemyGRADChecked()) && (enemyARTAChecked()) && (numberOfOurShort > 1))||((!enemyGRADChecked()) && (!enemyARTAChecked()) && (numberOfOurShort > 0))||((enemyGRADChecked()) && (enemyARTAChecked()) && (numberOfOurShort > 2)))
    {
    if (quantityEnemyPTUR > 0){    
    if (ourTank[2] == 'kill'){
        ourTank[3] = 'kill';
        var ourKill2 = document.getElementById(ourTank[1]);
        ourKill2.setAttribute("class", "our-tank72-2-kill"); 
        var ourKill1 = document.getElementById(ourTank[0]);
        ourKill1.setAttribute("class", "our-tank72-1-kill");
        fieldsWhereEnemyFire.push(ourTank[1]);
        quantityEnemyPTUR = quantityEnemyPTUR-1;
        rightPturDraw();
    } else {
        ourTank[2] = 'kill';
        var ourKill1 = document.getElementById(ourTank[0]);
        ourKill1.setAttribute("class", "our-tank72-1-kill"); 
        var ourKill2 = document.getElementById(ourTank[1]);
        ourKill2.setAttribute("class", "our-tank72-2-kill");
        fieldsWhereEnemyFire.push(ourTank[0]);
        quantityEnemyPTUR = quantityEnemyPTUR-1;
        rightPturDraw();
    }
    }
    }
  } //функция запуска ПТУР по нашему танку

function enemyBTRPTUR(ourBTR){ //функция запуска ПТУР по нашему БТР
    if(((enemyGRADChecked())&&(!enemyARTAChecked())&&(numberOfOurShort > 1))||((!enemyGRADChecked()) && (enemyARTAChecked()) && (numberOfOurShort > 1))||((!enemyGRADChecked()) && (!enemyARTAChecked()) && (numberOfOurShort > 0))||((enemyGRADChecked()) && (enemyARTAChecked()) && (numberOfOurShort > 2))){
        
    if (quantityEnemyPTUR > 0){    
    if (ourBTR[2] == 'kill'){
        ourBTR[3] = 'kill';
        var ourKill2 = document.getElementById(ourBTR[1]);
        ourKill2.setAttribute("class", "our-btr-4-2-kill"); 
        var ourKill1 = document.getElementById(ourBTR[0]);
        ourKill1.setAttribute("class", "our-btr-4-1-kill");
        fieldsWhereEnemyFire.push(ourBTR[1]);
        quantityEnemyPTUR = quantityEnemyPTUR-1;
        rightPturDraw();
    } else {
        ourBTR[2] = 'kill';
        var ourKill1 = document.getElementById(ourBTR[0]);
        ourKill1.setAttribute("class", "our-btr-4-1-kill"); 
        var ourKill2 = document.getElementById(ourBTR[1]);
        ourKill2.setAttribute("class", "our-btr-4-2-kill");
        fieldsWhereEnemyFire.push(ourBTR[0]);
        quantityEnemyPTUR = quantityEnemyPTUR-1;
        rightPturDraw();
    }
    }
    }
  } //функция запуска ПТУР по нашему БТР

function enemyMineField(){  //функция вражеского минного поля   
    enemyMineFields = [];
    var i = 0;
    do{
        enimyFinedTargetFunction();
        i++;
    } while(i<10)
    
  
} //функция вражеского минного поля 

function enemyArtaFire(fireField){
            var newfireFields =[];
            var tempfireFields =[];
            var endfireFields =[];

            newfireFields.push(fireField);
            newfireFields.push(calculationPosition_00(fireField, -2, 2));
            newfireFields.push(calculationPosition_00(fireField, -1, 2)); 
            newfireFields.push(calculationPosition_00(fireField, 0, 2)); 
            newfireFields.push(calculationPosition_00(fireField, 1, 2)); 
            newfireFields.push(calculationPosition_00(fireField, 2, 2));
            newfireFields.push(calculationPosition_00(fireField, -2, 1)); 
            newfireFields.push(calculationPosition_00(fireField, -1, 1)); 
            newfireFields.push(calculationPosition_00(fireField, 0, 1)); 
            newfireFields.push(calculationPosition_00(fireField, 1, 1)); 
            newfireFields.push(calculationPosition_00(fireField, 2, 1));
            newfireFields.push(calculationPosition_00(fireField, -2, 0)); 
            newfireFields.push(calculationPosition_00(fireField, -1, 0)); 
            newfireFields.push(calculationPosition_00(fireField, 1, 0)); 
            newfireFields.push(calculationPosition_00(fireField, 2, 0));
            newfireFields.push(calculationPosition_00(fireField, -2, -1)); 
            newfireFields.push(calculationPosition_00(fireField, -1, -1)); 
            newfireFields.push(calculationPosition_00(fireField, 0, -1)); 
            newfireFields.push(calculationPosition_00(fireField, 1, -1)); 
            newfireFields.push(calculationPosition_00(fireField, 2, -1)); 
            newfireFields.push(calculationPosition_00(fireField, -2, -2)); 
            newfireFields.push(calculationPosition_00(fireField, -1, -2)); 
            newfireFields.push(calculationPosition_00(fireField, 0, -2));
            newfireFields.push(calculationPosition_00(fireField, 1, -2)); 
            newfireFields.push(calculationPosition_00(fireField, 2, -2)); 

            for(i=0; i<newfireFields.length; i++){
                 if((our_00.ourField.indexOf(newfireFields[i]) >= 0)&&(fieldsWhereEnemyFire.indexOf(newfireFields[i])<0)){ 
               tempfireFields.push(newfireFields[i]);  
            }
            }
            
            function compareRandom(a, b) {
              return Math.random() - 0.5;
            }

            tempfireFields.sort(compareRandom);
    
            for(j=0; j<enemyWholeARTA; j++){
                if(tempfireFields[j]!= undefined){
                endfireFields.push(tempfireFields[j]);
            }
            }
            return endfireFields;
    
} //функция расчеты залпа 152 артилерии противника

function allOurKillFunction(){ //проверка на наличие живых наших войск
    if (ourQuantityTank == ourQuantityTankKIll && ourQuantityBTR == ourQuantityBTRKIll && ourQuantityInfantry ==  ourQuantityInfantryKIll && ourQuantityGun == ourQuantityGunKIll&& ourQuantityARTA == ourQuantityARTAKIll && ourQuantityGRAD == ourQuantityGRADKIll){
        if (counterOfDefeat == 0){  // убираем лишние сообщения
            counterOfDefeat = counterOfDefeat + 1;    
         
         // показываем оставшегося противника   
        for(keys in enemy_00.enemyInfantry){
           if(enemy_00.enemyInfantry[keys][2] == 'live'){
              document.getElementById(enemy_00.enemyInfantry[keys][0]).setAttribute("class", "infantry-live");
           }
        }
        for(keys in enemy_00.enemyTanks){
           if(enemy_00.enemyTanks[keys][4] == 'live'){
              document.getElementById(enemy_00.enemyTanks[keys][0]).setAttribute("class", "tank72-1-live");
              document.getElementById(enemy_00.enemyTanks[keys][1]).setAttribute("class", "tank72-2-live"); 
          }
        }
        for(keys in enemy_00.enemyBTR){
           if(enemy_00.enemyBTR[keys][4] == 'live'){
              document.getElementById(enemy_00.enemyBTR[keys][0]).setAttribute("class", "enemy-btr-90-1-live");
              document.getElementById(enemy_00.enemyBTR[keys][1]).setAttribute("class", "enemy-btr-90-2-live"); 
          }
        }
        for(keys in enemy_00.enemyGuns){
           if(enemy_00.enemyGuns[keys][4] == 'live'){
              document.getElementById(enemy_00.enemyGuns[keys][0]).setAttribute("class", "gun-1-live");
              document.getElementById(enemy_00.enemyGuns[keys][1]).setAttribute("class", "gun-2-live"); 
          }
        }
        // показываем оставшегося противника  
            
        resultOfBattle = 'defeat';
            
        enemyDefenseObject.position = globalTarget;
        data.map[findNumberOfDataMapField(battleFieldTarget)].side = 'enemy';
        var tempShorts = shorts;
        alert('Вы проиграли за ' + tempShorts + ' ходов.');
        // удалить наш объект
         
        ourTankHelpIndicator = 'no';
            
            document.getElementById(battleFieldTarget).innerHTML = battleFieldTarget;
        // удалить наш объект
        
        
        
        }
        endOfBattleFunction()
        return true;
      } 
    } //проверка на наличие живых наших войск

function calculationEnemyShorts(){
    EnemyShorts =   (enemyQuantityTank - enemyQuantityTankKIll) + (enemyQuantityBTR - enemyQuantityBTRKIll) + (enemyQuantityGun - enemyQuantityGunKIll) + (enemyQuantityInfantry - enemyQuantityInfantryKIll) + (enemyQuantityARTA - enemyQuantityARTAKIll) + (enemyQuantityGRAD - enemyQuantityGRADKIll);
   
    if(enemyARTAChecked()){
       EnemyShorts = EnemyShorts + 1;
    }    
    if(enemyGRADChecked()){
        EnemyShorts = EnemyShorts + 1;
    }
    if((enemyQuantityTank - enemyQuantityTankKIll) > 0){
        EnemyShorts = EnemyShorts + (enemyQuantityTank - enemyQuantityTankKIll);        
    }
    if(ourAttackObject.trench == 'yes'){
        EnemyShorts = EnemyShorts - Math.floor((enemyQuantityInfantry - enemyQuantityInfantryKIll)/2);        
    }
    if((enemyQuantityTank == 0)&&(enemyQuantityBTR == 0)&&(enemyQuantityGun == 0)&&(enemyQuantityInfantry == 0)&&(enemyQuantityARTA == 0)&&(enemyQuantityGRAD == 0)){
        EnemyShorts = 0;
    }
} //расчет количества выстрелов противника

function show_00(){ //функция перехода между экранами
    
    resultOfBattle = 'equality';
    battleProcess = 'start';
   
$('#1111').empty();
    
    map_00.cleanMapAfterBattle();
    map_00.createOurMap();
    map_00.createOurField();
      
    $('#auto_icon').show();
    
    our_00.createOurField(); //строка заполняет массив ourField !!!ДОЛЖНА ОСТАТЬСЯ!!!
    enemy_00.createEnemyField(); //строка заполняет массив enemyField !!!ДОЛЖНА ОСТАТЬСЯ!!!
    fireFieldForEnemyPosition.length = 0; 
    window.onload = init_00();
    
    var QuantityOfOurHelpTanks = 0;
    for(k=0; k<data.our.length; k++){
        if((data.our[k].type == 'tank')&&(data.our[k].helpTarget == battleFieldTarget)){
            QuantityOfOurHelpTanks = QuantityOfOurHelpTanks + data.our[k].tank;
        }
    }
    
    if(ourAttackObject.tank > 0){
        ourQuantityTank = ourAttackObject.tank + QuantityOfOurHelpTanks;
        startTotalNumberOfOurTroops = startTotalNumberOfOurTroops + ourQuantityTank;
    } else {
    if(QuantityOfOurHelpTanks>0){
        ourQuantityTank = QuantityOfOurHelpTanks;
        startTotalNumberOfOurTroops = startTotalNumberOfOurTroops + ourQuantityTank;
    } else{ourQuantityTank = 0}   
    }
    if(ourAttackObject.BTR > 0){
        ourQuantityBTR = ourAttackObject.BTR;
        startTotalNumberOfOurTroops = startTotalNumberOfOurTroops + ourQuantityBTR;
    } else {ourQuantityBTR = 0}
    if(ourAttackObject.mortar > 0){
        ourQuantityGun = ourAttackObject.mortar;
        startTotalNumberOfOurTroops = startTotalNumberOfOurTroops + ourQuantityGun;
    } else {ourQuantityGun = 0}
    if(ourAttackObject.infantery > 0){
        ourQuantityInfantry = ourAttackObject.infantery;
        startTotalNumberOfOurTroops = startTotalNumberOfOurTroops + ourQuantityInfantry;
    } else {ourQuantityInfantry = 0}
    if(ourAttackObject.PTUR > 0){
      quantityOurPTUR = ourAttackObject.PTUR; 
    } else {ourQuantityPTUR = 0}
    if(ourAttackObject.ARTA > 0){
      ourQuantityARTA = ourAttackObject.ARTA; 
    startTotalNumberOfOurTroops = startTotalNumberOfOurTroops + ourQuantityARTA;
    } else {ourQuantityARTA = 0}
    if(ourAttackObject.GRAD > 0){
      ourQuantityGRAD = ourAttackObject.GRAD; 
        startTotalNumberOfOurTroops = startTotalNumberOfOurTroops + ourQuantityGRAD;
    } else {ourQuantityGRAD = 0}
    
    if(enemyDefenseObject.tank > 0){
        enemyQuantityTank = enemyDefenseObject.tank;
        startTotalNumberOfEnemyTroops = startTotalNumberOfEnemyTroops + enemyQuantityTank;
    } else {enemyQuantityTank = 0}
    if(enemyDefenseObject.BTR > 0){
        enemyQuantityBTR  = enemyDefenseObject.BTR;
        startTotalNumberOfEnemyTroops = startTotalNumberOfEnemyTroops + enemyQuantityBTR;
    } else {enemyQuantityBTR  = 0}
    if(enemyDefenseObject.mortar > 0){
        enemyQuantityGun = enemyDefenseObject.mortar; 
        startTotalNumberOfEnemyTroops = startTotalNumberOfEnemyTroops + enemyQuantityGun;
    } else {enemyQuantityGun = 0}
    if(enemyDefenseObject.infantery > 0){
        enemyQuantityInfantry = enemyDefenseObject.infantery;
        startTotalNumberOfEnemyTroops = startTotalNumberOfEnemyTroops + enemyQuantityInfantry;
    } else {enemyQuantityInfantry= 0}
    if(enemyDefenseObject.PTUR > 0){
      quantityEnemyPTUR = enemyDefenseObject.PTUR; 
    } else {quantityEnemyPTUR = 0}
    if(enemyDefenseObject.GRAD > 0){
        enemyQuantityGRAD = enemyDefenseObject.GRAD; 
        startTotalNumberOfEnemyTroops = startTotalNumberOfEnemyTroops + enemyQuantityGRAD;
    } else {enemyQuantityGRAD = 0}
    if(enemyDefenseObject.ARTA > 0){
        enemyQuantityARTA = enemyDefenseObject.ARTA;
        startTotalNumberOfEnemyTroops = startTotalNumberOfEnemyTroops + enemyQuantityARTA;
    } else {enemyQuantityARTA = 0}

    
    for (var troops = 0; troops < 1; troops++){ // создаем войска двух сторон

for (var tanks = 0; tanks < enemyQuantityTank; tanks++){
        enemy_00.enemyTanks['tank'+(+tanks+1)] = enemy_00.generateOneEnemyTanks();
    } // создаем танки противника

for (var btr = 0; btr < enemyQuantityBTR; btr++){
        enemy_00.enemyBTR['btr'+(+btr+1)] = enemy_00.generateOneEnemyBTR();
    } // создаем БТР противника

for(var guns = 0; guns < enemyQuantityGun; guns++){
    enemy_00.enemyGuns['guns'+(+guns+1)] = enemy_00.generateOneEnemyGuns();
} // создаем артилерию противника

for(var infantry = 0; infantry < enemyQuantityInfantry; infantry++){
    enemy_00.enemyInfantry['infantry'+(+infantry+1)] = enemy_00.generateOneEnemyInfantry();
} // создаем пехоту противника
for (var ARTA = 0; ARTA < enemyQuantityARTA; ARTA++){
        enemy_00.enemyARTA['ARTA'+(+ARTA+1)] = enemy_00.generateOneEnemyARTA();
    } // создаем АРТУ противника
 for (var GRAD = 0; GRAD < enemyQuantityGRAD; GRAD++){
        enemy_00.enemyGRAD['GRAD'+(+GRAD+1)] = enemy_00.generateOneEnemyGRAD();
    } // создаем ГРАД противника       
        

for (var tanks = 0; tanks < ourQuantityTank; tanks++){
        our_00.ourTanks['tank'+(+tanks+1)] = our_00.generateOneOurTanks();
    } // создаем наши танки

for (var btr = 0; btr < ourQuantityBTR; btr++){
        our_00.ourBTR['btr'+(+btr+1)] = our_00.generateOneOurBTR();
    } // создаем наши БТР

for(var guns = 0; guns < ourQuantityGun; guns++){
    our_00.ourGuns['guns'+(+guns+1)] = our_00.generateOneOurGuns();
} // создаем нашу артилерию

for(var infantry = 0; infantry < ourQuantityInfantry; infantry++){
    our_00.ourInfantry['infantry'+(+infantry+1)] = our_00.generateOneOurInfantry();
} // создаем нашу пехоту
        
for (var ARTA = 0; ARTA < ourQuantityARTA; ARTA++){
        our_00.ourARTA['ARTA'+(+ARTA+1)] = our_00.generateOneOurARTA(); 
    } // создаем нашу АРТУ
 for (var GRAD = 0; GRAD < ourQuantityGRAD; GRAD++){
        our_00.ourGRAD['GRAD'+(+GRAD+1)] = our_00.generateOneOurGRAD(); //написать функцию
    } // создаем наш ГРАД
     
        
} // создаем войска двух сторон
   
    if((ourAttackObject.trench == 'yes')&&(whoAttack == 'enemy')){
        $("#left_trench").addClass("left_trench_yes");
    }    
    
    if(whoAttack == 'enemy'){
        ourGRADCheckedInDefend();
        ourARTACheckedInDefend();
        globalTarget = battleFieldTarget;
    }
    if(whoAttack == 'our'){
        globalTarget = enemyDefenseObject.position;
        battleFieldTarget = enemyDefenseObject.position;
    }
  
    if(enemyGRADCheckedInDefend()){
        rightGradDraw();
    }
    
    if(enemyARTACheckedInDefend()&&(!enemyGRADCheckedInDefend())){
        rightArtaDraw();
    }
    
    if(ourGRADCheckedInDefend()){
        leftGradDraw();
    }
    
    if(ourARTACheckedInDefend()&&(!ourGRADCheckedInDefend())){
        leftArtaDraw();
    }
    
    if(enemyTrenchCheckedInDefend(battleFieldTarget)){
        $("#right_trench").addClass("right_trench_yes");
    }

    if (ourMineFieldCheckedInDefend(battleFieldTarget)){        
        alert('Враг попал на наше минное поле!!!')
        ourMineField();
        ourAttackObject.mine = 'no';
    }
    if (enemyMineFieldCheckedInDefend(battleFieldTarget)){        
        alert('Мы попали на вражеское минное поле!!!')
        enemyMineField();
        enemyDefenseObject.mine = 'no';
    }
  
    leftPturDraw();
    rightPturDraw();
    
    calculationOurShorts();
    calculationEnemyShorts();
    changeMap();
    
} //функция переходаа между экранами

function cleaningOurAndEnemy(){
    
    for(i=0; i<our_00.ourField.length; i++){
        document.getElementById(our_00.ourField[i]).setAttribute('class', "map_cell")
    }
    for(j=0; j<enemy_00.enemyField.length; j++){
        document.getElementById(enemy_00.enemyField[j]).setAttribute('class', "map_cell")
    }
    
    enemyQuantityTankKIll = 0; //не заполнять
    enemyQuantityBTRKIll = 0; //не заполнять
    enemyQuantityGunKIll = 0; //не заполнять 
    enemyQuantityInfantryKIll = 0; //не заполнять
    enemyQuantityGRADKIll = 0; //не заполнять
    enemyQuantityARTAKIll = 0; //не заполнять

    ourQuantityTankKIll = 0; //не заполнять
    ourQuantityBTRKIll = 0; //не заполнять
    ourQuantityGunKIll = 0; //не заполнять
    ourQuantityInfantryKIll = 0; //не заполнять
    ourQuantityGRADKIll = 0; //не заполнять
    ourQuantityARTAKIll = 0; //не заполнять
        
    //могут быть проблемы
    ourWholeGRAD = 0;
    ourWholeARTA = 0;
    enemyWholeGRAD = 0;
    enemyWholeARTA = 0;
    //могут быть проблемы

    shorts = 0; //не заполнять
    OurShorts = 0; //не заполнять
    EnemyShorts = 0; //не заполнять
    numberOfOurShort = 0;
    numberOfEnemyShort = 0;
    counterOfWins = 0; //не заполнять
    counterOfDefeat = 0; //не заполнять
    fieldsWhereEnemyFire = [];
    fieldsWhereWeFire = [];
         
    our_00.ourField = [];
    our_00.ourTanks = [];
    our_00.ourBTR = [];
    our_00.ourGuns = [];
    our_00.ourGRAD = [];
    our_00.ourARTA = [];
    our_00.ourInfantry = [];
    our_00.ourTroops = [];
    our_00.ourEmptyField = [];
        
    enemy_00.enemyField = [];
    enemy_00.enemyTanks = [];
    enemy_00.enemyBTR = [];
    enemy_00.enemyGuns = [];
    enemy_00.enemyARTA = [];
    enemy_00.enemyGRAD = [];
    enemy_00.enemyInfantry = [];
    enemy_00.enemyTroops = [];
    enemy_00.enemyEmptyField = [];
    
    startTotalNumberOfOurTroops = 0;
    startTotalNumberOfEnemyTroops = 0;
    quantityOurPTUR = 0;
    quantityEnemyPTUR = 0;
        
}

function ourGRADChecked(){
    
    for(i=0; i<data.our.length; i++){
        if((data.our[i].type == 'GRAD')&&(data.our[i].gradTarget == globalTarget)&&(whoAttack=='our')){
           return true;
        }
    }
        return false;
} 
    
function ourWholeGRADFunction(){
    ourWholeGRAD =0;
    for(i=0; i<data.our.length; i++){
        if((data.our[i].type == 'GRAD')&&(data.our[i].gradTarget == globalTarget)){
            ourWholeGRAD = ourWholeGRAD + data.our[i].GRAD; 
        }
    }
    return ourWholeGRAD;
}
    
function ourGRADCheckedInDefend(){
    ourWholeGRAD = 0;
    for(n=0; n<data.our.length; n++){
        if((data.our[n].type == 'GRAD')&&(createFieldsForOurGradAttack(data.our[n].position).indexOf(globalTarget) >=0)&&(whoAttack=='enemy')){
            ourWholeGRAD = ourWholeGRAD + data.our[n].GRAD;

           data.our[n].gradTarget = globalTarget;
        }
    }
    if((ourWholeGRAD>0)&&(whoAttack=='enemy')){
       return true;
    }else{
       return false; 
    }
    
}
    
function ourARTACheckedInDefend(){
    ourWholeARTA = 0;
    for(j=0; j<data.our.length; j++){
        if((data.our[j].type == 'ARTA')&&(createFieldsForOurArtaAttack(data.our[j].position).indexOf(battleFieldTarget) >=0)&&(whoAttack=='enemy')){
            
            ourWholeARTA = ourWholeARTA + data.our[j].ARTA;

            data.our[j].artaTarget = battleFieldTarget;
        }
    }
    if((ourWholeARTA>0)&&(whoAttack=='enemy')){
       return true;
    }else{
       return false; 
    }
    
} 
    
    
function ourTrenchCheckedInDefend(target){
    for(i=0; i<data.our.length; i++){
        if(data.our[i].position == target){
        if(((data.our[i].type == 'infantery') || (data.our[i].type == 'BTR'))&&(data.our[i].trench == 'yes')){
            return true;  
        }            
    }
    }
    return false;
}

function ourMineFieldCheckedInDefend(target){
    for(i=0; i<data.our.length; i++){
        if(data.our[i].position == target){
        if(((data.our[i].type == 'infantery') || (data.our[i].type == 'BTR'))&&(data.our[i].mine == 'yes')){
            return true;  
        }            
    }
    }
    return false;
}  

function ourARTAChecked(){
    for(i=0; i<data.our.length; i++){
        if((data.our[i].type == 'ARTA')&&(data.our[i].artaTarget == battleFieldTarget)&&(whoAttack=='our')){
    
            ourWholeARTA = ourWholeARTA + data.our[i].ARTA;
            return true;
        }
    }
        return false;
}
    
function ourWholeARTAFunction(){
    ourWholeARTA = 0;
    for(i=0; i<data.our.length; i++){
        if((data.our[i].type == 'ARTA')&&(data.our[i].artaTarget == globalTarget)){
            ourWholeARTA = ourWholeARTA + data.our[i].ARTA;
        }
    }
    return ourWholeARTA;
}

function enemyGRADChecked(){
    for(i=0; i<data.enemy.length; i++){
        if((data.enemy[i].type == 'GRAD')&&(data.enemy[i].gradTarget == battleFieldTarget)){  // возможны другие переменные
           return true;
        }
    }
        return false;
}

function enemyARTAChecked(){
    for(i=0; i<data.enemy.length; i++){
        if((data.enemy[i].type == 'ARTA')&&(data.enemy[i].artaTarget == battleFieldTarget)){  // возможны другие переменные
            if(enemyWholeARTA==0){
          }
            return true;
        }
    }
        return false;
}

function enemyARTACheckedInDefend(){
    for(j=0; j<data.enemy.length; j++){
        if((data.enemy[j].type == 'ARTA')&&(createFieldsForEnemyArtaAttack(data.enemy[j].position).indexOf(battleFieldTarget) >=0)){
            
            enemyWholeARTA = enemyWholeARTA + data.enemy[j].ARTA;

            data.enemy[j].artaTarget = battleFieldTarget;
        }
    }
    if(enemyWholeARTA>0){
       return true;
    }else{
       return false; 
    }
    
}
    
function enemyGRADCheckedInDefend(){
    for(n=0; n<data.enemy.length; n++){
        if((data.enemy[n].type == 'GRAD')&&(createFieldsForEnemyGRADAttack(data.enemy[n].position).indexOf(battleFieldTarget) >=0)){
            enemyWholeGRAD = enemyWholeGRAD + data.enemy[n].GRAD;

            data.enemy[n].gradTarget = battleFieldTarget;
        }
    }
    if(enemyWholeGRAD>0){
       return true;
    }else{
       return false; 
    }
    
}
    
function enemyTrenchCheckedInDefend(target){
    for(i=0; i<data.enemy.length; i++){
        if(data.enemy[i].position == target){
        if(((data.enemy[i].type == 'infantery') || (data.enemy[i].type == 'BTR'))&&(data.enemy[i].trench == 'yes')){
            return true;  
        }            
    }
    }
    return false;
}

function enemyMineFieldCheckedInDefend(target){
    for(i=0; i<data.enemy.length; i++){
        if(data.enemy[i].position == target){
        if(((data.enemy[i].type == 'infantery') || (data.enemy[i].type == 'BTR'))&&(data.enemy[i].mine == 'yes')){
            return true;  
        }            
    }
    }
    return false;
}   
    
function changeMap(){ //меняем подложку и номер для тактической карты
   
    document.getElementById('number_of_tactic_map').innerHTML = battleFieldTarget;
    
    var newX;
    var newY;
    var deltaX = battleFieldTarget.substring(2, 4) - 1;
    var deltaY = battleFieldTarget.substring(0, 2) - 31;
    
    if(battleFieldTarget.substring(0, 2) % 2 == 0){//нечетная 
        newX = data.geoX + 0.005 + deltaX*0.01;
        newY = data.geoY + deltaY*0.005;
    }else{//четная
        newX = data.geoX + deltaX*0.01;
        newY = data.geoY + deltaY*0.005;
    }
    
    
    $('#small_map img').attr('src', "https://static-maps.yandex.ru/1.x/?ll=" +newX + "," + newY +"\&z=16&l=map&\&size=600,400")
    
} //меняем подложку и номер для тактической карты

function endOfBattleFunction(){
    
    if((ourTankHelp>0)&&(ourTankHelpField == battleFieldTarget)){
            ourTankHelpUnit.tank = ourQuantityTank - ourQuantityTankKIll;
            ourTankHelpUnit.realtank = ourTankHelpUnit.tank;
        } else{
        if(ourQuantityTank > 0){    
            ourAttackObject.tank = ourQuantityTank - ourQuantityTankKIll;
            ourAttackObject.realtank = ourAttackObject.tank;
        } else {
            ourAttackObject.tank = 0;
            ourAttackObject.realtank = ourAttackObject.tank;}
        }
        if(ourQuantityBTR > 0){
            ourAttackObject.BTR = ourQuantityBTR - ourQuantityBTRKIll;
            ourAttackObject.realBTR = ourAttackObject.BTR;
        } else {
            ourAttackObject.BTR = 0;
            ourAttackObject.realBTR = ourAttackObject.BTR;
        }
        if(ourQuantityGun > 0){
            ourAttackObject.mortar = ourQuantityGun - ourQuantityGunKIll;
            ourAttackObject.realmortar = ourAttackObject.mortar;
        } else {
            ourAttackObject.mortar = 0;
            ourAttackObject.realmortar = ourAttackObject.mortar;
        }
        if(ourQuantityInfantry > 0){
            ourAttackObject.infantery = ourQuantityInfantry - ourQuantityInfantryKIll; 
            ourAttackObject.realinfantery = ourAttackObject.infantery;
       } else {
            ourAttackObject.infantery = 0;
            ourAttackObject.realinfantery = ourAttackObject.infantery;
        }
        if(quantityOurPTUR > 0){
            ourAttackObject.PTUR  = quantityOurPTUR;
            ourAttackObject.realPTUR = ourAttackObject.PTUR;
        } else {
            ourAttackObject.PTUR = 0;
            ourAttackObject.realPTUR = ourAttackObject.PTUR;
        }
        if(ourQuantityARTA > 0){
            ourAttackObject.ARTA = ourQuantityARTA - ourQuantityARTAKIll; 
            ourAttackObject.realARTA = ourAttackObject.ARTA;
        } else {
            ourAttackObject.ARTA = 0;
            ourAttackObject.realARTA = ourAttackObject.ARTA;
        }
        if(ourQuantityGRAD > 0){
            ourAttackObject.GRAD = ourQuantityGRAD - ourQuantityGRADKIll; 
            ourAttackObject.realGRAD = ourAttackObject.GRAD;
        } else {
            ourAttackObject.GRAD= 0;
            ourAttackObject.realGRAD = ourAttackObject.GRAD;
        }
            
        ourBattlePositions.length = 0;  
    
        deleteOurTroops();

        if(enemyQuantityTank > 0){
            enemyDefenseObject.tank = enemyQuantityTank - enemyQuantityTankKIll;
            enemyDefenseObject.realtank = enemyDefenseObject.tank;
        } else {
            enemyDefenseObject.tank = 0;
            enemyDefenseObject.realtank = enemyDefenseObject.tank;
         }
       if(enemyQuantityBTR > 0){
            enemyDefenseObject.BTR = enemyQuantityBTR - enemyQuantityBTRKIll;
            enemyDefenseObject.realBTR = enemyDefenseObject.BTR;
        } else {
            enemyDefenseObject.BTR = 0;
            enemyDefenseObject.realBTR = enemyDefenseObject.BTR;
        }
        if(enemyQuantityGun > 0){
            enemyDefenseObject.mortar = enemyQuantityGun - enemyQuantityGunKIll;
            enemyDefenseObject.realmortar = enemyDefenseObject.mortar;
        } else {
            enemyDefenseObject.mortar = 0;
            enemyDefenseObject.realmortar = enemyDefenseObject.mortar;
        }
        if(enemyQuantityInfantry > 0){
           enemyDefenseObject.infantery = enemyQuantityInfantry - enemyQuantityInfantryKIll; 
            enemyDefenseObject.realinfantery = enemyDefenseObject.infantery;
        } else {
            enemyDefenseObject.infantery = 0;
            enemyDefenseObject.realinfantery = enemyDefenseObject.infantery;
        }
        if(quantityEnemyPTUR > 0){
            enemyDefenseObject.PTUR  = quantityEnemyPTUR;
            enemyDefenseObject.realPTUR = enemyDefenseObject.PTUR;
        } else {
            enemyDefenseObject.PTUR = 0;
            enemyDefenseObject.realPTUR = enemyDefenseObject.PTUR;
        }
        if(enemyQuantityARTA > 0){
            enemyDefenseObject.ARTA = enemyQuantityARTA - enemyQuantityARTAKIll;
            enemyDefenseObject.realARTA = enemyDefenseObject.ARTA;
        } else {
            enemyDefenseObject.ARTA = 0;
            enemyDefenseObject.realARTA = enemyDefenseObject.ARTA;
        }
        if(enemyQuantityGRAD > 0){
            enemyDefenseObject.GRAD = enemyQuantityGRAD - enemyQuantityGRADKIll;
            enemyDefenseObject.realGRAD = enemyDefenseObject.GRAD;
        } else {
            enemyDefenseObject.GRAD= 0;
            enemyDefenseObject.realGRAD = enemyDefenseObject.GRAD;
               }
     
        if(whoAttack = 'enemy'){
            enemyDownNorma();
        }    
    
        deleteEnemyTroops();   
        drawUnitsOfTwoSize();
    /*
        for(j=0; j<data.calculationMap().length; j++){
            if(document.getElementById(data.calculationMap()[j].position).innerHTML == 'help'){
        document.getElementById(data.calculationMap()[j].position).innerHTML = data.calculationMap()[j].position;
            }
        }  // заполняем номерами карту УБРАТЬ В КОНЕЧНОМ ВАРИАНТЕ 
    */
    document.getElementById(globalTarget).innerHTML = globalTarget;
       
        $('#main').show();
        $('#battlefield').hide();
        
        cleaningOurAndEnemy();
        map_00.cleanMapAfterBattle();
        informAboutOurUnits();
    
        $("#left_ARTA_GRAD").removeClass();
        $("#left_PTUR").removeClass();
        $("#left_trench").removeClass();
        $("#right_ARTA_GRAD").removeClass();
        $("#right_PTUR").removeClass();
        $("#right_trench").removeClass();
    
        battleProcess = 'finish';
        autoBattleCheck = 'no';
    
        for(n=0; n<data.our.length; n++){
            data.our[n].helpTarget = 'no';
            data.our[n].artaTarget = 'no';
            data.our[n].gradTarget = 'no';
        }
    
        lastStep.saveLastStep();

}    

function leftArtaDraw(){
    $("#left_ARTA_GRAD").removeClass();
    var tempARTA;
    ourWholeARTA = ourWholeARTAFunction();
    if(ourWholeARTA>=12) tempARTA = 12;
    else tempARTA = ourWholeARTA;
    switch(tempARTA){
        case 1: $("#left_ARTA_GRAD").addClass("left_ARTA_1");
            break;
        case 2: $("#left_ARTA_GRAD").addClass("left_ARTA_2");
            break;
        case 3: $("#left_ARTA_GRAD").addClass("left_ARTA_3");
            break;
        case 4: $("#left_ARTA_GRAD").addClass("left_ARTA_4");
            break;
        case 5: $("#left_ARTA_GRAD").addClass("left_ARTA_5");
            break;
        case 6: $("#left_ARTA_GRAD").addClass("left_ARTA_6");
            break;
        case 7: $("#left_ARTA_GRAD").addClass("left_ARTA_7");
            break;
        case 8: $("#left_ARTA_GRAD").addClass("left_ARTA_8");
            break;
        case 9: $("#left_ARTA_GRAD").addClass("left_ARTA_9");
            break;
        case 10: $("#left_ARTA_GRAD").addClass("left_ARTA_10");
            break;
        case 11: $("#left_ARTA_GRAD").addClass("left_ARTA_11");
            break;
        case 12: $("3left_ARTA_GRAD").addClass("left_ARTA_12");
            break;
    }
} //отрисовывыем нашу поддерживающую АРТУ
    
function rightArtaDraw(){
    $("#right_ARTA_GRAD").removeClass();
    switch(enemyWholeARTA){
        case 1: $("#right_ARTA_GRAD").addClass("right_ARTA_1");
            break;
        case 2: $("#right_ARTA_GRAD").addClass("right_ARTA_2");
            break;
        case 3: $("#right_ARTA_GRAD").addClass("right_ARTA_3");
            break;
        case 4: $("#right_ARTA_GRAD").addClass("right_ARTA_4");
            break;
        case 5: $("#right_ARTA_GRAD").addClass("right_ARTA_5");
            break;
        case 6: $("#right_ARTA_GRAD").addClass("right_ARTA_6");
            break;
        case 7: $("#right_ARTA_GRAD").addClass("right_ARTA_7");
            break;
        case 8: $("#right_ARTA_GRAD").addClass("right_ARTA_8");
            break;
        case 9: $("#right_ARTA_GRAD").addClass("right_ARTA_9");
            break;
        case 10: $("#right_ARTA_GRAD").addClass("right_ARTA_10");
            break;
        case 11: $("#right_ARTA_GRAD").addClass("right_ARTA_11");
            break;
        case 12: $("3right_ARTA_GRAD").addClass("right_ARTA_12");
            break;
    }
} //отрисовывыем вражескую поддерживающую АРТУ
    
function leftGradDraw(){
    $("#left_ARTA_GRAD").removeClass();
    var tempGRAD;
    ourWholeGRAD = ourWholeGRADFunction();
    if(ourWholeGRAD>=9) tempGRAD = 9;
    else tempGRAD = ourWholeGRAD;
    switch(tempGRAD){
        case 1: $("#left_ARTA_GRAD").addClass("left_GRAD_1");
            break;
        case 2: $("#left_ARTA_GRAD").addClass("left_GRAD_2");
            break;
        case 3: $("#left_ARTA_GRAD").addClass("left_GRAD_3");
            break;
        case 4: $("#left_ARTA_GRAD").addClass("left_GRAD_4");
            break;
        case 5: $("#left_ARTA_GRAD").addClass("left_GRAD_5");
            break;
        case 6: $("#left_ARTA_GRAD").addClass("left_GRAD_6");
            break;
        case 7: $("#left_ARTA_GRAD").addClass("left_GRAD_7");
            break;
        case 8: $("#left_ARTA_GRAD").addClass("left_GRAD_8");
            break;
        case 9: $("#left_ARTA_GRAD").addClass("left_GRAD_9");
            break;
    }
} //отрисовывыем наши поддерживающии ГРАДы
    
function rightGradDraw(){
    $("#right_ARTA_GRAD").removeClass();
    switch(enemyWholeGRAD){
        case 1: $("#right_ARTA_GRAD").addClass("right_GRAD_1");
            break;
        case 2: $("#right_ARTA_GRAD").addClass("right_GRAD_2");
            break;
        case 3: $("#right_ARTA_GRAD").addClass("right_GRAD_3");
            break;
        case 4: $("#right_ARTA_GRAD").addClass("right_GRAD_4");
            break;
        case 5: $("#right_ARTA_GRAD").addClass("right_GRAD_5");
            break;
        case 6: $("#right_ARTA_GRAD").addClass("right_GRAD_6");
            break;
        case 7: $("#right_ARTA_GRAD").addClass("right_GRAD_7");
            break;
        case 8: $("#right_ARTA_GRAD").addClass("right_GRAD_8");
            break;
        case 9: $("#right_ARTA_GRAD").addClass("right_GRAD_9");
            break;
    }
} //отрисовывыем вражеские поддерживающии ГРАДы
    
function leftPturDraw(){
    $("#left_PTUR").removeClass();
    if(ourAttackObject.PTUR == 0){
        return;
    }
    if(ourAttackObject.PTUR == 1){
        if(quantityOurPTUR == 1) $("#left_PTUR").addClass("left_PTUR_1");
        if(quantityOurPTUR == 0)$("#left_PTUR").addClass("left_PTUR_1_0");
    }
    if(ourAttackObject.PTUR == 2){
        if(quantityOurPTUR == 2) $("#left_PTUR").addClass("left_PTUR_2");
        if(quantityOurPTUR == 1)$("#left_PTUR").addClass("left_PTUR_2_1");
        if(quantityOurPTUR == 0)$("#left_PTUR").addClass("left_PTUR_2_0");
    }
    if(ourAttackObject.PTUR == 3){
        if(quantityOurPTUR == 3) $("#left_PTUR").addClass("left_PTUR_3");
        if(quantityOurPTUR == 2)$("#left_PTUR").addClass("left_PTUR_3_2");
        if(quantityOurPTUR == 1)$("#left_PTUR").addClass("left_PTUR_3_1");
        if(quantityOurPTUR == 0)$("#left_PTUR").addClass("left_PTUR_3_0");
    }
    if(ourAttackObject.PTUR == 4){
        if(quantityOurPTUR == 4)$("#left_PTUR").addClass("left_PTUR_4");
        if(quantityOurPTUR == 3)$("#left_PTUR").addClass("left_PTUR_4_3");
        if(quantityOurPTUR == 2)$("#left_PTUR").addClass("left_PTUR_4_2");
        if(quantityOurPTUR == 1)$("#left_PTUR").addClass("left_PTUR_4_1");
        if(quantityOurPTUR == 0)$("#left_PTUR").addClass("left_PTUR_4_0");
    }
    if(ourAttackObject.PTUR == 5){
        if(quantityOurPTUR == 5) $("#left_PTUR").addClass("left_PTUR_5");
        if(quantityOurPTUR == 4)$("#left_PTUR").addClass("left_PTUR_5_4");
        if(quantityOurPTUR == 3)$("#left_PTUR").addClass("left_PTUR_5_3");
        if(quantityOurPTUR == 2)$("#left_PTUR").addClass("left_PTUR_5_2");
        if(quantityOurPTUR == 1)$("#left_PTUR").addClass("left_PTUR_5_1");
        if(quantityOurPTUR == 0)$("#left_PTUR").addClass("left_PTUR_5_0");
    }
} // отрисовываем наши ПТУРы 
    
function rightPturDraw(){
    $("#right_PTUR").removeClass();
    if(enemyDefenseObject.PTUR == 0){
        return;
    }
    if(enemyDefenseObject.PTUR == 1){
        if(quantityEnemyPTUR == 1) $("#right_PTUR").addClass("right_PTUR_1");
        if(quantityEnemyPTUR == 0)$("#right_PTUR").addClass("right_PTUR_1_0");
    }
    if(enemyDefenseObject.PTUR == 2){
        if(quantityEnemyPTUR == 2) $("#right_PTUR").addClass("right_PTUR_2");
        if(quantityEnemyPTUR == 1)$("#right_PTUR").addClass("right_PTUR_2_1");
        if(quantityEnemyPTUR == 0)$("#right_PTUR").addClass("right_PTUR_2_0");
    }
    if(enemyDefenseObject.PTUR == 3){
        if(quantityEnemyPTUR == 3) $("#right_PTUR").addClass("right_PTUR_3");
        if(quantityEnemyPTUR == 2)$("#right_PTUR").addClass("right_PTUR_3_2");
        if(quantityEnemyPTUR == 1)$("#right_PTUR").addClass("right_PTUR_3_1");
        if(quantityEnemyPTUR == 0)$("#right_PTUR").addClass("right_PTUR_3_0");
    }
    if(enemyDefenseObject.PTUR == 4){
        if(quantityEnemyPTUR == 4)$("#right_PTUR").addClass("right_PTUR_4");
        if(quantityEnemyPTUR == 3)$("#right_PTUR").addClass("right_PTUR_4_3");
        if(quantityEnemyPTUR == 2)$("#right_PTUR").addClass("right_PTUR_4_2");
        if(quantityEnemyPTUR == 1)$("#right_PTUR").addClass("right_PTUR_4_1");
        if(quantityEnemyPTUR == 0)$("#right_PTUR").addClass("right_PTUR_4_0");
    }
    if(enemyDefenseObject.PTUR == 5){
        if(quantityEnemyPTUR == 5) $("#right_PTUR").addClass("right_PTUR_5");
        if(quantityEnemyPTUR == 4)$("#right_PTUR").addClass("right_PTUR_5_4");
        if(quantityEnemyPTUR == 3)$("#right_PTUR").addClass("right_PTUR_5_3");
        if(quantityEnemyPTUR == 2)$("#right_PTUR").addClass("right_PTUR_5_2");
        if(quantityEnemyPTUR == 1)$("#right_PTUR").addClass("right_PTUR_5_1");
        if(quantityEnemyPTUR == 0)$("#right_PTUR").addClass("right_PTUR_5_0");
    }
} // отрисовываем наши ПТУРы 
    
function captureEnemyField(target){
    findField(target).side = "our";
    var enemyArr = [];
    data.enemyFields.forEach(function(elem){
        if(elem != target){
            enemyArr.push(elem);
        }
    });
    data.enemyFields = [];
    data.enemyFields = copyArray(enemyArr);
    data.ourFields.push(target);
}
    
function captureOurField(target){
    findField(target).side = "enemy";
    var ourArr = [];
    data.ourFields.forEach(function(elem){
        if(elem != target){
            ourArr.push(elem);
        }
    });
    data.ourFields = [];
    data.ourFields = copyArray(ourArr);
    data.enemyFields.push(target);
}