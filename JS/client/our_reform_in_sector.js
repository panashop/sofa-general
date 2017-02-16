var ourReformObject = {
    rota:[]
};
var numberOfReformBatt = 1000;

function ourBattsReform(){
    if(ourMoveObject.rota.length == 1){
        return;
    }

    $('#reform').empty();
    $('#wrap').show();
    $('#reform_contur').show();
    $('#reform').show();
    if(ourMoveObject.rota.length<=6){
        $('#reform').append('<div id="reform_text">Перегруппировать войска.</div><div class="reform_unit" id="reform_1_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_2_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_3_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_4_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_5_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_6_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div id="reform_button" onclick=reformButtonClick()></div>\n<div class = "closePanel" id = "closePanel" onclick = "closeReformPanel()" ></div>');
        $('#reform').css("height", "270px");
        $('#reform').css("top", "200px");
        $('#reform_button').css("top", "220px");
    }
    if((ourMoveObject.rota.length>6)&&(ourMoveObject.rota.length<=9)){
        $('#reform').append('<div id="reform_text">Перегруппировать войска.</div><div class="reform_unit" id="reform_1_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_2_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_3_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_4_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_5_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_6_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_7_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_8_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_9_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div id="reform_button" onclick=reformButtonClick()></div>\n<div class = "closePanel" id = "closePanel" onclick = "closeReformPanel()" ></div>');
        $('#reform').css("height", "360px");
        $('#reform').css("top", "155px");
        $('#reform_button').css("top", "310px");
    }
    if((ourMoveObject.rota.length>9)&&(ourMoveObject.rota.length<=12)){
        $('#reform').append('<div id="reform_text">Перегруппировать войска.</div><div class="reform_unit" id="reform_1_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_2_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_3_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_4_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_5_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_6_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_7_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_8_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_9_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_10_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_11_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_12_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div id="reform_button" onclick=reformButtonClick()></div>\n<div class = "closePanel" id = "closePanel" onclick = "closeReformPanel()" ></div>');
        $('#reform').css("height", "450px");
        $('#reform').css("top", "100px");
        $('#reform_button').css("top", "400px");
    }
    if((ourMoveObject.rota.length>12)&&(ourMoveObject.rota.length<=15)){
        $('#reform').append('<div id="reform_text">Перегруппировать войска.</div><div class="reform_unit" id="reform_1_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_2_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_3_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_4_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_5_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_6_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_7_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_8_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_9_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_10_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_11_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_12_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_13_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_14_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div class = "reform_unit" id = "reform_15_unit"><div class="reform_left"></div><div class="reform_right"></div></div>\n<div id="reform_button" onclick=reformButtonClick()></div>\n<div class = "closePanel" id = "closePanel" onclick = "closeReformPanel()" ></div>');
        $('#reform').css("height", "540px");
        $('#reform').css("top", "50px");
        $('#reform_button').css("top", "490px");
    }
        cleanEmptyRotas();
        var rotas = ourMoveObject.rota;

        for(var i=0; i<rotas.length; i++){
            if(rotas[i].type == "infantery"){
                $('#reform_' + (i+1) + '_unit .reform_left').addClass('reform_infantery_on');
                $('#reform_' + (i+1) + '_unit .reform_right').addClass('reform_infantery_off');
            }if(rotas[i].type == "tank"){
                $('#reform_' + (i+1) + '_unit .reform_left').addClass('reform_tank_on');
                $('#reform_' + (i+1) + '_unit .reform_right').addClass('reform_tank_off');
            }if(rotas[i].type == "BTR"){
                $('#reform_' + (i+1) + '_unit .reform_left').addClass('reform_btr_on');
                $('#reform_' + (i+1) + '_unit .reform_right').addClass('reform_btr_off');
            }if(rotas[i].type == "ARTA"){
                $('#reform_' + (i+1) + '_unit .reform_left').addClass('reform_arta_on');
                $('#reform_' + (i+1) + '_unit .reform_right').addClass('reform_arta_off');
            }if(rotas[i].type == "GRAD"){
                $('#reform_' + (i+1) + '_unit .reform_left').addClass('reform_grad_on');
                $('#reform_' + (i+1) + '_unit .reform_right').addClass('reform_grad_off');
            }
        }
    
        var blocks = $('.reform_unit');
       
        for(var i=0; i<blocks.length; i++){
            blocks[i].onclick = function (event){
                var blockID = this.id; //this обязательно для правильного всплывания
                var reform_left = $('#' + blockID + '>.reform_left');
                var reform_right = $('#' + blockID + '>.reform_right');
                changeReformClass(reform_left);
                changeReformClass(reform_right);
            }  
        }
}

function closeReformPanel(){//Закрываем панел переформатирования батальонов
            $('#reform').hide();
            $('#wrap').hide();
            $('#reform_contur').hide();
            $('#reform').empty();
}//Закрываем панел переформатирования батальонов

function changeReformClass(elem){
    
    if((elem.hasClass('reform_infantery_on'))||(elem.hasClass('reform_infantery_off'))){
        elem.toggleClass('reform_infantery_on reform_infantery_off');
    }if((elem.hasClass('reform_tank_on'))||(elem.hasClass('reform_tank_off'))){
        elem.toggleClass('reform_tank_on reform_tank_off');
    }if((elem.hasClass('reform_btr_on'))||(elem.hasClass('reform_btr_off'))){
        elem.toggleClass('reform_btr_on reform_btr_off');
    }if((elem.hasClass('reform_arta_on'))||(elem.hasClass('reform_arta_off'))){
        elem.toggleClass('reform_arta_on reform_arta_off');
    }if((elem.hasClass('reform_grad_on'))||(elem.hasClass('reform_grad_off'))){
        elem.toggleClass('reform_grad_on reform_grad_off');
    }
}

function reformButtonClick(){
    
    saveBeforeReform();
    
    var blocks = $('.reform_unit');
        for(var i=0; i<blocks.length; i++){
            if($(blocks[i]).find('.reform_right').hasClass('reform_infantery_on')){
                createOurReformObject(i);
            }
            if($(blocks[i]).find('.reform_right').hasClass('reform_btr_on')){
                createOurReformObject(i);
            }
            if($(blocks[i]).find('.reform_right').hasClass('reform_tank_on')){
                createOurReformObject(i);
            }
            if($(blocks[i]).find('.reform_right').hasClass('reform_arta_on')){
                createOurReformObject(i);
            }
            if($(blocks[i]).find('.reform_right').hasClass('reform_grad_on')){
                createOurReformObject(i);
            }
        }
    cleanEmptyRotas();
    
    if(ourReformObject.rota.length !=0){
        createNewBatt();
    }
    
    function saveBeforeReform(){
        var number = findBattNumberForName(ourMoveObject.name);
        lastStep.our[number].rota = [];
        lastStep.our[number].rota = copyArr(sector.our[number].rota);
    }
    
    function createOurReformObject(i){
        var number = findBattNumberForName(ourMoveObject.name);
                ourReformObject.rota.push(sector.our[number].rota[i]);
                sector.our[number].rota[i]= {};
    }
    $('#reform').empty();
    deleteEmptyBatts();
}


function cleanEmptyRotas(){
    for(var i=0; i<sector.our.length; i++){
        for(var j=0; j<sector.our[i].rota.length; j++){
            if(!sector.our[i].rota[j].name){
                sector.our[i].rota.splice(j, 1)
            }
        }
    }
} //удаляем пустые роты

function findBattNumberForName(name){
    for(var i=0; i<sector.our.length; i++){
        if(sector.our[i].name == name){
            return i;
        }
    }
}

function createNewBatt(){
    numberOfReformBatt +=1;
    var last = sector.our.length;
    sector.our[last] = {};
    sector.our[last].position = ourMoveObject.position;
    sector.our[last].sector = ourMoveObject.sector;
    sector.our[last].side = ourMoveObject.side;
    sector.our[last].walked = 'no';
    sector.our[last].trench = 'no';
    
    var battName= 'batt-ret-' + numberOfReformBatt + '-' + ourMoveObject.sector;
    
    sector.our.forEach(function(batt){
        if (batt.name == battName){
            numberOfReformBatt +=1;
            battName= 'batt-ret-' + numberOfReformBatt + '-' + ourMoveObject.sector;
        }
    })
    
    sector.our[last].name = battName;
    sector.our[last].rota = [];
    for(var i=0; i<ourReformObject.rota.length; i++){
        sector.our[last].rota[i] = ourReformObject.rota[i];
    };
    ourBatts.push(sector.our[last]);
    ourMoveObject = sector.our[last];
        
    
    drawUnitsOfTwoSize();
    
    calculationMoveFieldsFunction(ourMoveObject.position);
    
    ourReformObject.rota =[];
    closeReformPanel();
} //создаем новый батальон

function drawCombineBatts(){ // рисуем батальоны готовые к объединению
    if(ourTransformPositions.length >0){
        ourTransformPositions.forEach(function(field){
            $('#' + field).append('<div class="combine"></div>')
        })
    }    
}// рисуем батальоны готовые к объединению

function combineTwoBatts(firstBatt, secondBatt){ //first-которым ходим// second - к котрому присоединяемся
//console.log(firstBatt)  
    saveBeforeReform2();
    firstBatt.rota.forEach(function(rota){
        secondBatt.rota.push(rota);
    });
    firstBatt.rota.length = 0;
    
    deleteEmptyBatts();
    
    function saveBeforeReform2(){
        var number1 = findBattNumberForName(firstBatt.name);
        lastStep.our[number1].rota = [];
        lastStep.our[number1].rota = copyArr(sector.our[number1].rota);
        
        var number2 = findBattNumberForName(secondBatt.name);
        lastStep.our[number2].rota = [];
        lastStep.our[number2].rota = copyArr(sector.our[number2].rota);
    }
} //объединяем два батальона в один

function deleteEmptyBatts(){
    var newData = [];
    sector.our.forEach(function(unit){
        if(unit.rota.length != 0){
            newData.push(unit)
        }
    });
//    sector.our.forEach(function(unit){
//        if(unit.rota[0].name){
//            newData.push(unit)
//        }
//    });
    sector.our.length = 0;
    newData.forEach(function(newUnit){
        sector.our.push(newUnit)
    });
    drawUnitsOfTwoSize();
} //удаляем батальоны без рот

