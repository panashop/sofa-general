function createEnemyRotas(){
var enemyRotas = [
    
    //пехота противника
    new EnemyInfantery('rota-inf-101-A', 100),
    new EnemyInfantery('rota-inf-201-A', 80),
        
	new EnemyInfantery('rota-inf-101-B', 80),
    new EnemyInfantery('rota-inf-201-B', 100),
    
    //мотопехота противника   
    new EnemyBTR('rota-btr-102-A', 70),
    new EnemyBTR('rota-btr-202-A', 70),
	new EnemyBTR('rota-btr-301-A', 80),
    new EnemyBTR('rota-btr-302-A', 80),
        
    new EnemyBTR('rota-btr-102-B', 80),
	new EnemyBTR('rota-btr-202-B', 80),
    	
    //танки противника
    new EnemyTank('rota-tank-103-A', 70),
	new EnemyTank('rota-tank-203-A', 80),
	new EnemyTank('rota-tank-303-A', 80),
	new EnemyTank('rota-tank-401-A', 100),
	new EnemyTank('rota-tank-402-A', 100),
        
	new EnemyTank('rota-tank-103-B', 80),
	new EnemyTank('rota-tank-203-B', 80),
	new EnemyTank('rota-tank-301-B', 70),
	new EnemyTank('rota-tank-302-B', 80),
    
    //арта противника      
    new EnemyARTA('rota-arta-501-A', 100),
    new EnemyARTA('rota-arta-502-A', 100),
        
    new EnemyARTA('rota-arta-501-B', 100),
	new EnemyARTA('rota-arta-502-B', 100),
    
	
    //ГРАДы противника    
    new EnemyGRAD('rota-grad-601-A', 100),
    new EnemyGRAD('rota-grad-602-A', 100),
    
    new EnemyGRAD('rota-grad-401-B', 100),
	new EnemyGRAD('rota-grad-402-B', 100)
     
    ];
    
    return JSON.stringify(enemyRotas)


function EnemyInfantery(name, strong){
       
        this.name = name;
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
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 1;       
        this.walked = "no"        
        }

function EnemyBTR(name, strong){
      
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
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 2;
        this.walked = "no"        
        }
   
function EnemyTank(name, strong){
       
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
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 2;   
        this.walked = "no"        
        }

function EnemyARTA(name, strong){
        
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
       
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 1;   
        this.walked = "no"        
        }

function EnemyGRAD(name, strong){
        
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
       
        this.retreatPosition = 'no';
        this.round =0;
        this.steps = 2;   
        this.walked = "no"        
        }
    
}

module.exports = createEnemyRotas
