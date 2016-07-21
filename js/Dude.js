/* DUDE */
    /* ---------------------------------------------------------------------------------------- */
    Dude = function(index, game, x, y, rotation){       
        
        Phaser.Sprite.call(this, game, x, y, 'dude');        
        this.anchor.setTo(0.5, 0.5);
        this.health = 10;
        this.alive = true;   
        this.speed = 0;
        rotation = typeof rotation !== 'undefined' ? rotation : 0;
        this.rotation = rotation;

        /*
        game.physics.enable(this, Phaser.Physics.ARCADE);   
        this.body.collideWorldBounds = true;
        this.body.bounce.set(1);        
        */

        this.weapon = game.add.weapon(30, 'bullet');
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
        this.weapon.trackSprite(this, 0, 18, true);        
        
        //this.weapon.onFire.addOnce(animationStarted, this);                
    }

    Dude.prototype = Object.create(Phaser.Sprite.prototype);
    Dude.prototype.constructor = Dude;

    Dude.prototype.update = function(){

        // Targeting        
        if(enemies.countLiving()>0 && this.alive){
            this.rotation = game.physics.arcade.moveToObject(this, enemies.getClosestTo(this), this.speed);   
            this.weapon.fire();                    
        }    

        // Bullet collision
        game.physics.arcade.collide(this.weapon.bullets, enemies, collisionHandler, null, this); 

        //line of sight
        /*
        var closestEnemy = enemies.getClosestTo(this)
        var angleBetween = game.physics.arcade.angleBetween(this, closestEnemy);
        var currentAngle = this.position;
        closestEnemy.tint = 0xFF0000;   

        if(angleBetween < currentAngle + 0.785 && angleBetween < currentAngle - 0.785){
            closestEnemy.tint = 0xFF00FF;   
        }
        */

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
         function collisionHandler(){                
            //enemy damage            
            var destroyed = arguments[1].damage();        
            if (destroyed){
                /*
                var explosionAnimation = explosions.getFirstExists(false);
                explosionAnimation.reset(tank.x, tank.y);
                explosionAnimation.play('kaboom', 30, false, true);
                */
            }
            //bullet
            arguments[0].kill();                 
        }
    };

   

    function animationStarted(sprite, animation) {
        game.add.text(this.x, this.y, 'P', { fill: 'white' });
    }
    /* ---------------------------------------------------------------------------------------- */       
