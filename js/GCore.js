        
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Vengeance is mine', { preload: preload, create: create, update: update, render: render });

    function preload(){       
        game.load.image('dude', 'assets/sprites/dude.png'); 
        game.load.image('plaguebearer', 'assets/sprites/plaguebearer.png'); 
        game.load.image('bullets', 'assets/sprites/bullets.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('muzzle-flash', 'assets/sprites/muzzle-flash.png');
        //map tiles
        game.load.image('ground_1x1', 'assets/tiles/ground_1x1.png');
    }    
    
    var map;
    var layer;
    var dude;        
    var enemies;           
    var enemiesAlive = 0;      
    var MAX_ENEMIES = 9;
    var showDebug = false;
    var bullets; 
    var bulletTime = 0;    

    function create() {
        /* set stage */
        game.stage.backgroundColor = '#2d2d2d';
        var data = '';
        for (var y = 0; y < 40; y++){
            for (var x = 0; x < 30; x++){
                data += game.rnd.between(0, 4).toString();
                if (x < 29){
                    data += ',';
                }
            }
            if (y < 39){
                data += "\n";
            }
        }

        game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);
        //  Create our map (the 32x32 is the tile size)
        map = game.add.tilemap('dynamicMap', 32, 32);
        //  'tiles' = cache image key, 32x32 = tile size
        map.addTilesetImage('ground_1x1', 'ground_1x1', 32, 32);
        //  0 is important
        layer = map.createLayer(0);

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
      game.physics.arcade.overlap(dude.weapon.bullets, enemies, collisionHandler, null, this);       
      game.physics.arcade.overlap(enemies, dude, nomnom, null, this);  
      game.physics.arcade.collide(enemies);
      dude.targeting();       
    }

    function nomnom(){
        arguments[0].kill();                
    }

    function collisionHandler() {             
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






