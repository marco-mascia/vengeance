    /* DUDE */
    /* ---------------------------------------------------------------------------------------- */
    Dude = function(index, game, x, y, rotation){       
        
        //Phaser.Sprite.call(this, game, x, y, 'dude');  

        
        //Phaser.Sprite.call(this, game, x, y, 'dude');  
        Phaser.Sprite.call(this, game, x, y, 'dude_shotgun', 'sprESearchDoubleBarrel_0');  
        
               
        
        //this.animations.add('shoot', ['sprESearchDoubleBarrel_0.png', 'sprESearchDoubleBarrel_1.png', 'sprESearchDoubleBarrel_2.png', 'sprESearchDoubleBarrel_3.png', 'sprESearchDoubleBarrel_4.png', 'sprESearchDoubleBarrel_5.png'], 20, true);

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
        
        //this.weapon.events.onFire.addOnce(function(){console.log('fire')}, this);     
        //sprite.events.onAddedToGroup.add(yourFunction, this);
    }

    Dude.prototype = Object.create(Phaser.Sprite.prototype);
    Dude.prototype.constructor = Dude;
    Dude.prototype.damage = function(){
        //console.log('damage: ', this.health);
        this.health -= 1;
        if (this.health <= 0){
            this.alive = false;            
            this.kill();
            soldiers.removeChild(this);
            return true;
        }
        return false;
    } 

    Dude.prototype.update = function(){

        /*
        this.events.onFire.add(function(){
            console.log('firing');
        });
        */
        
        
        // Targeting        
        if(enemies.countLiving()>0 && this.alive){
            this.rotation = game.physics.arcade.moveToObject(this, enemies.getClosestTo(this), this.speed);                                 
        }    

        // Bullet collision
        game.physics.arcade.collide(this.weapon.bullets, enemies, collisionHandler, null, this); 

        //line of sight
        // Ray casting!
        // Test if each soldier can see the enemy by casting a ray (a line) towards the enemy.   
        enemies.forEach(function(enemy) {
            // Define a line that connects the soldier to the enemy
            // This isn't drawn on screen. This is just mathematical representation
            // of a line to make our calculations easier. 
            var ray = new Phaser.Line(enemy.x, enemy.y, this.x, this.y);

            // Test if any walls intersect the ray
            var intersect = this.getWallIntersection(ray);

            if (intersect) {
                //no sight here
                //enemy.tint = 0xffffff;
            } else {
                // This soldier can see the enemy so fire!
                //enemy.tint = 0xff00aa;
                if(enemy.alive){
                    this.weapon.fire(); 
                }             
            }

        }, this);

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

    // Given a ray, this function iterates through all of the walls and
    // returns the closest wall intersection from the start of the ray
    // or null if the ray does not intersect any walls.
    Dude.prototype.getWallIntersection = function(ray) {
        var distanceToWall = Number.POSITIVE_INFINITY;
        var closestIntersection = null;

        // For each of the walls...
        walls.forEach(function(wall) {
            // Create an array of lines that represent the four edges of each wall
            var lines = [
                new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
                new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
                new Phaser.Line(wall.x + wall.width, wall.y,
                    wall.x + wall.width, wall.y + wall.height),
                new Phaser.Line(wall.x, wall.y + wall.height,
                    wall.x + wall.width, wall.y + wall.height)
            ];

            // Test each of the edges in this wall against the ray.
            // If the ray intersects any of the edges then the wall must be in the way.
            for(var i = 0; i < lines.length; i++) {
                var intersect = Phaser.Line.intersects(ray, lines[i]);
                if (intersect) {
                    // Find the closest intersection
                    distance =
                        game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                    if (distance < distanceToWall) {
                        distanceToWall = distance;
                        closestIntersection = intersect;
                    }
                }
            }
        }, this);

        return closestIntersection;
    };


   

    function animationStarted(sprite, animation) {
        game.add.text(this.x, this.y, 'P', { fill: 'white' });
    }
    /* ---------------------------------------------------------------------------------------- */       



/*
    TestGame.Unit = function(game, x, y, faction, job) {
        var frameIdx = faction * TestGame.jobs.length + job;
        Phaser.Sprite.call(this, game, x, y, 'spritesheet-units', frameIdx);
        this.name = 'unit';
        this.events.onUnitSelected = new Phaser.Signal();
        this.events.onUnitMoveSelect = new Phaser.Signal(); 
        //INITIALIZATION 
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.events.onInputDown.add(this.select, this);
        this.events.onInputUp.add(this.release, this);
        return this;
    };

    TestGame.Unit.prototype = Object.create(Phaser.Sprite.prototype);
    TestGame.Unit.prototype.constructor = TestGame.Unit;
    TestGame.Unit.prototype.select = function() {
        this.events.onUnitSelected.dispatch(this);
    };
    TestGame.Unit.prototype.selectMove = function() {
        this.events.onUnitMoveSelect.dispatch(this);
        this.game.input.onUp.add(this.processClickMove, this);
    };
    TestGame.Unit.prototype.processClickMove = function(pointer) {
        if (pointer.duration <= 150) { // in case they are dragging        
            this.moveTo({
                x: pointer.worldX,
                y: pointer.worldY
            });
            this.game.input.onUp.remove(this.processClickMove, this);
        }
    };
    */

