//-----------------------------------------------------------------------------------------------------//
//ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ---ПЕРЕМЕННЫЕ//
//-----------------------------------------------------------------------------------------------------//
var FieldWidth = 13;
var FieldHeight = 12;

var lastStep = {
    map: [],
    our: [],
    enemy: [],
    saveLastStep: function(){
        this.map = copyArr(data.map);
        this.our = copyArr(data.our);        
        this.enemy = copyArr(data.enemy);
        this.ourFields = copyArray(data.ourField());
        this.enemyFields = copyArray(data.enemyField());
    },
    backLastStep: function(){
        data.map = copyArr(this.map);
        data.our = copyArr(this.our);
        data.enemy = copyArr(this.enemy);
        data.ourFields = copyArray(this.ourFields);
        data.enemyFields = copyArray(this.enemyFields);
        drawUnitsOfTwoSize();
        
        ourTankHelpIndicator = 'no';
        ourTankHelp = 0;
    }
}

var ourMovePositions = [];
var ourAttackPositions = [];
var ourBattlePositions = [];1
var ourTankHelp = 0;
var enemyTankHelp = 0;
var ourTankHelpUnit = {};
var ourTankHelpField;
var ourTankHelpIndicator;
var globalTarget;
var battleFieldTarget;
var ourAttackObject = {};
//var enemyAttackObject = {};
//var ourDefenseObject = {};
var enemyDefenseObject = {};
var whoAttack;
var battleProcess = 'finish'
var whoseTurn = 'our'; //определяем чей ход будет первым

//data.calculationMap();

//$('#big_map img').attr('src', "https://static-maps.yandex.ru/1.x/?ll=" + (geoX+0.07) + "," + (geoY+0.03) +"&z=12&l=map&\&size=500,410");
//================Перенесено в zone.js ====================
//drawUnitsOfTwoSize();
//
//startRealQuantity();
//
//buttonShowFunction();
//
//window.onload = init();

//================Перенесено в zone.js ====================
//-----------------------------------------------------------------------------------------------------//
//  ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ---ФУНКЦИИ  //
//-----------------------------------------------------------------------------------------------------//

function init(){ // задаем обработчики событий
    if(whoseTurn == 'our'){
    var fireField1 = document.getElementsByClassName("line_1_cell");
    var fireField2 = document.getElementsByClassName("line_2_cell");
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
    var fireField1 = document.getElementsByClassName("line_1_cell");
    var fireField2 = document.getElementsByClassName("line_2_cell");
    for (var i = 0; i < fireField1.length; i++) {
        //if(fireField1[i].innerHTML != 'help'){
    var blockID = this.id;
    console.log(blockID);    
          fireField1[i].onclick = drawUnitsOfTwoSize;  
        //}
        }
    for (var i = 0; i < fireField2.length; i++) {
        //if(fireField2[i].innerHTML != 'help'){
    var blockID = this.id;
          fireField2[i].onclick = drawUnitsOfTwoSize;  
        //}
        }    
    }
    informAboutOurUnits() ; 
    
//    document.getElementById('closePanel').onclick = closePanel;
        
    $('#closePanel').click(closePanel);
    
    
    //var enemyFields = $('.line_1_cell .enemy')
    /*
    var enemyFields = document.getElementsByClassName("line_1_cell enemy")
    for(var i=0; i<enemyFields.length; i++){
        if(ourAttackPositions.indexOf(enemyFields[i])<0){
           enemyFields[i].onclick = drawUnitsOfTwoSize; 
        }
    }
    
   */
    //--------------------------------------    
    document
    window.captureEvents(Event.KEYPRESS); 
    window.onkeypress = pressed; 
    function pressed(e) { 
        if(e.which == 32) {
          lastStep.backLastStep();
        }
    } 
    //--------------------------------------
	
	//--------кривое место, но должно работать----------------
    $('#our_save_off').hide();
    $('#our_load_off').hide();    
    //--------кривое место, но должно работать----------------
	
    } // задаем обработчики событий

function ourTroopsMoveFunction(event){
    
//    var target = event.target.id;
    var target = this.id;
   
    // 1. target - пустое поле
    //  - обнулить Positions
    //  - перестроить карту
    
    if((data.ourField().indexOf(target) >= 0)&&(data.ourTroops().indexOf(target)<0)&&(ourMovePositions.indexOf(target) < 0)&&(true)){
      
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        drawUnitsOfTwoSize();
    }
   
    // 2. target - наш юнит
    //  - обнулить Positions
    //  - перестроить карту
    //  - перестроить Positions
    //  - перерисовать Positions
    //  - изменить вид юнита   
            
    if((data.ourTroops().indexOf(target) >=0)){ 
        ourMoveObject = findOurTroops(target); //создаем объект из выделенного отряда
        
        if(ourMoveObject.walked == 'no'){
        // окапываем пехоту или БТР
        globalTarget = target;        
        
        if ((ourMoveObject.type == 'infantery')||(ourMoveObject.type == 'BTR')){
            $("#our_trench").show();
            $("#our_trench_off").hide();
            
        }if ((ourMoveObject.type != 'infantery')&&(ourMoveObject.type != 'BTR')){
            $("#our_trench").hide();
            $("#our_trench_off").show();
        }
        
        //минируем позиции окопавшихся войск
        if (((ourMoveObject.type == 'infantery')||(ourMoveObject.type == 'BTR'))&&(ourMoveObject.trench == 'yes')){
                $("#our_mine").show();
                $("#our_mine_off").hide();            
                $("#our_trench").hide();
                $("#our_trench_off").show();            
        }if (((ourMoveObject.type == 'infantery')||(ourMoveObject.type == 'BTR'))&&(ourMoveObject.trench == 'no')){
                $("#our_mine").hide();
                $("#our_mine_off").show();
                $("#our_trench").show();
                $("#our_trench_off").hide();
        }if (((ourMoveObject.type == 'infantery')||(ourMoveObject.type == 'BTR'))&&(ourMoveObject.trench == 'yes')&&(ourMoveObject.mine == 'yes')){
                $("#our_mine").hide();
                $("#our_mine_off").show();
                $("#our_trench").hide();
                $("#our_trench_off").show();
        }
        if ((ourMoveObject.type != 'infantery')&&(ourMoveObject.type != 'BTR')){
                $("#our_mine").hide();
                $("#our_mine_off").show();
        }
        }
        
        if(ourMoveObject.walked == 'no'){
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        drawUnitsOfTwoSize();
            
        calculationMoveFieldsFunction(target);
            
        changeOurUnitFace(target);
            
        lastStep.saveLastStep();
    }
    }
     
    // 3. target - ourMovePositions
    //  - изменить юниту свойство position
    //  - обнулить Positions
    //  - перестроить карту
    if (ourMovePositions.indexOf(target) >= 0){ 
        
        lastStep.saveLastStep();
        
        ourMoveObject.position = target;
        ourMoveObject.walked = 'yes';
        ourMoveObject.trench = 'no';
        ourMoveObject.mine = 'no';
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        drawUnitsOfTwoSize();
            $("#our_back_step").css("display", "inline-block");
            $("#our_back_step_off").hide();
            $("#our_trench_off").css("display", "inline-block");
            $("#our_mine_off").css("display", "inline-block");
            $("#our_trench").hide();
            $("#our_mine").hide();
        informAboutOurUnits();
    }
    
  
    // 4. target - ourAttackPositions
    //  - изменить юниту свойство position
    //  - в bigMapAllEnemyFields изменить полю свойство side с enemy на our
    //  - обнулить Positions
    //  - перестроить карту
    //  - перестроить поля содержащие нашу технику
    
    if (ourAttackPositions.indexOf(target) >= 0){ 
//console.log("attack " + target)        
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
//        if(data.enemyField().indexOf(middle[0]) >=0 ){
//           findField(middle[0]).side = "our";
//       }
//        
        
        ourMoveObject.position = target; 
        ourMoveObject.walked = 'yes';
        ourMoveObject.trench = 'no';
        ourMoveObject.mine = 'no';
//        for(i=0; i<data.map.length; i++){
//            if(data.map[i].position == target){
//               data.map[i].side = 'our';
//            }
//        }
        
        
        
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        drawUnitsOfTwoSize();
        informAboutOurUnits();
    }
    
    // 5. target - ourBattlePositions
    
    if ((ourBattlePositions.indexOf(target) >= 0)&&(((ourMoveObject.type == "infantery"))||((ourMoveObject.type == "BTR")))){  //для пехоты и БТР
        
        whoAttack = 'our';
        
        //занимаем проходное поле
        
        ourMiddlePositionFunction(ourMoveObject.position, target, ourMoveObject.ID)
        
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
//        if(data.enemyField().indexOf(middle[0]) >=0 ){
//           findField(middle[0]).side = "our";
//       }
        //занимаем проходное поле
        
            shorts = 0;
            OurShorts = 0;
            EnemyShorts = 0;
            numberOfOurShort = 0;
            numberOfEnemyShort = 0;
        
        // обнуляем все связанное с тактическим полем
        
        battleFieldTarget = target;
        
//        document.getElementById('battlefield').style.display = 'block';
//        document.getElementById('wrap_field').style.display = 'none';			
//        document.getElementById('preload').style.display = 'none';
//        document.getElementById('main').style.display = 'none';
        
        $('#battlefield').show();
        $('#wrap_field').hide();
        $('#preload').hide();
        $('#main').hide();
        
        ourAttackObject = ourMoveObject;
        enemyDefenseObject = findEnemyTroops(target);
        
        enemyWholeGRAD = 0;
        enemyWholeARTA = 0;
        needToKill ='not-need';
        
        show_00();
    }
    if ((ourBattlePositions.indexOf(target) >= 0)&&(ourMoveObject.type == "tank")&&(ourMoveObject.walked == "no")){  //для танков &&(ourTankHelp == 0)
        whoAttack = 'our';
        
        //занимаем проходное поле
        
        ourMiddlePositionFunction(ourMoveObject.position, target, ourMoveObject.ID)
        
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
//        if(data.enemyField().indexOf(middle[0]) >=0 ){
//           findField(middle[0]).side = "our";
//       }
        //занимаем проходное поле
        
        // обнуляем все связанное с тактическим полем
        
            shorts = 0;
            OurShorts = 0;
            EnemyShorts = 0;
            numberOfOurShort = 0;
            numberOfEnemyShort = 0;
                    
        // обнуляем все связанное с тактическим полем
        if(document.getElementById(target).innerHTML != 'help'){
        document.getElementById(target).innerHTML = '<span class="our_tank_attack"></span><span class="our_tank_help"></span>';
        
        //обрабочик нажатия на кнопку Атака
        var attackField = document.getElementsByClassName("our_tank_attack");    
        for (var i = 0; i < attackField.length; i++) {
            attackField[i].onclick = ourTankAttackFunction;
            }
        //обрабочик нажатия на кнопку Атака
        
        //обрабочик нажатия на кнопку Помощь
        var helpField = document.getElementsByClassName("our_tank_help");    
        for (var i = 0; i < helpField.length; i++) {
            helpField[i].onclick = ourTankHelpFunction;
            }
        //обрабочик нажатия на кнопку Помощь
        }
        
        battleFieldTarget = target;
        ourTankHelpField = target;
        
        ourAttackObject = ourMoveObject;
        enemyDefenseObject = findEnemyTroops(target);
       
    }
    if ((ourBattlePositions.indexOf(target) >= 0)&&(ourMoveObject.type == "ARTA"))
    { // для арты
        ourMoveObject.artaTarget = target;
        ourMoveObject.walked = 'yes';
        
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        
        ourWholeARTA = ourWholeARTA + ourMoveObject.ARTA;
        
        drawUnitsOfTwoSize();
    }
    if ((ourBattlePositions.indexOf(target) >= 0)&&(ourMoveObject.type == "GRAD"))
    { // для ГРАДов
        ourMoveObject.gradTarget = target;
        ourMoveObject.walked = 'yes';
        
        ourMovePositions.length = 0;
        ourAttackPositions.length = 0;
        ourBattlePositions.length = 0;
        
        ourWholeGRAD = ourWholeGRAD + ourMoveObject.GRAD;
        
        drawUnitsOfTwoSize();
    }
    
} //функция передвижения наших войск

function drawUnitsOfTwoSize(){ //  ПЕРЕРИСОВЫВАЕМ ВСЕ ПОЛЯ НА КАРТЕ bigMap.bigMapAllFields[1]
    
    ourUnitHealth();
    
    for (i=0; i< data.map.length; i++){
    
    $('#'+data.map[i].position).empty();   //очищаем содержимое всех ячеек(номера!!!!) 
    $('#'+data.map[i].position).removeClass('our_infantery_target our_tank_target our_BTR_target our_GRAD_target our_ARTA_target');
        
    if(data.map[i].side == 'our') { //очищаем нашу карту
        document.getElementById(data.map[i].position).setAttribute("class", "line_2_cell our");
    }if(data.map[i].position == data.ourBasePoint){
        $('#'+data.map[i].position).append('<div class = "base_point" style ="background: url(../../IMG/sprite_reform.png) no-repeat center center; background-position: -300px -200px; display: inline-block; width: 54px; height: 61px;"></div>');
    }  
        if(data.map[i].side == 'enemy') { //очищаем карту противника
         document.getElementById(data.map[i].position).setAttribute("class", "line_2_cell enemy")
    }if(data.map[i].position == data.enemyBasePoint){
        $('#'+data.map[i].position).append('<div class = "base_point" style ="background: url(../../IMG/sprite_reform.png) no-repeat center center; background-position: -300px -200px; display: inline-block; width: 54px; height: 61px;"></div>');
    } 
    }
    
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
    if(data.city){
        data.city.forEach(function(field){
        $('#'+field).append('<div class="city" style = "background: url(../../IMG/enemy_sprite_big.png) no-repeat center center; position: absolute; display: inline-block; width: 54px; height: 61px; top: 10px; left: 3px; background-position: -500px -300px;"></div>');
            
//        $('#'+field).addClass("city")
        });
    }
        
    for(j=0; j < data.our.length; j++){ //перерисовываем наши войска   
        
        if((data.our[j].type == 'tank')&&(data.our[j].walked == 'no')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_tank");
        }if((data.our[j].type == 'tank')&&(data.our[j].walked == 'yes')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_tank_walked");
        } 
        
        if((data.our[j].type == 'GRAD')&&(data.our[j].walked == 'no')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_GRAD");
        }if((data.our[j].type == 'GRAD')&&(data.our[j].walked == 'yes')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_GRAD_walked");
        }
        
        if(data.our[j].type == 'infantery'){
          if((data.our[j].trench == 'yes')&&(data.our[j].walked == 'no')){
         document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench");
        } if((data.our[j].trench == 'yes')&&(data.our[j].walked == 'yes')){
         document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_walked");
        } if((data.our[j].trench == 'yes')&&(data.our[j].mine == 'yes')&&(data.our[j].walked == 'no')){
         document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_mine");   
        } if((data.our[j].trench == 'yes')&&(data.our[j].mine == 'yes')&&(data.our[j].walked == 'yes')){
         document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_walked_mine");   
             }
        if(data.our[j].trench == 'no') {
        if((data.our[j].type == 'infantery')&&(data.our[j].walked == 'no')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery");
        }if((data.our[j].type == 'infantery')&&(data.our[j].walked == 'yes')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery_walked");
        } 
        }
        }
    
        if(data.our[j].type == 'BTR'){
            if((data.our[j].trench == 'yes')&&(data.our[j].walked == 'no')){
         document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench");
        }   if((data.our[j].trench == 'yes')&&(data.our[j].walked == 'yes')){
         document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_walked");
        } if((data.our[j].trench == 'yes')&&(data.our[j].mine == 'yes')&&(data.our[j].walked == 'no')){
         document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_mine");   
        } if((data.our[j].trench == 'yes')&&(data.our[j].mine == 'yes')&&(data.our[j].walked == 'yes')){
         document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_infantery_trench_walked_mine");   
             } 
            
            
            
            if(data.our[j].trench == 'no') {
        if((data.our[j].type == 'BTR')&&(data.our[j].walked == 'no')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_BTR");
        }if((data.our[j].type == 'BTR')&&(data.our[j].walked == 'yes')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_BTR_walked");
        }
        }
        }
        
        if((data.our[j].type == 'ARTA')&&(data.our[j].walked == 'no')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_ARTA");
        }if((data.our[j].type == 'ARTA')&&(data.our[j].walked == 'yes')){  
        document.getElementById(data.our[j].position).setAttribute("class", "line_2_cell our our_ARTA_walked");
        }
        
        levelsAndHealth(data.our[j]);
        //}
        closeAttackAndHelpFields();
      } //перерисовываем наши войска
    
        
    for(n=0; n < data.enemy.length; n++){ //перерисовываем войска противника

        if(data.enemy[n].type == 'tank'){
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_tank");
            if(data.enemy[n].walked == 'yes'){
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_tank_walked");        
            }
        } if(data.enemy[n].type == 'GRAD'){  
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_GRAD");
            if(data.enemy[n].walked == 'yes'){
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_GRAD_walked");        
            }
        } if(data.enemy[n].type == 'infantery'){
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_infantery");
            if(data.enemy[n].walked == 'yes'){
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_infantery_walked");      }
          if((data.enemy[n].trench == 'yes')&&(data.enemy[n].walked == 'no')){
         document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_infantery_trench");
        }  
        } if(data.enemy[n].type == 'BTR'){  
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_BTR");
            if(data.enemy[n].walked == 'yes'){
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_BTR_walked");        
            }if((data.enemy[n].trench == 'yes')&&(data.enemy[n].walked == 'no')){
         document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_infantery_trench");
        } 
            
        } if(data.enemy[n].type == 'ARTA'){
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_ARTA");
            if(data.enemy[n].walked == 'yes'){
        document.getElementById(data.enemy[n].position).setAttribute("class", "line_2_cell enemy enemy_ARTA_walked");        
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
    data.calculationMap();
    
} //  ПЕРЕРИСОВЫВАЕМ ВСЕ ПОЛЯ НА КАРТЕ 

function drawCanAttackEnemyWithOutArta(temp){//рисуем возможность нападение на противника кроме арты
    
    for(var i=0; i<temp.length; i++){ //рисуем возможность нападение на противника кроме арты
        for(j=0; j<data.enemy.length; j++){
        if(data.enemy[j].position.indexOf(temp[i].position) >= 0){
            for(j=0; j< data.enemy.length; j++){
                if((data.enemy[j].type == 'tank')&&(data.enemy[j].position == temp[i].position)){                
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_tank_can_attack") 
                }if((data.enemy[j].type == 'BTR')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_BTR_can_attack") 
                }if((data.enemy[j].type == 'infantery')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_infantery_can_attack") 
                }if((data.enemy[j].type == 'GRAD')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_GRAD_can_attack") 
                }if((data.enemy[j].type == 'ARTA')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_ARTA_can_attack") 
                }
            }
        }
        }
    }//рисуем нападение на противника кроме арты
}//рисуем возможность нападение на противника кроме арты

function drawCanAttackEnemyWithTanks(temp){//рисуем возможность нападение на противника танками
    
    for(var i=0; i<temp.length; i++){ //рисуем возможность нападение на противника кроме арты
        for(j=0; j<data.enemy.length; j++){
        if(data.enemy[j].position.indexOf(temp[i].position) >= 0){
            var counter = 0;
            for(n=0; n<data.our.length; n++){
                if(data.enemy[j].position == data.our[n].helpTarget){
                    counter = 1;
                }
            }

            if (counter == 0){
            for(j=0; j< data.enemy.length; j++){
                if((data.enemy[j].type == 'tank')&&(data.enemy[j].position == temp[i].position)){                
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_tank_can_attack") 
                }if((data.enemy[j].type == 'BTR')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_BTR_can_attack") 
                }if((data.enemy[j].type == 'infantery')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_infantery_can_attack") 
                }if((data.enemy[j].type == 'GRAD')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_GRAD_can_attack") 
                }if((data.enemy[j].type == 'ARTA')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_ARTA_can_attack") 
                }
            }
        }
        }
        }
        
    }//рисуем нападение на противника танками
    counter = 0;
}//рисуем возможность нападение на противника танками

function drawCanAttackEnemyWithArta(temp){ //рисуем возможность нападение на противника артой
    
    for(var i=0; i<temp.length; i++){ //рисуем возможность хода и нападение на противника артой
        
        if((data.enemyField().indexOf(temp[i].position) >= 0)&&(data.enemyTroops().indexOf(temp[i].position)>=0)){
          
            for(j=0; j< data.enemyTroops().length; j++){
               
                if((data.enemy[j].type == 'tank')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_tank_can_bomb") 
                }if((data.enemy[j].type == 'BTR')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_BTR_can_bomb") 
                }if((data.enemy[j].type == 'infantery')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_infantery_can_bomb") 
                }if((data.enemy[j].type == 'GRAD')&&(data.enemy[j].position == temp[i].position)){ document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_GRAD_can_bomb") 
                }if((data.enemy[j].type == 'ARTA')&&(data.enemy[j].position == temp[i].position)){
                   document.getElementById(temp[i].position).setAttribute("class", "line_2_cell enemy enemy_ARTA_can_bomb") 
                }
            }
               
        }
    } //рисуем возможность нападение на противника артой
} //рисуем возможность нападение на противника артой

function ourMiddlePositionFunction(start, finish, ID){
    if((findOurTroopsForId(ID).type == 'tank')||(findOurTroopsForId(ID).type == 'BTR')||(findOurTroopsForId(ID).type == 'GRAD')){
    if(minDistanceBetweenOurTwoPoints(start, finish) == 2){    
    var startPoints = [];
    startPoints = oneStepFunction(start);
    var finishPoints = [];
    finishPoints = oneStepFunction(finish);
    var middlePoints = [];
    startPoints.forEach(function(point){
        if((finishPoints.indexOf(point)>=0)&&(data.enemyTroops().indexOf(point)<0)){
            middlePoints.push(point);
        }            
            });

        middlePoints = random(middlePoints);
        
    if(findField(middlePoints[0]).side == 'enemy'){ // можно дописать и для хода противника

        findField(middlePoints[0]).side = 'our';
        data.ourFields.push(middlePoints[0]);
        data.enemyFields = deleteElementFromArray(data.enemyField(), middlePoints[0])
    }
    }
}
} //захватываем поле противника если оно находиться между двумя нашими полями старта и финиша

function calculationPosition (position, delta_X, delta_Y){ //получаем новые координаты в понятном виде
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

function createDirectionOfAttack(position, direction){ //создаем объект из позиций для хода и направления атаки
    var obj ={};
    obj['position'] = position;
    obj['direction'] = direction;
    return obj;
} //создаем объект из позиций для хода и направления атаки

function drawOurArtaAttackForEnemy(temp){ //рисуем возможность нападение на противника артой
    
    for(var i=0; i<temp.length; i++){ //рисуем возможность хода и нападение на противника артой
        
        if(data.enemyTroops().indexOf(temp[i])>=0){ 
            for(j=0; j< data.enemy.length; j++){
                if((data.enemy[j].type == 'tank')&&(data.enemy[j].position == temp[i])){
                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_tank_can_bomb") 
                }if((data.enemy[j].type == 'BTR')&&(data.enemy[j].position == temp[i])){
                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_BTR_can_bomb") 
                }if((data.enemy[j].type == 'infantery')&&(data.enemy[j].position == temp[i])){
                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_infantery_can_bomb") 
                }if((data.enemy[j].type == 'GRAD')&&(data.enemy[j].position == temp[i])){
                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_GRAD_can_bomb") 
                }if((data.enemy[j].type == 'ARTA')&&(data.enemy[j].position == temp[i])){
                   document.getElementById(temp[i]).setAttribute("class", "line_2_cell enemy enemy_ARTA_can_bomb") 
                }
            }
               
        }
    } //рисуем возможность нападение на противника артой
} //рисуем возможность нападение на противника артой



function calculationMoveFieldsFunction(position, steps){
    
    
    var temp = [];
    var row = position.substring(0, 2)
    for(i=0; i<data.ourTroops().length; i++){
        
    if((data.our[i].position == position)){ //поля для юнитов с 1 ходом
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
    } //поля для юнитов с 1 ходом
        
    var newTemp = [];
    if ((data.our[i].position == position)&&(data.our[i].steps == 2)){
        if(row % 2 == 0){
               
              if ((data.waterField().indexOf(calculationPosition(position, 1, -1)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, 1, -1)) < 0)) {
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, -2), 16));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, -1), 16));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 0), 11));
              }
               if ((data.waterField().indexOf(calculationPosition(position, 1, 0)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, 1, 0)) < 0)) {                 
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 0), 11));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 1), 11));
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, 1), 12));
              } 
                if ((data.waterField().indexOf(calculationPosition(position, 0, 1)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, 0, 1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, 1), 12));
                temp.push(createDirectionOfAttack(calculationPosition(position, 0, 2), 12));
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, 1), 13));
              } 
               if ((data.waterField().indexOf(calculationPosition(position, -1, 0)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, -1, 0)) < 0)) {              
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, 1), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 1), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 0), 13));
              } 
               if ((data.waterField().indexOf(calculationPosition(position, -1, -1)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, -1, -1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 0), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, -1), 14));
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, -2), 15));
              } 
               if ((data.waterField().indexOf(calculationPosition(position, 0, -1)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, 0, -1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, -2), 15));
                temp.push(createDirectionOfAttack(calculationPosition(position, 0, -2), 15));
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, -2), 16));
              }
               
           } 
        else {
               
              if ((data.waterField().indexOf(calculationPosition(position, 1, 0)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, 1, 0)) < 0)) {
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, -1), 16));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, -1), 16));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 0), 11));
              }
               if ((data.waterField().indexOf(calculationPosition(position, 1, 1)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, 1, 1)) < 0)) {                
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 0), 11));
                temp.push(createDirectionOfAttack(calculationPosition(position, 2, 1), 11));
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, 2), 12));
              } 
                if ((data.waterField().indexOf(calculationPosition(position, 0, 1)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, 0, 1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, 2), 12));
                temp.push(createDirectionOfAttack(calculationPosition(position, 0, 2), 12));
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, 2), 13));
              } 
               if ((data.waterField().indexOf(calculationPosition(position, -1, 1)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, -1, 1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, 2), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 1), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 0), 13));
              } 
               if ((data.waterField().indexOf(calculationPosition(position, -1, 0)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, -1, 0)) < 0)) {                
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, 0), 13));
                temp.push(createDirectionOfAttack(calculationPosition(position, -2, -1), 14));
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, -1), 15));
              } 
               if ((data.waterField().indexOf(calculationPosition(position, 0, -1)) < 0)&&(data.enemyTroops().indexOf(calculationPosition(position, 0, -1)) < 0)) {               
                temp.push(createDirectionOfAttack(calculationPosition(position, -1, -1), 15));
                temp.push(createDirectionOfAttack(calculationPosition(position, 0, -2), 15));
                temp.push(createDirectionOfAttack(calculationPosition(position, 1, -1), 16));
              } 
           }
            
        } //новый расчет для 2 ходов с учетом воды
    }
      
    for(var i=0; i<temp.length; i++){   
       
        if((data.ourFields.indexOf(temp[i].position) >= 0)&&(data.ourTroops().indexOf(temp[i].position)< 0 )&&(ourMovePositions.indexOf(temp[i].position) < 0)){ 
            ourMovePositions.push(temp[i].position); 
        }if((data.enemyField().indexOf(temp[i].position) >=0)&&(data.enemyTroops().indexOf(temp[i].position) < 0)){ 
            ourAttackPositions.push(temp[i].position);
        }if((data.enemyField().indexOf(temp[i].position) >=0)&&(data.enemyField().indexOf(temp[i].position) >= 0)&&(data.enemyTroops().indexOf(temp[i].position) >= 0)){
            ourBattlePositions.push(temp[i].position);
        }
      }
    
    for(j=0; j<ourMovePositions.length; j++){
        
         document.getElementById(ourMovePositions[j]).setAttribute("class", "line_2_cell our our_can_move")
    }
    
    for(var i=0; i<temp.length; i++){ // рисуем стрелки для атаки
        //console.log(temp[i].position)
        if((data.enemyField().indexOf(temp[i].position) >= 0)&&(data.enemyTroops().indexOf(temp[i].position)<0)){ 
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
      
    for(i=0; i<data.ourTroops().length; i++){ //проверяем свой объект на причастность к  танкам
        if(data.our[i].position == position){
            if((data.our[i].type == 'ARTA')||(data.our[i].type == 'GRAD')){
            } else {
            if(data.our[i].type == 'tank'){
               drawCanAttackEnemyWithTanks(temp); 
            } else {
               drawCanAttackEnemyWithOutArta(temp);  
            } 
            }
        }
    } //проверяем свой объект на причастность к арте и ГРАДу или танкам
    
    for(i=0; i<data.ourTroops().length; i++){ //находим цели для арты
        if(data.our[i].position == position){
            if(data.our[i].type == 'ARTA'){
               var fields = createFieldsForOurArtaAttack(position);              
               drawOurArtaAttackForEnemy(fields); 
                
                ourBattlePositions.length = 0;
                for(j=0; j<fields.length; j++){
                  if ((data.enemyField().indexOf(fields[j]) >=0)&&(data.enemyTroops().indexOf(fields[j]) >= 0)) {
                      ourBattlePositions.push(fields[j]); 
                   }
                }
                
            } 
        }
    } //находим цели для арты
    
    for(i=0; i<data.ourTroops().length; i++){ //находим цели для ГРАДА 
        if(data.our[i].position == position){
            if(data.our[i].type == 'GRAD'){
               var fieldsGrad = createFieldsForOurGradAttack(position);              
               drawOurArtaAttackForEnemy(fieldsGrad); 
                
                ourBattlePositions.length = 0;
                for(j=0; j<fieldsGrad.length; j++){
                  if ((data.enemyField().indexOf(fieldsGrad[j]) >=0)&&(data.enemyField().indexOf(fieldsGrad[j]) >= 0)&&(data.enemyTroops().indexOf(fieldsGrad[j]) >= 0)) {
                      ourBattlePositions.push(fieldsGrad[j]); 
                   }
                }
                
            } 
        }
    } //находим цели для ГРАДА
    
}

function changeOurUnitFace(target){ //изменяем выделенный юнит
    if(data.ourTroops().indexOf(target<0)){ 
    for(i=0; i < data.our.length; i++){
        if(data.our[i].position == target){
            if(data.our[i].type == 'tank'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_tank_target");
            } if(data.our[i].type == 'GRAD'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_GRAD_target");
            } if(data.our[i].type == 'infantery'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_infantery_target");
            } if(data.our[i].type == 'BTR'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_BTR_target");
            } if(data.our[i].type == 'ARTA'){
              document.getElementById(target).setAttribute("class", "line_2_cell our our_ARTA_target");
            }
            ourLastStep = target;  
        }
      }
    }  
} //изменяем выделенный юнит

function findOurTroops(target){
    var obj = {};
    for (i=0; i<data.our.length; i++){
        if(data.our[i].position == target){
            obj = data.our[i];
        } 
    }
    return obj;
}

function findEnemyTroops(target){
    var obj = {};
    for (i=0; i<data.enemy.length; i++){
        if(data.enemy[i].position == target){
            obj = data.enemy[i];
        } 
    }
    return obj;
}

function deleteEnemyTroops(){
    
    var newEnemy =[];
    var counter = 0
    data.enemy.forEach(function(enemy){
        if((enemy.type == 'tank')&&(enemy.tank > 0)&&(enemy.position)){
            newEnemy.push(enemy)
        }if((enemy.type == 'GRAD')&&(enemy.GRAD > 0)&&(enemy.position)){
            newEnemy.push(enemy)
        }if((enemy.type == 'ARTA')&&(enemy.ARTA > 0)&&(enemy.position)){
            newEnemy.push(enemy)
        }if((enemy.type == 'infantery')&&((enemy.infantery > 0)||(enemy.mortar > 0))&&(newEnemy.indexOf(enemy) <0)&&(enemy.position)){
            newEnemy.push(enemy)
        }if((enemy.type == 'BTR')&&((enemy.infantery > 0)||(enemy.mortar > 0)||(enemy.BTR > 0))&&(newEnemy.indexOf(enemy) <0)&&(enemy.position)){
            newEnemy.push(enemy)
        }
    })
    
    data.enemy.length = 0;
    data.enemy = newEnemy;
    return data.enemy;
}

function findField(target){
    for(i=0; i<data.map.length; i++){
        if(data.map[i].position == target){
            return data.map[i];
        }
    }
}

function findNumberOfDataMapField(target){
    for(i=0; i<data.map.length; i++){
        if(data.map[i].position == target){
            return i;
        }
    }
}

function createFieldsForOurGradAttack(position){
    var temp = [];
    var row = position.substring(0, 2);
    
    for(i=0; i<data.our.length; i++)
    if(data.our[i].position == position){ //поля для стрельбы ГРАДОМ
          if(row % 2 == 0){
        temp.push(calculationPosition(position, 1, -1));
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 0, -1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, -1, -1));      
              
        temp.push(calculationPosition(position, 2, -1));
        temp.push(calculationPosition(position, 2, 0));
        temp.push(calculationPosition(position, 2, 1));
        temp.push(calculationPosition(position, 1, 1));
        temp.push(calculationPosition(position, 0, 2));
        temp.push(calculationPosition(position, -1, 1));
        temp.push(calculationPosition(position, -2, 1));
        temp.push(calculationPosition(position, -2, 0));
        temp.push(calculationPosition(position, -2, -1));
        temp.push(calculationPosition(position, -1, -2));
        temp.push(calculationPosition(position, 0, -2));
        temp.push(calculationPosition(position, 1, -2));
              
       
    } else {
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 1, 1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, 0, -1));
        
        temp.push(calculationPosition(position, 2, -1));
        temp.push(calculationPosition(position, 2, 0));
        temp.push(calculationPosition(position, 2, 1));
        temp.push(calculationPosition(position, 1, 2));
        temp.push(calculationPosition(position, 0, 2));
        temp.push(calculationPosition(position, -1, 2));
        temp.push(calculationPosition(position, -2, 1));
        temp.push(calculationPosition(position, -2, 0));
        temp.push(calculationPosition(position, -2, -1));
        temp.push(calculationPosition(position, -1, -1));
        temp.push(calculationPosition(position, 0, -2));
        temp.push(calculationPosition(position, 1, -1));
        
       
    }
    } //поля для стрельбы ГРАДОМ
    return temp;
} //создаем поля для атаки нашим ГРАДОМ

function createFieldsForOurArtaAttack(position){
    var temp = [];
    var row = position.substring(0, 2);
    
    for(i=0; i<data.our.length; i++)
    if(data.our[i].position == position){ //поля для стрельбы артой
          if(row % 2 == 0){
        temp.push(calculationPosition(position, 1, -1));
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 0, -1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, -1, -1));      
              
        temp.push(calculationPosition(position, 2, -1));
        temp.push(calculationPosition(position, 2, 0));
        temp.push(calculationPosition(position, 2, 1));
        temp.push(calculationPosition(position, 1, 1));
        temp.push(calculationPosition(position, 0, 2));
        temp.push(calculationPosition(position, -1, 1));
        temp.push(calculationPosition(position, -2, 1));
        temp.push(calculationPosition(position, -2, 0));
        temp.push(calculationPosition(position, -2, -1));
        temp.push(calculationPosition(position, -1, -2));
        temp.push(calculationPosition(position, 0, -2));
        temp.push(calculationPosition(position, 1, -2));
              
        temp.push(calculationPosition(position, -3, -2));
        temp.push(calculationPosition(position, 3, -2));
        temp.push(calculationPosition(position, -3, -1));
        temp.push(calculationPosition(position, -3, 1));
        temp.push(calculationPosition(position, 3, -1));      
        temp.push(calculationPosition(position, 3, 1));
        temp.push(calculationPosition(position, -3, 0));
        temp.push(calculationPosition(position, 3, 0));
        temp.push(calculationPosition(position, -2, -2));
        temp.push(calculationPosition(position, -2, 2));
        temp.push(calculationPosition(position, 2, -2));
        temp.push(calculationPosition(position, 2, 2));              
        temp.push(calculationPosition(position, -1, -3));      
        temp.push(calculationPosition(position, 1, -3));
        temp.push(calculationPosition(position, -1, 2));
        temp.push(calculationPosition(position, 1, 2));
        temp.push(calculationPosition(position, 0, -3));
        temp.push(calculationPosition(position, 0, 3));  
    } else {
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 1, 1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, 0, -1));
        
        temp.push(calculationPosition(position, 2, -1));
        temp.push(calculationPosition(position, 2, 0));
        temp.push(calculationPosition(position, 2, 1));
        temp.push(calculationPosition(position, 1, 2));
        temp.push(calculationPosition(position, 0, 2));
        temp.push(calculationPosition(position, -1, 2));
        temp.push(calculationPosition(position, -2, 1));
        temp.push(calculationPosition(position, -2, 0));
        temp.push(calculationPosition(position, -2, -1));
        temp.push(calculationPosition(position, -1, -1));
        temp.push(calculationPosition(position, 0, -2));
        temp.push(calculationPosition(position, 1, -1));
        
        temp.push(calculationPosition(position, -3, 2));
        temp.push(calculationPosition(position, 3, 2));
        temp.push(calculationPosition(position, -3, -1));
        temp.push(calculationPosition(position, -3, 1));
        temp.push(calculationPosition(position, 3, -1));      
        temp.push(calculationPosition(position, 3, 1));
        temp.push(calculationPosition(position, -3, 0));
        temp.push(calculationPosition(position, 3, 0));
        
        temp.push(calculationPosition(position, -2, -2));
        temp.push(calculationPosition(position, -2, 2));
        temp.push(calculationPosition(position, 2, -2));
        temp.push(calculationPosition(position, 2, 2));              
        temp.push(calculationPosition(position, -1, 3));      
        temp.push(calculationPosition(position, 1, 3));
        temp.push(calculationPosition(position, -1, -2));
        temp.push(calculationPosition(position, 1, -2));
        
        temp.push(calculationPosition(position, 0, -3));
        temp.push(calculationPosition(position, 0, 3)); 
    }
    } //поля для стрельбы артой
    return temp;
} //создаем поля для атаки нашей АРТЫ

function createFieldsForEnemyArtaAttack(position){ //создаем поля для атаки АРТЫ противника
    var temp = [];
    var row = position.substring(0, 2);
    
    for(i=0; i<data.enemy.length; i++)
    if(data.enemy[i].position == position){ //поля для стрельбы артой
          if(row % 2 == 0){
        temp.push(calculationPosition(position, 1, -1));
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 0, -1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, -1, -1));      
              
        temp.push(calculationPosition(position, 2, -1));
        temp.push(calculationPosition(position, 2, 0));
        temp.push(calculationPosition(position, 2, 1));
        temp.push(calculationPosition(position, 1, 1));
        temp.push(calculationPosition(position, 0, 2));
        temp.push(calculationPosition(position, -1, 1));
        temp.push(calculationPosition(position, -2, 1));
        temp.push(calculationPosition(position, -2, 0));
        temp.push(calculationPosition(position, -2, -1));
        temp.push(calculationPosition(position, -1, -2));
        temp.push(calculationPosition(position, 0, -2));
        temp.push(calculationPosition(position, 1, -2));
              
        temp.push(calculationPosition(position, -3, -2));
        temp.push(calculationPosition(position, 3, -2));
        temp.push(calculationPosition(position, -3, -1));
        temp.push(calculationPosition(position, -3, 1));
        temp.push(calculationPosition(position, 3, -1));      
        temp.push(calculationPosition(position, 3, 1));
        temp.push(calculationPosition(position, -3, 0));
        temp.push(calculationPosition(position, 3, 0));
        temp.push(calculationPosition(position, -2, -2));
        temp.push(calculationPosition(position, -2, 2));
        temp.push(calculationPosition(position, 2, -2));
        temp.push(calculationPosition(position, 2, 2));              
        temp.push(calculationPosition(position, -1, -3));      
        temp.push(calculationPosition(position, 1, -3));
        temp.push(calculationPosition(position, -1, 2));
        temp.push(calculationPosition(position, 1, 2));
        temp.push(calculationPosition(position, 0, -3));
        temp.push(calculationPosition(position, 0, 3));  
    } else {
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 1, 1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, 0, -1));
        
        temp.push(calculationPosition(position, 2, -1));
        temp.push(calculationPosition(position, 2, 0));
        temp.push(calculationPosition(position, 2, 1));
        temp.push(calculationPosition(position, 1, 2));
        temp.push(calculationPosition(position, 0, 2));
        temp.push(calculationPosition(position, -1, 2));
        temp.push(calculationPosition(position, -2, 1));
        temp.push(calculationPosition(position, -2, 0));
        temp.push(calculationPosition(position, -2, -1));
        temp.push(calculationPosition(position, -1, -1));
        temp.push(calculationPosition(position, 0, -2));
        temp.push(calculationPosition(position, 1, -1));
        
        temp.push(calculationPosition(position, -3, 2));
        temp.push(calculationPosition(position, 3, 2));
        temp.push(calculationPosition(position, -3, -1));
        temp.push(calculationPosition(position, -3, 1));
        temp.push(calculationPosition(position, 3, -1));      
        temp.push(calculationPosition(position, 3, 1));
        temp.push(calculationPosition(position, -3, 0));
        temp.push(calculationPosition(position, 3, 0));
        
        temp.push(calculationPosition(position, -2, -2));
        temp.push(calculationPosition(position, -2, 2));
        temp.push(calculationPosition(position, 2, -2));
        temp.push(calculationPosition(position, 2, 2));              
        temp.push(calculationPosition(position, -1, 3));      
        temp.push(calculationPosition(position, 1, 3));
        temp.push(calculationPosition(position, -1, -2));
        temp.push(calculationPosition(position, 1, -2));
        
        temp.push(calculationPosition(position, 0, -3));
        temp.push(calculationPosition(position, 0, 3)); 
    }
    } //поля для стрельбы артой
  
    return temp;
} //создаем поля для атаки АРТЫ противника

function createFieldsForEnemyGRADAttack(position){ //создаем поля для атаки ГРАДов противника
    var temp = [];
    var row = position.substring(0, 2);
    
    for(i=0; i<data.enemy.length; i++)
    if(data.enemy[i].position == position){ //поля для стрельбы артой
          if(row % 2 == 0){
        temp.push(calculationPosition(position, 1, -1));
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 0, -1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, -1, -1));      
              
        temp.push(calculationPosition(position, 2, -1));
        temp.push(calculationPosition(position, 2, 0));
        temp.push(calculationPosition(position, 2, 1));
        temp.push(calculationPosition(position, 1, 1));
        temp.push(calculationPosition(position, 0, 2));
        temp.push(calculationPosition(position, -1, 1));
        temp.push(calculationPosition(position, -2, 1));
        temp.push(calculationPosition(position, -2, 0));
        temp.push(calculationPosition(position, -2, -1));
        temp.push(calculationPosition(position, -1, -2));
        temp.push(calculationPosition(position, 0, -2));
        temp.push(calculationPosition(position, 1, -2));
         
    } else {
        temp.push(calculationPosition(position, 1, 0));
        temp.push(calculationPosition(position, 1, 1));
        temp.push(calculationPosition(position, 0, 1));
        temp.push(calculationPosition(position, -1, 1));
        temp.push(calculationPosition(position, -1, 0));
        temp.push(calculationPosition(position, 0, -1));
        
        temp.push(calculationPosition(position, 2, -1));
        temp.push(calculationPosition(position, 2, 0));
        temp.push(calculationPosition(position, 2, 1));
        temp.push(calculationPosition(position, 1, 2));
        temp.push(calculationPosition(position, 0, 2));
        temp.push(calculationPosition(position, -1, 2));
        temp.push(calculationPosition(position, -2, 1));
        temp.push(calculationPosition(position, -2, 0));
        temp.push(calculationPosition(position, -2, -1));
        temp.push(calculationPosition(position, -1, -1));
        temp.push(calculationPosition(position, 0, -2));
        temp.push(calculationPosition(position, 1, -1));
        
    }
    } //создаем поля для атаки ГРАДов противника
  
    return temp;
} //создаем поля для атаки ГРАДов противника

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

function newCourse(){
    whoseTurn = 'our';
    init();
    
    
    refillEnemyTroops(); // наверное прийдется найти для этой функции другое место
    
    for(i=0; i<data.our.length; i++){
        data.our[i].walked = 'no';
        if(((data.our[i].type == 'infantery')||(data.our[i].type == 'BTR'))&&(data.our[i].trench != 'yes')){
           data.our[i].mine = 'no'
        }
    }
    for(j=0; j<data.enemy.length; j++){
        data.enemy[j].walked = 'no';
        data.enemy[j].middlePosition = '';
        data.enemy[j].stepPosition = '';
        data.enemy[j].attackArtaOrGrad = 'no';
        if(((data.enemy[j].type == 'infantery')||(data.enemy[j].type == 'BTR'))&&(data.enemy[j].trench != 'yes')){
           data.enemy[j].mine = 'no'
        }
        
    }
    
    ourTankHelp = 0;
    drawUnitsOfTwoSize();
    cleaningOurAndEnemy();
    ourWholeGRAD = 0;
    ourWholeARTA = 0;
    enemyWholeGRAD = 0;
    enemyWholeARTA = 0;
    
//    for(j=0; j<data.calculationMap().length; j++){
//        document.getElementById(data.calculationMap()[j].position).innerHTML = data.calculationMap()[j].position;
//    }
    for(n=0; n<data.our.length; n++){
        data.our[n].helpTarget = 'no';
        data.our[n].artaTarget = 'no';
        data.our[n].gradTarget = 'no';
    }
    globalStep++;
    
    data.enemy.forEach(function(enemy){
        enemy.retreatPosition = 'no';       
    });
    
    data.our.forEach(function (unit){
        if(ourTroopsNotRound(unit.ID)){
            unit.round =0;
        }else{
            unit.round += 1;
        }
        });
    
    refillOurTroops();
    
    lastStep.saveLastStep();
    
    
} // меняем вид юнитам совершившим ход

function informAboutOurUnits(){
    data.map.forEach(function (field){
        document.getElementById(field.position).ondblclick = false;
    })
    
    var ourId = [];
    for(var i=0; i<data.our.length; i++){
        ourId.push(data.our[i].position);
        }    
    for(var i=0; i<ourId.length; i++){
        document.getElementById(ourId[i]).ondblclick = openPanel;
    }  
}

function closePanel(){ //функция закрытия информ панели
//    document.getElementById('wrap').style.display = 'none';			
//    document.getElementById('info_panel').style.display = 'none';
    
    $('#wrap').hide();
    $('#info_panel').hide();
} //функция закрытия информ панели

function openPanel(event){ //функция открытия информ панели
    ourUnitHealth();
    var target = event.target.id;
    for(i=0; i<data.our.length; i++){
        if(data.our[i].position == target){
        if(data.our[i].type == 'infantery'){
            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_infantery')
        }if(data.our[i].type == 'BTR'){
            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_BTR')
        }if(data.our[i].type == 'tank'){
            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_tank')
        }if(data.our[i].type == 'GRAD'){
            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_GRAD')
        }if(data.our[i].type == 'ARTA'){
            document.getElementById('info_panel_in').setAttribute('class', 'info_panel_ARTA')
        }
     }
    }
    ourTroopInformPanel(target);
    document.getElementById('wrap').style.display = 'block';			
    document.getElementById('info_panel').style.display = 'block';
    
} //функция открытия информ панели

function ourTroopInformPanel(target){
    var ourUnit = findOurTroops(target);
        document.getElementById('name_of_unit').innerHTML =  ourUnit.name;
        document.getElementById('value_health_of_unit').innerHTML =  ourUnit.health + '%';
    
    if (ourUnit.type == 'tank'){
        allCloseUnless('tank');
        if(ourUnit.tank == 10){
           for(i = 0 ; i < 10; i++){
            document.getElementById('tank_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('tank_00' + i + '_position').style.backgroundPosition = '0px -600px';
        } 
        }else{
        for(i = 0 ; i <= ourUnit.tank; i++){
            document.getElementById('tank_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('tank_00' + i + '_position').style.backgroundPosition = '0px -600px';  
        }
        for(i = ourUnit.tank ; i < ourUnit.maxTank; i++){
            document.getElementById('tank_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('tank_00' + i + '_position').style.backgroundPosition = '-400px -600px';
        }
        for(i = ourUnit.maxTank ; i<10; i++){
            document.getElementById('tank_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('tank_00' + i + '_position').style.backgroundPosition = '-200px -600px';
        }
        }
    }
    
    if (ourUnit.type == 'GRAD'){
        allCloseUnless('GRAD');
        if(ourUnit.GRAD == 4){
           for(i = 0 ; i < 4; i++){
            document.getElementById('GRAD_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('GRAD_00' + i + '_position').style.backgroundPosition = '0px -200px';
           }
        }else{
        for(i = 0 ; i < ourUnit.GRAD; i++){
            document.getElementById('GRAD_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('GRAD_00' + i + '_position').style.backgroundPosition = '0px -200px';
        }
        for(i = ourUnit.GRAD ; i < ourUnit.maxGRAD; i++){
            document.getElementById('GRAD_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('GRAD_00' + i + '_position').style.backgroundPosition = '-400px -200px';
        }
        for(i = ourUnit.maxGRAD ; i<4; i++){
            document.getElementById('GRAD_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('GRAD_00' + i + '_position').style.backgroundPosition = '-200px -200px';
        }
        }
    }
    
    if (ourUnit.type == 'ARTA'){
        allCloseUnless('ARTA');
        if(ourUnit.ARTA == 3){
           for(i = 0 ; i < 3; i++){
             document.getElementById('ARTA_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('ARTA_00' + i + '_position').style.backgroundPosition = '0px 0px';
        }
        }else{
        for(i = 0 ; i < ourUnit.ARTA; i++){
            document.getElementById('ARTA_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('ARTA_00' + i + '_position').style.backgroundPosition = '0px 0px';
        }
        for(i = ourUnit.ARTA ; i < ourUnit.maxARTA; i++){
            document.getElementById('ARTA_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('ARTA_00' + i + '_position').style.backgroundPosition = '-400px 0px';
        }
        for(i = ourUnit.maxARTA ; i<3; i++){
            document.getElementById('ARTA_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('ARTA_00' + i + '_position').style.backgroundPosition = '-200px 0px';
        }
        }
    }
    
    if (ourUnit.type == 'infantery'){
        allCloseUnless('infantery');
        if(ourUnit.infantery == 10){
           for(i = 0 ; i < 10; i++){
            document.getElementById('infantery_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('infantery_00' + i + '_position').style.backgroundPosition = '0px -300px';
           }
        }else{
        for(i = 0 ; i <= ourUnit.infantery; i++){
            document.getElementById('infantery_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('infantery_00' + i + '_position').style.backgroundPosition = '0px -300px';
        }
        for(i = ourUnit.infantery ; i < ourUnit.maxInfantery; i++){
            document.getElementById('infantery_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('infantery_00' + i + '_position').style.backgroundPosition = '-400px -300px';
        }
        for(i = ourUnit.maxInfantery ; i<10; i++){
            document.getElementById('infantery_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('infantery_00' + i + '_position').style.backgroundPosition = '-200px -300px';
        }
        }
        if(ourUnit.mortar == 5){
           for(i = 0 ; i < 5; i++){
              document.getElementById('mortan_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('mortan_00' + i + '_position').style.backgroundPosition = '0px -400px';
        }
        }else{
        for(i = 0 ; i <= ourUnit.mortar; i++){
            document.getElementById('mortan_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('mortan_00' + i + '_position').style.backgroundPosition = '0px -400px';
        }
        for(i = ourUnit.mortar ; i < ourUnit.maxMortar; i++){
            document.getElementById('mortan_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('mortan_00' + i + '_position').style.backgroundPosition = '-400px -400px';
        }
        for(i = ourUnit.maxMortar ; i<5; i++){
            document.getElementById('mortan_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('mortan_00' + i + '_position').style.backgroundPosition = '-200px -400px';
        }
        }
        if(ourUnit.PTUR == 5){
           for(i = 0 ; i < 5; i++){
            document.getElementById('PTUR_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('PTUR_00' + i + '_position').style.backgroundPosition = '0px -500px';
        }
        }else{
        for(i = 0 ; i <= ourUnit.PTUR; i++){
            document.getElementById('PTUR_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('PTUR_00' + i + '_position').style.backgroundPosition = '0px -500px';
        }
        for(i = ourUnit.PTUR ; i < ourUnit.maxPTUR; i++){
            document.getElementById('PTUR_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('PTUR_00' + i + '_position').style.backgroundPosition = '-400px -500px';
        }
        for(i = ourUnit.maxPTUR ; i<5; i++){
            document.getElementById('PTUR_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('PTUR_00' + i + '_position').style.backgroundPosition = '-200px -500px';
        }
        }
    }
    
    if (ourUnit.type == 'BTR'){
        allCloseUnless('BTR');
        if(ourUnit.infantery == 10){
           for(i = 0 ; i < 10; i++){
            document.getElementById('infantery2_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('infantery2_00' + i + '_position').style.backgroundPosition = '0px -300px';
        }
        }else{
        for(i = 0 ; i <= ourUnit.infantery; i++){
            document.getElementById('infantery2_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('infantery2_00' + i + '_position').style.backgroundPosition = '0px -300px';
        }
        for(i = ourUnit.infantery ; i < ourUnit.maxInfantery; i++){
           document.getElementById('infantery2_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('infantery2_00' + i + '_position').style.backgroundPosition = '-400px -300px';
        }
        for(i = ourUnit.maxInfantery ; i<10; i++){
           document.getElementById('infantery2_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('infantery2_00' + i + '_position').style.backgroundPosition = '-200px -300px';
        }
        }
        if(ourUnit.mortar == 5){
           for(i = 0 ; i < 5; i++){
               document.getElementById('mortan2_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('mortan2_00' + i + '_position').style.backgroundPosition = '0px -400px';
        }
        }else{
        for(i = 0 ; i <= ourUnit.mortar; i++){
            document.getElementById('mortan2_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('mortan2_00' + i + '_position').style.backgroundPosition = '0px -400px';
        }
        for(i = ourUnit.mortar ; i < ourUnit.maxMortar; i++){
            document.getElementById('mortan2_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('mortan2_00' + i + '_position').style.backgroundPosition = '-400px -400px';
        }
        for(i = ourUnit.maxMortar ; i<5; i++){
            document.getElementById('mortan2_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('mortan2_00' + i + '_position').style.backgroundPosition = '-200px -400px';
        }
        }
        if(ourUnit.PTUR == 5){
           for(i = 0 ; i < 5; i++){
            document.getElementById('PTUR2_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('PTUR2_00' + i + '_position').style.backgroundPosition = '0px -500px';
        }
        }else{
        for(i = 0 ; i <= ourUnit.PTUR; i++){
           document.getElementById('PTUR2_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('PTUR2_00' + i + '_position').style.backgroundPosition = '0px -500px';
        }
        for(i = ourUnit.PTUR ; i < ourUnit.maxPTUR; i++){
            document.getElementById('PTUR2_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('PTUR2_00' + i + '_position').style.backgroundPosition = '-400px -500px';
        }
        for(i = ourUnit.maxPTUR ; i<5; i++){
            document.getElementById('PTUR2_00' + i + '_position').style.backgroundImage = 'url(../../IMG/our_info_panel.png)';
            document.getElementById('PTUR2_00' + i + '_position').style.backgroundPosition = '-200px -500px';
        }
        }
        
        if(ourUnit.BTR == 5){
           for(i = 0 ; i < 5; i++){
               document.getElementById('BTR_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('BTR_00' + i + '_position').style.backgroundPosition = '0px -100px';
        }
        }else{
        for(i = 0 ; i <= ourUnit.BTR; i++){
            document.getElementById('BTR_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('BTR_00' + i + '_position').style.backgroundPosition = '0px -100px';
        }
        for(i = ourUnit.BTR ; i < ourUnit.maxBTR; i++){
            document.getElementById('BTR_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('BTR_00' + i + '_position').style.backgroundPosition = '-400px -100px';
        }
        for(i = ourUnit.maxBTR ; i<5; i++){
            document.getElementById('BTR_00' + i + '_position').style.backgroundImage ='url(../../IMG/our_info_panel.png)';
            document.getElementById('BTR_00' + i + '_position').style.backgroundPosition = '-200px -100px';
        }
        }
    }
    
} // отрисовывает войска в информ панели

function allCloseUnless(type){
    if(type != 'tank'){
        for(i=0; i<10; i++){
            document.getElementById('tank_00' + i + '_position').style.display = 'none';
        }
    }
    if(type == 'tank'){
        for(i=0; i<10; i++){
            document.getElementById('tank_00' + i + '_position').style.display = 'block';
        }
    }
    if(type != 'GRAD'){
        for(i=0; i<4; i++){
            document.getElementById('GRAD_00' + i + '_position').style.display = 'none';
        }
    }
    if(type == 'GRAD'){
        for(i=0; i<4; i++){
            document.getElementById('GRAD_00' + i + '_position').style.display = 'block';
        }
    }
    if(type != 'ARTA'){
        for(i=0; i<3; i++){
            document.getElementById('ARTA_00' + i + '_position').style.display = 'none';
        }
    }
    if(type == 'ARTA'){
        for(i=0; i<3; i++){
            document.getElementById('ARTA_00' + i + '_position').style.display = 'block';
        }
    }
    if(type != 'infantery'){
        for(i=0; i<10; i++){
            document.getElementById('infantery_00' + i + '_position').style.display = 'none';
        }
        for(i=0; i<5; i++){
            document.getElementById('mortan_00' + i + '_position').style.display = 'none';
            document.getElementById('PTUR_00' + i + '_position').style.display = 'none';
        }
    }
    if(type == 'infantery'){
        for(i=0; i<10; i++){
            document.getElementById('infantery_00' + i + '_position').style.display = 'block';
        }
        for(i=0; i<5; i++){
            document.getElementById('mortan_00' + i + '_position').style.display = 'block';
            document.getElementById('PTUR_00' + i + '_position').style.display = 'block';
        }
    }
    
     if(type != 'BTR'){
        for(i=0; i<10; i++){
            document.getElementById('infantery2_00' + i + '_position').style.display = 'none';
        }
        for(i=0; i<5; i++){
            document.getElementById('mortan2_00' + i + '_position').style.display = 'none';
            document.getElementById('PTUR2_00' + i + '_position').style.display = 'none';
            document.getElementById('BTR_00' + i + '_position').style.display = 'none';
        }
    }
    if(type == 'BTR'){
        for(i=0; i<10; i++){
            document.getElementById('infantery2_00' + i + '_position').style.display = 'block';
        }
        for(i=0; i<5; i++){
            document.getElementById('mortan2_00' + i + '_position').style.display = 'block';
            document.getElementById('PTUR2_00' + i + '_position').style.display = 'block';
            document.getElementById('BTR_00' + i + '_position').style.display = 'block';
        }
    }
} //закрывает все ранее открытые войска в инфо панели кроме указанных(type)

function ourTrench(){
    lastStep.saveLastStep();
    if(globalTarget) {
    document.getElementById(globalTarget).setAttribute('class', 'line_2_cell our our_infantery_trench');
    
        findOurTroops(globalTarget).walked = 'yes';
        findOurTroops(globalTarget).trench = 'yes';
        $("#our_trench").hide();
        $("#our_trench_off").show();
        ourMoveObject = [];
        drawUnitsOfTwoSize();
    }
} //функция нажатия кнопки "Окопаться"

function ourMine(){
    lastStep.saveLastStep();
    if(globalTarget) {
    if (findOurTroops(globalTarget).mine != 'yes'){
        document.getElementById(globalTarget).setAttribute('class', 'line_2_cell our our_infantery_trench_mine');
        
        findOurTroops(globalTarget).walked = 'yes';
        findOurTroops(globalTarget).mine = 'yes';
        $("#our_mine").hide();
        $("#our_mine_off").show();
        ourMoveObject = [];
    } 
    drawUnitsOfTwoSize();
    }
} //функция нажатия кнопки "Заминировать"

function startRealQuantity(){ // создать свойсва RealQuantity для всех войск
    for(i=0; i<data.our.length; i++){
        if(data.our[i].type == 'GRAD'){
                data.our[i].realGRAD = data.our[i].GRAD;
            }
        if(data.our[i].type == 'ARTA'){
                data.our[i].realARTA = data.our[i].ARTA;
            }
        if(data.our[i].type == 'tank'){
                data.our[i].realtank = data.our[i].tank;
            }
        if((data.our[i].type == 'infantery')||(data.our[i].type == 'BTR')){
                data.our[i].realinfantery = data.our[i].infantery;
            }
        if((data.our[i].type == 'infantery')||(data.our[i].type == 'BTR')){
                data.our[i].realmortar = data.our[i].mortar;
            }
        if((data.our[i].type == 'infantery')||(data.our[i].type == 'BTR')){
                data.our[i].realPTUR = data.our[i].PTUR;
            }
        if(data.our[i].type == 'BTR'){
                data.our[i].realBTR = data.our[i].BTR;
            }
    }
    
    for(i=0; i<data.enemy.length; i++){
        if(data.enemy[i].type == 'GRAD'){
                data.enemy[i].realGRAD = data.enemy[i].GRAD;
            }
        if(data.enemy[i].type == 'ARTA'){
                data.enemy[i].realARTA = data.enemy[i].ARTA;
            }
        if(data.enemy[i].type == 'tank'){
                data.enemy[i].realtank = data.enemy[i].tank;
            }
        if((data.enemy[i].type == 'infantery')||(data.enemy[i].type == 'BTR')){
                data.enemy[i].realinfantery = data.enemy[i].infantery;
            }
        if((data.enemy[i].type == 'infantery')||(data.enemy[i].type == 'BTR')){
                data.enemy[i].realmortar = data.enemy[i].mortar;
            }
        if((data.enemy[i].type == 'infantery')||(data.enemy[i].type == 'BTR')){
                data.enemy[i].realPTUR = data.enemy[i].PTUR;
            }
        if(data.enemy[i].type == 'BTR'){
                data.enemy[i].realBTR = data.enemy[i].BTR;
            }
    }
    
    
}// создать свойсва RealQuantity для всех войск

function refillOurTroops(){ //востановление наших войск после каждого хода
    var coefficient1 = 0.2; // на сколько востанавливаются войска в покое
    
    for(i=0; i<data.our.length; i++){
        if((data.our[i].walked == 'no')&&(data.our[i].round == 0)){
            if(data.our[i].type == 'GRAD'){
                data.our[i].realGRAD = data.our[i].realGRAD + data.our[i].maxGRAD * coefficient1;
                if(Math.floor(data.our[i].realGRAD) <= data.our[i].maxGRAD){
                if(data.our[i].GRAD < Math.floor(data.our[i].realGRAD)){
                    data.our[i].GRAD = Math.floor(data.our[i].realGRAD);
                
            }}
                if(Math.floor(data.our[i].realGRAD) > data.our[i].maxGRAD){
                    data.our[i].realGRAD = data.our[i].maxGRAD;
                    data.our[i].GRAD = data.our[i].maxGRAD;
                }
            }
            if(data.our[i].type == 'ARTA'){
                data.our[i].realARTA = data.our[i].realARTA + data.our[i].maxARTA * coefficient1;
                if(Math.floor(data.our[i].realARTA) <= data.our[i].maxARTA){
                if(data.our[i].ARTA < Math.floor(data.our[i].realARTA)){
                    data.our[i].ARTA = Math.floor(data.our[i].realARTA);
                
            }}
                if(Math.floor(data.our[i].realARTA) > data.our[i].maxARTA){
                    data.our[i].realARTA = data.our[i].maxARTA;
                    data.our[i].ARTA = data.our[i].maxARTA;
                }
            }
            if(data.our[i].type == 'tank'){
                data.our[i].realtank= data.our[i].realtank + data.our[i].maxTank * coefficient1;
                if(Math.floor(data.our[i].realtank) <= data.our[i].maxTank){
                if(data.our[i].tank< Math.floor(data.our[i].realtank)){
                    data.our[i].tank= Math.floor(data.our[i].realtank);
                
            }}
                if(Math.floor(data.our[i].realtank) > data.our[i].maxTank){
                    data.our[i].realtank = data.our[i].maxTank;
                    data.our[i].tank = data.our[i].maxTank;
                }
            }
            if(data.our[i].type == 'BTR'){
                data.our[i].realBTR= data.our[i].realBTR + data.our[i].maxBTR * coefficient1;
                if(Math.floor(data.our[i].realBTR) <= data.our[i].maxBTR){
                if(data.our[i].BTR< Math.floor(data.our[i].realBTR)){
                    data.our[i].BTR= Math.floor(data.our[i].realBTR);
                
            }}
                if(Math.floor(data.our[i].realBTR) > data.our[i].maxBTR){
                    data.our[i].realBTR = data.our[i].maxBTR;
                    data.our[i].BTR = data.our[i].maxBTR;
                }
            }
            
            if((data.our[i].type == 'BTR')||(data.our[i].type == 'infantery')){
                data.our[i].realinfantery= data.our[i].realinfantery + data.our[i].maxInfantery * coefficient1;
                if(Math.floor(data.our[i].realinfantery) <= data.our[i].maxInfantery){
                if(data.our[i].infantery< Math.floor(data.our[i].realinfantery)){
                    data.our[i].infantery= Math.floor(data.our[i].realinfantery);
                
            }}
                if(Math.floor(data.our[i].realinfantery) > data.our[i].maxInfantery){
                    data.our[i].realinfantery = data.our[i].maxInfantery;
                    data.our[i].infantery = data.our[i].maxInfantery;
                }
            }
            
            if((data.our[i].type == 'BTR')||(data.our[i].type == 'infantery')){
                data.our[i].realmortar= data.our[i].realmortar + data.our[i].maxMortar * coefficient1;
                if(Math.floor(data.our[i].realmortar) <= data.our[i].maxMortar){
                if(data.our[i].mortar< Math.floor(data.our[i].realmortar)){
                    data.our[i].mortar= Math.floor(data.our[i].realmortar);
                
            }}
                if(Math.floor(data.our[i].realmortar) > data.our[i].maxMortar){
                    data.our[i].realmortar = data.our[i].maxMortar;
                    data.our[i].mortar = data.our[i].maxMortar;
                }
            }
            
            if((data.our[i].type == 'BTR')||(data.our[i].type == 'infantery')){
                data.our[i].realPTUR= data.our[i].realPTUR + data.our[i].maxPTUR * coefficient1;
                if(Math.floor(data.our[i].realPTUR) <= data.our[i].maxPTUR){
                if(data.our[i].PTUR< Math.floor(data.our[i].realPTUR)){
                    data.our[i].PTUR= Math.floor(data.our[i].realPTUR);
                
            }}
                if(Math.floor(data.our[i].realPTUR) > data.our[i].maxPTUR){
                    data.our[i].realPTUR = data.our[i].maxPTUR;
                    data.our[i].PTUR = data.our[i].maxPTUR;
                }
            }
    }
    }
}//востановление наших войск после каждого хода

function refillEnemyTroops(){ //востановление войск противника после каждого хода
    var coefficient1 = 0.2; // на сколько востанавливаются войска в покое
    
    for(i=0; i<data.enemy.length; i++){
        if((data.enemy[i].walked == 'no')&&(data.enemy[i].round == 0)){
            if(data.enemy[i].type == 'GRAD'){
                data.enemy[i].realGRAD = data.enemy[i].realGRAD + data.enemy[i].maxGRAD * coefficient1;
                if(Math.floor(data.enemy[i].realGRAD) <= data.enemy[i].maxGRAD){
                if(data.enemy[i].GRAD < Math.floor(data.enemy[i].realGRAD)){
                    data.enemy[i].GRAD = Math.floor(data.enemy[i].realGRAD);
                
            }}
                if(Math.floor(data.enemy[i].realGRAD) > data.enemy[i].maxGRAD){
                    data.enemy[i].realGRAD = data.enemy[i].maxGRAD;
                    data.enemy[i].GRAD = data.enemy[i].maxGRAD;
                }
            }
            if(data.enemy[i].type == 'ARTA'){
                data.enemy[i].realARTA = data.enemy[i].realARTA + data.enemy[i].maxARTA * coefficient1;
                if(Math.floor(data.enemy[i].realARTA) <= data.enemy[i].maxARTA){
                if(data.enemy[i].ARTA < Math.floor(data.enemy[i].realARTA)){
                    data.enemy[i].ARTA = Math.floor(data.enemy[i].realARTA);
                
            }}
                if(Math.floor(data.enemy[i].realARTA) > data.enemy[i].maxARTA){
                    data.enemy[i].realARTA = data.enemy[i].maxARTA;
                    data.enemy[i].ARTA = data.enemy[i].maxARTA;
                }
            }
            if(data.enemy[i].type == 'tank'){
                data.enemy[i].realtank= data.enemy[i].realtank + data.enemy[i].maxTank * coefficient1;
                if(Math.floor(data.enemy[i].realtank) <= data.enemy[i].maxTank){
                if(data.enemy[i].tank< Math.floor(data.enemy[i].realtank)){
                    data.enemy[i].tank= Math.floor(data.enemy[i].realtank);
                
            }}
                if(Math.floor(data.enemy[i].realtank) > data.enemy[i].maxTank){
                    data.enemy[i].realtank = data.enemy[i].maxTank;
                    data.enemy[i].tank = data.enemy[i].maxTank;
                }
            }
            if(data.enemy[i].type == 'BTR'){
                data.enemy[i].realBTR= data.enemy[i].realBTR + data.enemy[i].maxBTR * coefficient1;
                if(Math.floor(data.enemy[i].realBTR) <= data.enemy[i].maxBTR){
                if(data.enemy[i].BTR< Math.floor(data.enemy[i].realBTR)){
                    data.enemy[i].BTR= Math.floor(data.enemy[i].realBTR);
                
            }}
                if(Math.floor(data.enemy[i].realBTR) > data.enemy[i].maxBTR){
                    data.enemy[i].realBTR = data.enemy[i].maxBTR;
                    data.enemy[i].BTR = data.enemy[i].maxBTR;
                }
            }
            
            if((data.enemy[i].type == 'BTR')||(data.enemy[i].type == 'infantery')){
                data.enemy[i].realinfantery= data.enemy[i].realinfantery + data.enemy[i].maxInfantery * coefficient1;
                if(Math.floor(data.enemy[i].realinfantery) <= data.enemy[i].maxInfantery){
                if(data.enemy[i].infantery< Math.floor(data.enemy[i].realinfantery)){
                    data.enemy[i].infantery= Math.floor(data.enemy[i].realinfantery);
                
            }}
                if(Math.floor(data.enemy[i].realinfantery) > data.enemy[i].maxInfantery){
                    data.enemy[i].realinfantery = data.enemy[i].maxInfantery;
                    data.enemy[i].infantery = data.enemy[i].maxInfantery;
                }
            }
            if((data.enemy[i].type == 'BTR')||(data.enemy[i].type == 'infantery')){
                data.enemy[i].realmortar= data.enemy[i].realmortar + data.enemy[i].maxMortar * coefficient1;
                if(Math.floor(data.enemy[i].realmortar) <= data.enemy[i].maxMortar){
                if(data.enemy[i].mortar< Math.floor(data.enemy[i].realmortar)){
                    data.enemy[i].mortar= Math.floor(data.enemy[i].realmortar);
                
            }}
                if(Math.floor(data.enemy[i].realmortar) > data.enemy[i].maxMortar){
                    data.enemy[i].realmortar = data.enemy[i].maxMortar;
                    data.enemy[i].mortar = data.enemy[i].maxMortar;
                }
            }
            if((data.enemy[i].type == 'BTR')||(data.enemy[i].type == 'infantery')){
                data.enemy[i].realPTUR= data.enemy[i].realPTUR + data.enemy[i].maxPTUR * coefficient1;
                if(Math.floor(data.enemy[i].realPTUR) <= data.enemy[i].maxPTUR){
                if(data.enemy[i].PTUR< Math.floor(data.enemy[i].realPTUR)){
                    data.enemy[i].PTUR= Math.floor(data.enemy[i].realPTUR);
                
            }}
                if(Math.floor(data.enemy[i].realPTUR) > data.enemy[i].maxPTUR){
                    data.enemy[i].realPTUR = data.enemy[i].maxPTUR;
                    data.enemy[i].PTUR = data.enemy[i].maxPTUR;
                }
            }
    }
    }
}//востановление войск противника после каждого хода

function ourTankAttackFunction(){ //функция атаки нашими танками
       
        document.getElementById('battlefield').style.display = 'block';
        document.getElementById('wrap_field').style.display = 'none';			
        document.getElementById('preload').style.display = 'none';
        document.getElementById('main').style.display = 'none';
        
        enemyWholeGRAD = 0;
        enemyWholeARTA = 0;
        needToKill ='not-need';
    
        show_00();
    
        closeAttackAndHelpFields();
        
} //функция атаки нашими танками

function ourTankHelpFunction(){ //функция поддержки нашими танками
       
        ourTankHelp = ourMoveObject.tank;
        ourTankHelpUnit = ourMoveObject;
        ourMoveObject.helpTarget = battleFieldTarget;
        document.getElementById(battleFieldTarget).innerHTML = 'help';
        ourMoveObject.walked = 'yes';
        ourTankHelpIndicator = 'yes';
        drawUnitsOfTwoSize();
    
        closeAttackAndHelpFields();
        
} //функция поддержки нашими танками

function closeAttackAndHelpFields(){ //закрытие полей Атака и Помощь
        var attackField = document.getElementsByClassName("our_tank_attack");    
        for (var i = 0; i < attackField.length; i++) {
            attackField[i].style.display = 'none';
            }
        var helpField = document.getElementsByClassName("our_tank_help");    
        for (var i = 0; i < helpField.length; i++) {
            helpField[i].style.display = 'none';
            }
} //закрытие полей Атака и Помощь

function deleteOurTroops(){ //проверка на наличие целых войск в части
    var newTroops = [];
    if(ourTankHelpField != battleFieldTarget){
        ourTankHelpUnit.tank = ourTankHelp;
    }
    ourTankHelp = 0;
    for(i=0; i<data.our.length; i++){
        if(data.our[i].type == 'tank'){
            if((data.our[i].tank > 0)&&(data.our[i].position)){
                newTroops.push(data.our[i]);
            }
        }
        if(data.our[i].type == 'GRAD'){
            if((data.our[i].GRAD > 0)&&(data.our[i].position)){
                newTroops.push(data.our[i]);
            }
        }
        if(data.our[i].type == 'ARTA'){
            if((data.our[i].ARTA > 0)&&(data.our[i].position)){
                newTroops.push(data.our[i]);
            }
        }
        if(data.our[i].type == 'infantery'){
            if(((data.our[i].infantery > 0)||(data.our[i].mortar > 0))&&(data.our[i].position)){
                newTroops.push(data.our[i]);
            }
        }
        if(data.our[i].type == 'BTR'){
            if(((data.our[i].infantery > 0)||(data.our[i].mortar > 0)||(data.our[i].BTR > 0))&&(data.our[i].position)){
                newTroops.push(data.our[i]);
            }
        }
    }
    data.our.length = 0;
    data.our = copyArr(newTroops);
    return data.our;
} //проверка на наличие целых войск в части

function ourUnitHealth(){ //расчет значения здоровья наших войск
    for(i=0; i<data.our.length; i++){
        
        if(data.our[i].infantery ==  undefined){ data.our[i].infantery = 0}
        if(data.our[i].tank ==  undefined){ data.our[i].tank = 0} 
        if(data.our[i].mortar ==  undefined){ data.our[i].mortar = 0} 
        if(data.our[i].BTR ==  undefined){ data.our[i].BTR = 0} 
        if(data.our[i].GRAD ==  undefined){ data.our[i].GRAD = 0} 
        if(data.our[i].ARTA ==  undefined){ data.our[i].ARTA = 0} 
        if(data.our[i].maxInfantery ==  undefined){ data.our[i].maxInfantery = 0}
        if(data.our[i].maxTank ==  undefined){ data.our[i].maxTank = 0} 
        if(data.our[i].maxMortar ==  undefined){ data.our[i].maxMortar = 0} 
        if(data.our[i].maxBTR ==  undefined){ data.our[i].maxBTR = 0} 
        if(data.our[i].maxGRAD ==  undefined){ data.our[i].maxGRAD = 0} 
        if(data.our[i].maxARTA ==  undefined){ data.our[i].maxARTA = 0}  
        
    data.our[i].health = Math.round(((data.our[i].infantery + data.our[i].tank + data.our[i].mortar + data.our[i].BTR + data.our[i].GRAD + data.our[i].ARTA)/(data.our[i].maxInfantery + data.our[i].maxTank + data.our[i].maxMortar + data.our[i].maxBTR + data.our[i].maxGRAD + data.our[i].maxARTA))*100) ;   
    }
} //расчет значения здоровья наших войск

function enemyUnitHealth(){ //расчет значения здоровья войск противника
    for(i=0; i<data.enemy.length; i++){
        
        if(data.enemy[i].infantery ==  undefined){ data.enemy[i].infantery = 0}
        if(data.enemy[i].tank ==  undefined){ data.enemy[i].tank = 0} 
        if(data.enemy[i].mortar ==  undefined){ data.enemy[i].mortar = 0} 
        if(data.enemy[i].BTR ==  undefined){ data.enemy[i].BTR = 0} 
        if(data.enemy[i].GRAD ==  undefined){ data.enemy[i].GRAD = 0} 
        if(data.enemy[i].ARTA ==  undefined){ data.enemy[i].ARTA = 0} 
        if(data.enemy[i].maxInfantery ==  undefined){ data.enemy[i].maxInfantery = 0}
        if(data.enemy[i].maxTank ==  undefined){ data.enemy[i].maxTank = 0} 
        if(data.enemy[i].maxMortar ==  undefined){ data.enemy[i].maxMortar = 0} 
        if(data.enemy[i].maxBTR ==  undefined){ data.enemy[i].maxBTR = 0} 
        if(data.enemy[i].maxGRAD ==  undefined){ data.enemy[i].maxGRAD = 0} 
        if(data.enemy[i].maxARTA ==  undefined){ data.enemy[i].maxARTA = 0}  
        
    data.enemy[i].health = Math.round(((data.enemy[i].infantery + data.enemy[i].tank + data.enemy[i].mortar + data.enemy[i].BTR + data.enemy[i].GRAD + data.enemy[i].ARTA)/(data.enemy[i].maxInfantery + data.enemy[i].maxTank + data.enemy[i].maxMortar + data.enemy[i].maxBTR + data.enemy[i].maxGRAD + data.enemy[i].maxARTA))*100) ;   
    }
} //расчет значения здоровья войск противника

function buttonShowFunction(){
    if(whoseTurn == 'enemy'){
        $('#button_our_step').hide();
        $('#button_last_step').hide();
    }
    if(whoseTurn == 'our'){
        $('#button_our_step').show();
        $('#button_last_step').show();
        ourDownNorma();
    }
} // показывать и скрывать кнопки "Наш ход" и "Отменить последнее действие"

function enemyDownNorma(){
            $("#enemy_step_1").show();
            $("#enemy_step_2").show();
            $("#enemy_step_3").show();
            $("#enemy_step_1_off").hide();
            $("#enemy_step_2_off").hide();
            $("#enemy_step_3_off").hide();
            $("#enemy_step_1_click").hide();
            $("#enemy_step_2_click").hide();
            $("#enemy_step_3_click").hide();
} // возвращает кнопки скоростей в исходное положение

function ourDownNorma(){
            //$("#our_back_step_off").css("display", "inline-block");    
            $("#our_trench").css("display", "inline-block");
            $("#our_mine").css("display", "inline-block");
            //$("#our_back_step").hide();
            $("#our_trench_off").hide();
            $("#our_mine_off").hide();
} // возвращает иконки  в исходное положение

function minDistanceBetweenOurTwoPoints(start, finish){
    var startPoints =[];
    startPoints = oneStepFunction(start);
    if(startPoints.indexOf(finish)>=0){
        return 1;
    }else{
        return 2;
    } 
} //расчет длины хода нашего юнита

function ourSavePosition(){
    var url = document.URL.split('/');
    var name = url[url.length-2];
    var saveMap = name + '_save_map';
    var saveOur = name + '_save_our';
    var saveEnemy = name + '_save_enemy';
    
    localStorage.setItem(saveMap, JSON.stringify(lastStep.map));
    localStorage.setItem(saveOur, JSON.stringify(lastStep.our));
    localStorage.setItem(saveEnemy, JSON.stringify(lastStep.enemy));
    $('#our_save').hide();
    $('#our_save_off').show();
}

function ourLoadPosition(){
    var url = document.URL.split('/');
    var name = url[url.length-2];
    var saveMap = name + '_save_map';
    var saveOur = name + '_save_our';
    var saveEnemy = name + '_save_enemy';
    
    if (localStorage.getItem(saveMap)){
        lastStep.map = [];
        lastStep.map = JSON.parse(localStorage.getItem(saveMap));
        lastStep.our = [];
        lastStep.our = JSON.parse(localStorage.getItem(saveOur));
        lastStep.enemy = [];
        lastStep.enemy = JSON.parse(localStorage.getItem(saveEnemy));   

        lastStep.backLastStep();

        $('#our_load').hide();
        $('#our_load_off').show();         
    }else{
        $('#our_load').show();
        $('#our_load_off').hide();
    }
    
    
}

function levelsAndHealth(unit){
    var unitPosition = $('#'+unit.position);
    unitPosition.empty();
    
    if(unit.level == 5){
        unitPosition.append('<div class = "level5"></div>');
    }
    if(unit.level == 4){
        unitPosition.append('<div class = "level4"></div>');
    }
    if(unit.level == 3){
        unitPosition.append('<div class = "level3"></div>');
    }
    if(unit.level == 2){
        unitPosition.append('<div class = "level2"></div>');
    }
    if(unit.level == 1){
        unitPosition.append('<div class = "level1"></div>');
    }
    
    if(unit.health > 90){
        unitPosition.append('<div class = "health10"></div>');
        return
    }
    if(unit.health > 80){
        unitPosition.append('<div class = "health9"></div>');
        return
    }
    if(unit.health > 70){
        unitPosition.append('<div class = "health8"></div>');
        return
    }
    if(unit.health > 60){
        unitPosition.append('<div class = "health7"></div>');
        return
    }
    if(unit.health > 50){
        unitPosition.append('<div class = "health6"></div>');
        return
    }
    if(unit.health > 40){
        unitPosition.append('<div class = "health5"></div>');
        return
    }
    if(unit.health > 30){
        unitPosition.append('<div class = "health4"></div>');
        return
    }
    if(unit.health > 20){
        unitPosition.append('<div class = "health3"></div>');
        return
    }
    if(unit.health > 10){
        unitPosition.append('<div class = "health2"></div>');
        return
    }
    if(unit.health <= 10){
        unitPosition.append('<div class = "health1"></div>');
        return
    }
    
//    function levelDraw(unit){
//        if(unit.level == 5){
//            unitPosition.append('<div class = "level5"></div>');
//            return;
//        }
//        if(unit.level == 4){
//            unitPosition.append('<div class = "level4"></div>');
//            return;
//        }
//        if(unit.level == 3){
//            unitPosition.append('<div class = "level3"></div>');
//            return;
//        }
//        if(unit.level == 2){
//            unitPosition.append('<div class = "level2"></div>');
//            return;
//        }
//        if(unit.level == 1){
//            unitPosition.append('<div class = "level1"></div>');
//            return;
//        }
//    }
    
} // Рисует здоровье и силу нашего подразделения

function findOurTroopsForId(ID){
    for(i=0; i<data.our.length; i++){
        if(data.our[i].ID == ID){
            return data.our[i];
        }
    }
} // найти наш юнит по ID

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
    
    data.map.forEach(function(map){
        if(map.position == target){
            map.side = 'our';
        }
    });
    data.ourFields.push(target);
    
    data.enemyFields = deleteElementFromArray(data.enemyField(), target);
}

function addEnemyNewField(target){
    
    data.map.forEach(function(map){
        if(map.position == target){
            map.side = 'enemy';
        }
    });
    data.enemyFields.push(target);
    
    data.ourFields = deleteElementFromArray(data.ourField(), target);
}

