var tempArrMimo =[];
var temArrHit = [];
var autoBattleCheck = 'no'

function autoBattleFunctionEND(){
    autoBattleCheck = 'yes';
    /*
    function compareRandom(a, b) {
              return Math.random() - 0.5;
            }
    */
    if(numberOfOurShort == 0){        
    temArrHit = copyArray(enemy_00.enemyTroops);
    temArrHit = random(temArrHit) ;   
    //temArrHit.sort(compareRandom);    
    tempArrMimo = cleaningTwoArray(enemy_00.enemyTroops, enemy_00.enemyField); 
    tempArrMimo = random(tempArrMimo);
    //tempArrMimo.sort(compareRandom);    
    }
    var target;
    var counter = 4 //какой по счету выстрел будет точным
    if(enemyDefenseObject.type == 'tank') counter = 5;
        for(var i=0; i<counter; i++){
                target = tempArrMimo.pop();
                crazyAutoFireFunction(target)
        }
                target = temArrHit.pop();
                crazyAutoFireFunction(target)
}

function autoBattleFunction(){
    if(ourRetreatFromDefense()&&enemyRetreatFromDefense()&&(resultOfBattle == 'equality')){
        setTimeout(function(){autoBattleFunctionEND()}, 250)
        setTimeout(function(){autoBattleFunction()}, 350)
    }else{
        return;
    }
    
}

function crazyAutoFireFunction(target){ //функция стрельбы по противнику
    
    if((resultOfBattle == 'equality')&&(enemyRetreatFromDefense())&&(ourRetreatFromDefense())){
        
    
    
    if((OurShorts == 0)&&(EnemyShorts == 0)){ //УСЛОВИЕ 1
//console.log('Условие 1');  
        calculationOurShorts();
        calculationEnemyShorts();
        ourFirstGradFire = 1;
        ourFirstArtaFire = 1;
        numberOfOurShort = 0;
        numberOfEnemyShort = 0;
    } // УСЛОВИЕ 1 запускаем пересчет количества выстрелов у обоих противников
    
    
    shorts = shorts + 1;
        
    
    if(target){
        
    
    if(OurShorts > 0){ //УСЛОВИЕ 2
        
//console.log('Условие 2') 

        numberOfOurShort = +numberOfOurShort + 1;
        
    if((ourGRADChecked())&&(numberOfOurShort == 1)){  
//console.log(target)
        targetGrad = ourGradFire(target);
        
//console.log('target for GRAD: ' + targetGrad); 
        
        for(var i=0; i < targetGrad.length; i++){
          
        targetG = targetGrad[i];

        ourFireForEnemy(targetG);
            
           
    }
        ourFirstGradFire = 2;
    } 
 
    //}
    if(((ourARTAChecked()||ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend())&&(numberOfOurShort == 1))||((ourARTAChecked()||ourARTACheckedInDefend())&&(ourGRADChecked()||ourGRADCheckedInDefend())&&(numberOfOurShort == 2))){
        targetArta = (ourArtaFire(target));
        
        for(var i=0; i < targetArta.length; i++){
        targetA = targetArta[i];
        ourFireForEnemy(targetA);        
    }     
        //ourFirstArtaFire = 2;
    }

    if(((ourARTAChecked()||ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend())&&(numberOfOurShort > 1))||((ourARTAChecked()||ourARTACheckedInDefend())&&(ourGRADChecked()||ourGRADCheckedInDefend())&&(numberOfOurShort > 2))||((!ourARTAChecked()&&!ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend())&&(numberOfOurShort > 0))||((!ourARTAChecked()&&!ourARTACheckedInDefend())&&(ourGRADChecked()||ourGRADCheckedInDefend())&&(numberOfOurShort > 1)))
    
    {
//console.log(resultOfBattle);
        ourFireForEnemy(target);
    }
   
        //ourFirstGradFire = 0;
        //ourFirstArtaFire = 0;
        
    OurShorts = OurShorts -1;
    if(OurShorts < 0){
        OurShorts = 0;
    }
    //document.getElementById("scrollOurShorts").innerHTML = OurShorts;
    }// УСЛОВИЕ 2 выполняем наш выстрел
    
   
    
    if((EnemyShorts > 0)&&(OurShorts > 0)){ //УСЛОВИЕ 3
  
    setTimeout(function (){enimyFinedTargetFunction()}, 50/speed);
//console.log('Условие 3')
    EnemyShorts = EnemyShorts -1;
    //document.getElementById("scrollEnemyShorts").innerHTML = EnemyShorts;
 

 
    if(EnemyShorts < 0){
        EnemyShorts = 0;
    }
    }
        
    if ((OurShorts == 0)&&(EnemyShorts > 0)){  //УСЛОВИЕ 4
//console.log('Условие 4') 
        var counter = EnemyShorts;
        var timerShorts = 0;
    while((counter > 0)&&(resultOfBattle == 'equality')){
//console.log('timerShorts ' + timerShorts); 
        setTimeout(function (){enimyFinedTargetFunction()}, timerShorts/speed);
        timerShorts = timerShorts + 100;
        counter = counter - 1 ;
        EnemyShorts = EnemyShorts -1;
    }
            if(EnemyShorts < 0){
                EnemyShorts = 0;
        }
        //document.getElementById("scrollEnemyShorts").innerHTML = EnemyShorts;
    }// выполняем выстрел противника
    
    
   
    
    if((EnemyShorts == 0)&&(OurShorts == 0)&&(ourGRADChecked()||ourGRADCheckedInDefend())){
        
        for(key in enemy_00.enemyField){
            elem = document.getElementById(enemy_00.enemyField[key]);
            if (elem.getAttribute("class") == "enemy_00"){
            elem.setAttribute("class", "grad_arta");
            }
        }
//console.log('GRAD')
        leftGradDraw();
        //alert('Дайте цель для ГРАДА!!!');
       } else {
       
    if(((EnemyShorts == 0)&&(OurShorts == 0)&&(ourARTAChecked()||ourARTACheckedInDefend())&&(!ourGRADChecked()&&!ourGRADCheckedInDefend()))||((ourGRADChecked()||ourGRADCheckedInDefend())&&(ourARTAChecked()||ourARTACheckedInDefend())&&(numberOfOurShort == 1))){
       
        for(key in enemy_00.enemyField){
            elem = document.getElementById(enemy_00.enemyField[key]);
            if (elem.getAttribute("class") == "enemy_00"){
            elem.setAttribute("class", "grad_arta");
            
            }
        }
//console.log('ARTA 152')
        $("#left_ARTA_GRAD").removeClass();
        leftArtaDraw();        
        //alert('Дайте цель для 152 арты!!!');
       
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
    //enemyRetreatFromDefense(); //проверка на склонность к отступлению
    //ourRetreatFromDefense(); //проверка на склонность к отступлению
    }
}
} //функция стрельбы по противнику (нажатие мышью на поле противника)
