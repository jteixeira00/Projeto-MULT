var player;
var platforms;
var gameOver = false;

var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1550 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);


function preload(){
    
    this.load.image('sky', 'Resources/Sprites/Temp Assets/bck.png');
    this.load.image('ground', 'Resources/Sprites/Temp Assets/platform.png');

    this.load.spritesheet('padeira_idle_L', 'Resources/Sprite Sheets/Padeira/Padeira_idle_L.png', { frameWidth: 72, frameHeight: 168 });
    this.load.spritesheet('padeira_idle_R', 'Resources/Sprite Sheets/Padeira/Padeira_idle_R.png', { frameWidth: 72, frameHeight: 168 });
    this.load.spritesheet('padeira_walk_R', 'Resources/Sprite Sheets/Padeira/Padeira_walk_R.png', { frameWidth: 72, frameHeight: 168 });
    this.load.spritesheet('padeira_walk_L', 'Resources/Sprite Sheets/Padeira/Padeira_walk_L.png', { frameWidth: 72, frameHeight: 168 });
    this.load.spritesheet('padeira_jump_R', 'Resources/Sprite Sheets/Padeira/Padeira_jump_R.png', { frameWidth: 64, frameHeight: 168 });
    this.load.spritesheet('padeira_jump_L', 'Resources/Sprite Sheets/Padeira/Padeira_jump_L.png', { frameWidth: 64, frameHeight: 168 });
    this.load.spritesheet('padeira_fall_R', 'Resources/Sprite Sheets/Padeira/Padeira_fall_R.png', { frameWidth: 68, frameHeight: 168 });
    this.load.spritesheet('padeira_fall_L', 'Resources/Sprite Sheets/Padeira/Padeira_fall_L.png', { frameWidth: 68, frameHeight: 168 });
    this.load.spritesheet('padeira_fall_P', 'Resources/Sprite Sheets/Padeira/Padeira_fall_P.png', { frameWidth: 68, frameHeight: 168 });

    this.load.spritesheet('padeira_weapon_in_R', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_out_R.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_in_L', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_out_L.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_walk_R', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_walk_R.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_walk_L', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_walk_L.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_idle_R', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_idle_R.png', { frameWidth: 124, frameHeight: 168 }); 
    this.load.spritesheet('padeira_weapon_idle_L', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_idle_L.png', { frameWidth: 124, frameHeight: 168 }); 
    this.load.spritesheet('padeira_weapon_jump_R', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_jump_R.png', { frameWidth: 136, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_jump_L', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_jump_L.png', { frameWidth: 136, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_fall_R', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_fall_R.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_fall_L', 'Resources/Sprite Sheets/Padeira/Padeira_weapon_fall_L.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_attack1_R', 'Resources/Sprite Sheets/Padeira/Padeira_attack1_R.png', { frameWidth: 164, frameHeight: 168 });
    this.load.spritesheet('padeira_attack1_L', 'Resources/Sprite Sheets/Padeira/Padeira_attack1_L.png', { frameWidth: 164, frameHeight: 168 });
    this.load.spritesheet('padeira_attack2_R', 'Resources/Sprite Sheets/Padeira/Padeira_attack2_R.png', { frameWidth: 156, frameHeight: 168 });
    this.load.spritesheet('padeira_attack2_L', 'Resources/Sprite Sheets/Padeira/Padeira_attack2_L.png', { frameWidth: 156, frameHeight: 168 });
    this.load.spritesheet('padeira_attack3_R', 'Resources/Sprite Sheets/Padeira/Padeira_attack3_R.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack3_L', 'Resources/Sprite Sheets/Padeira/Padeira_attack3_L.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack4_R', 'Resources/Sprite Sheets/Padeira/Padeira_attack4_R.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack4_L', 'Resources/Sprite Sheets/Padeira/Padeira_attack4_L.png', { frameWidth: 160, frameHeight: 168 });
}


function create(){

    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 400, 'padeira_idle_R');
    
    player.setBounce(0);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('padeira_walk_L', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    this.anims.create({
        key: 'idle_L',
        frames: this.anims.generateFrameNumbers('padeira_idle_L', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

    this.anims.create({
        key: 'idle_R',
        frames: this.anims.generateFrameNumbers('padeira_idle_R', { start: 3, end: 0 }),
        frameRate: 7,
        repeat: 0
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('padeira_walk_R', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    this.anims.create({
        key: 'jump_R',
        frames: this.anims.generateFrameNumbers('padeira_jump_R', { start: 0, end: 3 }),
        frameRate: 30,
        repeat: 0
    });

    this.anims.create({
        key: 'jump_L',
        frames: this.anims.generateFrameNumbers('padeira_jump_L', { start: 3, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

    this.anims.create({
        key: 'fall_R',
        frames: this.anims.generateFrameNumbers('padeira_fall_R', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'fall_L',
        frames: this.anims.generateFrameNumbers('padeira_fall_L', { start: 1, end: 0 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'fall_P',
        frames: this.anims.generateFrameNumbers('padeira_fall_P', { start: 0, end: 0 }),
        frameRate: 40,
        repeat: 0
    });

    this.anims.create({
        key: 'w_in_R',
        frames: this.anims.generateFrameNumbers('padeira_weapon_in_R', { start: 14, end: 0 }),
        frameRate: 50,
        repeat: 0
    });

    this.anims.create({
        key: 'w_in_L',
        frames: this.anims.generateFrameNumbers('padeira_weapon_in_L', { start: 0, end: 14 }),
        frameRate: 50,
        repeat: 0
    });

    this.anims.create({
        key: 'w_idle_R',
        frames: this.anims.generateFrameNumbers('padeira_weapon_idle_R', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

    this.anims.create({
        key: 'w_idle_L',
        frames: this.anims.generateFrameNumbers('padeira_weapon_idle_L', { start: 3, end: 0 }),
        frameRate: 7,
        repeat: 0
    });

    this.anims.create({
        key: 'w_right',
        frames: this.anims.generateFrameNumbers('padeira_weapon_walk_R', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    this.anims.create({
        key: 'w_left',
        frames: this.anims.generateFrameNumbers('padeira_weapon_walk_L', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    this.anims.create({
        key: 'w_jump_R',
        frames: this.anims.generateFrameNumbers('padeira_weapon_jump_R', { start: 0, end: 3 }),
        frameRate: 30,
        repeat: 0
    });

    this.anims.create({
        key: 'w_jump_L',
        frames: this.anims.generateFrameNumbers('padeira_weapon_jump_L', { start: 3, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

    this.anims.create({
        key: 'w_fall_R',
        frames: this.anims.generateFrameNumbers('padeira_weapon_fall_R', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'w_fall_L',
        frames: this.anims.generateFrameNumbers('padeira_weapon_fall_L', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'w_attack2_R',
        frames: this.anims.generateFrameNumbers('padeira_attack2_R', { start: 0, end: 8 }),
        frameRate: 30,
        repeat: 0
    });

    this.anims.create({
        key: 'w_attack2_L',
        frames: this.anims.generateFrameNumbers('padeira_attack2_L', { start: 8, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

    this.anims.create({
        key: 'w_attack1_R',
        frames: this.anims.generateFrameNumbers('padeira_attack1_R', { start: 0, end: 7 }),
        frameRate: 30,
        repeat: 0
    });

    this.anims.create({
        key: 'w_attack1_L',
        frames: this.anims.generateFrameNumbers('padeira_attack1_L', { start: 7, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

    this.anims.create({
        key: 'w_attack3_R',
        frames: this.anims.generateFrameNumbers('padeira_attack3_R', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'w_attack3_L',
        frames: this.anims.generateFrameNumbers('padeira_attack3_L', { start: 11, end: 0 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'w_attack4_R',
        frames: this.anims.generateFrameNumbers('padeira_attack4_R', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'w_attack4_L',
        frames: this.anims.generateFrameNumbers('padeira_attack4_R', { start: 11, end: 0 }),
        frameRate: 20,
        repeat: 0
    });


    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.collider(player, platforms);
}

var atual // true = direita, false = esquerda
var pico = false
var weapon = false
var attack = false
var counter = 0
var wait = false;

function toggleWeapon(){
    if (weapon)
        weapon = false;
    else
        weapon = true;
}


function toggleAttack(){
	attack = false
}

var start_time = performance.now();

function update (){


    var time = performance.now() - start_time;

    if (gameOver)
        return;

    if (Phaser.Input.Keyboard.JustDown(spacebar) && player.body.touching.down){
    	

         if (weapon){
         	//animação de ataque também serem para a esquerda usando a direção na classe
        	               
            if (player.body.velocity.x >= 0){
            	if (counter == 0 && !attack){
            		attack = true;
            	    player.anims.play('w_attack1_R', true);
            	    player.once('animationcomplete', () => {attack = false;weapon = true;})
            	    counter += 1; 
            	}
            	else if (counter == 1 && !attack){
            		attack = true;
            	    player.anims.play('w_attack3_R', true);
            	    player.once('animationcomplete', () => {attack = false;weapon = true;})
            		counter+=1;
            	}
            	else if (counter == 2 && !attack){
            		attack = true;
            	    player.anims.play('w_attack4_R', true);
            	    player.once('animationcomplete', () => {attack = false;weapon = true;})
            		counter = 0;
            	}
            }
            else if (player.body.velocity.x < 0){
                player.anims.play('w_attack4_R', true);
            	player.once('animationcomplete', () => {attack = false;weapon = true;})
            }
        }
        
        else if (!weapon){    
       		attack = true;        
            if (player.body.velocity.x >= 0){
                player.anims.play('w_attack2_R', true);
                player.once('animationcomplete', () => {attack = false;weapon = true;})
            }
            else if (player.body.velocity.x < 0){
                player.anims.play('w_attack2_L', true);
                player.once('animationcomplete', () => {attack = false;weapon = true;})
            }
                    
        }
        cursors = this.input.keyboard.createCursorKeys();
        
        start_time = performance.now()
    }

    if (cursors.left.isDown && !attack){
        player.setVelocityX(-350);

        if (player.body.touching.down)
            if (!weapon)
                player.anims.play('left', true);
            else
                player.anims.play('w_left', true);

        start_time = performance.now()
    }

    else if (cursors.right.isDown && !attack){
        player.setVelocityX(350);

        if (player.body.touching.down)
            if (!weapon)
                player.anims.play('right', true);
            else
                player.anims.play('w_right', true);

        start_time = performance.now()
    }

    else if (player.body.touching.down){
    	player.setVelocityX(0)
        if (!weapon && !attack){
        	    player.anims.play('idle_R', true);
        }
        else if (weapon && !attack){
            player.anims.play('w_idle_R', true);
        }
        pico = false;
        start_time = performance.now()
    }
    
    if (cursors.up.isDown && player.body.touching.down){

        player.setVelocityY(-650);
        
        if (player.body.velocity.x >= 0){
            if (!weapon)
                player.anims.play('jump_R', true);
            else
                player.anims.play('w_jump_R', true);
            atual = true;
        }
        
        else{
            if (!weapon)
                player.anims.play('jump_L', true);
            else
                player.anims.play('w_jump_L', true);
            atual = false;
        }
        start_time = performance.now()
    }
    
    else if (!player.body.touching.down){

        if (player.body.velocity.y >= 0){

            if (player.body.velocity.x >= 0){
            	if (pico == false && weapon){
            		player.anims.play('fall_P',false);
            		pico = true;
                }
                if (!weapon)
                    player.anims.play('fall_R', true);
                else
                    player.anims.play('w_fall_R', true);
            }

            else
                if (!weapon)
                    player.anims.play('fall_L', true);
                else
                    player.anims.play('w_fall_L', true);
        }

        else{

            if (!atual && player.body.velocity.x >= 0){
                if (!weapon)
                    player.anims.play('jump_R', false);
                else
                    player.anims.play('w_jump_R', true);
                atual = true;
            }

            else if (atual && player.body.velocity.x < 0){
                if (!weapon)
                    player.anims.play('jump_L', false);
                else
                    player.anims.play('w_jump_L', true);
                atual = false;
            }
        }
        start_time = performance.now()
    }

   
}

