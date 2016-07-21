/* OBSTACLE */
/* ---------------------------------------------------------------------------------------- */
Obstacle = function(index, game, x, y){    
    //new TileSprite(game, x, y, width, height, key, frame)
    //new Sprite    (game, x, y, key, frame)
    //Phaser.Sprite.call(this, game, x, y, 'dude');

    var frame = game.rnd.integerInRange(0, 7);    
    Phaser.TileSprite.call(this, game, x, y, 32, 64, 'walls_1x2', frame);    
    this.anchor.setTo(0.5, 0.5);
    this.health = 10;
    this.alive = true;
}

Obstacle.prototype = Object.create(Phaser.TileSprite.prototype);
Obstacle.prototype.constructor = Obstacle;
Obstacle.prototype.update = function(){
    game.physics.arcade.collide(enemies, walls);
};
/* ---------------------------------------------------------------------------------------- */       

/*
var singleton = (function(){ 
    var instance;
    return {
        getInstance: function() {
            if (!instance) {
                instance = { proprieta: "abc", metodo: function(){} }; 
            } 
            return instance; 
        }
    };
})();
*/