//-----------------------------------------------------------------------------------------------------//
//ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ//
//-----------------------------------------------------------------------------------------------------//
//var FieldWidth = 13 //sector.width;
//var FieldHeight = 12 //sector.height;
//==========================================================
//var data = {
//    map:[],
////    our:[],
////    enemy:[],
////    calculationMap: function(){
////        this.map.length = 0;
////        var tempMap = [];
////        for(var i=0; i< sector.height; i++){
////            var Y = (i+ 21)
////            for(var j=0; j< sector.width; j++){
////                var X = (j+11);
////                var XY = "" + Y + X;
////                tempMap.push(XY)
////            }
////        }
////        for(i=0; i<tempMap.length; i++){
////            var tempPosition, tempSide;
////            var ID = tempMap[i];
////   
////            var elem = $('#' + ID );
////             if(elem.hasClass("our")){
////                tempPosition = ID ;
////                tempSide = "our";
////             }
////            if(elem.hasClass("enemy")){
////                tempPosition = ID ;
////                tempSide = "enemy";
////             }
////            if(sector.enemyTroops().indexOf(ID)>=0){
////                tempPosition = ID ;
////                tempSide = "enemy";
////            }
////            if(sector.ourTroops().indexOf(ID )>=0){
////                tempPosition = ID ;
////                tempSide = "our";
////            }
////            if(elem.hasClass("water")){
////                tempPosition = ID ;
////                tempSide = "water";
////             }
////            function temp(position, side){
////                obj = {};
////                obj.position = position;
////                obj.side = side;
////                obj.sector = sector.name;
////                //obj.trench = 'no';
////                return obj;
////            }
////            this.map.push(temp(tempPosition, tempSide));
////            }     
////        return this.map;
////    },   
////    ourTroops: function(){
////        var arr=[];
////        for(i=0; i<this.our.length; i++){
////            arr.push(this.our[i].position)
////        }
////        return arr;
////    },
////    enemyTroops: function(){
////        var arr=[];
////        for(i=0; i<this.enemy.length; i++){
////            arr.push(this.enemy[i].position)
////        }
////        return arr;
////    },
////    ourField: function(){
////        var arr=[];
////        for(i=0;i<this.map.length; i++){
////            if(this.map[i].side == 'our'){
////                arr.push(this.map[i].position);
////            }
////        }
////        return arr;
////    },
////    enemyField: function(){
////        var arr=[];
////        for(i=0;i<this.map.length; i++){
////            if(this.map[i].side == 'enemy'){
////                arr.push(this.map[i].position);
////            }
////        }
////        return arr;
////    },
////    waterField: function(){
////        var arr=[];
////        for(i=0;i<this.map.length; i++){
////            if(this.map[i].side == 'water'){
////                arr.push(this.map[i].position);
////            }
////        }
////        return arr;
////    },
////    allFields: function(){
////        var allFields = [];
////        for(i=0; i<sector.map.length; i++){
////            allFields.push(sector.map[i].position);
////        }
////        return allFields;
////    }
//};

function test(){
    console.log( sector.map[69]);
    console.log(lastStep.map[69]);
}

var lastStep = {
    map: [],
    our: [],
    ourFields: [],
    enemy: [],
    enemyFields: [],
    saveLastStep: function(){
        lastStep.map = copyArr(sector.map);
        lastStep.our = copyArr(sector.our);        
        lastStep.enemy = copyArr(sector.enemy);
        lastStep.ourFields = copyArray(sector.ourFields);
        lastStep.enemyFields = copyArray(sector.enemyFields);
    },
    backLastStep: function(){
        sector.ourFields = copyArray(lastStep.ourFields);
        sector.enemyFields = copyArray(lastStep.enemyFields);
        sector.map = copyArr(lastStep.map);
        sector.our = copyArr(lastStep.our);
        sector.enemy = copyArr(lastStep.enemy);
        
        drawUnitsOfTwoSize();
        
//        ourTankHelpIndicator = 'no';
//        ourTankHelp = 0;
    }
}

var ourMovePositions = [];
var ourAttackPositions = [];
var ourBattlePositions = [];
var ourTransformPositions = [];
var battsOnPosition =[];
//var ourTankHelp = 0;
//var enemyTankHelp = 0;
//var ourTankHelpUnit = {};
//var ourTankHelpField;
//var ourTankHelpIndicator;
var globalTarget;
var battleFieldTarget;
var ourAttackObject = {};
//var enemyAttackObject = {};
//var ourDefenseObject = {};
var enemyDefenseObject = {};
var whoAttack;
var battleProcess = 'finish'
var whoseTurn = 'our'; //определяем чей ход будет первым

//sector.calculationMap();

//$('#big_map img').attr('src', "https://static-maps.yandex.ru/1.x/?ll=" + (geoX+0.07) + "," + (geoY+0.03) +"&z=12&l=map&\&size=500,410");



//startRealQuantity();

//buttonShowFunction();

//=================перенесли в sector.js
/*
drawUnitsOfTwoSize();
window.onload = init();
*/ 
//=================перенесли в sector.js



//-----------------------------------------------------------------------------------------------------//
//  ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ  //
//-----------------------------------------------------------------------------------------------------//

function init(){ // задаем обработчики событий
    if(whoseTurn == 'our'){
    var fireField1 = $(".line_1_cell");
    var fireField2 = $(".line_2_cell");
    for (var i = 0; i < fireField1.length; i++) {
        if(fireField1[i].innerHTML != 'help'){
          fireField1[i].onclick = ourTroopsMoveFunction;  
        }
        }
    for (var i = 0; i < fireField2.length; i++) {
        if(fireField2[i].innerHTML != 'help'){
          fireField2[i].onclick = ourTroopsMoveFunction;  
        }
        }
    }
    if(whoseTurn == 'enemy'){
    var fireField1 = $(".line_1_cell");
    var fireField2 = $(".line_2_cell");
    for (var i = 0; i < fireField1.length; i++) {
          fireField1[i].onclick = drawUnitsOfTwoSize;
        }
    for (var i = 0; i < fireField2.length; i++) {
          fireField2[i].onclick = drawUnitsOfTwoSize; 
        }    
    }
//    informAboutOurUnits() ;   ПЕРЕДЕЛАТЬ ИСХОДНУЮ ФУНКЦИЮ     
    
    //--------------------------------------    
//    document
//    window.captureEvents(Event.KEYPRESS); 
//    window.onkeypress = pressed; 
//    function pressed(e) { 
//        if(e.which == 32) {
//          lastStep.backLastStep();
//        }
//    } 
    //--------------------------------------
	
	//--------кривое место, но должно работать----------------
//    $('#our_save_off').hide();
//    $('#our_load_off').hide();    
    //--------кривое место, но должно работать----------------
	
    } // задаем обработчики событий

function ourTroopsMoveFunction(event){
    
    var target = event.target.id;
//console.log(target)    
   
    // 1. target - пустое поле
    //  - обнулить Positions
    //  - перестроить карту
   
    if((sector.ourFields.indexOf(target) >= 0)&&(sector.ourTroops().indexOf(target)<0)&&(ourMovePositions.indexOf(target) < 0)&&(true)){
//alert('1. target')    
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        battsOnPosition.length = 0;
        drawUnitsOfTwoSize();
    }
   
    // 2. target - наш юнит
    //  - обнулить Positions
    //  - перестроить карту
    //  - перестроить Positions
    //  - перерисовать Positions
    //  - изменить вид юнита   
            
    if((sector.ourTroops().indexOf(target) >=0)){ 
//alert('2. target') 
        ourMoveObject = findOurTroops(target); //создаем объект из выделенного отряда
        
        if(battsOnPosition.length==0){
           sector.our.forEach(function(batt){
            if(batt.position == target){
                battsOnPosition.push(batt)
            }
        }); 
        }
        
        
    //2.1. target - ourMoveObject.position
    if(target == ourMoveObject.position){
//alert('2.1. target') 
        ourMoveObject = battsOnPosition.pop();
        drawUnitsOfTwoSize();
    }    
        
        
        if(ourMoveObject.walked == 'no'){
        // окапываем пехоту или БТР
        globalTarget = target;        
        
        if ((ourMoveObject.type == 'infantery')||(ourMoveObject.type == 'BTR')){
            $("#our_trench").css("display", "inline-block");
            $("#our_trench_off").hide();
            
        }if ((ourMoveObject.type != 'infantery')&&(ourMoveObject.type != 'BTR')){
            $("#our_trench").hide();
            $("#our_trench_off").css("display", "inline-block");
        }
        
        //минируем позиции окопавшихся войск
        if (((ourMoveObject.type == 'infantery')||(ourMoveObject.type == 'BTR'))&&(ourMoveObject.trench == 'yes')){
                $("#our_trench").hide();
                $("#our_trench_off").css("display", "inline-block");            
        }if (((ourMoveObject.type == 'infantery')||(ourMoveObject.type == 'BTR'))&&(ourMoveObject.trench == 'no')){
                $("#our_trench").css("display", "inline-block");
                $("#our_trench_off").hide();
        }if (((ourMoveObject.type == 'infantery')||(ourMoveObject.type == 'BTR'))&&(ourMoveObject.trench == 'yes')&&(ourMoveObject.mine == 'yes')){
                $("#our_trench").hide();
                $("#our_trench_off").css("display", "inline-block");
        }
        }
        
        if(ourMoveObject.walked == 'no'){
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        drawUnitsOfTwoSize();

//=================================================
//        calculationMoveFieldsFunction(target); //Меняем на moveFieldsWithRoad(position)
        moveFieldsWithRoad(target);
//=================================================            
        changeOurUnitFace(target);
            
            
            
        lastStep.saveLastStep();
    }
        drawOurUnit(ourMoveObject)
    }
    
    
     
    // 3. target - ourMovePositions
    //  - изменить юниту свойство position
    //  - обнулить Positions
    //  - перестроить карту
    if (ourMovePositions.indexOf(target) >= 0){ 
//alert('3. target')         
        lastStep.saveLastStep();
        
//        ourMiddlePositionFunction(ourMoveObject.position, target, ourMoveObject.ID)
        
        ourMoveObject.position = target;
        ourMoveObject.walked = 'yes';
        ourMoveObject.trench = 'no';
        ourMoveObject.mine = 'no';
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        battsOnPosition.length = 0;
        drawUnitsOfTwoSize();
        
            $("#our_back_step").css("display", "inline-block");
            $("#our_back_step_off").hide();
            $("#our_trench_off").css("display", "inline-block");
//            $("#our_mine_off").css("display", "inline-block");
            $("#our_trench").hide();
//            $("#our_mine").hide();
//        informAboutOurUnits();
        
    }
    
    //3.1. target - ourTransformPositions
    if(ourTransformPositions.indexOf(event.path[1].id)>=0){
//alert('3.1. target') 
        lastStep.saveLastStep();
//console.log('3.1. target' + event.path[1].id) 
        ourMiddlePositionFunction(ourMoveObject.position, event.path[1].id, ourMoveObject.ID);

        var combineTarget = event.path[1].id;
        var secondBatt = findOurTroops(combineTarget);
        combineTwoBatts(ourMoveObject, secondBatt);
        
    }
    
  
    // 4. target - ourAttackPositions
    //  - изменить юниту свойство position
    //  - в bigMapAllEnemyFields изменить полю свойство side с enemy на our
    //  - обнулить Positions
    //  - перестроить карту
    //  - перестроить поля содержащие нашу технику
   
    if (ourAttackPositions.indexOf(target) >= 0){ 
//alert('4. target')         
        lastStep.saveLastStep();
        addOurNewField(target);
        
        ourMiddlePositionFunction(ourMoveObject.position, target, ourMoveObject.ID);
               
//        var temp1 = oneStepFunction(ourMoveObject.position);
//        var temp2 = oneStepFunction(target); 
//        var middle = [];
//        
//          for(var i=0; i<temp1.length; i++){
//            if(temp1.indexOf(target)<0){
//                
//                for(var n=0; n<temp1.length; n++){
//            for(var j=0; j<temp2.length; j++){
//                if(temp1[n] == temp2[j]){
//                    middle.push(temp1[n])
//                }
//            }
//            }
//            }
//            } 
//        
//        
//       
//        middle = random(middle)
//        
//        if(sector.enemyFields.indexOf(middle[0]) >=0 ){
//           findField(middle[0]).side = "our";
//       }
        
        ourMoveObject.position = target; 
        ourMoveObject.walked = 'yes';
        ourMoveObject.trench = 'no';
        ourMoveObject.mine = 'no';
        for(i=0; i<sector.map.length; i++){
            if(sector.map[i].position == target){
               sector.map[i].side = 'our';
            }
        }
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        battsOnPosition.length = 0;
        drawUnitsOfTwoSize();
//        informAboutOurUnits();
    }
    
    // 5. target - ourBattlePositions
    
    if ((ourBattlePositions.indexOf(target) >= 0)&&((ourMoveObject.type == "infantery")||(ourMoveObject.type == "BTR")||(ourMoveObject.type == "tank"))){  //для пехоты и БТР и танков
//alert('5. target')         
        
//        whoAttackZone = 'our';
        
//        startOurAttackInZone(target);  //Нужна функция запускающая бои в зоне ==== Перенесена в место создания ourBattlePositions
        
        //занимаем проходное поле
        var temp1 = oneStepFunction(ourMoveObject.position);
        var temp2 = oneStepFunction(target); 
        var middle = [];
        
          for(var i=0; i<temp1.length; i++){
            if(temp1.indexOf(target)<0){
                
                for(var n=0; n<temp1.length; n++){
            for(var j=0; j<temp2.length; j++){
                if(temp1[n] == temp2[j]){
                    middle.push(temp1[n])
                }
            }
            }
            }
            } 
        
         middle = random(middle);
        if(sector.enemyFields.indexOf(middle[0]) >=0 ){
           findField(middle[0]).side = "our";
       }
        //занимаем проходное поле
        
//            shorts = 0;
//            OurShorts = 0;
//            EnemyShorts = 0;
//            numberOfOurShort = 0;
//            numberOfEnemyShort = 0;
        
        // обнуляем все связанное с тактическим полем
        
//        battleFieldTarget = target;
        
//        document.getElementById('battlefield').style.display = 'block';
//        document.getElementById('wrap_field').style.display = 'none';			
//        document.getElementById('preload').style.display = 'none';
//        document.getElementById('main').style.display = 'none';
        
//        ourAttackObject = ourMoveObject;
//        enemyDefenseObject = findEnemyTroops(target);
        
//        enemyWholeGRAD = 0;
//        enemyWholeARTA = 0;
//        needToKill ='not-need';
        
    }
//    if ((ourBattlePositions.indexOf(target) >= 0)&&(ourMoveObject.type == "tank")&&(ourMoveObject.walked == "no")){  //для танков &&(ourTankHelp == 0)
//        whoAttack = 'our';
//        
//        //занимаем проходное поле
//        var temp1 = oneStepFunction(ourMoveObject.position);
//        var temp2 = oneStepFunction(target); 
//        var middle = [];
//        
//          for(var i=0; i<temp1.length; i++){
//            if(temp1.indexOf(target)<0){
//                
//                for(var n=0; n<temp1.length; n++){
//            for(var j=0; j<temp2.length; j++){
//                if(temp1[n] == temp2[j]){
//                    middle.push(temp1[n])
//                }
//            }
//            }
//            }
//            } 
//        
//         middle = random(middle);
//        if(sector.enemyFields.indexOf(middle[0]) >=0 ){
//           findField(middle[0]).side = "our";
//       }
//        //занимаем проходное поле
//        
//        // обнуляем все связанное с тактическим полем
//        
//            shorts = 0;
//            OurShorts = 0;
//            EnemyShorts = 0;
//            numberOfOurShort = 0;
//            numberOfEnemyShort = 0;
//                    
//        // обнуляем все связанное с тактическим полем
//        if(document.getElementById(target).innerHTML != 'help'){
//        document.getElementById(target).innerHTML = '<span class="our_tank_attack"></span><span class="our_tank_help"></span>';
//        
//        //обрабочик нажатия на кнопку Атака
//        var attackField = document.getElementsByClassName("our_tank_attack");    
//        for (var i = 0; i < attackField.length; i++) {
//            attackField[i].onclick = ourTankAttackFunction;
//            }
//        //обрабочик нажатия на кнопку Атака
//        
//        //обрабочик нажатия на кнопку Помощь
//        var helpField = document.getElementsByClassName("our_tank_help");    
//        for (var i = 0; i < helpField.length; i++) {
//            helpField[i].onclick = ourTankHelpFunction;
//            }
//        //обрабочик нажатия на кнопку Помощь
//        }
//        
//        battleFieldTarget = target;
//        ourTankHelpField = target;
//        
//        ourAttackObject = ourMoveObject;
//        enemyDefenseObject = findEnemyTroops(target);
//       
//    }
//    if ((ourBattlePositions.indexOf(target) >= 0)&&(ourMoveObject.type == "ARTA"))
//    { // для арты
//        ourMoveObject.artaTarget = target;
//        ourMoveObject.walked = 'yes';
//        
//        ourMovePositions.length = 0;
//        ourAttackPositions.length = 0;
//        ourBattlePositions.length = 0;
//        
//        ourWholeARTA = ourWholeARTA + ourMoveObject.ARTA;
//        
//        drawUnitsOfTwoSize();
//    }
//    if ((ourBattlePositions.indexOf(target) >= 0)&&(ourMoveObject.type == "GRAD"))
//    { // для ГРАДов
//        ourMoveObject.gradTarget = target;
//        ourMoveObject.walked = 'yes';
//        
//        ourMovePositions.length = 0;
//        ourAttackPositions.length = 0;
//        ourBattlePositions.length = 0;
//        battsOnPosition.length = 0;
//        
//        ourWholeGRAD = ourWholeGRAD + ourMoveObject.GRAD;
//        
//        drawUnitsOfTwoSize();
//    }
    
} //функция передвижения наших войск

function drawUnitsOfTwoSize(){ //  ПЕРЕРИСОВЫВАЕМ ВСЕ ПОЛЯ НА КАРТЕ bigMap.bigMapAllFields[1]
    /*
    ourUnitHealth();
    */
 
    sector.our.forEach(function(batt){ //переназначаем нашим батальонам type
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
    
    var newData = [];
    sector.our.forEach(function(unit){
        for(var i=0; i < unit.rota.length; i++){
            if(unit.rota[i].name){
                newData.push(unit);
                i = unit.rota.length
            }
        }
        
    });
    sector.our.length = 0;
    newData.forEach(function(newUnit){
        sector.our.push(newUnit)
    });
   
    for (i=0; i< sector.map.length; i++){
    
    $('#'+sector.map[i].position).empty();   //очищаем содержимое всех ячеек(номера!!!!) 
    $('#'+sector.map[i].position).removeClass('our_infantery_target our_tank_target our_BTR_target our_GRAD_target our_ARTA_target');
        
    if(sector.map[i].side == 'our') { //очищаем нашу карту
        document.getElementById(sector.map[i].position).setAttribute("class", "line_2_cell our")
    }
//        if(sector.map[i].position == data.ourBasePoint){
//        document.getElementById(sector.map[i].position).setAttribute("class", "line_2_cell our base_point")
//    }  
        if(sector.map[i].side == 'enemy') { //очищаем карту противника
         document.getElementById(sector.map[i].position).setAttribute("class", "line_2_cell enemy")
    }
//        if(sector.map[i].position == data.enemyBasePoint){
//        document.getElementById(sector.map[i].position).setAttribute("class", "line_2_cell enemy base_point")
//    } 
    }
        
    for(j=0; j < sector.our.length; j++){ //перерисовываем наши войска   
        
        if((sector.our[j].type == 'tank')&&(sector.our[j].walked == 'no')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_tank");
        }if((sector.our[j].type == 'tank')&&(sector.our[j].walked == 'yes')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_tank_walked");
        } 
        
        if((sector.our[j].type == 'GRAD')&&(sector.our[j].walked == 'no')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_GRAD");
        }if((sector.our[j].type == 'GRAD')&&(sector.our[j].walked == 'yes')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_GRAD_walked");
        }
        
        if(sector.our[j].type == 'infantery'){
          if((sector.our[j].trench == 'yes')&&(sector.our[j].walked == 'no')){
         document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench");
        } if((sector.our[j].trench == 'yes')&&(sector.our[j].walked == 'yes')){
         document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_walked");
        } 
//            if((sector.our[j].trench == 'yes')&&(sector.our[j].mine == 'yes')&&(sector.our[j].walked == 'no')){
//         document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_mine");   
//        } if((sector.our[j].trench == 'yes')&&(sector.our[j].mine == 'yes')&&(sector.our[j].walked == 'yes')){
//         document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_walked_mine");   
//             }
        if(sector.our[j].trench == 'no') {
        if((sector.our[j].type == 'infantery')&&(sector.our[j].walked == 'no')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery");
        }if((sector.our[j].type == 'infantery')&&(sector.our[j].walked == 'yes')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery_walked");
        } 
        }
        }
    
        if(sector.our[j].type == 'BTR'){
            if((sector.our[j].trench == 'yes')&&(sector.our[j].walked == 'no')){
         document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench");
        }   if((sector.our[j].trench == 'yes')&&(sector.our[j].walked == 'yes')){
         document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_walked");
        } 
//            if((sector.our[j].trench == 'yes')&&(sector.our[j].mine == 'yes')&&(sector.our[j].walked == 'no')){
//         document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_mine");   
//        } if((sector.our[j].trench == 'yes')&&(sector.our[j].mine == 'yes')&&(sector.our[j].walked == 'yes')){
//         document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_walked_mine");   
//             } 
            
            
            
            if(sector.our[j].trench == 'no') {
        if((sector.our[j].type == 'BTR')&&(sector.our[j].walked == 'no')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_BTR");
        }if((sector.our[j].type == 'BTR')&&(sector.our[j].walked == 'yes')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_BTR_walked");
        }
        }
        }
        
        if((sector.our[j].type == 'ARTA')&&(sector.our[j].walked == 'no')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_ARTA");
        }if((sector.our[j].type == 'ARTA')&&(sector.our[j].walked == 'yes')){  
        document.getElementById(sector.our[j].position).setAttribute("class", "line_2_cell our our_ARTA_walked");
        }
        
//        levelsAndHealth(sector.our[j]);
        //}
//        closeAttackAndHelpFields();
      } //перерисовываем наши войска
//console.log(sector.enemy)    
        
    for(n=0; n < sector.enemy.length; n++){ //перерисовываем войска противника

        if(sector.enemy[n].type == 'tank'){
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_tank");
            if(sector.enemy[n].walked == 'yes'){
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_tank_walked");        
            }
        } if(sector.enemy[n].type == 'GRAD'){  
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_GRAD");
            if(sector.enemy[n].walked == 'yes'){
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_GRAD_walked");        
            }
        } if(sector.enemy[n].type == 'infantery'){
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_infantery");
            if(sector.enemy[n].walked == 'yes'){
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_infantery_walked");      }
          if((sector.enemy[n].trench == 'yes')&&(sector.enemy[n].walked == 'no')){
         document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_infantery_trench");
        }  
        } if(sector.enemy[n].type == 'BTR'){  
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_BTR");
            if(sector.enemy[n].walked == 'yes'){
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_BTR_walked");        
            }if((sector.enemy[n].trench == 'yes')&&(sector.enemy[n].walked == 'no')){
         document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_infantery_trench");
        } 
            
        } if(sector.enemy[n].type == 'ARTA'){
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_ARTA");
            if(sector.enemy[n].walked == 'yes'){
        document.getElementById(sector.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_ARTA_walked");        
            }
        }
      } //перерисовываем войска противника
    
    if(whoseTurn == 'enemy'){
            $("#enemy_down").show();
            $("#our_down").hide();
       }
    if(whoseTurn == 'our'){
            $("#enemy_down").hide();
            $("#our_down").show();
       }
    sector.calculationMap();
    
} //  ПЕРЕРИСОВЫВАЕМ ВСЕ ПОЛЯ НА КАРТЕ 

function drawOurUnit(unit){ 
        if(unit.type == 'tank'){ 
        $('#'+unit.position).removeClass();
        $('#'+unit.position).addClass("line_2_cell our our_tank_target");
        }if(unit.type == 'GRAD'){ 
        $('#'+unit.position).removeClass(); 
        $('#'+unit.position).addClass("line_2_cell our our_GRAD_target");
        }if(unit.type == 'ARTA'){ 
        $('#'+unit.position).removeClass(); 
        $('#'+unit.position).addClass("line_2_cell our our_ARTA_target");
        }if(unit.type == 'BTR'){ 
        $('#'+unit.position).removeClass(); 
        $('#'+unit.position).addClass("line_2_cell our our_BTR_target")
        }if(unit.type == 'infantery'){ 
        $('#'+unit.position).removeClass(); 
        $('#'+unit.position).addClass("line_2_cell our our_infantery_target")
        }
} 

//function drawCanAttackEnemyWithOutArta(temp){//рисуем возможность нападение на противника кроме арты
//    
//    for(var i=0; i<temp.length; i++){ //рисуем возможность нападение на противника кроме арты
//        for(j=0; j<sector.enemy.length; j++){
//        if(sector.enemy[j].position.indexOf(temp[i].position) >= 0){
//            for(j=0; j< sector.enemy.length; j++){
//                if((sector.enemy[j].type == 'tank')&&(sector.enemy[j].position == temp[i].position)){                
//                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_tank_can_attack") 
//                }if((sector.enemy[j].type == 'BTR')&&(sector.enemy[j].position == temp[i].position)){
//                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_BTR_can_attack") 
//                }if((sector.enemy[j].type == 'infantery')&&(sector.enemy[j].position == temp[i].position)){
//                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_infantery_can_attack") 
//                }if((sector.enemy[j].type == 'GRAD')&&(sector.enemy[j].position == temp[i].position)){
//                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_GRAD_can_attack") 
//                }if((sector.enemy[j].type == 'ARTA')&&(sector.enemy[j].position == temp[i].position)){
//                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_ARTA_can_attack") 
//                }
//            }
//        }
//        }
//    }//рисуем нападение на противника кроме арты
//}//рисуем возможность нападение на противника кроме арты

function drawCanAttackEnemy(){//рисуем возможность нападение на противника танками
    ourBattlePositions.forEach(function(elem){
        var enemy = findEnemyTroops(elem).type;
        if(enemy == 'tank'){$('#'+elem).addClass("line_2_cell enemy enemy_tank_can_attack")};
        if(enemy == 'BTR'){$('#'+elem).addClass("line_2_cell enemy enemy_BTR_can_attack")};
        if(enemy == 'infantery'){$('#'+elem).addClass("line_2_cell enemy enemy_infantery_can_attack")};
        if(enemy == 'GRAD'){$('#'+elem).addClass("line_2_cell enemy enemy_GRAD_can_attack")};
        if(enemy == 'ARTA'){$('#'+elem).addClass("line_2_cell enemy enemy_ARTA_can_attack")};
    });
}//рисуем возможность нападение на противника танками

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

//=================================================
function moveFieldsWithRoad(position){
    
    ourMovePositions = [];
    ourAttackPositions = [];
    ourBattlePositions = [];
    ourTransformPositions = [];
    
   if(ourMoveObject.steps == 1){
       if(sector.road.indexOf(position)<0){
            calculationMoveFieldsFunction(position);
        }
    if((sector.road.indexOf(position)>=0)){
            var temp1 = [];
            var oneArr = [];
            temp1 = oneStepFunction(position);
            temp1.forEach(function(elem){
                if(sector.road.indexOf(elem)>=0){
                    oneArr.push(elem)
                }
            });
            oneArr.forEach(function(elem){
                calculationMoveFieldsFunction(elem);
            });
            calculationMoveFieldsFunction(position);
        }
    }
    if(ourMoveObject.steps == 2){

        if(sector.road.indexOf(position)<0){//юнит стоит не на дорогу
            var temp1 = [];
            var oneArr = [];
            temp1 = oneStepFunction(position);
            temp1.forEach(function(elem){
                if(sector.road.indexOf(elem)>=0){
                    oneArr.push(elem)
                }
            });
            oneArr.forEach(function(elem){
                calculationMoveFieldsFunction(elem, 'one');
            });
                calculationMoveFieldsFunction(position);
        }
        if(sector.road.indexOf(position)>=0){//юнит стоит на дороге
            var temp1 = [];
            var oneArr = [];
            temp1 = oneStepFunction(position);
            temp1.forEach(function(elem){
                if(sector.road.indexOf(elem)>=0){
                    oneArr.push(elem)
                }
            });
            oneArr.forEach(function(elem){
                calculationMoveFieldsFunction(elem);
            });
            calculationMoveFieldsFunction(position);
        }
    }
    drawCanAttackEnemy()
}
//=================================================

function calculationMoveFieldsFunction(position, steps){
    
    
    var temp = [];
    var row = position.substring(0, 2)
    
//    for(i=0; i<sector.our.length; i++){
        
//    if((sector.our[i].position == position)){ //поля для юнитов с 1 ходом
    //if(ourMoveObject.steps == 1){ //поля для юнитов с 1 ходом
        if(row % 2 == 0){
        temp.push(createDirectionOfAttack(calculationPosition(position, 1, -1), 6));
        temp.push(createDirectionOfAttack(calculationPosition(position, 1, 0), 1));
        temp.push(createDirectionOfAttack(calculationPosition(position, 0, -1), 5));
        temp.push(createDirectionOfAttack(calculationPosition(position, 0, 1), 2));
        temp.push(createDirectionOfAttack(calculationPosition(position, -1, 0), 3));
        temp.push(createDirectionOfAttack(calculationPosition(position, -1, -1), 4));
    } 
        else 
        {
        temp.push(createDirectionOfAttack(calculationPosition(position, 1, 0), 6));
        temp.push(createDirectionOfAttack(calculationPosition(position, 1, 1), 1));
        temp.push(createDirectionOfAttack(calculationPosition(position, 0, 1), 2));
        temp.push(createDirectionOfAttack(calculationPosition(position, -1, 1), 3));
        temp.push(createDirectionOfAttack(calculationPosition(position, -1, 0), 4));
        temp.push(createDirectionOfAttack(calculationPosition(position, 0, -1), 5));
    }
        //добавим проверку на доругу
        
   // } //поля для юнитов с 1 ходом
        
    var newTemp = [];
//    if ((sector.our[i].position == position)&&(sector.our[i].steps == 2)){
    if (/*(ourMoveObject.position == position)&&*/(ourMoveObject.steps == 2)&&((steps!='one'))){
        if(row % 2 == 0){
               
              if ((sector.waterFields.indexOf(calculationPosition(position, 1, -1)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, 1, -1)) < 0)) {
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, -2), 16));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, -1), 16));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 0), 11));
              }
               if ((sector.waterFields.indexOf(calculationPosition(position, 1, 0)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, 1, 0)) < 0)) {                 
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 0), 11));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 1), 11));
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, 1), 12));
              } 
                if ((sector.waterFields.indexOf(calculationPosition(position, 0, 1)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, 0, 1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, 1), 12));
                temp.push(createDirectionOfAttack(calculationPosition(position, 0, 2), 12));
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, 1), 13));
              } 
               if ((sector.waterFields.indexOf(calculationPosition(position, -1, 0)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, -1, 0)) < 0)) {              
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, 1), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 1), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 0), 13));
              } 
               if ((sector.waterFields.indexOf(calculationPosition(position, -1, -1)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, -1, -1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 0), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, -1), 14));
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, -2), 15));
              } 
               if ((sector.waterFields.indexOf(calculationPosition(position, 0, -1)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, 0, -1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, -2), 15));
                temp.push(createDirectionOfAttack(calculationPosition(position, 0, -2), 15));
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, -2), 16));
              }
               
           } 
        else {
               
              if ((sector.waterFields.indexOf(calculationPosition(position, 1, 0)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, 1, 0)) < 0)) {
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, -1), 16));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, -1), 16));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 0), 11));
              }
               if ((sector.waterFields.indexOf(calculationPosition(position, 1, 1)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, 1, 1)) < 0)) {                
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 0), 11));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 1), 11));
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, 2), 12));
              } 
                if ((sector.waterFields.indexOf(calculationPosition(position, 0, 1)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, 0, 1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, 2), 12));
                temp.push(createDirectionOfAttack(calculationPosition(position, 0, 2), 12));
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, 2), 13));
              } 
               if ((sector.waterFields.indexOf(calculationPosition(position, -1, 1)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, -1, 1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, 2), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 1), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 0), 13));
              } 
               if ((sector.waterFields.indexOf(calculationPosition(position, -1, 0)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, -1, 0)) < 0)) {                
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 0), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, -1), 14));
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, -1), 15));
              } 
               if ((sector.waterFields.indexOf(calculationPosition(position, 0, -1)) < 0)&&(sector.enemyTroops().indexOf(calculationPosition(position, 0, -1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, -1), 15));
                temp.push(createDirectionOfAttack(calculationPosition(position, 0, -2), 15));
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, -1), 16));
              } 
           }
        } //новый расчет для 2 ходов с учетом воды
//    }
//    ourMovePositions = [];
//    ourAttackPositions = [];
//    ourBattlePositions = [];
//    ourTransformPositions = [];
    for(var i=0; i<temp.length; i++){   
       
        if((sector.ourFields.indexOf(temp[i].position) >= 0)&&(sector.ourTroops().indexOf(temp[i].position)< 0 )&&(ourMovePositions.indexOf(temp[i].position) < 0)){ 
            ourMovePositions.push(temp[i].position); 
        }if((sector.enemyFields.indexOf(temp[i].position) >=0)&&(sector.enemyTroops().indexOf(temp[i].position) < 0)){ 
            ourAttackPositions.push(temp[i].position);
        }if((sector.enemyFields.indexOf(temp[i].position) >=0)&&(sector.enemyFields.indexOf(temp[i].position) >= 0)&&(sector.enemyTroops().indexOf(temp[i].position) >= 0)&&(ourBattlePositions.indexOf(temp[i].position)<0)){
            ourBattlePositions.push(temp[i].position);
        }if((sector.ourFields.indexOf(temp[i].position) >= 0)&&(sector.ourTroops().indexOf(temp[i].position)>= 0 )&&(ourTransformPositions.indexOf(temp[i].position) < 0)&&(temp[i].position != ourMoveObject.position)){ 
            ourTransformPositions.push(temp[i].position); 
        }
      }
    
        ourBattlePositions.forEach(function(field){
//    alert('startOurAttackInZone')
            startOurAttackInZone(field)
        })
    
    for(var j=0; j<ourMovePositions.length; j++){
        
         document.getElementById(ourMovePositions[j]).setAttribute("class", "line_2_cell our our_can_move")
    }
    
    for(var i=0; i<temp.length; i++){ // рисуем стрелки для атаки
        if((sector.enemyFields.indexOf(temp[i].position) >= 0)&&(sector.enemyTroops().indexOf(temp[i].position)<0)){ 
           if(temp[i].direction == 1){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_1")
           }if(temp[i].direction == 2){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_2")
           }if(temp[i].direction == 3){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_3")
           }if(temp[i].direction == 4){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_4")
           }if(temp[i].direction == 5){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_5")
           }if(temp[i].direction == 6){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_6")
           }
            
            if(temp[i].direction == 11){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_11")
           }if(temp[i].direction == 12){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_12")
           }if(temp[i].direction == 13){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_13")
           }if(temp[i].direction == 14){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_14")
           }if(temp[i].direction == 15){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_15")
           }if(temp[i].direction == 16){
               document.getElementById(temp[i].position).setAttribute("class", "line_2_cell our our_can_attack_16")
           }
         }
      } // рисуем стрелки для атаки
      
//    for(i=0; i<sector.our.length; i++){ 
//        if(sector.our[i].position == position){
//            if((sector.our[i].type == 'ARTA')||(sector.our[i].type == 'GRAD')){
//            } else {
//            if(sector.our[i].type == 'tank'){
//               drawCanAttackEnemyWithTanks(temp); 
//            } else {
//               drawCanAttackEnemyWithOutArta(temp);  
//            } 
//            }
//        }
//    } //проверяем свой объект на причастность к арте и ГРАДу или танкам
    
//    for(i=0; i<sector.our.length; i++){ //находим цели для арты
//        if(sector.our[i].position == position){
//            if(sector.our[i].type == 'ARTA'){
//               var fields = createFieldsForOurArtaAttack(position);              
//               drawOurArtaAttackForEnemy(fields); 
//                
//                ourBattlePositions.length = 0;
//                for(j=0; j<fields.length; j++){
//                  if ((sector.enemyFields.indexOf(fields[j]) >=0)&&(sector.enemyTroops().indexOf(fields[j]) >= 0)) {
//                      ourBattlePositions.push(fields[j]); 
//                   }
//                }
//                
//            } 
//        }
//    } //находим цели для арты
//    
//    for(i=0; i<sector.our.length; i++){ //находим цели для ГРАДА 
//        if(sector.our[i].position == position){
//            if(sector.our[i].type == 'GRAD'){
//               var fieldsGrad = createFieldsForOurGradAttack(position);              
//               drawOurArtaAttackForEnemy(fieldsGrad); 
//                
//                ourBattlePositions.length = 0;
//                for(j=0; j<fieldsGrad.length; j++){
//                  if ((sector.enemyFields.indexOf(fieldsGrad[j]) >=0)&&(sector.enemyFields.indexOf(fieldsGrad[j]) >= 0)&&(sector.enemyTroops().indexOf(fieldsGrad[j]) >= 0)) {
//                      ourBattlePositions.push(fieldsGrad[j]); 
//                   }
//                }
//                
//            } 
//        }
//    } //находим цели для ГРАДА
   drawCombineBatts(); 
}

function changeOurUnitFace(target){ //изменяем выделенный юнит
    if(sector.ourTroops().indexOf(target<0)){ 
    for(i=0; i < sector.our.length; i++){
        if(sector.our[i].position == target){
            if(sector.our[i].type == 'tank'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_tank_target");
            } if(sector.our[i].type == 'GRAD'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_GRAD_target");
            } if(sector.our[i].type == 'infantery'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_infantery_target");
            } if(sector.our[i].type == 'BTR'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_BTR_target");
            } if(sector.our[i].type == 'ARTA'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_ARTA_target");
            }
            ourLastStep = target;  
        }
      }
    }  
} //изменяем выделенный юнит

function findOurTroops(target){
    var obj = {};
    for (i=0; i<sector.our.length; i++){
        if(sector.our[i].position == target){
            obj = sector.our[i];
        } 
    }
    return obj;
}

function findEnemyTroops(target){
    var obj = {};
    for (i=0; i<sector.enemy.length; i++){
        if(sector.enemy[i].position == target){
            obj = sector.enemy[i];
        } 
    }
    return obj;
}

function findField(target){
    for(i=0; i<sector.map.length; i++){
        if(sector.map[i].position == target){
            return sector.map[i];
        }
    }
}

function createDirectionOfAttack(position, direction){ //создаем объект из позиций для хода и направления атаки
        var obj ={};
        obj['position'] = position;
        obj['direction'] = direction;
        return obj;
    } //создаем объект из позиций для хода и направления атаки 

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

function oneStepFunction(position){
    var temp = []; //добавил var !!!???
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

function twoStepFunction(position){
    var arr1 = [];
    var arr2 = [];
    arr1 = oneStepFunction(position);
    arr1.forEach(function(elem){
        var temp =[];
        temp = oneStepFunction(elem);
        temp.forEach(function(field){
            if((field!=position)&&(arr2.indexOf(field)<0)&&(arr1.indexOf(field)<0)){
                arr2.push(field);
            }
        })
    })
    return arr2;
}

//==============ПЕРЕНЕСЕНО ИЗ ДРУГИХ ФАЙЛОВ===============//
function random(arr){
    
  function compareRandom(a, b) {
        return Math.random() - 0.5;
    }
    
   return arr.sort(compareRandom);
}
//==============ПЕРЕНЕСЕНО ИЗ ДРУГИХ ФАЙЛОВ===============//

function newCourse(){
    whoseTurn = 'our';
    sector.map.forEach(function(field){
        $('#'+field.position).unbind('click');
    })
    init();
    ourMoveObject = {};
    
//    refillEnemyTroops(); // наверное прийдется найти для этой функции другое место
    
    for(i=0; i<sector.our.length; i++){
        sector.our[i].walked = 'no';
    }
    for(j=0; j<sector.enemy.length; j++){
        sector.enemy[j].walked = 'no';
        sector.enemy[j].middlePosition = '';
        sector.enemy[j].stepPosition = '';
        sector.enemy[j].attackArtaOrGrad = 'no';
        
    }
    
//    ourTankHelp = 0;
    drawUnitsOfTwoSize();
//    cleaningOurAndEnemy();
//    ourWholeGRAD = 0;
//    ourWholeARTA = 0;
//    enemyWholeGRAD = 0;
//    enemyWholeARTA = 0;
    
//    for(j=0; j<sector.calculationMap().length; j++){
//        document.getElementById(sector.calculationMap()[j].position).innerHTML = sector.calculationMap()[j].position;
//    }
//    for(n=0; n<sector.our.length; n++){
//        sector.our[n].helpTarget = 'no';
//        sector.our[n].artaTarget = 'no';
//        sector.our[n].gradTarget = 'no';
//    }
//    globalStep++;
    
    sector.enemy.forEach(function(enemy){
        enemy.retreatPosition = 'no';       
    });
    
    
    lastStep.saveLastStep();
    
    
} // меняем вид юнитам совершившим ход

function ourTrench(){
    lastStep.saveLastStep();
    if(globalTarget) {
    document.getElementById(globalTarget).setAttribute('class', 'line_2_cell our our_infantery_trench');
    
        findOurTroops(globalTarget).walked = 'yes';
        findOurTroops(globalTarget).trench = 'yes';
        $("#our_trench").hide();
        $("#our_trench_off").css("display", "inline-block");
        ourMoveObject = [];
        drawUnitsOfTwoSize();
    }
} //функция нажатия кнопки "Окопаться"

function saveSector(){
    var sendData = JSON.stringify(sector).toString();
//    console.log(sendDate)
    $.get('http://localhost:8080/sector/save/', sendData)
}

function startOurAttackInZone(target){
    var direction = calculationAttackDirection(target)
    $('#'+target).on('click', function(){                    
            var url = '/zone/' + sector.name + '-zone/' + target + '?Direction=' +direction + '&zoneName=' + sector.name + '-' + target;
            var save = $.get( 'http://localhost:8080/zone/save-battle/', createRequest());
            var dir_request = $.get('http://localhost:8080/direction/'+direction+'/');
        
            save.complete(function(){
                var jqxhr1 = $.get(url);        
                jqxhr1.complete(function(){
                    dir_request.complete(function(){
                        location.href = url;
                    })
                })
            })
            
    
        })
    
    function createRequest(){
        var obj = {};
        obj.position = target;
        obj.sector = sector.name;
        obj.ourRotas = ourMoveObject.rota;
//        obj.whoAttack = whoAttack;
        obj.enemyRotas = findEnemyTroops(target).rota
        return JSON.stringify(obj).toString();
    }
}

function calculationAttackDirection(target){
    
    var start = ourMoveObject.position;
    var finish = target;
    if(minDistanceBetweenTwoPoints(start, finish)>2){// тут что-то будет
        var arr1 = [];
        var arr2 = [];
        var startArr = [];
        arr1 = oneStepFunction(start);
        arr2 = twoStepFunction(finish);
        arr1.forEach(function(elem){
            if(arr2.indexOf(elem)>=0){
                startArr.push(elem)
            }
        })
        startArr = random(startArr);
        start = startArr[0];
    }
    var temp1 = [];
    var temp2 = [];
    var temp3 = [];
    var row = finish.substring(0, 2)
    if(oneStepFunction(finish).indexOf(start)>=0){
        if(row % 2 == 0){
            if(calculationPosition(finish, 1, -1) == start) return 3;
            if(calculationPosition(finish, 1, 0) == start) return 4;
            if(calculationPosition(finish, 0, -1) == start) return 2;
            if(calculationPosition(finish, 0, 1) == start) return 5;
            if(calculationPosition(finish, -1, 0) == start) return 6;
            if(calculationPosition(finish, -1, -1) == start) return 1;
        } else {
            if(calculationPosition(finish, 1, 0) == start) return 3;
            if(calculationPosition(finish, 1, 1) == start) return 4;
            if(calculationPosition(finish, 0, 1) == start) return 5;
            if(calculationPosition(finish, -1, 1) == start) return 6;
            if(calculationPosition(finish, -1, 0) == start) return 1;
            if(calculationPosition(finish, 0, -1) == start) return 2;
    }
    } //поля для юнитов с 1 ходом
    temp1 = oneStepFunction(finish);
    temp1.forEach(function(field1){
        temp2 = oneStepFunction(field1)
        temp2.forEach(function(field2){
           if((temp3.indexOf(field2)<0)&&(temp1.indexOf(field2)<0)&&(field2!=finish)){
               temp3.push(field2)
           }
        })
    });
    if(temp3.indexOf(start)>=0){
    //поля для юнитов с 2 ходом
    if(row % 2 == 0){
            if(calculationPosition(finish, 2, -1) == start) return 3;
            if(calculationPosition(finish, 2, 1) == start) return 4;
            if(calculationPosition(finish, 0, -2) == start) return 2;
            if(calculationPosition(finish, 0, 2) == start) return 5;
            if(calculationPosition(finish, -2, -1) == start) return 1;
            if(calculationPosition(finish, -2, 1) == start) return 6;
            if(calculationPosition(finish, 2, 0) == start) return random([3, 4])[0];
            if(calculationPosition(finish, 1, -2) == start) return random([3, 2])[0];
            if(calculationPosition(finish, 1, 1) == start) return random([5, 4])[0];
            if(calculationPosition(finish, -1, -2) == start) return random([1, 2])[0];
            if(calculationPosition(finish, -1, 1) == start) return random([5, 6])[0];
            if(calculationPosition(finish, -2, 0) == start) return random([1, 6])[0];        
           } else{
            if(calculationPosition(finish, 2, -1) == start) return 3;
            if(calculationPosition(finish, 2, 1) == start) return 4;
            if(calculationPosition(finish, 0, -2) == start) return 2;
            if(calculationPosition(finish, 0, 2) == start) return 5;
            if(calculationPosition(finish, -2, -1) == start) return 1;
            if(calculationPosition(finish, -2, 1) == start) return 6;
            if(calculationPosition(finish, 2, 0) == start) return random([3, 4])[0];
            if(calculationPosition(finish, 1, -1) == start) return random([3, 2])[0];
            if(calculationPosition(finish, 1, 2) == start) return random([5, 4])[0];
            if(calculationPosition(finish, -1, -1) == start) return random([1, 2])[0];
            if(calculationPosition(finish, -1, 2) == start) return random([5, 6])[0];
            if(calculationPosition(finish, -2, 0) == start) return random([1, 6])[0];   
           }
    }
}

function deleteElementFromArray(arr, elem){
    var newArr =[];
    arr.forEach(function(unit){
        if(unit != elem){
            newArr.push(unit)
        }
    });
    return newArr;
}

function addOurNewField(target){
    
    sector.map.forEach(function(map){
        if(map.position == target){
            map.side = 'our';
        }
    });
    sector.ourFields.push(target);
    
    sector.enemyFields = deleteElementFromArray(sector.enemyField(), target);
}

function ourMiddlePositionFunction(start, finish, ID){
//    if((findOurTroopsForId(ID).type == 'tank')||(findOurTroopsForId(ID).type == 'BTR')||(findOurTroopsForId(ID).type == 'GRAD')){
//    if(minDistanceBetweenOurTwoPoints(start, finish) == 2){ 
    if(minDistanceBetweenTwoPoints(start, finish) == 2){ 
        var startPoints = [];
        startPoints = oneStepFunction(start);
        var finishPoints = [];
        finishPoints = oneStepFunction(finish);
        var middlePoints = [];
        startPoints.forEach(function(point){
            if((finishPoints.indexOf(point)>=0)&&(sector.enemyTroops().indexOf(point)<0)){
                middlePoints.push(point);
            }            
        });

            middlePoints = random(middlePoints);
        if(findField(middlePoints[0]).side == 'enemy'){
            findField(middlePoints[0]).side = 'our';
            sector.ourFields.push(middlePoints[0]);
            sector.enemyFields = deleteElementFromArray(sector.enemyField(), middlePoints[0]);
        }
    }
    if(minDistanceBetweenTwoPoints(start, finish) == 3){
        var startPoints1 = [];
        startPoints1 = twoStepFunction(start);
        var finishPoints1 = [];
        finishPoints1 = oneStepFunction(finish);
        var middlePoints2 = [];
        startPoints1.forEach(function(point){
            if((finishPoints1.indexOf(point)>=0)&&(sector.enemyTroops().indexOf(point)<0)){
                middlePoints2.push(point);
            }            
        });
        middlePoints2 = random(middlePoints2);
        var point2 = middlePoints2[0];
        var startPoints2 = [];
        startPoints2 = oneStepFunction(start);
        var finishPoints2 = [];
        finishPoints2 = oneStepFunction(point2);
        var middlePoints1 = [];
        startPoints2.forEach(function(point){
            if((finishPoints2.indexOf(point)>=0)&&(sector.enemyTroops().indexOf(point)<0)){
                middlePoints1.push(point);
            }            
        });
        middlePoints1 = random(middlePoints1);
        var point1 = middlePoints1[0];
        
console.log(point1 + ' ' + point2)
        
        if(findField(point1).side == 'enemy'){
            findField(point1).side = 'our';
            sector.ourFields.push(point1);
            sector.enemyFields = deleteElementFromArray(sector.enemyField(), point1);
        }
        if(findField(point2).side == 'enemy'){
            findField(point2).side = 'our';
            sector.ourFields.push(point2);
            sector.enemyFields = deleteElementFromArray(sector.enemyField(), point2);
        }
    }    
//}
} //захватываем поле противника если оно находиться между двумя нашими полями старта и финиша

function findOurTroopsForId(ID){
    for(i=0; i<sector.our.length; i++){
        if(sector.our[i].ID == ID){
            return sector.our[i];
        }
    }
} // найти наш юнит по ID

function minDistanceBetweenOurTwoPoints(start, finish){
    var startPoints =[];
    startPoints = oneStepFunction(start);
    if(startPoints.indexOf(finish)>=0){
        return 1;
    }else{
        return 2;
    } 
} //расчет длины хода нашего юнита

function minDistanceBetweenTwoPoints(point1, point2){//находит минимальное расстояние между двумя точками
    var result = 0;
    var temp = [];
    var temp2 = []
    if(point1 == point2){
        return result;
    }
    
    result +=1;    
    temp = oneStepFunction(point1);
    if(temp.indexOf(point2)>=0){
        return result;
    }
    
    temp2 = copyArray(temp)
    while(temp2.indexOf(point2)<0){
        result +=1;
        temp2 = newRound(temp2)
    }
    return result;    
}//находит минимальное расстояние между двумя точками

function newRound(arr){ //возвращает массив полей граничных  с исходным + исходный массив
        var round = copyArray(arr);
        arr.forEach(function(elem){
            var temp = [];
            temp = oneStepFunction(elem);
            temp.forEach(function(field){
                if(round.indexOf(field)<0){
                    round.push(field);
                }
            })
        })
    return round;
} //возвращает массив полей граничных  с исходным + исходный массив


//function informAboutOurUnits(){
//    sector.map.forEach(function (field){
//        document.getElementById(field.position).ondblclick = false;
//    })
//    
//    var ourId = [];
//    for(var i=0; i<sector.our.length; i++){
//        ourId.push(sector.our[i].position);
//        }    
//    for(var i=0; i<ourId.length; i++){
//        document.getElementById(ourId[i]).ondblclick = openPanel;
//    }  
//}

//function closePanel(){ //функция закрытия информ панели
//    document.getElementById('wrap').style.display = 'none';			
//    document.getElementById('info_panel').style.display = 'none';
//} //функция закрытия информ панели

//function openPanel(event){ //функция открытия информ панели
//    ourUnitHealth();
//    var target = event.target.id;
//    for(i=0; i<sector.our.length; i++){
//        if(sector.our[i].position == target){
//        if(sector.our[i].type == 'infantery'){
//            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_infantery')
//        }if(sector.our[i].type == 'BTR'){
//            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_BTR')
//        }if(sector.our[i].type == 'tank'){
//            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_tank')
//        }if(sector.our[i].type == 'GRAD'){
//            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_GRAD')
//        }if(sector.our[i].type == 'ARTA'){
//            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_ARTA')
//        }
//     }
//    }
//    ourTroopInformPanel(target);
//    document.getElementById('wrap').style.display = 'block';			
//    document.getElementById('info_panel').style.display = 'block';
//    
//} //функция открытия информ панели

//function ourTroopInformPanel(target){
//    var ourUnit = findOurTroops(target);
//        document.getElementById('name_of_unit').innerHTML =  ourUnit.name;
//        document.getElementById('value_health_of_unit').innerHTML =  ourUnit.health + '%';
//    
//    if (ourUnit.type == 'tank'){
//        allCloseUnless('tank');
//        if(ourUnit.tank == 10){
//           for(i = 0 ; i < 10; i++){
//            document.getElementById('tank_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('tank_00' + i + '_position').style.backgroundPosition = '0px -600px';
//        } 
//        }else{
//        for(i = 0 ; i <= ourUnit.tank; i++){
//            document.getElementById('tank_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('tank_00' + i + '_position').style.backgroundPosition = '0px -600px';  
//        }
//        for(i = ourUnit.tank ; i < ourUnit.maxTank; i++){
//            document.getElementById('tank_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('tank_00' + i + '_position').style.backgroundPosition = '-400px -600px';
//        }
//        for(i = ourUnit.maxTank ; i<10; i++){
//            document.getElementById('tank_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('tank_00' + i + '_position').style.backgroundPosition = '-200px -600px';
//        }
//        }
//    }
//    
//    if (ourUnit.type == 'GRAD'){
//        allCloseUnless('GRAD');
//        if(ourUnit.GRAD == 4){
//           for(i = 0 ; i < 4; i++){
//            document.getElementById('GRAD_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('GRAD_00' + i + '_position').style.backgroundPosition = '0px -200px';
//           }
//        }else{
//        for(i = 0 ; i < ourUnit.GRAD; i++){
//            document.getElementById('GRAD_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('GRAD_00' + i + '_position').style.backgroundPosition = '0px -200px';
//        }
//        for(i = ourUnit.GRAD ; i < ourUnit.maxGRAD; i++){
//            document.getElementById('GRAD_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('GRAD_00' + i + '_position').style.backgroundPosition = '-400px -200px';
//        }
//        for(i = ourUnit.maxGRAD ; i<4; i++){
//            document.getElementById('GRAD_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('GRAD_00' + i + '_position').style.backgroundPosition = '-200px -200px';
//        }
//        }
//    }
//    
//    if (ourUnit.type == 'ARTA'){
//        allCloseUnless('ARTA');
//        if(ourUnit.ARTA == 3){
//           for(i = 0 ; i < 3; i++){
//             document.getElementById('ARTA_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('ARTA_00' + i + '_position').style.backgroundPosition = '0px 0px';
//        }
//        }else{
//        for(i = 0 ; i < ourUnit.ARTA; i++){
//            document.getElementById('ARTA_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('ARTA_00' + i + '_position').style.backgroundPosition = '0px 0px';
//        }
//        for(i = ourUnit.ARTA ; i < ourUnit.maxARTA; i++){
//            document.getElementById('ARTA_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('ARTA_00' + i + '_position').style.backgroundPosition = '-400px 0px';
//        }
//        for(i = ourUnit.maxARTA ; i<3; i++){
//            document.getElementById('ARTA_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('ARTA_00' + i + '_position').style.backgroundPosition = '-200px 0px';
//        }
//        }
//    }
//    
//    if (ourUnit.type == 'infantery'){
//        allCloseUnless('infantery');
//        if(ourUnit.infantery == 10){
//           for(i = 0 ; i < 10; i++){
//            document.getElementById('infantery_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('infantery_00' + i + '_position').style.backgroundPosition = '0px -300px';
//           }
//        }else{
//        for(i = 0 ; i <= ourUnit.infantery; i++){
//            document.getElementById('infantery_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('infantery_00' + i + '_position').style.backgroundPosition = '0px -300px';
//        }
//        for(i = ourUnit.infantery ; i < ourUnit.maxInfantery; i++){
//            document.getElementById('infantery_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('infantery_00' + i + '_position').style.backgroundPosition = '-400px -300px';
//        }
//        for(i = ourUnit.maxInfantery ; i<10; i++){
//            document.getElementById('infantery_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('infantery_00' + i + '_position').style.backgroundPosition = '-200px -300px';
//        }
//        }
//        if(ourUnit.mortar == 5){
//           for(i = 0 ; i < 5; i++){
//              document.getElementById('mortan_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('mortan_00' + i + '_position').style.backgroundPosition = '0px -400px';
//        }
//        }else{
//        for(i = 0 ; i <= ourUnit.mortar; i++){
//            document.getElementById('mortan_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('mortan_00' + i + '_position').style.backgroundPosition = '0px -400px';
//        }
//        for(i = ourUnit.mortar ; i < ourUnit.maxMortar; i++){
//            document.getElementById('mortan_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('mortan_00' + i + '_position').style.backgroundPosition = '-400px -400px';
//        }
//        for(i = ourUnit.maxMortar ; i<5; i++){
//            document.getElementById('mortan_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('mortan_00' + i + '_position').style.backgroundPosition = '-200px -400px';
//        }
//        }
//        if(ourUnit.PTUR == 5){
//           for(i = 0 ; i < 5; i++){
//            document.getElementById('PTUR_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('PTUR_00' + i + '_position').style.backgroundPosition = '0px -500px';
//        }
//        }else{
//        for(i = 0 ; i <= ourUnit.PTUR; i++){
//            document.getElementById('PTUR_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('PTUR_00' + i + '_position').style.backgroundPosition = '0px -500px';
//        }
//        for(i = ourUnit.PTUR ; i < ourUnit.maxPTUR; i++){
//            document.getElementById('PTUR_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('PTUR_00' + i + '_position').style.backgroundPosition = '-400px -500px';
//        }
//        for(i = ourUnit.maxPTUR ; i<5; i++){
//            document.getElementById('PTUR_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('PTUR_00' + i + '_position').style.backgroundPosition = '-200px -500px';
//        }
//        }
//    }
//    
//    if (ourUnit.type == 'BTR'){
//        allCloseUnless('BTR');
//        if(ourUnit.infantery == 10){
//           for(i = 0 ; i < 10; i++){
//            document.getElementById('infantery2_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('infantery2_00' + i + '_position').style.backgroundPosition = '0px -300px';
//        }
//        }else{
//        for(i = 0 ; i <= ourUnit.infantery; i++){
//            document.getElementById('infantery2_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('infantery2_00' + i + '_position').style.backgroundPosition = '0px -300px';
//        }
//        for(i = ourUnit.infantery ; i < ourUnit.maxInfantery; i++){
//           document.getElementById('infantery2_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('infantery2_00' + i + '_position').style.backgroundPosition = '-400px -300px';
//        }
//        for(i = ourUnit.maxInfantery ; i<10; i++){
//           document.getElementById('infantery2_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('infantery2_00' + i + '_position').style.backgroundPosition = '-200px -300px';
//        }
//        }
//        if(ourUnit.mortar == 5){
//           for(i = 0 ; i < 5; i++){
//               document.getElementById('mortan2_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('mortan2_00' + i + '_position').style.backgroundPosition = '0px -400px';
//        }
//        }else{
//        for(i = 0 ; i <= ourUnit.mortar; i++){
//            document.getElementById('mortan2_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('mortan2_00' + i + '_position').style.backgroundPosition = '0px -400px';
//        }
//        for(i = ourUnit.mortar ; i < ourUnit.maxMortar; i++){
//            document.getElementById('mortan2_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('mortan2_00' + i + '_position').style.backgroundPosition = '-400px -400px';
//        }
//        for(i = ourUnit.maxMortar ; i<5; i++){
//            document.getElementById('mortan2_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('mortan2_00' + i + '_position').style.backgroundPosition = '-200px -400px';
//        }
//        }
//        if(ourUnit.PTUR == 5){
//           for(i = 0 ; i < 5; i++){
//            document.getElementById('PTUR2_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('PTUR2_00' + i + '_position').style.backgroundPosition = '0px -500px';
//        }
//        }else{
//        for(i = 0 ; i <= ourUnit.PTUR; i++){
//           document.getElementById('PTUR2_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('PTUR2_00' + i + '_position').style.backgroundPosition = '0px -500px';
//        }
//        for(i = ourUnit.PTUR ; i < ourUnit.maxPTUR; i++){
//            document.getElementById('PTUR2_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('PTUR2_00' + i + '_position').style.backgroundPosition = '-400px -500px';
//        }
//        for(i = ourUnit.maxPTUR ; i<5; i++){
//            document.getElementById('PTUR2_00' + i + '_position').style.backgroundImage = 'url(../../picture/our_info_panel.png)';
//            document.getElementById('PTUR2_00' + i + '_position').style.backgroundPosition = '-200px -500px';
//        }
//        }
//        
//        if(ourUnit.BTR == 5){
//           for(i = 0 ; i < 5; i++){
//               document.getElementById('BTR_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('BTR_00' + i + '_position').style.backgroundPosition = '0px -100px';
//        }
//        }else{
//        for(i = 0 ; i <= ourUnit.BTR; i++){
//            document.getElementById('BTR_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('BTR_00' + i + '_position').style.backgroundPosition = '0px -100px';
//        }
//        for(i = ourUnit.BTR ; i < ourUnit.maxBTR; i++){
//            document.getElementById('BTR_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('BTR_00' + i + '_position').style.backgroundPosition = '-400px -100px';
//        }
//        for(i = ourUnit.maxBTR ; i<5; i++){
//            document.getElementById('BTR_00' + i + '_position').style.backgroundImage ='url(../../picture/our_info_panel.png)';
//            document.getElementById('BTR_00' + i + '_position').style.backgroundPosition = '-200px -100px';
//        }
//        }
//    }
//    
//} // отрисовывает войска в информ панели

//function allCloseUnless(type){
//    if(type != 'tank'){
//        for(i=0; i<10; i++){
//            document.getElementById('tank_00' + i + '_position').style.display = 'none';
//        }
//    }
//    if(type == 'tank'){
//        for(i=0; i<10; i++){
//            document.getElementById('tank_00' + i + '_position').style.display = 'block';
//        }
//    }
//    if(type != 'GRAD'){
//        for(i=0; i<4; i++){
//            document.getElementById('GRAD_00' + i + '_position').style.display = 'none';
//        }
//    }
//    if(type == 'GRAD'){
//        for(i=0; i<4; i++){
//            document.getElementById('GRAD_00' + i + '_position').style.display = 'block';
//        }
//    }
//    if(type != 'ARTA'){
//        for(i=0; i<3; i++){
//            document.getElementById('ARTA_00' + i + '_position').style.display = 'none';
//        }
//    }
//    if(type == 'ARTA'){
//        for(i=0; i<3; i++){
//            document.getElementById('ARTA_00' + i + '_position').style.display = 'block';
//        }
//    }
//    if(type != 'infantery'){
//        for(i=0; i<10; i++){
//            document.getElementById('infantery_00' + i + '_position').style.display = 'none';
//        }
//        for(i=0; i<5; i++){
//            document.getElementById('mortan_00' + i + '_position').style.display = 'none';
//            document.getElementById('PTUR_00' + i + '_position').style.display = 'none';
//        }
//    }
//    if(type == 'infantery'){
//        for(i=0; i<10; i++){
//            document.getElementById('infantery_00' + i + '_position').style.display = 'block';
//        }
//        for(i=0; i<5; i++){
//            document.getElementById('mortan_00' + i + '_position').style.display = 'block';
//            document.getElementById('PTUR_00' + i + '_position').style.display = 'block';
//        }
//    }
//    
//     if(type != 'BTR'){
//        for(i=0; i<10; i++){
//            document.getElementById('infantery2_00' + i + '_position').style.display = 'none';
//        }
//        for(i=0; i<5; i++){
//            document.getElementById('mortan2_00' + i + '_position').style.display = 'none';
//            document.getElementById('PTUR2_00' + i + '_position').style.display = 'none';
//            document.getElementById('BTR_00' + i + '_position').style.display = 'none';
//        }
//    }
//    if(type == 'BTR'){
//        for(i=0; i<10; i++){
//            document.getElementById('infantery2_00' + i + '_position').style.display = 'block';
//        }
//        for(i=0; i<5; i++){
//            document.getElementById('mortan2_00' + i + '_position').style.display = 'block';
//            document.getElementById('PTUR2_00' + i + '_position').style.display = 'block';
//            document.getElementById('BTR_00' + i + '_position').style.display = 'block';
//        }
//    }
//} //закрывает все ранее открытые войска в инфо панели кроме указанных(type)

//function startRealQuantity(){ // создать свойсва RealQuantity для всех войск
//    for(i=0; i<sector.our.length; i++){
//        if(sector.our[i].type == 'GRAD'){
//                sector.our[i].realGRAD = sector.our[i].GRAD;
//            }
//        if(sector.our[i].type == 'ARTA'){
//                sector.our[i].realARTA = sector.our[i].ARTA;
//            }
//        if(sector.our[i].type == 'tank'){
//                sector.our[i].realtank = sector.our[i].tank;
//            }
//        if((sector.our[i].type == 'infantery')||(sector.our[i].type == 'BTR')){
//                sector.our[i].realinfantery = sector.our[i].infantery;
//            }
//        if((sector.our[i].type == 'infantery')||(sector.our[i].type == 'BTR')){
//                sector.our[i].realmortar = sector.our[i].mortar;
//            }
//        if((sector.our[i].type == 'infantery')||(sector.our[i].type == 'BTR')){
//                sector.our[i].realPTUR = sector.our[i].PTUR;
//            }
//        if(sector.our[i].type == 'BTR'){
//                sector.our[i].realBTR = sector.our[i].BTR;
//            }
//    }
//    
//    for(i=0; i<sector.enemy.length; i++){
//        if(sector.enemy[i].type == 'GRAD'){
//                sector.enemy[i].realGRAD = sector.enemy[i].GRAD;
//            }
//        if(sector.enemy[i].type == 'ARTA'){
//                sector.enemy[i].realARTA = sector.enemy[i].ARTA;
//            }
//        if(sector.enemy[i].type == 'tank'){
//                sector.enemy[i].realtank = sector.enemy[i].tank;
//            }
//        if((sector.enemy[i].type == 'infantery')||(sector.enemy[i].type == 'BTR')){
//                sector.enemy[i].realinfantery = sector.enemy[i].infantery;
//            }
//        if((sector.enemy[i].type == 'infantery')||(sector.enemy[i].type == 'BTR')){
//                sector.enemy[i].realmortar = sector.enemy[i].mortar;
//            }
//        if((sector.enemy[i].type == 'infantery')||(sector.enemy[i].type == 'BTR')){
//                sector.enemy[i].realPTUR = sector.enemy[i].PTUR;
//            }
//        if(sector.enemy[i].type == 'BTR'){
//                sector.enemy[i].realBTR = sector.enemy[i].BTR;
//            }
//    }
//    
//    
//}// создать свойсва RealQuantity для всех войск

//function refillOurTroops(){ //востановление наших войск после каждого хода
//    var coefficient1 = 0.2; // на сколько востанавливаются войска в покое
//    
//    for(i=0; i<sector.our.length; i++){
//        if((sector.our[i].walked == 'no')&&(sector.our[i].round == 0)){
//            if(sector.our[i].type == 'GRAD'){
//                sector.our[i].realGRAD = sector.our[i].realGRAD + sector.our[i].maxGRAD * coefficient1;
//                if(Math.floor(sector.our[i].realGRAD) <= sector.our[i].maxGRAD){
//                if(sector.our[i].GRAD < Math.floor(sector.our[i].realGRAD)){
//                    sector.our[i].GRAD = Math.floor(sector.our[i].realGRAD);
//                
//            }}
//                if(Math.floor(sector.our[i].realGRAD) > sector.our[i].maxGRAD){
//                    sector.our[i].realGRAD = sector.our[i].maxGRAD;
//                    sector.our[i].GRAD = sector.our[i].maxGRAD;
//                }
//            }
//            if(sector.our[i].type == 'ARTA'){
//                sector.our[i].realARTA = sector.our[i].realARTA + sector.our[i].maxARTA * coefficient1;
//                if(Math.floor(sector.our[i].realARTA) <= sector.our[i].maxARTA){
//                if(sector.our[i].ARTA < Math.floor(sector.our[i].realARTA)){
//                    sector.our[i].ARTA = Math.floor(sector.our[i].realARTA);
//                
//            }}
//                if(Math.floor(sector.our[i].realARTA) > sector.our[i].maxARTA){
//                    sector.our[i].realARTA = sector.our[i].maxARTA;
//                    sector.our[i].ARTA = sector.our[i].maxARTA;
//                }
//            }
//            if(sector.our[i].type == 'tank'){
//                sector.our[i].realtank= sector.our[i].realtank + sector.our[i].maxTank * coefficient1;
//                if(Math.floor(sector.our[i].realtank) <= sector.our[i].maxTank){
//                if(sector.our[i].tank< Math.floor(sector.our[i].realtank)){
//                    sector.our[i].tank= Math.floor(sector.our[i].realtank);
//                
//            }}
//                if(Math.floor(sector.our[i].realtank) > sector.our[i].maxTank){
//                    sector.our[i].realtank = sector.our[i].maxTank;
//                    sector.our[i].tank = sector.our[i].maxTank;
//                }
//            }
//            if(sector.our[i].type == 'BTR'){
//                sector.our[i].realBTR= sector.our[i].realBTR + sector.our[i].maxBTR * coefficient1;
//                if(Math.floor(sector.our[i].realBTR) <= sector.our[i].maxBTR){
//                if(sector.our[i].BTR< Math.floor(sector.our[i].realBTR)){
//                    sector.our[i].BTR= Math.floor(sector.our[i].realBTR);
//                
//            }}
//                if(Math.floor(sector.our[i].realBTR) > sector.our[i].maxBTR){
//                    sector.our[i].realBTR = sector.our[i].maxBTR;
//                    sector.our[i].BTR = sector.our[i].maxBTR;
//                }
//            }
//            
//            if((sector.our[i].type == 'BTR')||(sector.our[i].type == 'infantery')){
//                sector.our[i].realinfantery= sector.our[i].realinfantery + sector.our[i].maxInfantery * coefficient1;
//                if(Math.floor(sector.our[i].realinfantery) <= sector.our[i].maxInfantery){
//                if(sector.our[i].infantery< Math.floor(sector.our[i].realinfantery)){
//                    sector.our[i].infantery= Math.floor(sector.our[i].realinfantery);
//                
//            }}
//                if(Math.floor(sector.our[i].realinfantery) > sector.our[i].maxInfantery){
//                    sector.our[i].realinfantery = sector.our[i].maxInfantery;
//                    sector.our[i].infantery = sector.our[i].maxInfantery;
//                }
//            }
//            
//            if((sector.our[i].type == 'BTR')||(sector.our[i].type == 'infantery')){
//                sector.our[i].realmortar= sector.our[i].realmortar + sector.our[i].maxMortar * coefficient1;
//                if(Math.floor(sector.our[i].realmortar) <= sector.our[i].maxMortar){
//                if(sector.our[i].mortar< Math.floor(sector.our[i].realmortar)){
//                    sector.our[i].mortar= Math.floor(sector.our[i].realmortar);
//                
//            }}
//                if(Math.floor(sector.our[i].realmortar) > sector.our[i].maxMortar){
//                    sector.our[i].realmortar = sector.our[i].maxMortar;
//                    sector.our[i].mortar = sector.our[i].maxMortar;
//                }
//            }
//            
//            if((sector.our[i].type == 'BTR')||(sector.our[i].type == 'infantery')){
//                sector.our[i].realPTUR= sector.our[i].realPTUR + sector.our[i].maxPTUR * coefficient1;
//                if(Math.floor(sector.our[i].realPTUR) <= sector.our[i].maxPTUR){
//                if(sector.our[i].PTUR< Math.floor(sector.our[i].realPTUR)){
//                    sector.our[i].PTUR= Math.floor(sector.our[i].realPTUR);
//                
//            }}
//                if(Math.floor(sector.our[i].realPTUR) > sector.our[i].maxPTUR){
//                    sector.our[i].realPTUR = sector.our[i].maxPTUR;
//                    sector.our[i].PTUR = sector.our[i].maxPTUR;
//                }
//            }
//    }
//    }
//}//востановление наших войск после каждого хода

//function refillEnemyTroops(){ //востановление войск противника после каждого хода
//    var coefficient1 = 0.2; // на сколько востанавливаются войска в покое
//    
//    for(i=0; i<sector.enemy.length; i++){
//        if((sector.enemy[i].walked == 'no')&&(sector.enemy[i].round == 0)){
//            if(sector.enemy[i].type == 'GRAD'){
//                sector.enemy[i].realGRAD = sector.enemy[i].realGRAD + sector.enemy[i].maxGRAD * coefficient1;
//                if(Math.floor(sector.enemy[i].realGRAD) <= sector.enemy[i].maxGRAD){
//                if(sector.enemy[i].GRAD < Math.floor(sector.enemy[i].realGRAD)){
//                    sector.enemy[i].GRAD = Math.floor(sector.enemy[i].realGRAD);
//                
//            }}
//                if(Math.floor(sector.enemy[i].realGRAD) > sector.enemy[i].maxGRAD){
//                    sector.enemy[i].realGRAD = sector.enemy[i].maxGRAD;
//                    sector.enemy[i].GRAD = sector.enemy[i].maxGRAD;
//                }
//            }
//            if(sector.enemy[i].type == 'ARTA'){
//                sector.enemy[i].realARTA = sector.enemy[i].realARTA + sector.enemy[i].maxARTA * coefficient1;
//                if(Math.floor(sector.enemy[i].realARTA) <= sector.enemy[i].maxARTA){
//                if(sector.enemy[i].ARTA < Math.floor(sector.enemy[i].realARTA)){
//                    sector.enemy[i].ARTA = Math.floor(sector.enemy[i].realARTA);
//                
//            }}
//                if(Math.floor(sector.enemy[i].realARTA) > sector.enemy[i].maxARTA){
//                    sector.enemy[i].realARTA = sector.enemy[i].maxARTA;
//                    sector.enemy[i].ARTA = sector.enemy[i].maxARTA;
//                }
//            }
//            if(sector.enemy[i].type == 'tank'){
//                sector.enemy[i].realtank= sector.enemy[i].realtank + sector.enemy[i].maxTank * coefficient1;
//                if(Math.floor(sector.enemy[i].realtank) <= sector.enemy[i].maxTank){
//                if(sector.enemy[i].tank< Math.floor(sector.enemy[i].realtank)){
//                    sector.enemy[i].tank= Math.floor(sector.enemy[i].realtank);
//                
//            }}
//                if(Math.floor(sector.enemy[i].realtank) > sector.enemy[i].maxTank){
//                    sector.enemy[i].realtank = sector.enemy[i].maxTank;
//                    sector.enemy[i].tank = sector.enemy[i].maxTank;
//                }
//            }
//            if(sector.enemy[i].type == 'BTR'){
//                sector.enemy[i].realBTR= sector.enemy[i].realBTR + sector.enemy[i].maxBTR * coefficient1;
//                if(Math.floor(sector.enemy[i].realBTR) <= sector.enemy[i].maxBTR){
//                if(sector.enemy[i].BTR< Math.floor(sector.enemy[i].realBTR)){
//                    sector.enemy[i].BTR= Math.floor(sector.enemy[i].realBTR);
//                
//            }}
//                if(Math.floor(sector.enemy[i].realBTR) > sector.enemy[i].maxBTR){
//                    sector.enemy[i].realBTR = sector.enemy[i].maxBTR;
//                    sector.enemy[i].BTR = sector.enemy[i].maxBTR;
//                }
//            }
//            
//            if((sector.enemy[i].type == 'BTR')||(sector.enemy[i].type == 'infantery')){
//                sector.enemy[i].realinfantery= sector.enemy[i].realinfantery + sector.enemy[i].maxInfantery * coefficient1;
//                if(Math.floor(sector.enemy[i].realinfantery) <= sector.enemy[i].maxInfantery){
//                if(sector.enemy[i].infantery< Math.floor(sector.enemy[i].realinfantery)){
//                    sector.enemy[i].infantery= Math.floor(sector.enemy[i].realinfantery);
//                
//            }}
//                if(Math.floor(sector.enemy[i].realinfantery) > sector.enemy[i].maxInfantery){
//                    sector.enemy[i].realinfantery = sector.enemy[i].maxInfantery;
//                    sector.enemy[i].infantery = sector.enemy[i].maxInfantery;
//                }
//            }
//            if((sector.enemy[i].type == 'BTR')||(sector.enemy[i].type == 'infantery')){
//                sector.enemy[i].realmortar= sector.enemy[i].realmortar + sector.enemy[i].maxMortar * coefficient1;
//                if(Math.floor(sector.enemy[i].realmortar) <= sector.enemy[i].maxMortar){
//                if(sector.enemy[i].mortar< Math.floor(sector.enemy[i].realmortar)){
//                    sector.enemy[i].mortar= Math.floor(sector.enemy[i].realmortar);
//                
//            }}
//                if(Math.floor(sector.enemy[i].realmortar) > sector.enemy[i].maxMortar){
//                    sector.enemy[i].realmortar = sector.enemy[i].maxMortar;
//                    sector.enemy[i].mortar = sector.enemy[i].maxMortar;
//                }
//            }
//            if((sector.enemy[i].type == 'BTR')||(sector.enemy[i].type == 'infantery')){
//                sector.enemy[i].realPTUR= sector.enemy[i].realPTUR + sector.enemy[i].maxPTUR * coefficient1;
//                if(Math.floor(sector.enemy[i].realPTUR) <= sector.enemy[i].maxPTUR){
//                if(sector.enemy[i].PTUR< Math.floor(sector.enemy[i].realPTUR)){
//                    sector.enemy[i].PTUR= Math.floor(sector.enemy[i].realPTUR);
//                
//            }}
//                if(Math.floor(sector.enemy[i].realPTUR) > sector.enemy[i].maxPTUR){
//                    sector.enemy[i].realPTUR = sector.enemy[i].maxPTUR;
//                    sector.enemy[i].PTUR = sector.enemy[i].maxPTUR;
//                }
//            }
//    }
//    }
//}//востановление войск противника после каждого хода

//function ourTankAttackFunction(){ //функция атаки нашими танками
//       
//        document.getElementById('battlefield').style.display = 'block';
//        document.getElementById('wrap_field').style.display = 'none';			
//        document.getElementById('preload').style.display = 'none';
//        document.getElementById('main').style.display = 'none';
//        
//        enemyWholeGRAD = 0;
//        enemyWholeARTA = 0;
//        needToKill ='not-need';
//    
//        show_00();
//    
//        closeAttackAndHelpFields();
//        
//} //функция атаки нашими танками

//function ourTankHelpFunction(){ //функция поддержки нашими танками
//       
//        ourTankHelp = ourMoveObject.tank;
//        ourTankHelpUnit = ourMoveObject;
//        ourMoveObject.helpTarget = battleFieldTarget;
//        document.getElementById(battleFieldTarget).innerHTML = 'help';
//        ourMoveObject.walked = 'yes';
//        ourTankHelpIndicator = 'yes';
//        drawUnitsOfTwoSize();
//    
//        closeAttackAndHelpFields();
//        
//} //функция поддержки нашими танками

//function closeAttackAndHelpFields(){ //закрытие полей Атака и Помощь
//        var attackField = document.getElementsByClassName("our_tank_attack");    
//        for (var i = 0; i < attackField.length; i++) {
//            attackField[i].style.display = 'none';
//            }
//        var helpField = document.getElementsByClassName("our_tank_help");    
//        for (var i = 0; i < helpField.length; i++) {
//            helpField[i].style.display = 'none';
//            }
//} //закрытие полей Атака и Помощь

//function deleteOurTroops(){ //проверка на наличие целых войск в части
//    var newTroops = [];
//    if(ourTankHelpField != battleFieldTarget){
//        ourTankHelpUnit.tank = ourTankHelp;
//    }
//    ourTankHelp = 0;
//    for(i=0; i<sector.our.length; i++){
//        if(sector.our[i].type == 'tank'){
//            if((sector.our[i].tank > 0)&&(sector.our[i].position)){
//                newTroops.push(sector.our[i]);
//            }
//        }
//        if(sector.our[i].type == 'GRAD'){
//            if((sector.our[i].GRAD > 0)&&(sector.our[i].position)){
//                newTroops.push(sector.our[i]);
//            }
//        }
//        if(sector.our[i].type == 'ARTA'){
//            if((sector.our[i].ARTA > 0)&&(sector.our[i].position)){
//                newTroops.push(sector.our[i]);
//            }
//        }
//        if(sector.our[i].type == 'infantery'){
//            if(((sector.our[i].infantery > 0)||(sector.our[i].mortar > 0))&&(sector.our[i].position)){
//                newTroops.push(sector.our[i]);
//            }
//        }
//        if(sector.our[i].type == 'BTR'){
//            if(((sector.our[i].infantery > 0)||(sector.our[i].mortar > 0)||(sector.our[i].BTR > 0))&&(sector.our[i].position)){
//                newTroops.push(sector.our[i]);
//            }
//        }
//    }
//    sector.our.length = 0;
//    sector.our = copyArr(newTroops);
//    return sector.our;
//} //проверка на наличие целых войск в части

//function ourUnitHealth(){ //расчет значения здоровья наших войск
//    for(i=0; i<sector.our.length; i++){
//        
//        if(sector.our[i].infantery ==  undefined){ sector.our[i].infantery = 0}
//        if(sector.our[i].tank ==  undefined){ sector.our[i].tank = 0} 
//        if(sector.our[i].mortar ==  undefined){ sector.our[i].mortar = 0} 
//        if(sector.our[i].BTR ==  undefined){ sector.our[i].BTR = 0} 
//        if(sector.our[i].GRAD ==  undefined){ sector.our[i].GRAD = 0} 
//        if(sector.our[i].ARTA ==  undefined){ sector.our[i].ARTA = 0} 
//        if(sector.our[i].maxInfantery ==  undefined){ sector.our[i].maxInfantery = 0}
//        if(sector.our[i].maxTank ==  undefined){ sector.our[i].maxTank = 0} 
//        if(sector.our[i].maxMortar ==  undefined){ sector.our[i].maxMortar = 0} 
//        if(sector.our[i].maxBTR ==  undefined){ sector.our[i].maxBTR = 0} 
//        if(sector.our[i].maxGRAD ==  undefined){ sector.our[i].maxGRAD = 0} 
//        if(sector.our[i].maxARTA ==  undefined){ sector.our[i].maxARTA = 0}  
//        
//    sector.our[i].health = Math.round(((sector.our[i].infantery + sector.our[i].tank + sector.our[i].mortar + sector.our[i].BTR + sector.our[i].GRAD + sector.our[i].ARTA)/(sector.our[i].maxInfantery + sector.our[i].maxTank + sector.our[i].maxMortar + sector.our[i].maxBTR + sector.our[i].maxGRAD + sector.our[i].maxARTA))*100) ;   
//    }
//} //расчет значения здоровья наших войск

//function enemyUnitHealth(){ //расчет значения здоровья войск противника
//    for(i=0; i<sector.enemy.length; i++){
//        
//        if(sector.enemy[i].infantery ==  undefined){ sector.enemy[i].infantery = 0}
//        if(sector.enemy[i].tank ==  undefined){ sector.enemy[i].tank = 0} 
//        if(sector.enemy[i].mortar ==  undefined){ sector.enemy[i].mortar = 0} 
//        if(sector.enemy[i].BTR ==  undefined){ sector.enemy[i].BTR = 0} 
//        if(sector.enemy[i].GRAD ==  undefined){ sector.enemy[i].GRAD = 0} 
//        if(sector.enemy[i].ARTA ==  undefined){ sector.enemy[i].ARTA = 0} 
//        if(sector.enemy[i].maxInfantery ==  undefined){ sector.enemy[i].maxInfantery = 0}
//        if(sector.enemy[i].maxTank ==  undefined){ sector.enemy[i].maxTank = 0} 
//        if(sector.enemy[i].maxMortar ==  undefined){ sector.enemy[i].maxMortar = 0} 
//        if(sector.enemy[i].maxBTR ==  undefined){ sector.enemy[i].maxBTR = 0} 
//        if(sector.enemy[i].maxGRAD ==  undefined){ sector.enemy[i].maxGRAD = 0} 
//        if(sector.enemy[i].maxARTA ==  undefined){ sector.enemy[i].maxARTA = 0}  
//        
//    sector.enemy[i].health = Math.round(((sector.enemy[i].infantery + sector.enemy[i].tank + sector.enemy[i].mortar + sector.enemy[i].BTR + sector.enemy[i].GRAD + sector.enemy[i].ARTA)/(sector.enemy[i].maxInfantery + sector.enemy[i].maxTank + sector.enemy[i].maxMortar + sector.enemy[i].maxBTR + sector.enemy[i].maxGRAD + sector.enemy[i].maxARTA))*100) ;   
//    }
//} //расчет значения здоровья войск противника

//function buttonShowFunction(){
//    if(whoseTurn == 'enemy'){
//        $('#button_our_step').hide();
//        $('#button_last_step').hide();
//    }
//    if(whoseTurn == 'our'){
//        $('#button_our_step').show();
//        $('#button_last_step').show();
//        ourDownNorma();
//    }
//} // показывать и скрывать кнопки "Наш ход" и "Отменить последнее действие"

//function enemyDownNorma(){
//            $("#enemy_step_1").show();
//            $("#enemy_step_2").show();
//            $("#enemy_step_3").show();
//            $("#enemy_step_1_off").hide();
//            $("#enemy_step_2_off").hide();
//            $("#enemy_step_3_off").hide();
//            $("#enemy_step_1_click").hide();
//            $("#enemy_step_2_click").hide();
//            $("#enemy_step_3_click").hide();
//} // возвращает кнопки скоростей в исходное положение

//function ourDownNorma(){    
//            $("#our_trench").css("display", "inline-block");
//            $("#our_mine").css("display", "inline-block");
//            $("#our_trench_off").hide();
//            $("#our_mine_off").hide();
//} // возвращает иконки  в исходное положение



//function ourSavePosition(){
//    var url = document.URL.split('/');
//    var name = url[url.length-2];
//    var saveMap = name + '_save_map';
//    var saveOur = name + '_save_our';
//    var saveEnemy = name + '_save_enemy';
//    
//    localStorage.setItem(saveMap, JSON.stringify(lastStep.map));
//    localStorage.setItem(saveOur, JSON.stringify(lastStep.our));
//    localStorage.setItem(saveEnemy, JSON.stringify(lastStep.enemy));
//    $('#our_save').hide();
//    $('#our_save_off').show();
//}

//function ourLoadPosition(){
//    var url = document.URL.split('/');
//    var name = url[url.length-2];
//    var saveMap = name + '_save_map';
//    var saveOur = name + '_save_our';
//    var saveEnemy = name + '_save_enemy';
//    
//    if (localStorage.getItem(saveMap)){
//        lastStep.map = [];
//        lastStep.map = JSON.parse(localStorage.getItem(saveMap));
//        lastStep.our = [];
//        lastStep.our = JSON.parse(localStorage.getItem(saveOur));
//        lastStep.enemy = [];
//        lastStep.enemy = JSON.parse(localStorage.getItem(saveEnemy));   
//
//        lastStep.backLastStep();
//
//        $('#our_load').hide();
//        $('#our_load_off').show();         
//    }else{
//        $('#our_load').show();
//        $('#our_load_off').hide();
//    }
//    
//    
//}

//function levelsAndHealth(unit){
//    var unitPosition = $('#'+unit.position);
//    unitPosition.empty();
//    
//    if(unit.level == 5){
//        unitPosition.append('<div class = "level5"></div>');
//    }
//    if(unit.level == 4){
//        unitPosition.append('<div class = "level4"></div>');
//    }
//    if(unit.level == 3){
//        unitPosition.append('<div class = "level3"></div>');
//    }
//    if(unit.level == 2){
//        unitPosition.append('<div class = "level2"></div>');
//    }
//    if(unit.level == 1){
//        unitPosition.append('<div class = "level1"></div>');
//    }
//    
//    if(unit.health > 90){
//        unitPosition.append('<div class = "health10"></div>');
//        return
//    }
//    if(unit.health > 80){
//        unitPosition.append('<div class = "health9"></div>');
//        return
//    }
//    if(unit.health > 70){
//        unitPosition.append('<div class = "health8"></div>');
//        return
//    }
//    if(unit.health > 60){
//        unitPosition.append('<div class = "health7"></div>');
//        return
//    }
//    if(unit.health > 50){
//        unitPosition.append('<div class = "health6"></div>');
//        return
//    }
//    if(unit.health > 40){
//        unitPosition.append('<div class = "health5"></div>');
//        return
//    }
//    if(unit.health > 30){
//        unitPosition.append('<div class = "health4"></div>');
//        return
//    }
//    if(unit.health > 20){
//        unitPosition.append('<div class = "health3"></div>');
//        return
//    }
//    if(unit.health > 10){
//        unitPosition.append('<div class = "health2"></div>');
//        return
//    }
//    if(unit.health <= 10){
//        unitPosition.append('<div class = "health1"></div>');
//        return
//    }
//    
////    function levelDraw(unit){
////        if(unit.level == 5){
////            unitPosition.append('<div class = "level5"></div>');
////            return;
////        }
////        if(unit.level == 4){
////            unitPosition.append('<div class = "level4"></div>');
////            return;
////        }
////        if(unit.level == 3){
////            unitPosition.append('<div class = "level3"></div>');
////            return;
////        }
////        if(unit.level == 2){
////            unitPosition.append('<div class = "level2"></div>');
////            return;
////        }
////        if(unit.level == 1){
////            unitPosition.append('<div class = "level1"></div>');
////            return;
////        }
////    }
//    
//} // Рисует здоровье и силу нашего подразделения

//function drawCanAttackEnemyWithArta(temp){ //рисуем возможность нападение на противника артой
//    
//    for(var i=0; i<temp.length; i++){ //рисуем возможность хода и нападение на противника артой
//        
//        if((sector.enemyFields.indexOf(temp[i].position) >= 0)&&(sector.enemyTroops().indexOf(temp[i].position)>=0)){
//          
//            for(j=0; j< sector.enemyTroops().length; j++){
//               
//                if((sector.enemy[j].type == 'tank')&&(sector.enemy[j].position == temp[i].position)){
//                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_tank_can_bomb") 
//                }if((sector.enemy[j].type == 'BTR')&&(sector.enemy[j].position == temp[i].position)){
//                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_BTR_can_bomb") 
//                }if((sector.enemy[j].type == 'infantery')&&(sector.enemy[j].position == temp[i].position)){
//                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_infantery_can_bomb") 
//                }if((sector.enemy[j].type == 'GRAD')&&(sector.enemy[j].position == temp[i].position)){ document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_GRAD_can_bomb") 
//                }if((sector.enemy[j].type == 'ARTA')&&(sector.enemy[j].position == temp[i].position)){
//                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_ARTA_can_bomb") 
//                }
//            }
//               
//        }
//    } //рисуем возможность нападение на противника артой
//} //рисуем возможность нападение на противника артой



//function drawOurArtaAttackForEnemy(temp){ //рисуем возможность нападение на противника артой
//    
//    for(var i=0; i<temp.length; i++){ //рисуем возможность хода и нападение на противника артой
//        
//        if(sector.enemyTroops().indexOf(temp[i])>=0){ 
//            for(j=0; j< sector.enemy.length; j++){
//                if((sector.enemy[j].type == 'tank')&&(sector.enemy[j].position == temp[i])){
//                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_tank_can_bomb") 
//                }if((sector.enemy[j].type == 'BTR')&&(sector.enemy[j].position == temp[i])){
//                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_BTR_can_bomb") 
//                }if((sector.enemy[j].type == 'infantery')&&(sector.enemy[j].position == temp[i])){
//                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_infantery_can_bomb") 
//                }if((sector.enemy[j].type == 'GRAD')&&(sector.enemy[j].position == temp[i])){
//                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_GRAD_can_bomb") 
//                }if((sector.enemy[j].type == 'ARTA')&&(sector.enemy[j].position == temp[i])){
//                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_ARTA_can_bomb") 
//                }
//            }
//               
//        }
//    } //рисуем возможность нападение на противника артой
//} //рисуем возможность нападение на противника артой

//function deleteEnemyTroops(){
//    
//    var newEnemy =[];
//    var counter = 0
//    sector.enemy.forEach(function(enemy){
//        if((enemy.type == 'tank')&&(enemy.tank > 0)&&(enemy.position)){
//            newEnemy.push(enemy)
//        }if((enemy.type == 'GRAD')&&(enemy.GRAD > 0)&&(enemy.position)){
//            newEnemy.push(enemy)
//        }if((enemy.type == 'ARTA')&&(enemy.ARTA > 0)&&(enemy.position)){
//            newEnemy.push(enemy)
//        }if((enemy.type == 'infantery')&&((enemy.infantery > 0)||(enemy.mortar > 0))&&(newEnemy.indexOf(enemy) <0)&&(enemy.position)){
//            newEnemy.push(enemy)
//        }if((enemy.type == 'BTR')&&((enemy.infantery > 0)||(enemy.mortar > 0)||(enemy.BTR > 0))&&(newEnemy.indexOf(enemy) <0)&&(enemy.position)){
//            newEnemy.push(enemy)
//        }
//    })
//    
//    sector.enemy.length = 0;
//    sector.enemy = newEnemy;
//    return sector.enemy;
//}

//function findNumberOfDataMapField(target){
//    for(i=0; i<sector.map.length; i++){
//        if(sector.map[i].position == target){
//            return i;
//        }
//    }
//}

//function createFieldsForOurGradAttack(position){
//    var temp = [];
//    var row = position.substring(0, 2);
//    
//    for(i=0; i<sector.our.length; i++)
//    if(sector.our[i].position == position){ //поля для стрельбы ГРАДОМ
//          if(row % 2 == 0){
//        temp.push(calculationPosition(position, 1, -1));
//        temp.push(calculationPosition(position, 1, 0));
//        temp.push(calculationPosition(position, 0, -1));
//        temp.push(calculationPosition(position, 0, 1));
//        temp.push(calculationPosition(position, -1, 0));
//        temp.push(calculationPosition(position, -1, -1));      
//              
//        temp.push(calculationPosition(position, 2, -1));
//        temp.push(calculationPosition(position, 2, 0));
//        temp.push(calculationPosition(position, 2, 1));
//        temp.push(calculationPosition(position, 1, 1));
//        temp.push(calculationPosition(position, 0, 2));
//        temp.push(calculationPosition(position, -1, 1));
//        temp.push(calculationPosition(position, -2, 1));
//        temp.push(calculationPosition(position, -2, 0));
//        temp.push(calculationPosition(position, -2, -1));
//        temp.push(calculationPosition(position, -1, -2));
//        temp.push(calculationPosition(position, 0, -2));
//        temp.push(calculationPosition(position, 1, -2));
//              
//       
//    } else {
//        temp.push(calculationPosition(position, 1, 0));
//        temp.push(calculationPosition(position, 1, 1));
//        temp.push(calculationPosition(position, 0, 1));
//        temp.push(calculationPosition(position, -1, 1));
//        temp.push(calculationPosition(position, -1, 0));
//        temp.push(calculationPosition(position, 0, -1));
//        
//        temp.push(calculationPosition(position, 2, -1));
//        temp.push(calculationPosition(position, 2, 0));
//        temp.push(calculationPosition(position, 2, 1));
//        temp.push(calculationPosition(position, 1, 2));
//        temp.push(calculationPosition(position, 0, 2));
//        temp.push(calculationPosition(position, -1, 2));
//        temp.push(calculationPosition(position, -2, 1));
//        temp.push(calculationPosition(position, -2, 0));
//        temp.push(calculationPosition(position, -2, -1));
//        temp.push(calculationPosition(position, -1, -1));
//        temp.push(calculationPosition(position, 0, -2));
//        temp.push(calculationPosition(position, 1, -1));
//        
//       
//    }
//    } //поля для стрельбы ГРАДОМ
//    return temp;
//} //создаем поля для атаки нашим ГРАДОМ

//function createFieldsForOurArtaAttack(position){
//    var temp = [];
//    var row = position.substring(0, 2);
//    
//    for(i=0; i<sector.our.length; i++)
//    if(sector.our[i].position == position){ //поля для стрельбы артой
//          if(row % 2 == 0){
//        temp.push(calculationPosition(position, 1, -1));
//        temp.push(calculationPosition(position, 1, 0));
//        temp.push(calculationPosition(position, 0, -1));
//        temp.push(calculationPosition(position, 0, 1));
//        temp.push(calculationPosition(position, -1, 0));
//        temp.push(calculationPosition(position, -1, -1));      
//              
//        temp.push(calculationPosition(position, 2, -1));
//        temp.push(calculationPosition(position, 2, 0));
//        temp.push(calculationPosition(position, 2, 1));
//        temp.push(calculationPosition(position, 1, 1));
//        temp.push(calculationPosition(position, 0, 2));
//        temp.push(calculationPosition(position, -1, 1));
//        temp.push(calculationPosition(position, -2, 1));
//        temp.push(calculationPosition(position, -2, 0));
//        temp.push(calculationPosition(position, -2, -1));
//        temp.push(calculationPosition(position, -1, -2));
//        temp.push(calculationPosition(position, 0, -2));
//        temp.push(calculationPosition(position, 1, -2));
//              
//        temp.push(calculationPosition(position, -3, -2));
//        temp.push(calculationPosition(position, 3, -2));
//        temp.push(calculationPosition(position, -3, -1));
//        temp.push(calculationPosition(position, -3, 1));
//        temp.push(calculationPosition(position, 3, -1));      
//        temp.push(calculationPosition(position, 3, 1));
//        temp.push(calculationPosition(position, -3, 0));
//        temp.push(calculationPosition(position, 3, 0));
//        temp.push(calculationPosition(position, -2, -2));
//        temp.push(calculationPosition(position, -2, 2));
//        temp.push(calculationPosition(position, 2, -2));
//        temp.push(calculationPosition(position, 2, 2));              
//        temp.push(calculationPosition(position, -1, -3));      
//        temp.push(calculationPosition(position, 1, -3));
//        temp.push(calculationPosition(position, -1, 2));
//        temp.push(calculationPosition(position, 1, 2));
//        temp.push(calculationPosition(position, 0, -3));
//        temp.push(calculationPosition(position, 0, 3));  
//    } else {
//        temp.push(calculationPosition(position, 1, 0));
//        temp.push(calculationPosition(position, 1, 1));
//        temp.push(calculationPosition(position, 0, 1));
//        temp.push(calculationPosition(position, -1, 1));
//        temp.push(calculationPosition(position, -1, 0));
//        temp.push(calculationPosition(position, 0, -1));
//        
//        temp.push(calculationPosition(position, 2, -1));
//        temp.push(calculationPosition(position, 2, 0));
//        temp.push(calculationPosition(position, 2, 1));
//        temp.push(calculationPosition(position, 1, 2));
//        temp.push(calculationPosition(position, 0, 2));
//        temp.push(calculationPosition(position, -1, 2));
//        temp.push(calculationPosition(position, -2, 1));
//        temp.push(calculationPosition(position, -2, 0));
//        temp.push(calculationPosition(position, -2, -1));
//        temp.push(calculationPosition(position, -1, -1));
//        temp.push(calculationPosition(position, 0, -2));
//        temp.push(calculationPosition(position, 1, -1));
//        
//        temp.push(calculationPosition(position, -3, 2));
//        temp.push(calculationPosition(position, 3, 2));
//        temp.push(calculationPosition(position, -3, -1));
//        temp.push(calculationPosition(position, -3, 1));
//        temp.push(calculationPosition(position, 3, -1));      
//        temp.push(calculationPosition(position, 3, 1));
//        temp.push(calculationPosition(position, -3, 0));
//        temp.push(calculationPosition(position, 3, 0));
//        
//        temp.push(calculationPosition(position, -2, -2));
//        temp.push(calculationPosition(position, -2, 2));
//        temp.push(calculationPosition(position, 2, -2));
//        temp.push(calculationPosition(position, 2, 2));              
//        temp.push(calculationPosition(position, -1, 3));      
//        temp.push(calculationPosition(position, 1, 3));
//        temp.push(calculationPosition(position, -1, -2));
//        temp.push(calculationPosition(position, 1, -2));
//        
//        temp.push(calculationPosition(position, 0, -3));
//        temp.push(calculationPosition(position, 0, 3)); 
//    }
//    } //поля для стрельбы артой
//    return temp;
//} //создаем поля для атаки нашей АРТЫ

//function createFieldsForEnemyArtaAttack(position){ //создаем поля для атаки АРТЫ противника
//    var temp = [];
//    var row = position.substring(0, 2);
//    
//    for(i=0; i<sector.enemy.length; i++)
//    if(sector.enemy[i].position == position){ //поля для стрельбы артой
//          if(row % 2 == 0){
//        temp.push(calculationPosition(position, 1, -1));
//        temp.push(calculationPosition(position, 1, 0));
//        temp.push(calculationPosition(position, 0, -1));
//        temp.push(calculationPosition(position, 0, 1));
//        temp.push(calculationPosition(position, -1, 0));
//        temp.push(calculationPosition(position, -1, -1));      
//              
//        temp.push(calculationPosition(position, 2, -1));
//        temp.push(calculationPosition(position, 2, 0));
//        temp.push(calculationPosition(position, 2, 1));
//        temp.push(calculationPosition(position, 1, 1));
//        temp.push(calculationPosition(position, 0, 2));
//        temp.push(calculationPosition(position, -1, 1));
//        temp.push(calculationPosition(position, -2, 1));
//        temp.push(calculationPosition(position, -2, 0));
//        temp.push(calculationPosition(position, -2, -1));
//        temp.push(calculationPosition(position, -1, -2));
//        temp.push(calculationPosition(position, 0, -2));
//        temp.push(calculationPosition(position, 1, -2));
//              
//        temp.push(calculationPosition(position, -3, -2));
//        temp.push(calculationPosition(position, 3, -2));
//        temp.push(calculationPosition(position, -3, -1));
//        temp.push(calculationPosition(position, -3, 1));
//        temp.push(calculationPosition(position, 3, -1));      
//        temp.push(calculationPosition(position, 3, 1));
//        temp.push(calculationPosition(position, -3, 0));
//        temp.push(calculationPosition(position, 3, 0));
//        temp.push(calculationPosition(position, -2, -2));
//        temp.push(calculationPosition(position, -2, 2));
//        temp.push(calculationPosition(position, 2, -2));
//        temp.push(calculationPosition(position, 2, 2));              
//        temp.push(calculationPosition(position, -1, -3));      
//        temp.push(calculationPosition(position, 1, -3));
//        temp.push(calculationPosition(position, -1, 2));
//        temp.push(calculationPosition(position, 1, 2));
//        temp.push(calculationPosition(position, 0, -3));
//        temp.push(calculationPosition(position, 0, 3));  
//    } else {
//        temp.push(calculationPosition(position, 1, 0));
//        temp.push(calculationPosition(position, 1, 1));
//        temp.push(calculationPosition(position, 0, 1));
//        temp.push(calculationPosition(position, -1, 1));
//        temp.push(calculationPosition(position, -1, 0));
//        temp.push(calculationPosition(position, 0, -1));
//        
//        temp.push(calculationPosition(position, 2, -1));
//        temp.push(calculationPosition(position, 2, 0));
//        temp.push(calculationPosition(position, 2, 1));
//        temp.push(calculationPosition(position, 1, 2));
//        temp.push(calculationPosition(position, 0, 2));
//        temp.push(calculationPosition(position, -1, 2));
//        temp.push(calculationPosition(position, -2, 1));
//        temp.push(calculationPosition(position, -2, 0));
//        temp.push(calculationPosition(position, -2, -1));
//        temp.push(calculationPosition(position, -1, -1));
//        temp.push(calculationPosition(position, 0, -2));
//        temp.push(calculationPosition(position, 1, -1));
//        
//        temp.push(calculationPosition(position, -3, 2));
//        temp.push(calculationPosition(position, 3, 2));
//        temp.push(calculationPosition(position, -3, -1));
//        temp.push(calculationPosition(position, -3, 1));
//        temp.push(calculationPosition(position, 3, -1));      
//        temp.push(calculationPosition(position, 3, 1));
//        temp.push(calculationPosition(position, -3, 0));
//        temp.push(calculationPosition(position, 3, 0));
//        
//        temp.push(calculationPosition(position, -2, -2));
//        temp.push(calculationPosition(position, -2, 2));
//        temp.push(calculationPosition(position, 2, -2));
//        temp.push(calculationPosition(position, 2, 2));              
//        temp.push(calculationPosition(position, -1, 3));      
//        temp.push(calculationPosition(position, 1, 3));
//        temp.push(calculationPosition(position, -1, -2));
//        temp.push(calculationPosition(position, 1, -2));
//        
//        temp.push(calculationPosition(position, 0, -3));
//        temp.push(calculationPosition(position, 0, 3)); 
//    }
//    } //поля для стрельбы артой
//  
//    return temp;
//} //создаем поля для атаки АРТЫ противника

//function createFieldsForEnemyGRADAttack(position){ //создаем поля для атаки ГРАДов противника
//    var temp = [];
//    var row = position.substring(0, 2);
//    
//    for(i=0; i<sector.enemy.length; i++)
//    if(sector.enemy[i].position == position){ //поля для стрельбы артой
//          if(row % 2 == 0){
//        temp.push(calculationPosition(position, 1, -1));
//        temp.push(calculationPosition(position, 1, 0));
//        temp.push(calculationPosition(position, 0, -1));
//        temp.push(calculationPosition(position, 0, 1));
//        temp.push(calculationPosition(position, -1, 0));
//        temp.push(calculationPosition(position, -1, -1));      
//              
//        temp.push(calculationPosition(position, 2, -1));
//        temp.push(calculationPosition(position, 2, 0));
//        temp.push(calculationPosition(position, 2, 1));
//        temp.push(calculationPosition(position, 1, 1));
//        temp.push(calculationPosition(position, 0, 2));
//        temp.push(calculationPosition(position, -1, 1));
//        temp.push(calculationPosition(position, -2, 1));
//        temp.push(calculationPosition(position, -2, 0));
//        temp.push(calculationPosition(position, -2, -1));
//        temp.push(calculationPosition(position, -1, -2));
//        temp.push(calculationPosition(position, 0, -2));
//        temp.push(calculationPosition(position, 1, -2));
//         
//    } else {
//        temp.push(calculationPosition(position, 1, 0));
//        temp.push(calculationPosition(position, 1, 1));
//        temp.push(calculationPosition(position, 0, 1));
//        temp.push(calculationPosition(position, -1, 1));
//        temp.push(calculationPosition(position, -1, 0));
//        temp.push(calculationPosition(position, 0, -1));
//        
//        temp.push(calculationPosition(position, 2, -1));
//        temp.push(calculationPosition(position, 2, 0));
//        temp.push(calculationPosition(position, 2, 1));
//        temp.push(calculationPosition(position, 1, 2));
//        temp.push(calculationPosition(position, 0, 2));
//        temp.push(calculationPosition(position, -1, 2));
//        temp.push(calculationPosition(position, -2, 1));
//        temp.push(calculationPosition(position, -2, 0));
//        temp.push(calculationPosition(position, -2, -1));
//        temp.push(calculationPosition(position, -1, -1));
//        temp.push(calculationPosition(position, 0, -2));
//        temp.push(calculationPosition(position, 1, -1));
//        
//    }
//    } //создаем поля для атаки ГРАДов противника
//  
//    return temp;
//} //создаем поля для атаки ГРАДов противника
