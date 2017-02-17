
console.log("Запустили файл db.js")

var mongoose = require('mongoose');

var DB = mongoose.connection;

var sectorSchema = new mongoose.Schema({
    name:  {type: String, unique: true},
    sector: String,
    position: String,
    side: String,
    geoX : Number,
    geoY : Number,
    map_file :String,
    height: Number,
    width: Number,
    ourFields: Array,
    enemyFields: Array,
    waterFields: Array,
    russiaFields: Array,
    road: Array
    });

var zoneSchema = new mongoose.Schema({
    name:  {type: String, unique: true},
    sector: String,
    position: String,
    geoX : Number,
    geoY : Number, 
    water: Array,
    city: Array,
    base: String,
    russia: Array
    });

var ourBattSchema = new mongoose.Schema({
    name:  {type: String, unique: true},
    type: String,
    side: String,
    sector: String,
    position: String,
    trench: String,
    walked: String,
    rota: Array
});

var enemyBattSchema = new mongoose.Schema({
    name:  {type: String, unique: true},
    type: String,
    side: String,
    sector: String,
    position: String,
    trench: String,
    walked: String,
    rota: Array
});

var ourRotaSchema = new mongoose.Schema({
    name:  {type: String, unique: true},
    ARTA:Number,
    BTR:Number,
    GRAD:Number,
//    ID: String,
    PTUR:Number,
    health:Number,
    infantery:Number,
    level:Number,
    maxARTA:Number,
    maxBTR:Number,
    maxGRAD:Number,
    maxInfantery:Number,
    maxMortar:Number,
    maxPTUR:Number,
    maxTank:Number,
    mortar:Number,
    position: String,
    realPTUR:Number,
    realinfantery:Number,
    realmortar:Number,
    retreatPosition: String,
    round:Number,
    steps:Number,
    side:String,
    tank:Number,
    trench: String,
    type: String,
    walked: String
});

var enemyRotaSchema = new mongoose.Schema({
    name:  {type: String, unique: true},
    ARTA:Number,
    BTR:Number,
    GRAD:Number,
//    ID: String,
    PTUR:Number,
    health:Number,
    infantery:Number,
    level:Number,
    maxARTA:Number,
    maxBTR:Number,
    maxGRAD:Number,
    maxInfantery:Number,
    maxMortar:Number,
    maxPTUR:Number,
    maxTank:Number,
    mortar:Number,
    position: String,
    realPTUR:Number,
    realinfantery:Number,
    realmortar:Number,
    retreatPosition: String,
    round:Number,
    steps:Number,
    side:String,
    tank:Number,
    trench: String,
    type: String,
    walked: String
});

var battleSchema = new mongoose.Schema({
    position: String,
    sector: String,
//    whoAttack: String,
    ourRotas: Array,
    enemyRotas: Array
})


DB.on('error', console.error);
DB.once('open', function() {
    
console.log("Вошли в раздел OPEN")

    
 
    var Battle = mongoose.model('Battle', battleSchema);
    
//======================================================================

    
//====================================================================== 

    var Sector = mongoose.model('Sector', sectorSchema);
    
    function fromJsonToField(sectorN){
        var sectorDescription = new Sector({
            name:  sectorN.name,
            sector: sectorN.sector,
            position: sectorN.position,
            side: sectorN.side,
            geoX : sectorN.geoX,
            geoY : sectorN.geoY,
            map_file: sectorN.map_file,
            height: sectorN.height,
            width: sectorN.width,
            ourFields: sectorN.ourFields,
            enemyFields: sectorN.enemyFields,
            waterFields: sectorN.waterFields,
            russiaFields: sectorN.russiaFields,
            road: sectorN.road
            });
        console.log("Создаем и загружаем библиотеку Fields"); 
            sectorDescription.save();
    };
    
    var Zone = mongoose.model('Zone', zoneSchema);
    
    function fromJsonToZone(zoneN){
        zoneN.forEach(function(elem){
            var zoneDescription = new Zone({
            name:  elem.name,
            sector: elem.sector,
            position: elem.position,
            water: elem.water,            
            geoX : 0,
            geoY : 0, 
            city : elem.city,
            base : elem.base,
            russia: elem.russia
            });
            zoneDescription.save();
        });        
        console.log("Создаем и загружаем библиотеку Zones");             
    };
    
    var OurBatt = mongoose.model('ourBatt', ourBattSchema);
    
    function fromJsonToOurBatt(ourBattN){
        ourBattN.forEach(function(elem){
            var ourBattDescription = new OurBatt({
            name: elem.name,
            side: elem.side,
            type: elem.type,
            sector: elem.sector,
            position: elem.position,
            trench: elem.trench,
            walked: elem.walked,
            rota: elem.rota    
            });
            ourBattDescription.save();
        });
        console.log("Создаем и загружаем библиотеку OurBatts");
    };
    
    var EnemyBatt = mongoose.model('enemyBatt', enemyBattSchema);
    
    function fromJsonToEnemyBatt(enemyBattN){
        enemyBattN.forEach(function(elem){
            var enemyBattDescription = new EnemyBatt({
            name: elem.name,
            side: elem.side,
            type: elem.type,
            sector: elem.sector,
            position: elem.position,
            trench: elem.trench,
            walked: elem.walked,
            rota: elem.rota    
            });
            enemyBattDescription.save();
        });
        console.log("Создаем и загружаем библиотеку EnemyBatts");
    };
    
    var OurRota = mongoose.model('ourRota', ourRotaSchema);
    
    function fromJsonToOurRota(ourRotas){
        var arrOurRotas = JSON.parse(ourRotas)

        arrOurRotas.forEach(function(elem){
            var ourRotaDescription = new OurRota({
            name: elem.name,
            side: 'our',
            type: elem.type,            
            ARTA:(elem.ARTA) ? elem.ARTA : 0,
            BTR:(elem.BTR) ? elem.BTR : 0,
            GRAD:(elem.GRAD) ? elem.GRAD : 0,
            PTUR:(elem.PTUR) ? elem.PTUR : 0,
            health:(elem.health) ? elem.health : 100,
            infantery:(elem.infantery) ? elem.infantery : 0,
            level:(elem.level) ? elem.level : 5,
            maxARTA:(elem.maxARTA) ? elem.maxARTA : 0,
            maxBTR:(elem.maxBTR) ? elem.maxBTR : 0,
            maxGRAD:(elem.maxGRAD) ? elem.maxGRAD : 0,
            maxInfantery:(elem.maxInfantery) ? elem.maxInfantery : 0,
            maxMortar:(elem.maxMortar) ? elem.maxMortar : 0,
            maxPTUR:(elem.maxPTUR) ? elem.maxPTUR : 0,
            maxTank:(elem.maxTank) ? elem.maxTank : 0,
            mortar:(elem.mortar) ? elem.mortar : 0,
            position: (elem.position) ? elem.position : 'base',
            realPTUR:(elem.realPTUR) ? elem.realPTUR : 0,
            realinfantery:(elem.realinfantery) ? elem.realinfantery : 0,
            realmortar:(elem.realmortar) ? elem.realmortar : 0,
            retreatPosition: (elem.retreatPosition) ? elem.retreatPosition : 0,
            round:(elem.round) ? elem.ARTA : 0,
            steps:(elem.steps) ? elem.steps : 1,
            tank:(elem.tank) ? elem.tank : 0,
            trench: (elem.trench) ? elem.trench : 'no',
            type: (elem.type) ? elem.type : "infantery",
            walked: (elem.walked) ? elem.walked : 'no'
            
//            sector: elem.sector,
//            position: elem.position,
//            ID: String,    
                
            });
            ourRotaDescription.save();
        });
        console.log("Создаем и загружаем библиотеку OurRotas");
    };
    
    var EnemyRota = mongoose.model('enemyRota', enemyRotaSchema);
    
    function fromJsonToEnemyRota(enemyRotas){
        var arrEnemyRotas = JSON.parse(enemyRotas)
        arrEnemyRotas.forEach(function(elem){
            var enemyRotaDescription = new EnemyRota({
            name: elem.name,
            side: 'enemy',
            type: elem.type,            
            ARTA:(elem.ARTA) ? elem.ARTA : 0,
            BTR:(elem.BTR) ? elem.BTR : 0,
            GRAD:(elem.GRAD) ? elem.GRAD : 0,
            PTUR:(elem.PTUR) ? elem.PTUR : 0,
            health:(elem.health) ? elem.health : 100,
            infantery:(elem.infantery) ? elem.infantery : 0,
            level:(elem.level) ? elem.level : 5,
            maxARTA:(elem.maxARTA) ? elem.maxARTA : 0,
            maxBTR:(elem.maxBTR) ? elem.maxBTR : 0,
            maxGRAD:(elem.maxGRAD) ? elem.maxGRAD : 0,
            maxInfantery:(elem.maxInfantery) ? elem.maxInfantery : 0,
            maxMortar:(elem.maxMortar) ? elem.maxMortar : 0,
            maxPTUR:(elem.maxPTUR) ? elem.maxPTUR : 0,
            maxTank:(elem.maxTank) ? elem.maxTank : 0,
            mortar:(elem.mortar) ? elem.mortar : 0,
            position: (elem.position) ? elem.position : 'base',
            realPTUR:(elem.realPTUR) ? elem.realPTUR : 0,
            realinfantery:(elem.realinfantery) ? elem.realinfantery : 0,
            realmortar:(elem.realmortar) ? elem.realmortar : 0,
            retreatPosition: (elem.retreatPosition) ? elem.retreatPosition : 0,
            round:(elem.round) ? elem.ARTA : 0,
            steps:(elem.steps) ? elem.steps : 1,
            tank:(elem.tank) ? elem.tank : 0,
            trench: (elem.trench) ? elem.trench : 'no',
            type: (elem.type) ? elem.type : "infantery",
            walked: (elem.walked) ? elem.walked : 'no'
            
//            sector: elem.sector,
//            position: elem.position,
//            ID: String,    
                
            });
            enemyRotaDescription.save();
        });
        console.log("Создаем и загружаем библиотеку EnemyRotas");
    };
    
    

    Sector.find(function(err, sector){
        if(err) console.error(err);
        if(sector.length ==0){
        console.log("База пустая...")   
        var sectorA = require('./DB/JSON/sector_a.json'); 
        var sectorB = require('./DB/JSON/sector_b.json'); 
        var sectorC = require('./DB/JSON/sector_c.json'); 
        var sectorM = require('./DB/JSON/sector_m.json');
    
        fromJsonToField(sectorA);
        fromJsonToField(sectorB);
        fromJsonToField(sectorC);
        fromJsonToField(sectorM);
            
//        var zoneA = require('./DB/JSON/zone_A.json'); 
        var zoneB = require('./DB/JSON/zone_B.json'); 
        var zoneC = require('./DB/JSON/zone_C.json'); 
        var zoneM = require('./DB/JSON/zone_M.json');
            
//        fromJsonToZone(zoneA);
        fromJsonToZone(zoneB);
        fromJsonToZone(zoneC);
        fromJsonToZone(zoneM);
            
        var ourBatts = require('./DB/JSON/our_batts.json');
            
        fromJsonToOurBatt(ourBatts);
            
        var ourRotas = require('./LIB/create_our_rote.js');
            
        fromJsonToOurRota(ourRotas()); 
            
        var enemyRotas = require('./LIB/create_enemy_rote.js');
            
        fromJsonToEnemyRota(enemyRotas()); 
            
            
        var enemyBatts = require('./DB/JSON/enemy_batts.json');
            
        fromJsonToEnemyBatt(enemyBatts);
        
        }else{
            console.log('База уже заполнена');
        }
       
    });
    
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/DB/MONGO');

module.exports.Sector = mongoose.model('sectors', sectorSchema);
module.exports.Zone = mongoose.model('zones', zoneSchema);
module.exports.OurBatt = mongoose.model('ourbatts', ourBattSchema);
module.exports.EnemyBatt = mongoose.model('enemybatts', enemyBattSchema);
module.exports.Battle = mongoose.model('battles', battleSchema);
module.exports.OurRota = mongoose.model('ourrotas', ourRotaSchema);
module.exports.EnemyRota = mongoose.model('enemyrotas', enemyRotaSchema);
