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
        this.player = player;
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
        console.log('damage: ', this.health);
        this.health -= 1;
        if (this.health <= 0){
            this.alive = false;            
            this.kill();
            return true;
        }
        return false;
    }

    Enemy.prototype.update = function(){                  
        this.rotation = game.physics.arcade.moveToObject(this, this.player, this.speed); 
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
    /* ---------------------------------------------------------------------------------------- */

    /* DUDE */
    /* ---------------------------------------------------------------------------------------- */
    Dude = function(index, game){       
        
        Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'dude');        
        this.anchor.setTo(0.5, 0.5);
        this.health = 10;
        this.alive = true;   
        this.speed = 0;  

        game.physics.enable(this, Phaser.Physics.ARCADE);   
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);        

        this.weapon = game.add.weapon(30, 'bullets');
        //  The bullet will be automatically killed when it leaves the world bounds
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;      
        //  Because our bullet is drawn facing up, we need to offset its rotation:
        //this.weapon.bulletAngleOffset = 90;
        //  The speed at which the bullet is fired
        this.weapon.bulletSpeed = 400;
        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
        this.weapon.fireRate = 200;
        //  Add a variance to the bullet angle by +- this value
        this.weapon.bulletAngleVariance = 10;
        //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
        this.weapon.trackSprite(this, 0, 0, true);

        game.add.existing(this);       
    }

    Dude.prototype = Object.create(Phaser.Sprite.prototype);
    Dude.prototype.constructor = Dude;
    Dude.prototype.targeting = function(){  
        this.rotation = game.physics.arcade.moveToObject(this, enemies.getClosestTo(this), this.speed);         
        this.weapon.fire();

        /*
        if (game.time.now > bulletTime){
            bullet = this.bullets.getFirstExists(false);
            if (bullet){
                bullet.reset(this.body.x + 16, this.body.y + 16);
                bullet.lifespan = 2000;
                bullet.rotation = this.rotation;
                game.physics.arcade.velocityFromRotation(this.rotation, 400, bullet.body.velocity);
                bulletTime = game.time.now + 150;          
            }
        }
        */
    }
    Dude.prototype.update = function(){
        
        //enemies.getClosestTo(this).tint = 0xFF0000;       

        /*
        if (game.input.mousePointer.isDown){
            //  400 is the speed it will move towards the mouse
            this.rotation = game.physics.arcade.moveToPointer(this, 400);
            //  if it's overlapping the mouse, don't move any more
            if (Phaser.Rectangle.contains(this.body, game.input.x, game.input.y)){
                this.body.velocity.setTo(0, 0);
            }                      
        }
        else{
            this.body.velocity.setTo(0, 0);
        }  

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){            
            if (game.time.now > bulletTime){
                bullet = this.bullets.getFirstExists(false);
                if (bullet){
                    bullet.reset(this.body.x + 16, this.body.y + 16);
                    bullet.lifespan = 2000;
                    bullet.rotation = this.rotation;
                    game.physics.arcade.velocityFromRotation(this.rotation, 400, bullet.body.velocity);
                    bulletTime = game.time.now + 50;
                }
            }
        }
        */
    };
    /* ---------------------------------------------------------------------------------------- */       






    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Vengeance is mine', { preload: preload, create: create, update: update, render: render });

    function preload(){       
        game.load.image('dude', 'assets/sprites/dude.png'); 
        game.load.image('plaguebearer', 'assets/sprites/plaguebearer.png'); 
        game.load.image('bullets', 'assets/sprites/bullets.png');
    }    
        
    var dude;        
    var enemies;           
    var enemiesAlive = 0;      
    var MAX_ENEMIES = 9;
    var showDebug = false;
    var bullets; 
    var bulletTime = 0;    

    function create() {
        /* dude */
        dude = new Dude(0, game);               

        /* enemies */           
        enemies = game.add.physicsGroup(Phaser.Physics.ARCADE);

        for (var i = 0; i < MAX_ENEMIES; i++) {
            enemies.add(new Enemy(i, game, dude));                  
        }
        enemies.setAll('body.collideWorldBounds', true);
        enemies.setAll('body.bounce.x', 1);
        enemies.setAll('body.bounce.y', 1);
    }

    function update(){
      game.physics.arcade.overlap(bullets, enemies, nomnom, null, this);       
      game.physics.arcade.overlap(dude.weapon.bullets, enemies, collisionHandler, null, this);       
      game.physics.arcade.collide(enemies);
      dude.targeting();       
    }

    function nomnom(){
        arguments[0].kill();                
    }

    function collisionHandler() {             
        //enemy damage
        arguments[1].damage();
        //bullet
        arguments[0].kill();                 
    }
	
	function render() {
        if (showDebug){
            game.debug.bodyInfo(dude, 32, 32);
            game.debug.body(dude);
            enemies.forEach(debug, this);        
        }
    }

    function debug(item){
        game.debug.bodyInfo(item, 32, 32);
        game.debug.body(item); 
    }


