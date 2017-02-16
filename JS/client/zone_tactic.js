var startTotalNumberOfOurTroops = 0;
var startTotalNumberOfEnemyTroops = 0;
var globalStep = 1;
var timer = 0;
var speed = 2.5;
var enemyTroopsUnitType;
var newPositionForEnemyTroops;
var allStepFields = [];
var battleCheck = 'no';
var clean = 'enemy our enemy_tank enemy_tank_target enemy_tank_walked enemy_BTR enemy_BTR_target enemy_BTR_walked enemy_ARTA enemy_ARTA_target enemy_ARTA_walked enemy_GRAD enemy_GRAD_target enemy_GRAD_walked enemy_infantery enemy_infantery_target enemy_infantery_walked enemy_infantery_trench enemy_infantery_trench_mine enemy_infantery_trench_walked enemy_infantery_trench_mine_walked';



function enemyRetreatFromDefense(){
    if(totalNumberOfEnemyTroopsInDefense() == 0){
        return false;
    }
    if((enemyDefenseObject.type != 'ARTA')&&(enemyDefenseObject.type != 'GRAD')){
    if((startTotalNumberOfEnemyTroops*0.3 > totalNumberOfEnemyTroopsInDefense())&&(OurShorts == 0)){
            ourAttackObject.position =  globalTarget;
            ourAttackObject.walked = 'yes'; 
            resultOfBattle = 'victory';
        
        if(calculationRetreatFieldsOfEnemyTroopsInDefense()==undefined){
            enemyDefenseObject.position = calculationRetreatFieldsOfEnemyTroopsInDefense();
            ourAttackObject.trench = 'no';
            ourAttackObject.mine = 'no';
            ourAttackObject.walked = 'yes';
            ourTankHelpIndicator = 'no';
            deleteEnemyTroops();
            alert('Враг сдался!');
        }else{              
            enemyDefenseObject.trench = 'no';
            enemyDefenseObject.mine = 'no';
            enemyDefenseObject.walked = 'yes';
            if (whoAttack == 'our'){
            ourAttackObject.trench = 'no';
            ourAttackObject.mine = 'no';
            ourAttackObject.walked = 'yes';
            ourTankHelpIndicator = 'no';
            }
            enemyDefenseObject.position = calculationRetreatFieldsOfEnemyTroopsInDefense();
            captureEnemyField(globalTarget);
            alert('Враг отступил!');
         
        }
        endOfBattleFunction();
        drawUnitsOfTwoSize();
        return false;
    }
    }
        return true;
} //отступленеие или сдача в плен противника

function ourRetreatFromDefense(){
    if(totalNumberOfOurTroopsInDefense() == 0){
//console.log('end 6')
        //endOfBattleFunction();
        return false;
    }
    if((ourAttackObject.type != 'ARTA')&&(ourAttackObject.type != 'GRAD')){
    if((startTotalNumberOfOurTroops*0.3 > totalNumberOfOurTroopsInDefense())&&(EnemyShorts == 0)){
            enemyDefenseObject.position = globalTarget;
console.log('enemyDefenseObject.position =' + enemyDefenseObject.position)
         
            ourAttackObject.walked = 'yes'; 
            resultOfBattle = 'defeat';  
        if(calculationRetreatFieldsOfOurTroopsInDefense()==undefined){
            ourAttackObject.position = calculationRetreatFieldsOfOurTroopsInDefense();
            deleteOurTroops();
            alert('Наше подразделение сдалось!');
        }else{                       
            ourAttackObject.trench = 'no';
            ourAttackObject.mine = 'no';
            ourAttackObject.walked = 'yes';
            if (whoAttack == 'enemy'){
            enemyDefenseObject.trench = 'no';
            enemyDefenseObject.mine = 'no';
            enemyDefenseObject.walked = 'yes';
        //РАЗОБРАТЬСЯ С ЭТИМ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            ourTankHelpIndicator = 'no'; 
        //РАЗОБРАТЬСЯ С ЭТИМ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            
            }
            captureOurField(globalTarget);
            alert('Наше подразделение отступило!');
        }
        if(ourAttackObject.retreatPosition != 'no'){
            ourAttackObject.position = ourAttackObject.retreatPosition;
console.lof('ourAttackObject.position ' + ourAttackObject.position)
        } else {
            ourAttackObject.position =  calculationRetreatFieldsOfOurTroopsInDefense();
            
console.log('ourAttackObject.position ' + ourAttackObject.position)            
        }
        endOfBattleFunction();
        return false;
    }
    }
        return true;
} //отступленеие или сдача в плен нашего подразделения

function totalNumberOfEnemyTroopsInDefense(){
    var totalNumber = 0;
    
    totalNumber = startTotalNumberOfEnemyTroops - enemyQuantityTankKIll - enemyQuantityBTRKIll - enemyQuantityInfantryKIll - enemyQuantityGunKIll - enemyQuantityARTAKIll - enemyQuantityGRADKIll;
       
    return  totalNumber;  
} //расчет общего количества обороняющегося противника

function totalNumberOfOurTroopsInDefense(){
    var totalNumber = 0;
    
    totalNumber = startTotalNumberOfOurTroops - ourQuantityTankKIll - ourQuantityBTRKIll - ourQuantityInfantryKIll - ourQuantityGunKIll - ourQuantityARTAKIll - ourQuantityGRADKIll;
       
    return  totalNumber;  
} //расчет общего количества обороняющегося противника

function calculationRetreatFieldsOfEnemyTroopsInDefense(){
   
    //temp = oneStepFunction(battleFieldTarget);
    
    var temp = [];      
    var temp1 = [];
    var temp2 = [];
    var temp3 = [];
    var temp4 = [];
    var enemyRetreatPositions = [];
    
    //temp = oneStepFunction(battleFieldTarget);
    temp = oneStepFunction(globalTarget);
//console.log(temp)
    
    for(var i=0; i<temp.length; i++){
        var temp1 = [];
        temp1 = oneStepFunction(temp[i]);
        temp1.forEach(function (field){
            temp2.push(field)
        })
    }
    for(var j=0; j<temp2.length; j++){
        if((data.enemyField().indexOf(temp2[j]) >= 0)&&(data.enemyTroops().indexOf(temp2[j])< 0 )&&
       (enemyRetreatPositions.indexOf(temp2[j]) < 0)&&(data.waterField().indexOf(temp2[j])< 0 )&&(enemyDefenseObject.position != temp2[j])&&(battleFieldTarget != temp2[j])){
            temp3.push(temp2[j]);
        } 
    }
    temp4 = deleteRepeat(temp3);
    temp4.forEach( function (unit) {
        if(unit != 'no')
           enemyRetreatPositions.push(unit) 
    });
    
    enemyRetreatPositions = random(enemyRetreatPositions);
//console.log(enemyRetreatPositions); 
   
    return enemyRetreatPositions[0];    
} //поля для отступления противника

function calculationRetreatFieldsOfOurTroopsInDefense(){ //поля для отступления наших войск
        
    var temp = [];      
    var temp1 = [];
    var temp2 = [];
    var temp3 = [];
    var temp4 = [];
    var ourRetreatPositions = [];
    
    //temp = oneStepFunction(battleFieldTarget);
    temp = oneStepFunction(globalTarget);
    
    for(var i=0; i<temp.length; i++){
        var temp1 = [];
        temp1 = oneStepFunction(temp[i]);
        temp1.forEach(function (field){
            temp2.push(field)
        })
    }
    for(var j=0; j<temp2.length; j++){
        if((data.ourField().indexOf(temp2[j]) >= 0)&&(data.ourTroops().indexOf(temp2[j])< 0 )&&
       (temp3.indexOf(temp2[j]) < 0)&&(data.waterField().indexOf(temp2[j])< 0 )&&(ourAttackObject.position != temp2[j])&&(battleFieldTarget != temp2[j])){
            temp3.push(temp2[j]);
        } 
    }
    temp4 = deleteRepeat(temp3);
    temp4.forEach(function (unit) {
        if(unit != 'no')
           ourRetreatPositions.push(unit) 
    });   
        
    ourRetreatPositions = random(ourRetreatPositions)
console.log(ourRetreatPositions); 
   
    return ourRetreatPositions[0];
        
} //поля для отступления наших войск

function findEnemyTroopsForId(ID){
    for(i=0; i<data.enemy.length; i++){
        if(data.enemy[i].ID == ID){
            return data.enemy[i];
        }
    }
} // найти юнит противника по ID

function findOurTroopsForId(ID){
    for(i=0; i<data.our.length; i++){
        if(data.our[i].ID == ID){
            return data.our[i];
        }
    }
} // найти наш юнит по ID

function minDistanceBetweenTwoPoints(point1, point2, ID){
    var result = 0;
    var arr = [];
    var arr2 = [];
    var arr3 = [];
    var temp = [];
    var allFields = data.allFields();
    var enemyCleanSteps =[];

//console.log('data.enemyStepsOnTour() = ' + data.enemyStepsOnTour())
    /*
    data.enemyStepsOnTour().forEach(function(unit){
        if(unit != findEnemyTroopsForId(ID).position){
           enemyCleanSteps.push(unit); 
        }
    })
    */
    data.enemyTroops().forEach(function(unit){
        if(unit != findEnemyTroopsForId(ID).position){
           enemyCleanSteps.push(unit); 
        }
    })
//console.log(enemyCleanSteps)   

    if(point1 == point2){
       return result;
    }
    if(!ID){
        enemyTroopsUnitType = 'infantery'
    }
    if(ID){
    if(findEnemyTroopsForId(ID).type == 'tank'){
            enemyTroopsUnitType = 'tank';
        }if(findEnemyTroopsForId(ID).type == 'BTR'){
            enemyTroopsUnitType = 'BTR';
        }if(findEnemyTroopsForId(ID).type == 'GRAD'){
            enemyTroopsUnitType = 'GRAD';
        }if(findEnemyTroopsForId(ID).type == 'ARTA'){
            enemyTroopsUnitType = 'ARTA';
        }if(findEnemyTroopsForId(ID).type == 'infantery'){
            enemyTroopsUnitType = 'infantery';
        }
    }
//console.log(enemyTroopsUnitType )    
    arr.push(point1);
    temp = oneStepFunction(point1);
    
    result = result + 1;
//console.log('temp ' + temp)

    for (j=0; j<temp.length; j++){
        
//console.log('temp[j] ' + temp[j])

    
        if((enemyTroopsUnitType == "tank")||(enemyTroopsUnitType == "BTR")||(enemyTroopsUnitType == "infantery")||(data.ourTroops().indexOf(point2)>=0)){
    if((allFields.indexOf(temp[j])>=0)&&(data.waterField().indexOf(temp[j]) < 0)&&(arr.indexOf(temp[j]) < 0)&&(arr2.indexOf(temp[j]) < 0)&&(enemyCleanSteps.indexOf(temp[j])<0)){ //
//log(temp[j])
        arr.push(temp[j]);
        arr2.push(temp[j]);
        if(temp[j] == point2){
            return result;
        }
    } 
        }
      
        if((enemyTroopsUnitType == "ARTA")||(enemyTroopsUnitType == "GRAD")){
    if((allFields.indexOf(temp[j])>=0)&&(data.waterField().indexOf(temp[j]) < 0)&&(arr.indexOf(temp[j]) < 0)&&(data.enemyStepsOnTour().indexOf(temp[j])<0)&&(arr2.indexOf(temp[j]) < 0)&&(data.ourTroops().indexOf(temp[j]) < 0)){
        arr.push(temp[j]);
        arr2.push(temp[j]);
        if(temp[j] == point2){
            return result;
        }
        } 
        } 
        }
    
//console.log('arr ' + arr)
//console.log('enemyCleanSteps ' + enemyCleanSteps)
//console.log('arr2 ' + arr2)

    if(arr2.length == 0){
        return 'stop';
        }
    
    while(true){ //тут какая-то херня
//console.log('step 3')  
    for(var n=0; n<arr2.length; n++){
    var temp = oneStepFunction(arr2[n]);
//console.log('temp3 ' + temp)         
    for (var k=0; k<temp.length; k++){
 
    if((allFields.indexOf(temp[k])>=0)&&(data.waterField().indexOf(temp[k]) < 0)&&(arr.indexOf(temp[k]) < 0)&&(enemyCleanSteps.indexOf(temp[k])<0)&&(arr2.indexOf(temp[k]) < 0)){
        arr.push(temp[k]);
        arr3.push(temp[k]);
    }           
    }
    }
        
//console.log('arr3 ' + arr3) 

    if(arr3.length == 0) {
//console.log('stop 2')
        return 'stop';
        }   
        
    result = result + 1;
    arr2.length = 0;
    for(m=0; m<arr3.length; m++){
        arr2[m] = arr3[m];
        if(arr3[m] == point2){
            return result;
        }
    }
    arr3.length = 0;
    } 
    
} //расчет минимального расстояния между двумя полями на карте

function minDistanceForAntiARTAAttack(point1, point2, ID){
    var result = 0;
    var arr = [];
    var arr2 = [];
    var arr3 = [];
    var temp = [];
    var allFields = data.allFields();
    var enemyCleanSteps =[];
    var ourCleanSteps =[];
    
    data.enemyStepsOnTour().forEach(function(unit){
        if(unit != findEnemyTroopsForId(ID).position){
           enemyCleanSteps.push(unit); 
        }
    });
    
    data.ourTroops().forEach(function (unit){
        if( unit!= point2){
           ourCleanSteps.push(unit) 
        }
    });
//console.log('enemyCleanSteps = ' + enemyCleanSteps) 
//console.log('ourCleanSteps = ' + ourCleanSteps)  

    if(point1 == point2){
       return result;
    }
   
//console.log(enemyTroopsUnitType )    
    arr.push(point1);
    temp = oneStepFunction(point1);
    
    result = result + 1;
//console.log('temp ' + temp)

    for (j=0; j<temp.length; j++){

    if((allFields.indexOf(temp[j])>=0)&&(data.waterField().indexOf(temp[j]) < 0)&&(arr.indexOf(temp[j]) < 0)&&(data.enemyStepsOnTour().indexOf(temp[j])<0)&&(arr2.indexOf(temp[j]) < 0)&&(ourCleanSteps.indexOf(temp[j]) < 0)){
        arr.push(temp[j]);
        arr2.push(temp[j]);
        if(temp[j] == point2){
            return result;
        }
        } 
        }
    
//console.log('arr ' + arr)
//console.log('arr2 ' + arr2)

    if(arr2.length == 0){
//console.log('stop 1' )
        return 'stop';
        }
    
    while(true){ 
//console.log('step 3')  
    for(var n=0; n<arr2.length; n++){
    var temp = oneStepFunction(arr2[n]);
//console.log('temp3 ' + temp)         
    for (var k=0; k<temp.length; k++){
        
//console.log('(ourCleanSteps.indexOf(temp[k])<0) = ' + (ourCleanSteps.indexOf(temp[k])<0));
//console.log('(enemyCleanSteps.indexOf(temp[k])<0) = ' + (enemyCleanSteps.indexOf(temp[k])<0))

    if((allFields.indexOf(temp[k])>=0)&&(data.waterField().indexOf(temp[k]) < 0)&&(arr.indexOf(temp[k]) < 0)/*&&(enemyCleanSteps.indexOf(temp[k])<0)*/&&(arr2.indexOf(temp[k]) < 0)&&(ourCleanSteps.indexOf(temp[k])<0)){
        arr.push(temp[k]);
        arr3.push(temp[k]);
    }           
    }
    }
        
//console.log('arr3 ' + arr3) 
//console.log('stop 2' )
    if(arr3.length == 0) {
        return 'stop';
        }   
        
    result = result + 1;
    arr2.length = 0;
    for(m=0; m<arr3.length; m++){
        arr2[m] = arr3[m];
        if(arr3[m] == point2){
            return result;
        }
    }
    arr3.length = 0;
    } 
    
} //расчет минимального расстояния для атаки на АРТУ и ГРАД

function ourTroopsNotRound(ID){
    var point1 = findOurTroopsForId(ID).position
    var point2 = data.ourBasePoint;
    //var result = 0;
    var arr = [];
    var arr2 = [];
    var arr3 = [];
    var temp = [];
    var allFields = data.allFields();
    
   
    if(point1 == point2){
       return true;
    }   
    arr.push(point1);
    temp = oneStepFunction(point1);

    for (j=0; j<temp.length; j++){

    if((allFields.indexOf(temp[j])>=0)&&(data.waterField().indexOf(temp[j]) < 0)&&(arr.indexOf(temp[j]) < 0)&&(data.ourField().indexOf(temp[j])>=0)&&(arr2.indexOf(temp[j]) < 0)){
        arr.push(temp[j]);
        arr2.push(temp[j]);
        if(temp[j] == point2){
            return true;
        }
        } 
        }

    if(arr2.length == 0){
        return false;
        }
    
    while(true){ 
    for(var n=0; n<arr2.length; n++){
    var temp = oneStepFunction(arr2[n]);
    for (var k=0; k<temp.length; k++){
         
         
    if((allFields.indexOf(temp[k])>=0)&&(data.waterField().indexOf(temp[k]) < 0)&&(arr.indexOf(temp[k]) < 0)&&(data.ourField().indexOf(temp[k])>=0)&&(arr2.indexOf(temp[k]) < 0)){
        arr.push(temp[k]);
        arr3.push(temp[k]);
    }           
    }
    }
        

    if(arr3.length == 0) {
        return false;
        }   
        
    //result = result + 1;
    arr2.length = 0;
    for(m=0; m<arr3.length; m++){
        arr2[m] = arr3[m];
        if(arr3[m] == point2){
            return true;
        }
    }
    arr3.length = 0;
    } 
    
} //расчет окружения нашего юнита

function enemyTroopsNotRound(ID){
    var point1 = findEnemyTroopsForId(ID).position
    var point2 = data.enemyBasePoint;
    var arr = [];
    var arr2 = [];
    var arr3 = [];
    var temp = [];
    var allFields = data.allFields();
    
   
    if(point1 == point2){
       return true;
    }   
    arr.push(point1);
    temp = oneStepFunction(point1);

    for (j=0; j<temp.length; j++){

    if((allFields.indexOf(temp[j])>=0)&&(data.waterField().indexOf(temp[j]) < 0)&&(arr.indexOf(temp[j]) < 0)&&(data.enemyField().indexOf(temp[j])>=0)&&(arr2.indexOf(temp[j]) < 0)){
        arr.push(temp[j]);
        arr2.push(temp[j]);
        if(temp[j] == point2){
            return true;
        }
        } 
        }

    if(arr2.length == 0){
        return false;
        }
    
    while(true){ 
    for(var n=0; n<arr2.length; n++){
    var temp = oneStepFunction(arr2[n]);
    for (var k=0; k<temp.length; k++){
         
         
    if((allFields.indexOf(temp[k])>=0)&&(data.waterField().indexOf(temp[k]) < 0)&&(arr.indexOf(temp[k]) < 0)&&(data.enemyField().indexOf(temp[k])>=0)&&(arr2.indexOf(temp[k]) < 0)){
        arr.push(temp[k]);
        arr3.push(temp[k]);
    }           
    }
    }

    if(arr3.length == 0) {
        return false;
        }   
    arr2.length = 0;
    for(m=0; m<arr3.length; m++){
        arr2[m] = arr3[m];
        if(arr3[m] == point2){
            return true;
        }
    }
    arr3.length = 0;
    } 
    
} //расчет окружения вражеского юнита

function enemyAttackMovePosition(ID, endPoint){
    var movePositions = [];    
    var temp = [];
    var temp2 =[];
    var tempWithOutWater=[];
    var minDistance;
    var tempDistance;
    var enemyObject = findEnemyTroopsForId(ID);
    var position  = enemyObject.position;
    var endPointNew = endPoint;
    
    
    if (position == endPointNew){
        allStepFields.push(position)
        //allStepFields = position;
        enemyObject.middlePosition = position;
        enemyObject.stepPosition = position;
        return position;
    }
    
    
    //Блок переназначения конечной точки маршрута если старая уже занята союзниками
    if(data.enemyTroops().indexOf(endPoint)>=0){    
        var tempPoints=[];
        var endPointNewArr = [];
        tempPoints = oneStepFunction(endPoint);
        tempPoints.forEach(function (unit){
            if((data.enemyTroops().indexOf(unit)<0)&&(data.allFields().indexOf(unit)>=0)&&(data.waterField().indexOf(unit)<0))/*&&((enemyObject.type == "infantery")||(enemyObject.type == "BTR")||(enemyObject.type == "tank")))*/{
 
            endPointNewArr.push(unit);
            }
            /*
            if((data.enemyTroops().indexOf(unit)<0)&&(data.allFields().indexOf(unit)>=0)&&(data.waterField().indexOf(unit)<0)&((enemyObject.type == "ARTA")||(enemyObject.type == "GRAD"))){
            
            endPointNewArr.push(unit);
            }*/
        })
        if(endPointNewArr.length>0){
            endPointNew = endPointNewArr[0];
        }
    }
    //Блок переназначения конечной точки маршрута если старая уже занята союзниками
    
//console.log('endPoint: ' + endPoint + ' endPointNew: ' + endPointNew)

    if(enemyObject.steps == 1){
        
    //enemyAttackMovePosition.oneStepFields = [];    
        
        var temp = oneStepFunction(position);
        if((enemyObject.type == 'ARTA')/*||(enemyObject.type == 'GRAD')*/){

            for(var i=0; i<temp.length; i++){
            if((data.waterField().indexOf(temp[i]) < 0)&&(data.allFields().indexOf(temp[i])>=0)&&(/*data.enemyStepsOnTour()*/data.enemyTroops().indexOf(temp[i]) < 0)&&(data.ourTroops().indexOf(temp[i])<0)&&(data.dangerFields().indexOf(temp[i])<0)){
           tempWithOutWater.push(temp[i]); 
        }
        }
        }
        if((enemyObject.type != 'ARTA')&&(enemyObject.type != 'GRAD')){
        for(var j=0; j<temp.length; j++){
//console.log(temp[j])
//console.log(data.enemyStepsOnTour())
//console.log((data.enemyStepsOnTour().indexOf(temp[j])< 0))

        if((data.waterField().indexOf(temp[j]) < 0)&&(data.allFields().indexOf(temp[j])>=0)&&(/*data.enemyStepsOnTour()*/data.enemyTroops().indexOf(temp[j])< 0)){
           tempWithOutWater.push(temp[j]); 
        }
        }
        }
//console.log(tempWithOutWater)
 
        
    }
    
    if(enemyObject.steps == 2){
        var temp = oneStepFunction(position);
        if(enemyObject.type == 'GRAD'){
            for(var i=0; i<temp.length; i++){
            if((data.waterField().indexOf(temp[i]) < 0)&&(data.allFields().indexOf(temp[i])>=0)&&(/*data.enemyStepsOnTour()*/data.enemyTroops().indexOf(temp[i]) < 0)&&(data.ourTroops().indexOf(temp[i])<0)){
           tempWithOutWater.push(temp[i]); 
        }
        }
        }
        if((enemyObject.type != 'ARTA')&&(enemyObject.type != 'GRAD')){
        for(var i=0; i<temp.length; i++){
        if((data.waterField().indexOf(temp[i]) < 0)&&(data.allFields().indexOf(temp[i])>=0)&&(data.enemyTroops().indexOf(temp[i]) < 0)){
           tempWithOutWater.push(temp[i]); 
        }
        }
        }
//ТЕСТОВОЕ    
       /* 
        if(enemyObject.type == "BTR"){
console.log('step 1 ' + tempWithOutWater)            
        }
      */  
//ТЕСТОВОЕ
        temp.length = 0;
        for(var i=0; i < tempWithOutWater.length; i++){
            temp = oneStepFunction(tempWithOutWater[i]);
            for(var j=0; j<temp.length; j++){
                if(temp2.indexOf(temp[j])<0){
                temp2.push(temp[j]);
            }
            }
        temp.length = 0;
        }
   //}
    if(enemyObject.type == 'GRAD'){
        for(var i=0; i<temp2.length; i++){
        if((data.waterField().indexOf(temp2[i]) < 0)&&(data.allFields().indexOf(temp2[i])>=0)&&(tempWithOutWater.indexOf(temp2[i]) < 0)&&(/*data.enemyStepsOnTour()*/data.enemyTroops().indexOf(temp2[i]) < 0)&&(data.ourTroops().indexOf(temp2[i])<0)&&(data.dangerFields().indexOf(temp2[i])<0)){
            tempWithOutWater.push(temp2[i]);
        }
        }
        }
    if(enemyObject.type != 'GRAD'){
        for(var i=0; i<temp2.length; i++){
        if((data.waterField().indexOf(temp2[i]) < 0)&&(data.allFields().indexOf(temp2[i])>=0)&&(tempWithOutWater.indexOf(temp2[i]) < 0)&&(/*data.enemyStepsOnTour()*/data.enemyTroops().indexOf(temp2[i]) < 0)){
            tempWithOutWater.push(temp2[i]);
        }
        }
        }
}
    
    allStepFields = tempWithOutWater;  
    minDistance = minDistanceBetweenTwoPoints(position, endPointNew, ID);
  
    
    
//ТЕСТОВОЕ    
     /*   
        if(enemyObject.type == "BTR"){
console.log('step 2 ' + tempWithOutWater)            
        }
     */   
//ТЕСТОВОЕ
    
    
//console.log('minDistance ' + minDistance)

    if(minDistance == 1){
        enemyObject.stepPosition = endPointNew;
        enemyObject.middlePosition = endPointNew;
//console.log('ID: ' + ID + ' stepPosition: ' + enemyObject.stepPosition + ' middlePosition: ' + enemyObject.middlePosition)
        return position;
    }
    
//!!!ПРОВЕРИТЬ РАБОТУ ЭТОГО КУСКА!!!//   
    
    if(minDistance == 'stop'){
        enemyObject.stepPosition = position;
        enemyObject.middlePosition = position;
//console.log('ID: ' + ID + ' stepPosition: ' + enemyObject.stepPosition + ' middlePosition: ' + enemyObject.middlePosition)
        return position;
    }
    
//!!!ПРОВЕРИТЬ РАБОТУ ЭТОГО КУСКА!!!// 
    
    for(var i=0; i<tempWithOutWater.length; i++){
        
    tempDistance = minDistanceBetweenTwoPoints(tempWithOutWater[i], endPointNew, ID);
        
        if(tempDistance == minDistance){
            movePositions.push(tempWithOutWater[i]);
        }
        if(tempDistance < minDistance){
            movePositions.length = 0;
            movePositions.push(tempWithOutWater[i]);
            minDistance = tempDistance;
        }
    }

    movePositions = random(movePositions);
 
    if(movePositions.length == 0){
        movePositions[0] = enemyObject.position;
    }
    /*
   //НЕ УБИРАТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for(var j=0; j<data.enemyStepsOnTour().length; j++){

        if(data.enemyStepsOnTour()[j] == enemyObject.position){
            data.enemyStepsOnTour()[j] = movePositions[0]
        }
    }
  */
 /*   
    if(data.our.length >=0){
        for(var i=0; i<data.our.length; i++){
            if(data.our[i].position == movePositions[0]){
//console.log('!!! globalTarget ' + globalTarget)
                //прописать функцию атаки противника
                  battleFieldTarget = movePositions[0];
                //enemyAttackFunction(ID)
             }  
        }
    }
 */
    // КУСОК РАСЧЕТА .middlePosition!!!!!!!!!!!!!!!!
    
    if(enemyObject.steps == 2){
        var start = position;
        var finish = movePositions[0];
    
        var temp1 = oneStepFunction(start);
        var temp2 = oneStepFunction(finish); 
        var middle = [];   
        
        
        if(minDistanceBetweenTwoPoints(finish, start, ID) == 1){
            enemyObject.stepPosition = movePositions[0];
            enemyObject.middlePosition = enemyObject.stepPosition;
            return ;
        }
        
        for(var i=0; i<temp1.length; i++){
            if(enemyTroopsUnitType != 'GRAD'){
              for(var j=0; j<temp2.length; j++){
                if((temp1[i] == temp2[j])&&(data.waterField().indexOf(temp1[i])< 0 )&&(data.enemyTroops().indexOf(temp1[i])< 0 )){ 
                   middle.push(temp1[i])
                }
            }  
            }
            if(enemyTroopsUnitType == 'GRAD'){
              for(var j=0; j<temp2.length; j++){
                if((temp1[i] == temp2[j])&&(data.waterField().indexOf(temp1[i])< 0 )&&(data.enemyTroops().indexOf(temp1[i])< 0 )&&(data.ourTroops().indexOf(temp2[j])<0)){ 
                   middle.push(temp1[i])
                }
            }  
            }
            
        }
        
        middle = random(middle);
        enemyObject.middlePosition = middle[0];    
        
        
        
    }
    if(enemyObject.steps == 1){
        enemyObject.middlePosition = enemyObject.position;
    }
    
    //КУСОК РАСЧЕТА .middlePosition!!!!!!!!!!!!!!!!
    
    
    enemyObject.stepPosition = movePositions[0];
    
//console.log('ID: ' + ID + ' middlePosition: ' + enemyObject.middlePosition +' stepPosition: ' + enemyObject.stepPosition )
    
    return movePositions[0];
} //расчет полей для хода атакующего противника

function enemyAttackMovePositionSecond(ID, endPoint){
    var movePositions = [];    
    var temp = [];
    var temp2 =[];
    var tempWithOutWater=[];
    var minDistance;
    var tempDistance;
    var enemyObject = findEnemyTroopsForId(ID);
    var position  = enemyObject.position;
    var endPointNew = endPoint;
    
    
    if (position == endPointNew){
        allStepFields.push(position)
        enemyObject.middlePosition = position;
        enemyObject.stepPosition = position;
        return position;
    } // если не нужно никуда ходить
    
    
    //Блок переназначения конечной точки маршрута если старая уже занята союзниками
    if(data.enemyTroops().indexOf(endPoint)>=0){
        var tempPoints=[];
        var endPointNewArr = [];
        tempPoints = oneStepFunction(endPoint);
        tempPoints.forEach(function (unit){
            if((data.enemyTroops().indexOf(unit)<0)&&(data.allFields().indexOf(unit)>=0)&&(data.waterField().indexOf(unit)<0))/*&&((enemyObject.type == "infantery")||(enemyObject.type == "BTR")||(enemyObject.type == "tank")))*/{
 
            endPointNewArr.push(unit);
            }
        })
        if(endPointNewArr.length>0){
            endPointNew = endPointNewArr[0];
        }
    }
    //Блок переназначения конечной точки маршрута если старая уже занята союзниками
//console.log('!!!endPoint: ' + endPoint + ' endPointNew: ' + endPointNew)   
    
    
    //------- Для АРТЫ  и ГРАДа если они находится в опасной зоне --------//
    
        if(((enemyObject.type == 'ARTA')||(enemyObject.type == 'GRAD'))&&(data.dangerFields().indexOf(enemyObject.position)>=0)){
            endPointNew = data.enemyBasePoint;
        }
        if(enemyObject.round > 2){ //попытка вырваться из окружения после 3 хода
            endPointNew = data.enemyBasePoint;
        }
        
    //------- Для АРТЫ  и ГРАДа если они находится в опасной зоне --------//

    if(enemyObject.steps == 1){   
        
        var temp = oneStepFunction(position);
        if((enemyObject.type == 'ARTA')){

            for(var i=0; i<temp.length; i++){
            if((data.waterField().indexOf(temp[i]) < 0)&&(data.allFields().indexOf(temp[i])>=0)&&(data.enemyTroops().indexOf(temp[i]) < 0)&&(data.ourTroops().indexOf(temp[i])<0)&&(data.dangerFields().indexOf(temp[i])<0)){
           tempWithOutWater.push(temp[i]); 
        }
        }
        }
//console.log(enemyObject + ' temp ' + tempWithOutWater + ' endPointNew ' + endPointNew)
        if((enemyObject.type != 'ARTA')&&(enemyObject.type != 'GRAD')){
        for(var j=0; j<temp.length; j++){

        if((data.waterField().indexOf(temp[j]) < 0)&&(data.allFields().indexOf(temp[j])>=0)&&(/*data.enemyStepsOnTour()*/data.enemyTroops().indexOf(temp[j])< 0)){
           tempWithOutWater.push(temp[j]); 
        }
        }
        }
        
    } // находим позиции для возможного хода пехоты и Арты
    
    if(enemyObject.steps == 2){
    var firstStepWithOutWater = [];
        var temp = oneStepFunction(position);
        if(enemyObject.type == 'GRAD'){
            for(var i=0; i<temp.length; i++){
            if((data.waterField().indexOf(temp[i]) < 0)&&(data.allFields().indexOf(temp[i])>=0)&&(data.dangerFields().indexOf(temp[i])<0)&&(data.ourTroops().indexOf(temp[i])<0)){
           firstStepWithOutWater.push(temp[i]); 
        }
        }
        }
        if(/*(enemyObject.type != 'ARTA')&&*/(enemyObject.type != 'GRAD')){
        for(var i=0; i<temp.length; i++){
        if((data.waterField().indexOf(temp[i]) < 0)&&(data.allFields().indexOf(temp[i])>=0)){
           firstStepWithOutWater.push(temp[i]); 
        }
        }
        }
        
//console.log(enemyObject.ID + ' point 1 ' + firstStepWithOutWater);
        
        temp.length = 0;
        for(var i=0; i < firstStepWithOutWater.length; i++){
            temp = oneStepFunction(firstStepWithOutWater[i]);
            for(var j=0; j<temp.length; j++){
                if(temp2.indexOf(temp[j])<0){
                temp2.push(temp[j]);
            }
            }
        temp.length = 0;
        }
        
    tempWithOutWater=[];    
    if(enemyObject.type == 'GRAD'){
        for(var i=0; i<temp2.length; i++){
        if((data.waterField().indexOf(temp2[i]) < 0)&&(data.allFields().indexOf(temp2[i])>=0)&&(tempWithOutWater.indexOf(temp2[i]) < 0)&&(/*data.enemyStepsOnTour()*/data.enemyTroops().indexOf(temp2[i]) < 0)&&(data.ourTroops().indexOf(temp2[i])<0)&&(data.dangerFields().indexOf(temp2[i])<0)){
            tempWithOutWater.push(temp2[i]);
        }
        }
        }
//console.log('tempWithOutWater - ' + tempWithOutWater.sort())
    if(enemyObject.type != 'GRAD'){
        for(var i=0; i<temp2.length; i++){
        if((data.waterField().indexOf(temp2[i]) < 0)&&(data.allFields().indexOf(temp2[i])>=0)&&(tempWithOutWater.indexOf(temp2[i]) < 0)&&(/*data.enemyStepsOnTour()*/data.enemyTroops().indexOf(temp2[i]) < 0)){
            tempWithOutWater.push(temp2[i]);
        }
        }
        }

//console.log('point 2 ' + tempWithOutWater);
        
}
    
    allStepFields = tempWithOutWater;  
//console.log('point 3 position : ' + position + ' endPointNew ' + endPointNew + ' ID - ' + ID)     
    
    minDistance = minDistanceBetweenTwoPoints(position, endPointNew, ID);
  
//console.log(ID + ' point 3 position : ' + position + ' endPointNew ' + endPointNew + ' minDistance - ' + minDistance) 

    if(minDistance == 1){
        enemyObject.stepPosition = endPointNew;
        enemyObject.middlePosition = endPointNew;
        return position;
    }
    
//!!!ПРОВЕРИТЬ РАБОТУ ЭТОГО КУСКА!!!//   
    
    if(minDistance == 'stop'){
        enemyObject.stepPosition = position;
        enemyObject.middlePosition = position;
        return position;
    }
    
//!!!ПРОВЕРИТЬ РАБОТУ ЭТОГО КУСКА!!!// 
    
    for(var i=0; i<tempWithOutWater.length; i++){
        
    tempDistance = minDistanceBetweenTwoPoints(tempWithOutWater[i], endPointNew, ID);
//console.log('tempDistance ' + tempDistance)        
        if(tempDistance == minDistance){
            movePositions.push(tempWithOutWater[i]);
        }
        if(tempDistance < minDistance){
            movePositions.length = 0;
            movePositions.push(tempWithOutWater[i]);
            minDistance = tempDistance;
        }
    }
//console.log('movePositions ' + movePositions)
    movePositions = random(movePositions);
    
//console.log('point 3 = ' + movePositions)    

    if(movePositions.length == 0){
        movePositions[0] = enemyObject.position;
    }
   
    for(var j=0; j<data.enemyStepsOnTour().length; j++){
        if(data.enemyStepsOnTour()[j] == enemyObject.position){
            data.enemyStepsOnTour()[j] = movePositions[0]
        }
    }
 
    
    
    
    //ВСТАВИТЬ КУСОК РАСЧЕТА .middlePosition!!!!!!!!!!!!!!!!
    
    if(enemyObject.steps == 2){
        var start = position;
        var finish = movePositions[0];
    
        var temp1 = oneStepFunction(start);
        var temp2 = oneStepFunction(finish); 
        var middle = [];   
        
        
        if(minDistanceBetweenTwoPoints(finish, start, ID) == 1){
            enemyObject.stepPosition = movePositions[0];
            enemyObject.middlePosition = enemyObject.stepPosition;
            return;
        }
        
        for(var i=0; i<temp1.length; i++){
            if(enemyTroopsUnitType != 'GRAD'){
              for(var j=0; j<temp2.length; j++){
                if((temp1[i] == temp2[j])&&(data.waterField().indexOf(temp1[i])< 0 )/*&&(data.enemyTroops().indexOf(temp1[i])< 0 )*/){ 
                   middle.push(temp1[i])
                }
            }  
            }
            if(enemyTroopsUnitType == 'GRAD'){
              for(var j=0; j<temp2.length; j++){
                if((temp1[i] == temp2[j])&&(data.waterField().indexOf(temp1[i])< 0 )/*&&(data.enemyTroops().indexOf(temp1[i])< 0 )*/&&(data.ourTroops().indexOf(temp2[j])<0)){ 
                   middle.push(temp1[i])
                }
            }  
            }            
        }
        
        middle = random(middle);
        enemyObject.middlePosition = middle[0];    
      
    }
    if(enemyObject.steps == 1){
        enemyObject.middlePosition = enemyObject.position;
    }
    
    //ВСТАВИТЬ КУСОК РАСЧЕТА .middlePosition!!!!!!!!!!!!!!!!

//console.log('point 4 = ' + movePositions)
    
    enemyObject.stepPosition = movePositions[0];
    
//console.log('!!! ID: ' + ID + ' middlePosition: ' + enemyObject.middlePosition +' stepPosition: ' + enemyObject.stepPosition ) ;
    
    return movePositions[0];
} // окончательный расчет полей для хода атакующего противника

function enemyCourse1(){
    speed = 1;
    $("#enemy_step_1").hide();
    $("#enemy_step_2").hide();
    $("#enemy_step_3").hide();
    $("#enemy_step_1_click").css('display', 'inline-block');
    $("#enemy_step_2_off").css('display', 'inline-block');
    $("#enemy_step_3_off").css('display', 'inline-block');
    
    battleCheck = 'no'
    
    enemyCourseMain();
} // функция подвешеная к кнопке "Ход противника"

function enemyCourse2(){
    speed = 2;
    $("#enemy_step_1").hide();
    $("#enemy_step_2").hide();
    $("#enemy_step_3").hide();
    $("#enemy_step_2_click").css('display', 'inline-block');
    $("#enemy_step_1_off").css('display', 'inline-block');
    $("#enemy_step_3_off").css('display', 'inline-block');
    
    battleCheck = 'no'
    
    enemyCourseMain();
} // функция подвешеная к кнопке "Ход противника"

function enemyCourse3(){
    speed = 3;
    $("#enemy_step_1").hide();
    $("#enemy_step_2").hide();
    $("#enemy_step_3").hide();
    $("#enemy_step_3_click").css('display', 'inline-block');
    $("#enemy_step_2_off").css('display', 'inline-block');
    $("#enemy_step_1_off").css('display', 'inline-block');
    
    battleCheck = 'no'
    
    enemyCourseMain();
} // функция подвешеная к кнопке "Ход противника"

function openEnemyCourse(){
    whoseTurn = 'enemy';
    init();
    $("#our_down").hide();
    $("#enemy_down").show();
    
    data.enemy.forEach(function (unit){
            if(unit.round>=5){
                
                alert("Противник " + unit.ID + " в окружении 5 ходов");
                
                unit.tank = 0;
                unit.BTR = 0;
                unit.infantery = 0;
                unit.mortar = 0;
                unit.GRAD = 0;
                unit.ARTA = 0;
                findField(unit.position).side = 'our';
                
            }
        })
            deleteEnemyTroops();                
            drawUnitsOfTwoSize();
    
    data.enemy.forEach(function (unit){
        if(enemyTroopsNotRound(unit.ID)){
            unit.round =0;
        }else{
            unit.round += 1;
        }
    });
	
	$('#our_save').show();
    $('#our_save_off').hide();
    $('#our_load').show();
    $('#our_load_off').hide();
    
    enemyDownNorma();
}


function enemyCourseMain(){
    
    whoseTurn = 'enemy';
    init();
    enemyUnitHealth();
     buttonShowFunction();
    
   var enemyTroopsForStep = [];
    
    data.our.forEach(function(unit){ // Заплатка для правильной работы renderingOurField(finish)
        unit.walked = 'no';
        drawUnitsOfTwoSize();
    })
        
    data.enemy.forEach(function(enemy){
        if((enemy.walked == 'yes')||(enemy.position == enemy.endPosition)){
            enemy.stop = 'yes';
        } else {
            enemy.stop = 'no';
        }
        enemy.retreatPosition = 'no';
    });
    
    data.enemy.forEach(function(enemy){
        if((enemy.stop != 'yes')&&((enemy.health >= 50)||(enemy.baseStep != 'yes'))){ 
            enemyTroopsForStep.push(enemy);
        }
    });

    if(enemyTroopsForStep.length == 0){
        $("#enemy_down").hide();
        $("#our_down").show();
        newCourse();
        
        data.our.forEach(function (unit){
            if(unit.round>=5){
                
                unit.tank = 0;
                unit.BTR = 0;
                unit.infantery = 0;
                unit.mortar = 0;
                unit.GRAD = 0;
                unit.ARTA = 0;
                findField(unit.position).side = 'enemy';
                
                alert(unit.name + " в окружении 5 ходов");
            }
        })
        
            deleteOurTroops();                
            drawUnitsOfTwoSize();
        whoseTurn = 'our';
        ourDownNorma();
        $("#our_back_step_off").css("display", "inline-block");
        $("#our_back_step").hide();
        return
    }  
        if(battleCheck == 'yes'){
            return
        }
    enemySteps(enemyTroopsForStep);
    
} 

//---------------------------------------------------------------------------------

function enemySteps(enemyTroops){ 
    enemyTroops.forEach(function(enemy){
        enemy.walked = 'no';
        enemy.stepPosition = '';
        enemy.middlePosition ='';
    });
    
    drawUnitsOfTwoSize();
    timer = 0;
    var firstSteps = [];
    var firstStepsPartOne = [];
    var firstStepsPartTwo = [];
    var secondSteps = [];
    var secondStepsPartOne = [];
    var secondStepsPartTwo = [];
    var allStepsPartOne = [];
    var allStepsPartTwo = [];
    
    var thirdSteps = [];
    var thirdStepsPartOne = [];
    var thirdStepsPartTwo = [];
      
    enemyTroops = random(enemyTroops); //случайная последовательность ходов противника 
    
    for(var i=0; i<enemyTroops.length; i++){
    var temp =[];
    var temp1 =[];
    var temp2 =[];
    var temp3 =[];
    var secondStepsFields = [];
    var thirdStepsFields = [];

        attackOurArtaOrGrad(enemyTroops[i]);      
        temp = allStepFields;
        
        for(var j=0; j<temp.length; j++){
            if((data.ourTroops().indexOf(temp[j])>=0)&&(enemyTroops[i].position != enemyTroops[i].endPosition)){
                thirdStepsFields.push(temp[j]);
                thirdSteps.push(enemyTroops[i].ID);
                break;
            }
        }
        
        
        for(var n=0; n<temp.length; n++){
            if((data.ourField().indexOf(temp[n])>=0)&&(thirdStepsFields.indexOf(temp[n])<0)&&(enemyTroops[i].position != enemyTroops[i].endPosition)){
                secondStepsFields.push(temp[n]);
                secondSteps.push(enemyTroops[i].ID);
                break;
            }        
        }
        
        
        for(var k=0; k<temp.length; k++){
            if((secondStepsFields.indexOf(temp[k])<0)&&(thirdStepsFields.indexOf(temp[k])<0)&&(enemyTroops[i].position != enemyTroops[i].endPosition)){
                firstSteps.push(enemyTroops[i].ID);
                break;
            }
        }
        
       // }
    }
    
    temp1 = deleteRepeat(firstSteps);
    temp2 = deleteRepeat(secondSteps);
    temp3 = deleteRepeat(thirdSteps);
    
    firstSteps.length = 0;
    secondSteps.length = 0;
    thirdSteps.length = 0;
    
    thirdSteps = temp3;
    secondSteps = cleaningTwoArray(thirdSteps, temp2);
    firstSteps = cleaningTwoArray(secondSteps, cleaningTwoArray(thirdSteps, temp1));
    
    firstSteps.forEach(function(step1){
        if(findEnemyTroopsForId(step1).steps == 1){
            firstStepsPartOne.push(step1)
        }if(findEnemyTroopsForId(step1).steps == 2){
            firstStepsPartTwo.push(step1)
        }
    });
    
    if(secondSteps[0] != undefined){
    secondSteps.forEach(function(step2){
        if(findEnemyTroopsForId(step2).steps == 1){
            secondStepsPartOne.push(step2)
        }if(findEnemyTroopsForId(step2).steps == 2){
            secondStepsPartTwo.push(step2)
        }
    });
    }
    
    if(thirdSteps[0] != undefined){
    thirdSteps.forEach(function(step3){

        if(findEnemyTroopsForId(step3).steps == 1){
            thirdStepsPartOne.push(step3)
        }if(findEnemyTroopsForId(step3).steps == 2){
            thirdStepsPartTwo.push(step3)
        }
    });
    }
    
    allStepsPartOne = firstStepsPartTwo.concat(secondStepsPartTwo, thirdStepsPartTwo, secondStepsPartOne, firstStepsPartOne, thirdStepsPartOne);
    

    var tempStepsPartOne = copyArray(allStepsPartOne);
        //Определяем последовательность ходов
    for(var step=0; step<tempStepsPartOne.length; step++){
    for(var i=0; i<tempStepsPartOne.length; i++){
            for(var j=0; j<tempStepsPartOne.length; j++){
            if(findEnemyTroopsForId(tempStepsPartOne[j]).stepPosition == findEnemyTroopsForId(tempStepsPartOne[i]).position){
                var test = allStepsPartOne.splice(i, 1);
                for(var n=0; n<test.length; n++){
                    allStepsPartOne.unshift(test[n]);
                }
            } 
            
                tempStepsPartOne = copyArray(allStepsPartOne);
                
            if(findEnemyTroopsForId(tempStepsPartOne[i]).stepPosition == findEnemyTroopsForId(tempStepsPartOne[j]).position){
                var test2 = allStepsPartOne.splice(i, 1);
                for(var k=0; k<test2.length; k++){
                allStepsPartOne.push(test2[k]);
                }
            } 
                
            }
        }
    }
    
console.log(allStepsPartOne)
    
    if(allStepsPartOne.length==0){
        $("#enemy_down").hide();
        $("#our_down").show();
        newCourse();
    }
    
    battleCheck = 'no';
   timer = 0;
    //---------------------------------------------------------------------------------
    
    
    allStepsPartOne.forEach(function(unit){
        if(findEnemyTroopsForId(unit).steps == 1){
         
        if(battleCheck == 'no'){
            timer = timer + 1200;       
            
            setTimeout(function(){
                
                attackOurArtaOrGradSecond(findEnemyTroopsForId(unit));
                
                if(battleCheck == 'no'){
                    
                if(data.our.length >=0){
                for(var i=0; i<data.our.length; i++){
                if(data.our[i].position == findEnemyTroopsForId(unit).stepPosition){
                    
                        battleFieldTarget = findEnemyTroopsForId(unit).stepPosition;
                    }  
                    }
                }  

                        oneEnemyUnitStory(unit);
               
                        drawUnitsOfTwoSize();
                
                if((data.ourTroops().indexOf(findEnemyTroopsForId(unit).stepPosition)>=0)&&(battleCheck == 'no')){
                                    battleCheck = 'yes';
                                    
            }
            }                                 
            }, timer/speed);
            timer = timer + 700;             
        }
        }
        

        
        if(findEnemyTroopsForId(unit).steps == 2){

        if(battleCheck == 'no'){    
            timer = timer + 2200;      
            setTimeout(function(){
                attackOurArtaOrGradSecond(findEnemyTroopsForId(unit));
            if(battleCheck == 'no'){

                function newPosition2(){
                if(data.our.length >=0){
                for(var i=0; i<data.our.length; i++){
                if(data.our[i].position == findEnemyTroopsForId(unit).middlePosition){
                    
                        battleFieldTarget = findEnemyTroopsForId(unit).middlePosition;
                    return
                    }  
                }
                for(var j=0; j<data.our.length; j++){    
                if((data.our[j].position != findEnemyTroopsForId(unit).middlePosition)&&(data.our[j].position == findEnemyTroopsForId(unit).stepPosition)){
                    
                        battleFieldTarget = findEnemyTroopsForId(unit).stepPosition;
                    return
                    }  
                    }    
                    
                }
                } 
                newPosition2();

                    oneEnemyUnitStory(unit);
               
                    drawUnitsOfTwoSize();
                
            if(((data.ourTroops().indexOf(findEnemyTroopsForId(unit).stepPosition)>=0)||(data.ourTroops().indexOf(findEnemyTroopsForId(unit).middlePosition)>=0))&&(battleCheck == 'no')){
                    battleCheck = 'yes'; 
            }
            }
            }, timer/speed);
            timer = timer + 700;  
        }
        }
        timer = timer + 200;
    }); //Выполнение ходов юнитами противника
    
    //---------------------------------------------------------------------------------
    
    
    data.enemy.forEach(function(unit){
        if(((unit.type == 'infantery')||(unit.type == 'BTR'))&&(unit.position == unit.endPosition)&&(unit.trench == 'no')&&(allStepsPartOne.indexOf(unit.ID) < 0)){
            unit.trench = 'yes';
        }
        if(((unit.type == 'infantery')||(unit.type == 'BTR'))&&(unit.position== unit.endPosition)&&(unit.trench == 'yes')&&(allStepsPartOne.indexOf(unit.ID) < 0)){
            unit.mine = 'yes';
        }
    }); // Окопы и мины для пехоты и БТР на endStep
    
    data.calculationMap();
    setTimeout(function(){drawUnitsOfTwoSize()}, (timer + 1500)/speed);    
    setTimeout(function(){enemyDownNorma()}, (timer + 1510)/speed);
    
    return;
} //ход противника (timer меняем только тут)

//---------------------------------------------------------------------------------

function enemyAttackFunction(ID){
    
            whoAttack = 'enemy';
    // обнуляем все связанное с тактическим полем
        
            shorts = 0;
            OurShorts = 0;
            EnemyShorts = 0;
            numberOfOurShort = 0;
            numberOfEnemyShort = 0;
            
            //document.getElementById('ourGradIcon').setAttribute('class', 'not_rounded');
            //document.getElementById('ourArtaIcon').setAttribute('class', 'not_rounded');
            //document.getElementById('ourTrenchesIcon').setAttribute('class', 'not_rounded');
            //document.getElementById('enemyGradIcon').setAttribute('class', 'not_rounded');
            //document.getElementById('enemyArtaIcon').setAttribute('class', 'not_rounded');
            //document.getElementById('enemyTrenchesIcon').setAttribute('class', 'not_rounded');
        
        // обнуляем все связанное с тактическим полем
    
            document.getElementById('battlefield').style.display = 'block';
            document.getElementById('wrap_field').style.display = 'none';			
            document.getElementById('preload').style.display = 'none';
            document.getElementById('main').style.display = 'none';
    
        ourAttackObject = findOurTroops(battleFieldTarget);
        enemyDefenseObject = findEnemyTroopsForId(ID);
        //findEnemyTroopsForId(ID).retreatPosition = findEnemyTroopsForId(ID).position;
//console.log('ID ' + ID)
        
        
        //ourWholeGRAD = 0; если мы атакуем
        //ourWholeARTA = 0; если мы атакуем
        //enemyWholeGRAD = 0;
        //enemyWholeARTA = 0;
        needToKill ='not-need';
        
        show_00();
}

function enemyOneStepDrawFunction(start, finish, ID, step){

    if(start != finish){
    if(data.ourTroops().indexOf(finish) >= 0){
        enemyOneStepAttackDrawFunction(start, finish, ID);
        return;
    }
        if(findEnemyTroops(start).type == 'infantery'){
            enemyTroopsUnitType = 'infantery';
        }if(findEnemyTroops(start).type == 'ARTA'){
            enemyTroopsUnitType = 'ARTA';
        }
        
    var direction = directionFunction(start, finish);
            
        
            
    if(enemyTroopsUnitType == 'infantery'){
//console.log('inf go')        
        setTimeout(function(){$("#"+start).removeClass("clean")}, 0/speed);        
        setTimeout(function(){$("#"+start).addClass("enemy_infantery_target")}, 0/speed);
        
        setTimeout(function(){$("#"+finish).addClass(direction)}, 500/speed);
        setTimeout(function(){$("#"+finish).toggleClass(direction)}, 1000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_infantery")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_infantery enemy_infantery_walked")}, 1150/speed);
        setTimeout(function(){findEnemyTroopsForId(ID).trench = 'no'}, 1000/speed);
        
    }
    if(enemyTroopsUnitType == 'ARTA'){
        
        setTimeout(function(){$("#"+start).removeClass("clean")}, 0/speed);        
        setTimeout(function(){$("#"+start).addClass("enemy_ARTA_target")}, 0/speed);
        setTimeout(function(){$("#"+finish).addClass(direction)}, 500/speed);
        setTimeout(function(){$("#"+finish).toggleClass(direction)}, 1000/speed);
        setTimeout(function(){$("#"+finish).addClass("enemy_ARTA")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_ARTA enemy_ARTA_walked")}, 1150/speed);
        
    }
          
    drawUnitsOfTwoSize();    
}
}

function enemyOneStepAttackDrawFunction(start, finish, ID){
        if(findEnemyTroops(start).type == 'infantery'){
            enemyTroopsUnitType = 'infantery';
        }if(findEnemyTroops(start).type == 'ARTA'){
            enemyTroopsUnitType = 'ARTA';
        }
        
        var direction = directionFunction(start, finish);
        
    
    if(data.ourTroops().indexOf(finish) < 0){ //Описываем захват нашего пустого поля
        if(enemyTroopsUnitType == 'infantery'){
            
            setTimeout(function(){$("#"+start).removeClass("clean")}, 0/speed);        
            setTimeout(function(){$("#"+start).addClass("enemy_infantery_target")}, 0/speed);
            setTimeout(function(){$("#"+finish).toggleClass('our enemy')}, 500/speed);
            setTimeout(function(){$("#"+finish).addClass(direction)}, 500/speed);
            setTimeout(function(){$("#"+finish).toggleClass(direction)}, 1000/speed);
            setTimeout(function(){$("#"+finish).toggleClass("enemy_infantery")}, 1000/speed);
            setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
            setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
            setTimeout(function(){$("#"+finish).toggleClass("enemy_infantery enemy_infantery_walked")}, 1150/speed);
            setTimeout(function(){findEnemyTroopsForId(ID).trench = 'no'}, 1000/speed);

        }
        if(enemyTroopsUnitType == 'ARTA'){

            setTimeout(function(){$("#"+start).removeClass("clean")}, 0/speed);        
            setTimeout(function(){$("#"+start).addClass("enemy_ARTA_target")}, 0/speed);
            setTimeout(function(){$("#"+finish).toggleClass('our enemy')}, 500/speed);
            setTimeout(function(){$("#"+finish).addClass(direction)}, 500/speed);
            setTimeout(function(){$("#"+finish).toggleClass(direction)}, 1000/speed);
            setTimeout(function(){$("#"+finish).toggleClass("enemy_ARTA")}, 1000/speed);
            setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
            setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
            setTimeout(function(){$("#"+finish).toggleClass("enemy_ARTA enemy_ARTA_walked")}, 1150/speed);
            setTimeout(function(){findEnemyTroopsForId(ID).trench = 'no'}, 1000/speed);
        }
        
    }
   
    if(data.ourTroops().indexOf(finish) >= 0){ //Описываем бой с нашим подразделением
        if(start != finish){
        
//console.log('battle') 
            //battleFieldTarget = finish;
            
            timer = 0;
            
        if(enemyTroopsUnitType == 'infantery'){
        preparationOurField(finish, direction);
//console.log('battle INF')            
        setTimeout(function(){$("#"+start).removeClass(clean)}, timer/speed);
        setTimeout(function(){$("#"+start).addClass("enemy enemy_infantery_target")}, timer/speed);
        setTimeout(function(){enemyAttackFunction(ID)}, (timer + 1500)/speed);
        renderingOurField(finish);
        }
        if(enemyTroopsUnitType == 'BTR'){
//console.log('battle BTR')
        preparationOurField(finish, direction);
        setTimeout(function(){$("#"+start).removeClass("enemy_infantery_target enemy_infantery_walked enemy_infantery enemy_infantery_trench enemy_infantery_trench_mine enemy_BTR_target enemy_BTR enemy_BTR_walked")}, timer/speed);    
        setTimeout(function(){$("#"+start).addClass("enemy enemy_BTR_target")}, 0/speed);          
        setTimeout(function(){enemyAttackFunction(ID)}, 1500/speed);
        renderingOurField(finish);
        }
        if(enemyTroopsUnitType == 'tank'){
        preparationOurField(finish, direction);
        setTimeout(function(){$("#"+start).removeClass("enemy_tank_target enemy_tank_walked enemy_tank")}, timer/speed);  
        setTimeout(function(){$("#"+start).addClass("enemy enemy_tank_target")}, timer/speed);          
        setTimeout(function(){enemyAttackFunction(ID)}, (timer + 1500)/speed);
        renderingOurField(finish);
        }       
        if(enemyTroopsUnitType == 'ARTA'){
        preparationOurField(finish, direction);
        setTimeout(function(){$("#"+start).removeClass("enemy_ARTA_target enemy_ARTA_walked enemy_ARTA")}, timer/speed);  
        setTimeout(function(){$("#"+start).addClass("enemy enemy_ARTA_target")}, timer/speed);              
        setTimeout(function(){enemyAttackFunction(ID)}, (timer + 1500)/speed);
        renderingOurField(finish);
        } 
        if(enemyTroopsUnitType == 'GRAD'){
console.log(findEnemyTroopsForId(ID))
        preparationOurField(finish, direction); 
        setTimeout(function(){$("#"+start).removeClass("enemy_GRAD_target enemy_GRAD_walked enemy_GRAD")}, timer/speed);  
        setTimeout(function(){$("#"+start).addClass("enemy enemy_GRAD_target")}, timer/speed)              
        setTimeout(function(){enemyAttackFunction(ID)}, (timer + 1500)/speed);
        renderingOurField(finish);
        } 
            
            
        }
    }
    findEnemyTroopsForId(ID).walked = 'yes';
        
    if ((enemyTroopsUnitType == 'infantery')||(enemyTroopsUnitType == 'BTR')){
        findEnemyTroopsForId(ID).trench = 'no';
    }
}

function directionFunction(start, finish) {
    
    var direction;
    var temp = oneStepFunction(start);
    if(start.substring(0, 2) % 2 != 0){
        for(var i=0; i<temp.length; i++){
            if(data.enemyField().indexOf(finish) >=0 ){
        if(temp[0] == finish){direction = 'enemy_can_attack_6'}
        if(temp[1] == finish){direction = 'enemy_can_attack_1'}
        if(temp[2] == finish){direction = 'enemy_can_attack_2'}
        if(temp[3] == finish){direction = 'enemy_can_attack_3'}
        if(temp[4] == finish){direction = 'enemy_can_attack_4'}
        if(temp[5] == finish){direction = 'enemy_can_attack_5'}
    }if(data.ourField().indexOf(finish) >=0 ){
        if(temp[0] == finish){direction = 'enemy_can_attack_16'}
        if(temp[1] == finish){direction = 'enemy_can_attack_11'}
        if(temp[2] == finish){direction = 'enemy_can_attack_12'}
        if(temp[3] == finish){direction = 'enemy_can_attack_13'}
        if(temp[4] == finish){direction = 'enemy_can_attack_14'}
        if(temp[5] == finish){direction = 'enemy_can_attack_15'}
    }
    }
    }
    if(start.substring(0, 2) % 2 == 0){
        for(var i=0; i<temp.length; i++){
            if(data.enemyField().indexOf(finish) >=0 ){
        if(temp[0] == finish){direction = 'enemy_can_attack_6'}
        if(temp[1] == finish){direction = 'enemy_can_attack_1'}
        if(temp[2] == finish){direction = 'enemy_can_attack_5'}
        if(temp[3] == finish){direction = 'enemy_can_attack_2'}
        if(temp[4] == finish){direction = 'enemy_can_attack_3'}
        if(temp[5] == finish){direction = 'enemy_can_attack_4'}
    }if(data.ourField().indexOf(finish) >=0 ){
        if(temp[0] == finish){direction = 'enemy_can_attack_16'}
        if(temp[1] == finish){direction = 'enemy_can_attack_11'}
        if(temp[2] == finish){direction = 'enemy_can_attack_15'}
        if(temp[3] == finish){direction = 'enemy_can_attack_12'}
        if(temp[4] == finish){direction = 'enemy_can_attack_13'}
        if(temp[5] == finish){direction = 'enemy_can_attack_14'}
    }
    }
    }
    return direction;
}

function preparationOurField(finish, direction){
        
        setTimeout(function(){$("#"+finish).removeClass(clean)}, 500/speed);
        setTimeout(function(){$("#"+finish).addClass('line_1_cell enemy')}, 500/speed);        
        setTimeout(function(){$("#"+finish).addClass(direction)}, 500/speed);      
        setTimeout(function(){$("#"+finish).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+finish).addClass('line_1_cell')}, 1000/speed);
}

function renderingOurField(finish){
        for(var i=0; i<data.our.length; i++){
        
            if(data.our[i].position == finish){
                
                if((data.our[i].type == 'infantery')&&(data.our[i].trench == 'no'))
                {setTimeout(function(){$("#"+finish).addClass("our our_infantery_attack")}, 1000/speed); }
                if((data.our[i].type == 'infantery')&&(data.our[i].trench == 'yes')&&(data.our[i].mine != 'yes')){setTimeout(function(){$("#"+finish).addClass("our our_infantery_trench_attack")}, 1000/speed); 
                }if((data.our[i].type == 'infantery')&&(data.our[i].trench == 'yes')&&(data.our[i].mine == 'yes'))
                {setTimeout(function(){$("#"+finish).addClass("our our_infantery_trench_mine_attack")}, 1000/speed); 
                }
                
                if((data.our[i].type == 'BTR')&&(data.our[i].trench == 'no'))
                {setTimeout(function(){$("#"+finish).addClass("our our_BTR_attack")}, 1000/speed); 
                }if((data.our[i].type == 'BTR')&&(data.our[i].trench == 'yes')&&(data.our[i].mine != 'yes')){setTimeout(function(){$("#"+finish).addClass("our our_infantery_trench_attack")}, 1000/speed); 
                }if((data.our[i].type == 'BTR')&&(data.our[i].trench == 'yes')&&(data.our[i].mine == 'yes'))
                {setTimeout(function(){$("#"+finish).addClass("our our_infantery_trench_mine_attack")}, 1000/speed); 
                }
                if(data.our[i].type == 'tank')
                {setTimeout(function(){$("#"+finish).addClass("our our_tank_attack1")}, 1000/speed);} 
                if(data.our[i].type == 'ARTA')
                {setTimeout(function(){$("#"+finish).addClass("our our_ARTA_attack")}, 1000/speed);}
                if(data.our[i].type == 'GRAD')
                {setTimeout(function(){$("#"+finish).addClass("our our_GRAD_attack")}, 1000/speed);} 
            }
        }
}    

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

function enemyGlobalMoveFunction(start, finish, ID){
//console.log('test 45')
//console.log('GMF - ID: ' + ID + ' start: ' + start + ' finish: ' + finish)
    if(start != finish){
    if(findEnemyTroopsForId(ID).type == 'infantery'){        
        if(data.enemyField().indexOf(finish) >=0){
//console.log('test 55')
            enemyOneStepDrawFunction(start, finish, ID);
        }if(data.ourField().indexOf(finish) >=0){
            enemyOneStepAttackDrawFunction(start, finish, ID);
        }
    }
    if(findEnemyTroopsForId(ID).type == 'ARTA'){
        if(data.enemyField().indexOf(finish) >=0){
            enemyOneStepDrawFunction(start, finish, ID);
        }if(data.ourField().indexOf(finish) >=0){
            enemyOneStepAttackDrawFunction(start, finish, ID);
        }
    }
    if((findEnemyTroopsForId(ID).type == 'tank')||(findEnemyTroopsForId(ID).type == 'BTR')){
//console.log('BTR start')    
        //enemyTwoStepMoveMove(ID);
        enemyTwoStepDrawFunction(start, finish, ID);
        }
    if(findEnemyTroopsForId(ID).type == 'GRAD'){
        enemyTwoStepDrawFunction(start, finish, ID);
    }
    }else{
        enemyUnitDontMove(start, finish, ID);
    }
}

function oneEnemyUnitStory(ID){
    
    var newPositionForEnemyTroops;
    
    if(newPositionForEnemyTroops != findEnemyTroopsForId(ID).position){
    if(findEnemyTroopsForId(ID).steps == 1){   
    enemyGlobalMoveFunction(findEnemyTroopsForId(ID).position, findEnemyTroopsForId(ID).stepPosition, ID);
    setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 1000/speed);
    setTimeout(function(){findEnemyTroopsForId(ID).walked = 'yes'}, 1000/speed);
    }
    if(findEnemyTroopsForId(ID).steps == 2){
    enemyGlobalMoveFunction(findEnemyTroopsForId(ID).position, findEnemyTroopsForId(ID).stepPosition, ID);
    //setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2200/speed);
    setTimeout(function(){findEnemyTroopsForId(ID).walked = 'yes'}, 2200/speed);    
    }
}
}

function enemyTwoStepDrawFunction(start, finish, ID){
        
//console.log('start ' + start + ' finish ' +finish + ' md ' + minDistanceBetweenTwoPoints(finish, start, ID))
    if(start != finish){
        if(findEnemyTroops(start).type == 'tank'){
            enemyTroopsUnitType = 'tank';
        }if(findEnemyTroops(start).type == 'BTR'){
            enemyTroopsUnitType = 'BTR';
        }if(findEnemyTroops(start).type == 'GRAD'){
            enemyTroopsUnitType = 'GRAD';
        }
        if(minDistanceBetweenTwoPoints(finish, start, ID) == 'stop'){
            return;
        }
        
//console.log('start two steps')
         var middle = findEnemyTroopsForId(ID).middlePosition;
            
        //описываем движение по полям противника
                
        if((data.enemyField().indexOf(middle)>=0)&&(data.enemyField().indexOf(finish)>=0)){
//console.log('BTR 1')
            enemyTwoStepMoveMove(ID);
            
        }
        //описываем один ход по полю противника и один по нашему
            
        if((data.enemyField().indexOf(middle)>=0)&&(data.ourField().indexOf(finish)>=0)&&(data.ourTroops().indexOf(finish)<0)){
//console.log('BTR 2')            
            enemyTwoStepMoveAttack(ID);
        }
        
        
        //описываем захват 2 наших полей без боя
            
        if((data.ourField().indexOf(middle)>=0)&&(data.ourTroops().indexOf(middle) < 0)&&(data.ourTroops().indexOf(finish) < 0)&&(data.ourField().indexOf(finish)>=0)){
//console.log('BTR 3')             
            enemyTwoStepAttackAttack(ID);
        }
        
        //описываем 1 хода по полю противника и бой на втором ходу
        if((data.enemyField().indexOf(middle)>=0)&&(data.ourField().indexOf(finish)>=0)&&(data.ourTroops().indexOf(finish) >= 0)){
            
//console.log('BTR 4')            
            enemyTwoStepMoveBattle(ID);
        }
    
            
            //описываем захват 1 нашего полея без боя и бой на втором поле
            
        if((data.ourField().indexOf(middle)>=0)&&(data.ourTroops().indexOf(middle) < 0)&&(data.ourTroops().indexOf(finish) >= 0)){
//console.log('BTR 5')

            enemyTwoStepAttackBattle(ID);
            
        }
        
        //описываем бой на первом ходу
            
        if((data.ourField().indexOf(middle)>=0)&&(data.ourTroops().indexOf(middle) >= 0)){
//console.log('BTR 6') 
            enemyOneStepAttackDrawFunction(start, middle, ID);
        }
        if(enemyTroopsUnitType == 'BTR'){
        findEnemyTroopsForId(ID).trench = 'no';
        findEnemyTroopsForId(ID).mine = 'no';
        }
   // }
    }
}

function enemyTwoStepMoveMove(ID){
    var start = findEnemyTroopsForId(ID).position;
    var middle = findEnemyTroopsForId(ID).middlePosition;
    var finish = findEnemyTroopsForId(ID).stepPosition;
    var type = findEnemyTroopsForId(ID).type;
    var direction1 = directionFunction(start, middle);
    var direction2 = directionFunction(middle, finish);
    
    if(type == 'BTR'){
//console.log('2 step move BTR')
        $("#"+start).toggleClass("enemy_BTR enemy_BTR_target");
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_BTR")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        
        setTimeout(function(){$("#"+finish).addClass(direction2)}, 1500/speed);
        setTimeout(function(){$("#"+finish).toggleClass(direction2)}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_BTR")}, 2000/speed);
        setTimeout(function(){$("#"+middle).removeClass(clean)}, 2000/speed);
        setTimeout(function(){$("#"+middle).addClass('line_1_cell enemy')}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_BTR enemy_BTR_walked")}, 2200/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed);
    }
    if(type == 'tank'){
        setTimeout(function(){$("#"+start).toggleClass("enemy_tank enemy_tank_target")}, 0/speed);
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_tank")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);

        setTimeout(function(){$("#"+finish).addClass(direction2)}, 1500/speed);
        setTimeout(function(){$("#"+finish).toggleClass(direction2)}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_tank")}, 2000/speed);
        setTimeout(function(){$("#"+middle).removeClass(clean)}, 2000/speed);
        setTimeout(function(){$("#"+middle).addClass('line_1_cell enemy')}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_tank enemy_tank_walked")}, 2200/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed);
    }
    if(type == 'GRAD'){
        $("#"+start).toggleClass("enemy_GRAD enemy_GRAD_target");
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_GRAD")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        
        setTimeout(function(){$("#"+finish).addClass(direction2)}, 1500/speed);
        setTimeout(function(){$("#"+finish).toggleClass(direction2)}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_GRAD")}, 2000/speed);
        setTimeout(function(){$("#"+middle).removeClass(clean)}, 2000/speed);
        setTimeout(function(){$("#"+middle).addClass('line_1_cell enemy')}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_GRAD enemy_GRAD_walked")}, 2200/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed);
    }
    setTimeout(function(){drawUnitsOfTwoSize()}, 2250/speed);
}

function enemyTwoStepMoveAttack(ID){
    
    var start = findEnemyTroopsForId(ID).position;
    var middle = findEnemyTroopsForId(ID).middlePosition;
    var finish = findEnemyTroopsForId(ID).stepPosition;
    var type = findEnemyTroopsForId(ID).type;
    var direction1 = directionFunction(start, middle);
    var direction2 = directionFunction(middle, finish);
    
    if(type == 'BTR'){
        $("#"+start).toggleClass("enemy_BTR enemy_BTR_target");
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_BTR")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        
        setTimeout(function(){$("#"+finish).toggleClass('our enemy')}, 1500/speed);
        setTimeout(function(){$("#"+finish).addClass(direction2)}, 1500/speed);     
        setTimeout(function(){$("#"+finish).toggleClass(direction2)}, 2000/speed);
        setTimeout(function(){$("#"+finish).addClass("enemy enemy_BTR ")}, 2000/speed);
        
        setTimeout(function(){$("#"+middle).removeClass(clean)}, 2000/speed);
        setTimeout(function(){$("#"+middle).addClass('line_1_cell enemy')}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_BTR enemy_BTR_walked")}, 2200/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed)
    }
    if(type == 'tank'){
        $("#"+start).toggleClass("enemy_tank enemy_tank_target");
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_tank")}, 1000);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000);
        
        setTimeout(function(){$("#"+finish).toggleClass('our enemy')}, 1500);        
        setTimeout(function(){$("#"+finish).addClass(direction2)}, 1500);     
        setTimeout(function(){$("#"+finish).toggleClass(direction2)}, 2000);
        setTimeout(function(){$("#"+finish).addClass("enemy enemy_tank ")}, 2000);
        
        setTimeout(function(){$("#"+middle).removeClass(clean)}, 2000);
        setTimeout(function(){$("#"+middle).addClass('line_1_cell enemy')}, 2000);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_tank enemy_tank_walked")}, 2200);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000)
    }
    if(type == 'GRAD'){
        $("#"+start).toggleClass("enemy_GRAD enemy_GRAD_target");
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_GRAD")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        
        setTimeout(function(){$("#"+finish).toggleClass('our enemy')}, 1500/speed);       
        setTimeout(function(){$("#"+finish).addClass(direction2)}, 1500/speed);     
        setTimeout(function(){$("#"+finish).toggleClass(direction2)}, 2000/speed);
        setTimeout(function(){$("#"+finish).addClass("enemy enemy_GRAD ")}, 2000/speed);
        
        setTimeout(function(){$("#"+middle).removeClass(clean)}, 2000/speed);
        setTimeout(function(){$("#"+middle).addClass('line_1_cell enemy')}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_GRAD enemy_GRAD_walked")}, 2200/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed)
    }
    setTimeout(function(){drawUnitsOfTwoSize()}, 2250/speed);
}

function enemyTwoStepAttackAttack(ID){
    
    var start = findEnemyTroopsForId(ID).position;
    var middle = findEnemyTroopsForId(ID).middlePosition;
    var finish = findEnemyTroopsForId(ID).stepPosition;
    var type = findEnemyTroopsForId(ID).type;
    var direction1 = directionFunction(start, middle);
    var direction2 = directionFunction(middle, finish);
    
    if(type == 'BTR'){
        $("#"+start).toggleClass("enemy_BTR enemy_BTR_target");
        setTimeout(function(){$("#"+middle).toggleClass('our enemy')}, 500/speed);
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_BTR")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        if(middle != finish){
        setTimeout(function(){$("#"+finish).toggleClass('our enemy')}, 1500/speed);      
        setTimeout(function(){$("#"+finish).addClass(direction2)}, 1500/speed);     
        setTimeout(function(){$("#"+finish).toggleClass(direction2)}, 2000/speed);
        setTimeout(function(){$("#"+finish).addClass("enemy enemy_BTR ")}, 2000/speed);
        
        setTimeout(function(){$("#"+middle).removeClass(clean)}, 2000/speed);
        setTimeout(function(){$("#"+middle).addClass('line_1_cell enemy')}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_BTR enemy_BTR_walked")}, 2200/speed);
        }
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed);
        setTimeout(function(){findField(middle).side ='enemy'}, 2000/speed);
        setTimeout(function(){findField(finish).side ='enemy'}, 2000/speed);
    }
    if(type == 'tank'){
        $("#"+start).toggleClass("enemy_tank enemy_tank_target");
        setTimeout(function(){$("#"+middle).toggleClass('our enemy')}, 500/speed);
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_tank")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        if(middle != finish){
        setTimeout(function(){$("#"+finish).toggleClass('our enemy')}, 1500/speed);      
        setTimeout(function(){$("#"+finish).addClass(direction2)}, 1500/speed);     
        setTimeout(function(){$("#"+finish).toggleClass(direction2)}, 2000/speed);
        setTimeout(function(){$("#"+finish).addClass("enemy enemy_tank ")}, 2000/speed);
        
        setTimeout(function(){$("#"+middle).removeClass(clean)}, 2000/speed);
        setTimeout(function(){$("#"+middle).addClass('line_1_cell enemy')}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_tank enemy_tank_walked")}, 2200/speed);
        }
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed);
        setTimeout(function(){findField(middle).side ='enemy'}, 2000/speed);
        setTimeout(function(){findField(finish).side ='enemy'}, 2000/speed);
    }
    if(type == 'GRAD'){
        $("#"+start).toggleClass("enemy_GRAD enemy_GRAD_target");
        setTimeout(function(){$("#"+middle).toggleClass('our enemy')}, 500/speed);
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_GRAD")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        if(middle != finish){
        setTimeout(function(){$("#"+finish).toggleClass('our enemy')}, 1500/speed);      
        setTimeout(function(){$("#"+finish).addClass(direction2)}, 1500/speed);     
        setTimeout(function(){$("#"+finish).toggleClass(direction2)}, 2000/speed);
        setTimeout(function(){$("#"+finish).addClass("enemy enemy_GRAD ")}, 2000/speed);
        
        setTimeout(function(){$("#"+middle).removeClass(clean)}, 2000/speed);
        setTimeout(function(){$("#"+middle).addClass('line_1_cell enemy')}, 2000/speed);
        setTimeout(function(){$("#"+finish).toggleClass("enemy_GRAD enemy_GRAD_walked")}, 2200/speed);
        }
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed);
        setTimeout(function(){findField(middle).side ='enemy'}, 2000/speed);
        setTimeout(function(){findField(finish).side ='enemy'}, 2000/speed);
    }
    setTimeout(function(){drawUnitsOfTwoSize()}, 2250/speed);
}

function enemyTwoStepMoveBattle(ID){
    
    var start = findEnemyTroopsForId(ID).position;
    var middle = findEnemyTroopsForId(ID).middlePosition;
    var finish = findEnemyTroopsForId(ID).stepPosition;
    var type = findEnemyTroopsForId(ID).type;
    var direction1 = directionFunction(start, middle);
    var direction2 = directionFunction(middle, finish);
    
    if(type == 'BTR'){
        $("#"+start).toggleClass("enemy_BTR enemy_BTR_target");
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_BTR")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);        
        setTimeout(function(){battleDrawFunction(middle, finish, direction2, ID)}, 1000/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed)
    }
    if(type == 'tank'){
        $("#"+start).toggleClass("enemy_tank enemy_tank_target");
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_tank")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);        
        setTimeout(function(){battleDrawFunction(middle, finish, direction2, ID)}, 1000/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed)
    }
    if(type == 'GRAD'){
        $("#"+start).toggleClass("enemy_GRAD enemy_GRAD_target");
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_GRAD")}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);        
        setTimeout(function(){battleDrawFunction(middle, finish, direction2, ID)}, 1000/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed)
    }
    
}

function enemyTwoStepAttackBattle(ID){
    
    var start = findEnemyTroopsForId(ID).position;
    var middle = findEnemyTroopsForId(ID).middlePosition;
    var finish = findEnemyTroopsForId(ID).stepPosition;
    var type = findEnemyTroopsForId(ID).type;
    var direction1 = directionFunction(start, middle);
    var direction2 = directionFunction(middle, finish);
    
    if(type == 'BTR'){
        $("#"+start).toggleClass("enemy_BTR enemy_BTR_target");
        setTimeout(function(){$("#"+middle).toggleClass('our enemy')}, 500/speed);
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_BTR")}, 1000/speed);
        setTimeout(function(){findField(middle).side ='enemy'}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        
        setTimeout(function(){battleDrawFunction(middle, finish, direction2, ID)}, 1000/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed);
    }
    if(type == 'tank'){
        $("#"+start).toggleClass("enemy_tank enemy_tank_target");
        setTimeout(function(){$("#"+middle).toggleClass('our enemy')}, 500/speed);
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_tank")}, 1000/speed);
        setTimeout(function(){findField(middle).side ='enemy'}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        
        setTimeout(function(){battleDrawFunction(middle, finish, direction2, ID)}, 1000/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed);
        
    }
    if(type == 'GRAD'){
        $("#"+start).toggleClass("enemy_GRAD enemy_GRAD_target");
        setTimeout(function(){$("#"+middle).toggleClass('our enemy')}, 500/speed);
        setTimeout(function(){$("#"+middle).addClass(direction1)}, 500/speed);
        
        setTimeout(function(){$("#"+middle).toggleClass(direction1)}, 1000/speed);
        setTimeout(function(){$("#"+middle).toggleClass("enemy_GRAD")}, 1000/speed);
        setTimeout(function(){findField(middle).side ='enemy'}, 1000/speed);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);
        setTimeout(function(){$("#"+start).addClass('line_1_cell enemy')}, 1000/speed);
        
        setTimeout(function(){battleDrawFunction(middle, finish, direction2, ID)}, 1000/speed);
        
        setTimeout(function(){findEnemyTroopsForId(ID).position = findEnemyTroopsForId(ID).stepPosition}, 2000/speed);
    }
}

function enemyTwoStepBattleOnFirstStep(ID){
    
    var start = findEnemyTroopsForId(ID).position;
    var middle = findEnemyTroopsForId(ID).middlePosition;
    var finish = findEnemyTroopsForId(ID).stepPosition;
    var type = findEnemyTroopsForId(ID).type;
    var direction1 = directionFunction(start, middle);
    var direction2 = directionFunction(middle, finish);
    
}

function battleDrawFunction(start, finish, direction, ID){
    if(data.ourTroops().indexOf(finish) >= 0){ //Описываем бой с нашим подразделением
        
        if(start != finish){        
//console.log('battle') 
        //battleFieldTarget = finish;
        timer = 0;
        if(enemyTroopsUnitType == 'BTR'){
        preparationOurField(finish, direction);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);    
        setTimeout(function(){$("#"+start).addClass("enemy enemy_BTR_target")}, 1000/speed);
        setTimeout(function(){enemyAttackFunction(ID)}, 2000/speed);
        renderingOurField(finish);
        }
        if(enemyTroopsUnitType == 'tank'){
        preparationOurField(finish, direction);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);    
        setTimeout(function(){$("#"+start).addClass("enemy enemy_tank_target")}, 1000/speed);
        setTimeout(function(){enemyAttackFunction(ID)}, 2000/speed);
        renderingOurField(finish);
        }   
        if(enemyTroopsUnitType == 'GRAD'){
        preparationOurField(finish, direction);
        setTimeout(function(){$("#"+start).removeClass(clean)}, 1000/speed);    
        setTimeout(function(){$("#"+start).addClass("enemy enemy_GRAD_target")}, 1000/speed);
        setTimeout(function(){enemyAttackFunction(ID)}, 2000/speed);
        renderingOurField(finish);
        } 
        }
    }
}

function enemyUnitDontMove(start, finish, ID){
    if(findEnemyTroopsForId(ID).type == 'infantery'){
        setTimeout(function(){$("#"+start).removeClass("clean")}, 0/speed);        
        setTimeout(function(){$("#"+start).addClass("enemy_infantery_target")}, 0/speed);
        setTimeout(function(){$("#"+start).toggleClass("enemy_infantery_target enemy_infantery_walked")}, 1000/speed);
    }
    if(findEnemyTroopsForId(ID).type == 'ARTA'){
        setTimeout(function(){$("#"+start).removeClass("clean")}, 0/speed);        
        setTimeout(function(){$("#"+start).addClass("enemy_ARTA_target")}, 0/speed);
        setTimeout(function(){$("#"+start).toggleClass("enemy_ARTA_target enemy_ARTA_walked")}, 1000/speed);
    }
    if(findEnemyTroopsForId(ID).type == 'BRT'){
        setTimeout(function(){$("#"+start).removeClass("clean")}, 0/speed);        
        setTimeout(function(){$("#"+start).addClass("enemy_BTR_target")}, 0/speed);
        setTimeout(function(){$("#"+start).toggleClass("enemy_BTR_target enemy_BTR_walked")}, 1500/speed);
    }
    if(findEnemyTroopsForId(ID).type == 'tank'){
        setTimeout(function(){$("#"+start).removeClass("clean")}, 0/speed);        
        setTimeout(function(){$("#"+start).addClass("enemy_tank_target")}, 0/speed);
        setTimeout(function(){$("#"+start).toggleClass("enemy_tank_target enemy_tank_walked")}, 1500/speed);
    }
    if(findEnemyTroopsForId(ID).type == 'GRAD'){
        setTimeout(function(){$("#"+start).removeClass("clean")}, 0/speed);        
        setTimeout(function(){$("#"+start).addClass("enemy_GRAD_target")}, 0/speed);
        setTimeout(function(){$("#"+start).toggleClass("enemy_GRAD_target enemy_GRAD_walked")}, 1500/speed);
    }
}

function attackOurArtaOrGrad(enemyUnit){
  
    
    data.our = random(data.our)
//console.log('BTR PART 2')     
    if((enemyUnit.type == "tank")||(enemyUnit.type == "BTR")){
//log('BTR or tank')            
        for(var i = 0; i<data.our.length; i++){
            if((data.our[i].type == "ARTA")&&(minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) <= 4)&&(enemyUnit.health >= 30)){
//log('111-ARTA')
                 enemyAttackMovePosition(enemyUnit.ID, data.our[i].position);
                enemyUnit.baseStep = 'no';
                enemyUnit.attackArtaOrGrad = 'yes';
                return;
            }
            if((data.our[i].type == "GRAD")&&(minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) <= 2)&&(enemyUnit.health >= 30)){
//log('111-GRAD')
                 enemyAttackMovePosition(enemyUnit.ID, data.our[i].position);
                enemyUnit.baseStep = 'no';
                enemyUnit.attackArtaOrGrad = 'yes';
                return;
            } 
        }
        if(enemyUnit.health >= 50){
//log('222')
             enemyAttackMovePosition(enemyUnit.ID, enemyUnit.endPosition);
            enemyUnit.baseStep = 'no';
            return;
        } else {
            if(enemyUnit.baseStep != 'yes'){
//log('333')
             enemyAttackMovePosition(enemyUnit.ID, data.enemyBasePoint);
            enemyUnit.baseStep = 'yes';
            return;
        }else{
//log('444')
             enemyAttackMovePosition(enemyUnit.ID, enemyUnit.position);
            return;
        }
        }
    }
    if(enemyUnit.type == "infantery"){
        for(var i = 0; i<data.our.length; i++){
            if((data.our[i].type == "ARTA")&&(minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) <= 2)&&(enemyUnit.health >= 30)){
                 enemyAttackMovePosition(enemyUnit.ID, data.our[i].position);
                enemyUnit.baseStep = 'no';
                return; 
            } 
            if((data.our[i].type == "GRAD")&&(minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) <= 1)&&(enemyUnit.health >= 30)){
                 enemyAttackMovePosition(enemyUnit.ID, data.our[i].position);
                enemyUnit.baseStep = 'no';
                return; 
            }
        }
        if(enemyUnit.health >= 50){
             enemyAttackMovePosition(enemyUnit.ID, enemyUnit.endPosition);
            enemyUnit.baseStep = 'no';
            return;
        } else {
            if(enemyUnit.baseStep != 'yes'){
             enemyAttackMovePosition(enemyUnit.ID, data.enemyBasePoint);
            enemyUnit.baseStep = 'yes';
            return;
        }else{
             enemyAttackMovePosition(enemyUnit.ID, enemyUnit.position);
            return;
        }
        }
    }
    if((enemyUnit.type == "ARTA")||(enemyUnit.type == "GRAD")){
             enemyAttackMovePosition(enemyUnit.ID, enemyUnit.endPosition);
            return;
    }
} // обязательная атака нашей Арты и Градов для танков и БТР и ходы для остальных

function attackOurArtaOrGradSecond(enemyUnit){
//console.log('enemyUnit ' + enemyUnit)  
    data.our = random(data.our)
//console.log('BTR PART 2')     
    if((enemyUnit.type == "tank")||(enemyUnit.type == "BTR")){
//console.log('BTR or tank')            
        for(var i = 0; i<data.our.length; i++){
            
/*//---------------------------------
if(data.our[i].type == "ARTA"){
console.log('enemyUnit.position = '+enemyUnit.position+' data.our[i].position = '+data.our[i].position+' enemyUnit.ID = ' +enemyUnit.ID)
console.log('minDistanceForAntiARTAAttack = ' + minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) )
console.log(enemyUnit.ID + ' enemyUnit.health = ' + (enemyUnit.health))
}
//---------------------------------  */          
            
            if((data.our[i].type == "ARTA")&&(minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) <= 4)&&(enemyUnit.health >= 30)){
//console.log('111-ARTA')
                enemyAttackMovePositionSecond(enemyUnit.ID, data.our[i].position);
                enemyUnit.baseStep = 'no';
                enemyUnit.attackArtaOrGrad = 'yes';
                return;
            }
            
/*//---------------------------------
if(data.our[i].type == "GRAD"){
console.log('minDistanceForAntiARTAAttack = ' + minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) )
console.log(enemyUnit.ID + ' enemyUnit.health = ' + (enemyUnit.health))
}
//---------------------------------  */           
            
            
            
            if((data.our[i].type == "GRAD")&&(minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) <= 2)&&(enemyUnit.health >= 30)){
//console.log('111-GRAD')
                enemyAttackMovePositionSecond(enemyUnit.ID, data.our[i].position);
                enemyUnit.baseStep = 'no';
                enemyUnit.attackArtaOrGrad = 'yes';
                return;
            } 
        }
        if(enemyUnit.health >= 50){
//console.log('222')
            enemyAttackMovePositionSecond(enemyUnit.ID, enemyUnit.endPosition);
            enemyUnit.baseStep = 'no';
            return;
        } else {
            if(enemyUnit.baseStep != 'yes'){
//console.log('333')
            enemyAttackMovePositionSecond(enemyUnit.ID, data.enemyBasePoint);
            enemyUnit.baseStep = 'yes';
            return;
        }else{
//console.log('444')
            enemyAttackMovePositionSecond(enemyUnit.ID, enemyUnit.position);
            return;
        }
        }
    }
    if(enemyUnit.type == "infantery"){
        for(var i = 0; i<data.our.length; i++){
            if((data.our[i].type == "ARTA")&&(minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) <= 2)&&(enemyUnit.health >= 30)){
                enemyAttackMovePositionSecond(enemyUnit.ID, data.our[i].position);
                enemyUnit.baseStep = 'no';
                return; 
            } 
            if((data.our[i].type == "GRAD")&&(minDistanceForAntiARTAAttack(enemyUnit.position, data.our[i].position, enemyUnit.ID) <= 1)&&(enemyUnit.health >= 30)){
                enemyAttackMovePositionSecond(enemyUnit.ID, data.our[i].position);
                enemyUnit.baseStep = 'no';
                return; 
            }
        }
        if(enemyUnit.health >= 50){
            enemyAttackMovePositionSecond(enemyUnit.ID, enemyUnit.endPosition);
            enemyUnit.baseStep = 'no';
            return;
        } else {
            if(enemyUnit.baseStep != 'yes'){
            enemyAttackMovePositionSecond(enemyUnit.ID, data.enemyBasePoint);
            enemyUnit.baseStep = 'yes';
            return;
        }else{
            enemyAttackMovePositionSecond(enemyUnit.ID, enemyUnit.position);
            return;
        }
        }
    }
    if((enemyUnit.type == "ARTA")||(enemyUnit.type == "GRAD")){
            enemyAttackMovePositionSecond(enemyUnit.ID, enemyUnit.endPosition);
            return;
    }
} // обязательная атака нашей Арты и Градов для танков и БТР и ходы для остальных

function nobodyRetreat(){
    return (enemyRetreatFromDefense()&&ourRetreatFromDefense())
} //никто не хотел отступать


//дополнительные функции



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

function cleaningTwoArray(bossArray, secondArray){
    var tempArr = [];
    for(var i=0; i<secondArray.length; i++){
        if(bossArray.indexOf(secondArray[i])<0){
           tempArr.push(secondArray[i]); 
        }
    }
    return tempArr
}

function random(arr){
    
  function compareRandom(a, b) {
        return Math.random() - 0.5;
    }
    
   return arr.sort(compareRandom);
}



//дополнительные функции

/*----------------ФУНКЦИИ КОНСТРУКТОРЫ ВОЙСК---------------*/


function EnemyInfantery(ID, strong, position, endPosition, trench){
        this.ID = ID;
        this.type = "infantery";
    
        if(strong == 100){
        this.level = 5;
        this.PTUR = 5;
        this.infantery = 10;
        this.mortar = 5;
        this.realPTUR = 5;
        this.realinfantery = 10;
        this.realmortar = 5;
        this.maxInfantery = 10;
        this.maxMortar = 5;
        this.maxPTUR = 5;
        }
        if(strong == 80){
        this.level = 4;
        this.PTUR = 4;
        this.infantery = 8;
        this.mortar = 4;
        this.realPTUR = 4;
        this.realinfantery = 8;
        this.realmortar = 4;
        this.maxInfantery = 8;
        this.maxMortar = 4;
        this.maxPTUR = 4;
        }
        if(strong == 70){
        this.level = 3;
        this.PTUR = 3;
        this.realPTUR = 3;
        this.maxPTUR = 3;    
        this.infantery = 7;
        this.realinfantery = 7;
        this.maxInfantery = 7;    
        this.mortar = 4;
        this.realmortar = 4;
        this.maxMortar = 4;        
        }
        if(strong == 60){
        this.level = 2;
        this.PTUR = 3;
        this.infantery = 6;
        this.mortar = 3;
        this.realPTUR = 3;
        this.realinfantery = 6;
        this.realmortar = 3;
        this.maxInfantery = 6;
        this.maxMortar = 3;
        this.maxPTUR = 3;
        }
        if(strong == 50){
        this.level = 1;
        this.PTUR = 2;
        this.realPTUR = 2;
        this.maxPTUR = 2;    
        this.infantery = 5;
        this.realinfantery = 5;
        this.maxInfantery = 5;    
        this.mortar = 3;
        this.realmortar = 3;
        this.maxMortar = 3;        
        }   
        this.position = position;
        this.endPosition = endPosition;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 1;
        if(trench == 'trench'){
            this.trench = "yes";
        }else{
            this.trench = "no";
        }        
        this.walked = "no"        
        }

function EnemyBTR(ID, strong, position, endPosition, trench){
        this.ID = ID;
        this.type = "BTR";
    
        if(strong == 100){
        this.PTUR = 5;
        this.infantery = 10;
        this.BTR = 5;    
        this.mortar = 5;
        this.realPTUR = 5;
        this.realinfantery = 10;
        this.realBTR = 5;
        this.realmortar = 5;
        this.maxInfantery = 10;
        this.maxBTR = 5;
        this.maxMortar = 5;
        this.maxPTUR = 5;
        }
        if(strong == 80){
        this.PTUR = 4;
        this.infantery = 8;
        this.BTR = 4; 
        this.mortar = 4;
        this.realPTUR = 4;
        this.realinfantery = 8;
        this.realBTR = 4;
        this.realmortar = 4;
        this.maxInfantery = 8;
        this.maxBTR = 4;
        this.maxMortar = 4;
        this.maxPTUR = 4;
        }
        if(strong == 70){
        this.PTUR = 3;
        this.realPTUR = 3;
        this.maxPTUR = 3;    
        this.infantery = 7;
        this.BTR = 3; 
        this.realinfantery = 7;
        this.realBTR = 4;
        this.maxInfantery = 7;
        this.maxBTR = 3;
        this.mortar = 4;
        this.realmortar = 4;
        this.maxMortar = 4;        
        }
        if(strong == 60){
        this.PTUR = 3;
        this.infantery = 6;
        this.BTR = 3; 
        this.mortar = 3;
        this.realPTUR = 3;
        this.realinfantery = 6;
        this.realBTR = 3;
        this.realmortar = 3;
        this.maxInfantery = 6;
        this.maxBTR = 3;
        this.maxMortar = 3;
        this.maxPTUR = 3;
        }
        if(strong == 50){
        this.PTUR = 2;
        this.realPTUR = 2;
        this.maxPTUR = 2;    
        this.infantery = 5;
        this.BTR = 2; 
        this.realinfantery = 5;
        this.realBTR = 2;
        this.maxInfantery = 5;
        this.maxBTR = 2;
        this.mortar = 3;
        this.realmortar = 3;
        this.maxMortar = 3;        
        }   
        this.position = position;
        this.endPosition = endPosition;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 2;
        if(trench == 'trench'){
            this.trench = "yes";
        }else{
            this.trench = "no";
        }        
        this.walked = "no"        
        }
   
function EnemyTank(ID, strong, position, endPosition){
        this.ID = ID;
        this.type = "tank";
    
        if(strong == 100){
        this.tank = 10;
        this.realtank = 10;
        this.maxTank = 10;
        }
        if(strong == 80){
        this.tank = 8;
        this.realtank = 8;
        this.maxTank = 8;
        }
        if(strong == 70){
        this.tank = 7;
        this.realtank = 7;
        this.maxTank = 7;        
        }
        if(strong == 60){
        this.tank = 6;
        this.realtank = 6;
        this.maxTank = 6;
        }
        if(strong == 50){
        this.tank = 5;
        this.realtank = 5;
        this.maxTank = 5;        
        }   
        this.position = position;
        this.endPosition = endPosition;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 2;   
        this.walked = "no"        
        }

function EnemyARTA(ID, strong, position, endPosition){
        this.ID = ID;
        this.type = "ARTA";
    
        if(strong == 100){
        this.ARTA = 3;
        this.realARTA = 3;
        this.maxARTA = 3;
        }
        if(strong == 66){
        this.ARTA = 2;
        this.realARTA = 2;
        this.maxARTA = 2;
        }
        if(strong == 33){
        this.ARTA = 1;
        this.realARTA = 1;
        this.maxARTA = 1;
        }
       
        this.position = position;
        this.endPosition = endPosition;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 1;   
        this.walked = "no"        
        }

function EnemyGRAD(ID, strong, position, endPosition){
        this.ID = ID;
        this.type = "GRAD";
    
        if(strong == 100){
        this.GRAD = 4;
        this.realGRAD = 4;
        this.maxGRAD = 4;
        }
        if(strong == 75){
        this.GRAD = 3;
        this.realGRAD = 3;
        this.maxGRAD = 3;
        }
        if(strong == 50){
        this.GRAD = 2;
        this.realGRAD = 2;
        this.maxGRAD = 2;
        }
       
        this.position = position;
        this.endPosition = endPosition;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 2;   
        this.walked = "no"        
        }



function OurInfantery(ID, strong, position, trench, name){
       
    console.log("OurInfantery")
        this.ID = ID;
        this.type = "infantery";
        this.name = name;
    
        if(strong == 100){
        this.level = 5;
        this.PTUR = 5;
        this.infantery = 10;
        this.mortar = 5;
        this.realPTUR = 5;
        this.realinfantery = 10;
        this.realmortar = 5;
        this.maxInfantery = 10;
        this.maxMortar = 5;
        this.maxPTUR = 5;
        }
        if(strong == 80){
        this.level = 4;
        this.PTUR = 4;
        this.infantery = 8;
        this.mortar = 4;
        this.realPTUR = 4;
        this.realinfantery = 8;
        this.realmortar = 4;
        this.maxInfantery = 8;
        this.maxMortar = 4;
        this.maxPTUR = 4;
        }
        if(strong == 70){
        this.level = 3;
        this.PTUR = 3;
        this.realPTUR = 3;
        this.maxPTUR = 3;    
        this.infantery = 7;
        this.realinfantery = 7;
        this.maxInfantery = 7;    
        this.mortar = 4;
        this.realmortar = 4;
        this.maxMortar = 4;        
        }
        if(strong == 60){
        this.level = 2;
        this.PTUR = 3;
        this.infantery = 6;
        this.mortar = 3;
        this.realPTUR = 3;
        this.realinfantery = 6;
        this.realmortar = 3;
        this.maxInfantery = 6;
        this.maxMortar = 3;
        this.maxPTUR = 3;
        }
        if(strong == 50){
        this.level = 1;
        this.PTUR = 2;
        this.realPTUR = 2;
        this.maxPTUR = 2;    
        this.infantery = 5;
        this.realinfantery = 5;
        this.maxInfantery = 5;    
        this.mortar = 3;
        this.realmortar = 3;
        this.maxMortar = 3;        
        }   
        this.position = position;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 1;
        if(trench == 'trench'){
            this.trench = "yes";
        }else{
            this.trench = "no";
        }        
        this.walked = "no"        
        }

function OurBTR(ID, strong, position, trench, name){
        this.ID = ID;
        this.type = "BTR";
        this.name = name;
    
        if(strong == 100){
        this.level = 5;
        this.PTUR = 5;
        this.infantery = 10;
        this.BTR = 5;    
        this.mortar = 5;
        this.realPTUR = 5;
        this.realinfantery = 10;
        this.realBTR = 5;
        this.realmortar = 5;
        this.maxInfantery = 10;
        this.maxBTR = 5;
        this.maxMortar = 5;
        this.maxPTUR = 5;
        }
        if(strong == 80){
        this.level = 4;
        this.PTUR = 4;
        this.infantery = 8;
        this.BTR = 4; 
        this.mortar = 4;
        this.realPTUR = 4;
        this.realinfantery = 8;
        this.realBTR = 4;
        this.realmortar = 4;
        this.maxInfantery = 8;
        this.maxBTR = 4;
        this.maxMortar = 4;
        this.maxPTUR = 4;
        }
        if(strong == 70){
        this.level = 3;
        this.PTUR = 3;
        this.realPTUR = 3;
        this.maxPTUR = 3;    
        this.infantery = 7;
        this.BTR = 3; 
        this.realinfantery = 7;
        this.realBTR = 4;
        this.maxInfantery = 7;
        this.maxBTR = 3;
        this.mortar = 4;
        this.realmortar = 4;
        this.maxMortar = 4;        
        }
        if(strong == 60){
        this.level = 2;
        this.PTUR = 3;
        this.infantery = 6;
        this.BTR = 3; 
        this.mortar = 3;
        this.realPTUR = 3;
        this.realinfantery = 6;
        this.realBTR = 3;
        this.realmortar = 3;
        this.maxInfantery = 6;
        this.maxBTR = 3;
        this.maxMortar = 3;
        this.maxPTUR = 3;
        }
        if(strong == 50){
        this.level = 1;
        this.PTUR = 2;
        this.realPTUR = 2;
        this.maxPTUR = 2;    
        this.infantery = 5;
        this.BTR = 2; 
        this.realinfantery = 5;
        this.realBTR = 2;
        this.maxInfantery = 5;
        this.maxBTR = 2;
        this.mortar = 3;
        this.realmortar = 3;
        this.maxMortar = 3;        
        }   
        this.position = position;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 2;
        if(trench == 'trench'){
            this.trench = "yes";
        }else{
            this.trench = "no";
        }        
        this.walked = "no"        
        }
   
function OurTank(ID, strong, position, name){
        this.ID = ID;
        this.type = "tank";
        this.name = name;
    
        if(strong == 100){
        this.level = 5;
        this.tank = 10;
        this.realtank = 10;
        this.maxTank = 10;
        }
        if(strong == 80){
        this.level = 4;
        this.tank = 8;
        this.realtank = 8;
        this.maxTank = 8;
        }
        if(strong == 70){
        this.level = 3;
        this.tank = 7;
        this.realtank = 7;
        this.maxTank = 7;        
        }
        if(strong == 60){
        this.level = 2;
        this.tank = 6;
        this.realtank = 6;
        this.maxTank = 6;
        }
        if(strong == 50){
        this.level = 1;
        this.tank = 5;
        this.realtank = 5;
        this.maxTank = 5;        
        }   
        this.position = position;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 2;   
        this.walked = "no"        
        }

function OurARTA(ID, strong, position, name){
        this.ID = ID;
        this.type = "ARTA";
        this.name = name;
    
        if(strong == 100){
        this.level = 3;
        this.ARTA = 3;
        this.realARTA = 3;
        this.maxARTA = 3;
        }
        if(strong == 66){
        this.level = 2;
        this.ARTA = 2;
        this.realARTA = 2;
        this.maxARTA = 2;
        }
        if(strong == 33){
        this.level = 1;
        this.ARTA = 1;
        this.realARTA = 1;
        this.maxARTA = 1;
        }
       
        this.position = position;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 1;   
        this.walked = "no"        
        }

function OurGRAD(ID, strong, position, name){
        this.ID = ID;
        this.type = "GRAD";
        this.name = name;
    
        if(strong == 100){
        this.level = 4;
        this.GRAD = 4;
        this.realGRAD = 4;
        this.maxGRAD = 4;
        }
        if(strong == 75){
        this.level = 3;
        this.GRAD = 3;
        this.realGRAD = 3;
        this.maxGRAD = 3;
        }
        if(strong == 50){
        this.level = 2;
        this.GRAD = 2;
        this.realGRAD = 2;
        this.maxGRAD = 2;
        }
       
        this.position = position;
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 2;   
        this.walked = "no"        
        }






