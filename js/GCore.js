    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Vengeance is mine', { preload: preload, create: create, update: update, render: render });

    function preload(){       
        game.load.image('dude', 'assets/sprites/dude.png'); 
        game.load.image('plaguebearer', 'assets/sprites/plaguebearer.png'); 
        game.load.image('bullets', 'assets/sprites/bullets.png');
        game.load.image('muzzle-flash', 'assets/sprites/muzzle-flash.png');
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


