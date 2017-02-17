var create_zone = function(zone){
    
    var height = 12;
    var width = 13; 
    var resultHTML = "";
//console.log('create zone start')
var Text_1 = '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8">\n<title>Карта боевых действий зоны "' + zone.name + '"</title>\n   <link href="../../CSS/zona_main.css" rel="stylesheet">\n<link href="../../CSS/field.css" rel="stylesheet">\n<script type="text/javascript" src="../../JS/jquery-1.12.4.min.js"></script></head>';
    
var Text_2 = '<body><div id = "wrap"></div><div id = "info_panel"><div id = "info_panel_in"><div id="closePanel"></div><div id = "name_of_unit"></div><div id = "health_of_unit">Здоровье</div><div id = "value_health_of_unit">100%</div><div id = "tank_000_position"></div><div id = "tank_001_position"></div><div id = "tank_002_position"></div><div id = "tank_003_position"></div><div id = "tank_004_position"></div><div id = "tank_005_position"></div><div id = "tank_006_position"></div><div id = "tank_007_position"></div><div id = "tank_008_position"></div><div id = "tank_009_position"></div><div id = "GRAD_000_position"></div><div id = "GRAD_001_position"></div><div id = "GRAD_002_position"></div><div id = "GRAD_003_position"></div><div id = "ARTA_000_position"></div><div id = "ARTA_001_position"></div><div id = "ARTA_002_position"></div><div id = "infantery_000_position"></div><div id = "infantery_001_position"></div><div id = "infantery_002_position"></div><div id = "infantery_003_position"></div><div id = "infantery_004_position"></div><div id = "infantery_005_position"></div><div id = "infantery_006_position"></div><div id = "infantery_007_position"></div><div id = "infantery_008_position"></div><div id = "infantery_009_position"></div><div id = "mortan_000_position"></div><div id = "mortan_001_position"></div><div id = "mortan_002_position"></div><div id = "mortan_003_position"></div><div id = "mortan_004_position"></div><div id = "PTUR_000_position"></div><div id = "PTUR_001_position"></div><div id = "PTUR_002_position"></div><div id = "PTUR_003_position"></div><div id = "PTUR_004_position"></div><div id = "mortan2_000_position"></div><div id = "mortan2_001_position"></div><div id = "mortan2_002_position"></div><div id = "mortan2_003_position"></div><div id = "mortan2_004_position"></div><div id = "PTUR2_000_position"></div><div id = "PTUR2_001_position"></div><div id = "PTUR2_002_position"></div><div id = "PTUR2_003_position"></div><div id = "PTUR2_004_position"></div><div id = "infantery2_000_position"></div><div id = "infantery2_001_position"></div><div id = "infantery2_002_position"></div><div id = "infantery2_003_position"></div><div id = "infantery2_004_position"></div><div id = "infantery2_005_position"></div><div id = "infantery2_006_position"></div><div id = "infantery2_007_position"></div><div id = "infantery2_008_position"></div><div id = "infantery2_009_position"></div><div id = "BTR_000_position"></div><div id = "BTR_001_position"></div><div id = "BTR_002_position"></div><div id = "BTR_003_position"></div><div id = "BTR_004_position"></div></div></div>';
    
var Text_3 = '<div id = "main"><div id="big_map_zone"><img width="100%" ></div><div class = "circuit">';

 
var firstLine = height + 50;
var lastColumn = width + 10;

var Text_4=''
    for (var i =firstLine; i>=51; i=i-1){
        Text_4 = Text_4 + madeLine(i, lastColumn);
    }
    Text_4 = Text_4 + '</div>';
    
var Text_5 ='<div id ="buttonNewCourse"><div id="our_down"><div id="our_save" onclick = ourSave()></div><div id = "our_back_step" onclick = lastStep.backLastStep()></div><div id = "our_trench" ></div><div id = "our_mine" ></div></div></div></div>\n\n'


var endText = '<script >$("#big_map_zone img").attr("src", "https://static-maps.yandex.ru/1.x/?ll=" + (' + zone.geoX + ') + "," + ('+ zone.geoY + ') +"&z=12&l=map&\&size=500,410");</script><script type="text/javascript" src="../../JS/client/developer_zone.js"></script>\n</html>';
    
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
            result = result + '<div id="' + line + i + '" class="cell line_2_cell">' + line + i + '</div>\n'
        }
        result = result +'</div>';
        return result;
    }
} 
}

module.exports = create_zone;

