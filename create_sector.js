var create_sector = function(sector){
    
    var height = sector.height;
    var width = sector.width; 
    var resultHTML = "";
  
//console.log("sector ==>>" + sector)    

var Text_1 = '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8">\n<title>Карта боевых действий сектора "' + sector.name + '"</title>\n   <link href="../../CSS/main.css" rel="stylesheet">\n<link href="../../CSS/reform.css" rel="stylesheet">\n<script type="text/javascript" src="../../JS/jquery-1.12.4.min.js"></script></head>';
    
var Text_2 = '<body>';
    
var Text_3 = '<div id = "main"><div id="big_map"><img width="100%" ></div><div class = "circuit">\n';
    
   
var firstLine = height + 20;
var firstColumn = width + 10;

var Text_4=''
    for (var i =firstLine; i>=21; i=i-1){
        Text_4 = Text_4 + madeLine(i, firstColumn);
    }
    Text_4 = Text_4 + '</div>';
    
var Text_5 = '<div id="wrap"></div>\n<div id="reform_contur"><div id ="reform"></div></div>\n<div id ="buttonNewCourse">\n<div id="our_down">\n<div id="our_save" title="Сохранить" onclick = saveSector()></div><div id="our_save_off"></div>\n<div id="our_load" title="Загрузить" onclick = ourLoadPosition()></div><div id="our_load_off"></div>\n<div id ="our_step"></div><div id = "our_back_step" title="Отменить последний ход" onclick = lastStep.backLastStep()></div>\n<div id = "our_back_step_off"></div><div id = "our_trench" title="Окопаться" onclick = ourTrench()></div><div id = "our_trench_off"></div>\n<div id = "our_reform" title="Переформатировать" onclick = ourBattsReform()></div>\n<div id = "our_reform_off"></div>\n<div id = "enemy_course" onclick = openEnemyCourse()></div><div class = "open_help_main" onclick = openHelpMain()></div></div>\n<div id="enemy_down"><div id ="enemy_step"></div><div id ="enemy_step_1" onclick = enemyCourse1()></div><div id ="enemy_step_1_off" ></div><div id ="enemy_step_1_click" ></div><div id ="enemy_step_2" onclick = enemyCourse2()></div><div id ="enemy_step_2_off" ></div><div id ="enemy_step_2_click" ></div><div id ="enemy_step_3" onclick = enemyCourse3()></div><div id ="enemy_step_3_off" ></div><div id ="enemy_step_3_click" ></div><div class = "open_help_main" onclick = openHelpMain()></div></div></div></div>\n<script type="text/javascript" src="../../JS/client/sector.js"></script>\n<script type="text/javascript" src="../../JS/client/our_move_in_sector.js"></script>\n<script type="text/javascript" src="../../JS/client/our_reform_in_sector.js"></script>'

   
var endText = '\n</body>\n</html>';    
    
   resultHTML = Text_1 + Text_2 + Text_3 + Text_4 + Text_5 + endText;
    return resultHTML;
    
function madeLine(line, column){ // line - (линия 11хх)  column - (количество столбцов на карте xx12)
    var result = '';
    if (line%2 != 0){ // нечетная строка
        result = '<div class="line_2"> \n'
        for(var i=11; i<=column; i++){
            result = result + '<div id="' + line + i + '" class="cell line_2_cell">' + line + i + '</div>\n'
        }
        result = result +'</div>';
        return result;
    }
    if (line%2 == 0){ // четная строка
        result = '<div class="line_1"> \n'
        for(var i=11; i<=column; i++){
            result = result + '<div id="' + line + i + '" class="cell line_1_cell">' + line + i + '</div>\n'
        }
        result = result +'</div>';
        return result;
    }
}    
    

}

module.exports = create_sector;

