/* Enemy */
    /* ---------------------------------------------------------------------------------------- */
    Enemy = function(index, game, player){ 

        //var x = game.world.width;
        var x = game.rnd.integerInRange(0, game.world.width);
        var y = game.rnd.integerInRange(400, game.world.height);
        
        Phaser.Sprite.call(this, game, x, y, 'plaguebearer');  
        this.anchor.setTo(0.5, 0.5);      
        this.health = 2;        
        this.alive = true;                 
        this.speed = game.rnd.integerInRange(10, 200); 

        /* health label */
        /*
        var style = { font: "12px Arial", fill: "#ffffff" };  
        this.label_score = this.game.add.text(20, 20,  this.health, style);
        this.addChild(this.label_score);
        */        
    }

    Enemy.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy.prototype.constructor = Enemy;
    Enemy.prototype.damage = function(){
        //console.log('damage: ', this.health);
        this.health -= 1;
        if (this.health <= 0){
            this.alive = false;            
            this.kill();
            enemies.removeChild(this);
            return true;
        }
        return false;
    }    

    Enemy.prototype.update = function(){ 
        
        if(soldiers.countLiving()>0 && this.alive){           
            this.rotation = game.physics.arcade.moveToObject(this, soldiers.getClosestTo(this), this.speed);     
        }   

        game.physics.arcade.overlap(this, soldiers, nomnom, null, this); 
        game.physics.arcade.collide(enemies);
                        
        
        /*
        var chasing = false; 
        // check if the slime's y position on the map is equal to the player's y position
        // we use Math.round to ignore the decimal
        if (Math.round(this.y) == Math.round(this.player.y)) {
            // if both slime and player are on the same 'plane' move towards the player!
            if (Math.round(this.player.x) > Math.round(this.x)) {
                // we increase the speed from the default 80 to 200
                this.body.velocity.x = 200;
            } else {
                this.body.velocity.x = -200;
            }
            chasing = true;
        }
     
        if(!chasing){
            // when the slime isn't actively chasing the player,
            // reduce speeds back to normal
            if(this.body.velocity.x > 0){
                this.body.velocity.x = 80;
            } else if(this.body.velocity.x < 0){ this.body.velocity.x = -80; } } game.physics.arcade.collide(this, platforms, function (slime, platform) { if (slime.body.velocity.x > 0 && slime.x > platform.x + (platform.width - slime.width) ||
                    slime.body.velocity.x < 0 && slime.x < platform.x) { // this is still the old platform patrol AI from before // we added the chasing check so the slime will stop at the edge closest to the player if (chasing) { slime.body.velocity.x = 0; } else { slime.body.velocity.x *= -1; } } }); game.physics.arcade.collide(this, slimes, function (slime, slimes) { slime.body.velocity.x *= -1; }); if (this.body.velocity.x > 0) {
            // this.animations.stop();
            //this.animations.play('right');
        } else {
            //this.animations.stop();
            //this.animations.play('left');
        }
        */        

    };

    function nomnom(){
        arguments[0].kill();                
    }
    /* ---------------------------------------------------------------------------------------- */
