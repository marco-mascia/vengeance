        
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Vengeance is mine', { preload: preload, create: create, update: update, render: render });

    function preload(){       
        game.load.image('dude', 'assets/sprites/dude.png'); 
        game.load.image('plaguebearer', 'assets/sprites/plaguebearer.png'); 
        game.load.image('bullets', 'assets/sprites/bullets.png');
        game.load.image('bullet', 'assets/sprites/bullet.png');
        game.load.image('muzzle-flash', 'assets/sprites/muzzle-flash.png');
        //map tiles
        game.load.image('ground_1x1', 'assets/tiles/ground_1x1.png');

        //game.load.image('walls_1x2', 'assets/tiles/walls_1x2.png');
        game.load.spritesheet('walls_1x2', 'assets/tiles/walls_1x2.png', 32, 64);
    }    
    
    var map;    
    var layer;    
    var soldiers;       
    var enemies;          
    var enemiesAlive = 0;      
    var MAX_ENEMIES = 15;
    var showDebug = false;
    var bullets; 
    var bulletTime = 0; 

    var NUMBER_OF_WALLS = 10;
    var walls;   

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
        walls = game.add.physicsGroup(Phaser.Physics.ARCADE);
        
        var i, x, y;
        for(i = 0; i < NUMBER_OF_WALLS; i++) {
            x = i * game.width/NUMBER_OF_WALLS + 50;
            y = game.rnd.integerInRange(50, game.height - 100);
            walls.add(new Obstacle(i, game, x, y));                   
        }    
        walls.setAll('body.collideWorldBounds', true);  
        walls.setAll('body.immovable', true);
        walls.setAll('body.bounce.x', 1);
        walls.setAll('body.bounce.y', 1); 

        /* dude */
        soldiers = game.add.physicsGroup(Phaser.Physics.ARCADE);
        soldiers.add(new Dude(0, game, game.world.centerX, game.world.centerY, 1.57));
        //soldiers.add(new Dude(0, game, game.world.centerX + 50, game.world.centerY, 1.57));

        /* enemies */           
        enemies = game.add.physicsGroup(Phaser.Physics.ARCADE);

        for (var i = 0; i < MAX_ENEMIES; i++) {
            enemies.add(new Enemy(i, game));                  
        }
        enemies.setAll('body.collideWorldBounds', true);
        enemies.setAll('body.bounce.x', 1);
        enemies.setAll('body.bounce.y', 1);
    }

    function update(){}    
	
	function render(){
        if (showDebug){            
            soldiers.forEach(debug, this);  
            enemies.forEach(debug, this);  
            walls.forEach(debug, this);        
        }
    }

    function debug(item){
        game.debug.bodyInfo(item, 32, 32);
        game.debug.body(item); 
    }