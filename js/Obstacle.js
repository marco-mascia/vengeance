/* OBSTACLE */
/* ---------------------------------------------------------------------------------------- */
Obstacle = function(index, game, x, y){       
    
    //new TileSprite(game, x, y, width, height, key, frame)
    //new Sprite    (game, x, y, key, frame)

    //Phaser.Sprite.call(this, game, x, y, 'dude');  

    Phaser.TileSprite.call(this, game, x, y, 32, 32, 'walls_1x2', 2);

    this.anchor.setTo(0.5, 0.5);
    this.health = 10;
    this.alive = true;              
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;
Obstacle.prototype.update = function(){

};
/* ---------------------------------------------------------------------------------------- */       
