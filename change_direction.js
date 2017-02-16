var fs = require('fs');
var url = require('url'); 

var change_direction = function(req, res){
    var dir = req.url.slice(-2,-1);
    
    if((dir == 1)||(dir == 2)||(dir == 3)){
        fs.readFile('./IMG/enemy_sprite_big_right.png', function(err, data){
            fs.writeFile('./IMG/enemy_sprite_big.png', data, function(){
                fs.readFile('./IMG/our_sprite_big_right.png',function(err, data){
                    fs.writeFile('./IMG/our_sprite_big.png', data, function(){
                        res.end()
                    })
                })
            })
        })
    }
    if((dir == 4)||(dir == 5)||(dir == 6)){
        fs.readFile('./IMG/enemy_sprite_big_left.png', function(err, data){
            fs.writeFile('./IMG/enemy_sprite_big.png', data, function(){
                fs.readFile('./IMG/our_sprite_big_left.png',function(err, data){
                    fs.writeFile('./IMG/our_sprite_big.png', data, function(){
                        res.end()
                    })
                })
            })
        })
    }

    
}

module.exports = change_direction;  