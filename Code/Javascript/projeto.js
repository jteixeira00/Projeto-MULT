"use strict";



var platforms;
var gameOver = false;
var padeira;
var castelhano;
var cursors; 
var spacebar;
var retangulo;
var retangul2;

var config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1550 },
            debug: true

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
    
    this.load.image('sky', '../../Resources/Sprites/Temp Assets/bck.png');
    this.load.image('ground', '../../Resources/Sprites/Temp Assets/platform.png');

    this.load.spritesheet('padeira_idle_L', '../../Resources/Sprite Sheets/Padeira/Padeira_idle_L.png', { frameWidth: 72, frameHeight: 168 });
    this.load.spritesheet('padeira_idle_R', '../../Resources/Sprite Sheets/Padeira/Padeira_idle_R.png', { frameWidth: 72, frameHeight: 168 });
    this.load.spritesheet('padeira_walk_R', '../../Resources/Sprite Sheets/Padeira/Padeira_walk_R.png', { frameWidth: 72, frameHeight: 168 });
    this.load.spritesheet('padeira_walk_L', '../../Resources/Sprite Sheets/Padeira/Padeira_walk_L.png', { frameWidth: 72, frameHeight: 168 });
    this.load.spritesheet('padeira_jump_R', '../../Resources/Sprite Sheets/Padeira/Padeira_jump_R.png', { frameWidth: 64, frameHeight: 168 });
    this.load.spritesheet('padeira_jump_L', '../../Resources/Sprite Sheets/Padeira/Padeira_jump_L.png', { frameWidth: 64, frameHeight: 168 });
    this.load.spritesheet('padeira_fall_R', '../../Resources/Sprite Sheets/Padeira/Padeira_fall_R.png', { frameWidth: 68, frameHeight: 168 });
    this.load.spritesheet('padeira_fall_L', '../../Resources/Sprite Sheets/Padeira/Padeira_fall_L.png', { frameWidth: 68, frameHeight: 168 });
    this.load.spritesheet('padeira_fall_P', '../../Resources/Sprite Sheets/Padeira/Padeira_fall_P.png', { frameWidth: 68, frameHeight: 168 });

    this.load.spritesheet('padeira_weapon_in_R', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_out_R.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_in_L', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_out_L.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_walk_R', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_walk_R.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_walk_L', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_walk_L.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_idle_R', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_idle_R.png', { frameWidth: 124, frameHeight: 168 }); 
    this.load.spritesheet('padeira_weapon_idle_L', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_idle_L.png', { frameWidth: 124, frameHeight: 168 }); 
    this.load.spritesheet('padeira_weapon_jump_R', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_jump_R.png', { frameWidth: 136, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_jump_L', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_jump_L.png', { frameWidth: 136, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_fall_R', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_fall_R.png', { frameWidth: 124, frameHeight: 168 });
    this.load.spritesheet('padeira_weapon_fall_L', '../../Resources/Sprite Sheets/Padeira/Padeira_weapon_fall_L.png', { frameWidth: 124, frameHeight: 168 });
 
    this.load.spritesheet('padeira_attack1_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack1_R.png', { frameWidth: 164, frameHeight: 168 });
    this.load.spritesheet('padeira_attack1_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack1_L.png', { frameWidth: 164, frameHeight: 168 });
    this.load.spritesheet('padeira_attack2_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack2_R.png', { frameWidth: 156, frameHeight: 168 });
    this.load.spritesheet('padeira_attack2_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack2_L.png', { frameWidth: 156, frameHeight: 168 });
    this.load.spritesheet('padeira_attack3_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack3_R.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack3_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack3_L.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack4_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack4_R.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack4_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack4_L.png', { frameWidth: 160, frameHeight: 168 });

    this.load.spritesheet('castelhano_idle', '../../Resources/Sprite Sheets/Castelhano_small/knight_idle_S.png', { frameWidth: 59, frameHeight: 104 });
}


function loadAnim(scene){



	scene.anims.create({
        key: 'c_idle',
        frames: scene.anims.generateFrameNumbers('castelhano_idle', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });



    scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('padeira_walk_L', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'idle_L',
        frames: scene.anims.generateFrameNumbers('padeira_idle_L', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'idle_R',
        frames: scene.anims.generateFrameNumbers('padeira_idle_R', { start: 3, end: 0 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('padeira_walk_R', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'jump_R',
        frames: scene.anims.generateFrameNumbers('padeira_jump_R', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'jump_L',
        frames: scene.anims.generateFrameNumbers('padeira_jump_L', { start: 3, end: 0 }),
        frameRate: 15   ,
        repeat: 0
    });

    scene.anims.create({
        key: 'fall_R',
        frames: scene.anims.generateFrameNumbers('padeira_fall_R', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'fall_L',
        frames: scene.anims.generateFrameNumbers('padeira_fall_L', { start: 1, end: 0 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'fall_P',
        frames: scene.anims.generateFrameNumbers('padeira_fall_P', { start: 0, end: 0 }),
        frameRate: 40,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_in_R',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_in_R', { start: 14, end: 0 }),
        frameRate: 50,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_in_L',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_in_L', { start: 0, end: 14 }),
        frameRate: 50,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_idle_R',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_idle_R', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_idle_L',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_idle_L', { start: 3, end: 0 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_right',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_walk_R', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_left',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_walk_L', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_jump_R',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_jump_R', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_jump_L',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_jump_L', { start: 3, end: 0 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_fall_R',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_fall_R', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_fall_L',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_fall_L', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack2_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack2_R', { start: 0, end: 8 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack2_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack2_L', { start: 8, end: 0 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack1_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack1_R', { start: 0, end: 7 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack1_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack1_L', { start: 7, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack3_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack3_R', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack3_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack3_L', { start: 11, end: 0 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack4_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack4_R', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack4_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack4_L', { start: 11, end: 0 }),
        frameRate: 20,
        repeat: 0
    });
}


function create(){

    this.add.image(400, 300, 'sky');
    this.physics.world.setBounds(0, 0, 2000, 800);

    platforms = this.physics.add.staticGroup();
    
    platforms.create(200, 768, 'ground').setScale(1).refreshBody();
    platforms.create(600, 768, 'ground').setScale(1).refreshBody();
    platforms.create(1000, 768, 'ground').setScale(1).refreshBody();
    platforms.create(1400, 768, 'ground').setScale(1).refreshBody();
    platforms.create(1800, 768, 'ground').setScale(1).refreshBody();

    padeira = new Padeira(100, 50, this, 0, 0, 'padeira_idle_R');

    castelhano = new Castelhano(100, 50, this, 0, 0, 'c_idle');

    padeira.body.setSize(72, 104, true);
    padeira.body.offset.y = 64;

    castelhano.body.setSize(48, 104, true);
    castelhano.x = 200
    castelhano.body.offset.y = 0;
    castelhano.body.offset.x = 8;


    retangulo = this.add.rectangle(0, 40, 40, 104, 0x6666ff, 0x0);
    this.physics.world.enableBody(retangulo, 0);    

    retangul2 = this.add.rectangle(500, 40, 150, 150, 0x6666ff);
    this.physics.world.enableBody(retangul2, 0);

    this.cameras.main.setBounds(0, 0, 2000, 800);
    this.cameras.main.startFollow(padeira);

    loadAnim(this);

    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.collider(padeira, platforms);

    this.physics.add.collider(castelhano, platforms);

    this.physics.add.collider(retangul2, platforms);




}


function update (){

	//!!!!!!!!!!!!!!!!!!!!
	//Idle -> meter box no meio
	//Ataque -> mexer a box inversa para cada lado
	// this.physics.moveTo(retangulo, padeira.x - 60,padeira.y + 28,10,50)
	//!!!!!!!!!!!!!!!!!!!!!!

	this.physics.moveTo(retangulo, padeira.x,padeira.y + 28,10,50);
	
   	castelhano.anims.play('c_idle', true);
   	this.physics.moveToObject(castelhano,retangul2,100);
   	
    
    if (gameOver)
        return;

    if (Phaser.Input.Keyboard.JustDown(spacebar) && padeira.body.touching.down){
    	this.physics.moveTo(retangulo, padeira.x,padeira.y + 28,10,50);
        if (padeira.weapon){
            var elementos = this.physics.overlap(retangulo,retangul2);
            if (elementos){
            	retangul2.body.setDrag(200,200)
            	retangul2.body.setVelocityY(-1000);
            	if(padeira.facing)
            		retangul2.body.setVelocityX(350);
            	else
            		retangul2.body.setVelocityX(-350);            	
            }

            if (padeira.facing == true){                
            	if (padeira.animationCounter == 0 && !padeira.attacking){
            		padeira.attacking = true;

			        retangulo.body.setSize(100, 103, true);
			        retangulo.body.offset.y = 4;
			        retangulo.body.offset.x = 0;

            	    padeira.anims.play('w_attack1_R', true);
            	    padeira.once('animationcomplete', () => {padeira.attacking = false;})
            	    padeira.updateAnimationCounter();
            	}
            	else if (padeira.animationCounter == 1 && !padeira.attacking){
            		padeira.attacking = true;
			        
			        retangulo.body.setSize(100, 168, true);
			        retangulo.body.offset.y = -60;
			        retangulo.body.offset.x = 0;

            	    padeira.anims.play('w_attack3_R', true);
            	    padeira.once('animationcomplete', () => {padeira.attacking = false;})
            		padeira.updateAnimationCounter();
            	}
            	else if (padeira.animationCounter == 2 && !padeira.attacking){
            		padeira.attacking = true;

			        retangulo.body.setSize(158, 168, true);
			        retangulo.body.offset.y = -60;
			        retangulo.body.offset.x = -58;

            	    padeira.anims.play('w_attack4_R', true);
            	    padeira.once('animationcomplete', () => {padeira.attacking = false;})
            		padeira.updateAnimationCounter();
            	}
            }
            else if (padeira.facing == false){
            	if (padeira.animationCounter == 0 && !padeira.attacking){
            		padeira.attacking = true;


			        retangulo.body.setSize(100, 103, true);
			        retangulo.body.offset.y = 4;
			        retangulo.body.offset.x = -64;

            	    padeira.anims.play('w_attack1_L', true);
            	    padeira.once('animationcomplete', () => {padeira.attacking = false;})
            	    padeira.updateAnimationCounter(); 
            	}
            	else if (padeira.animationCounter == 1 && !padeira.attacking){
            		padeira.attacking = true;

			        retangulo.body.setSize(100, 168, true);
			        retangulo.body.offset.y = -60;
			        retangulo.body.offset.x = -60;

            	    padeira.anims.play('w_attack3_L', true);
            	    padeira.once('animationcomplete', () => {padeira.attacking = false;})
            		padeira.updateAnimationCounter();
            	}
            	else if (padeira.animationCounter == 2 && !padeira.attacking){
            		padeira.attacking = true;

			        retangulo.body.setSize(158, 168, true);
			        retangulo.body.offset.y = -60;
			        retangulo.body.offset.x = -58;

            	    padeira.anims.play('w_attack4_L', true);
            	    padeira.once('animationcomplete', () => {padeira.attacking = false;})
            		padeira.updateAnimationCounter();
            	}
            }
        }
        
        else if (!padeira.weapon){    
            padeira.attacking = true;
            padeira.body.offset.x = 28;
	        this.physics.moveTo(retangulo, padeira.x,padeira.y + 28,10,50);
	        retangulo.body.setSize(100, 140, true);
	        retangulo.body.offset.y = -32;
            if (padeira.facing == true){
            	retangulo.body.offset.x = 0;
                padeira.anims.play('w_attack2_R', true);
                padeira.once('animationcomplete', () => {padeira.attacking = false;padeira.weapon = true;})
            }
            else{
            	retangulo.body.offset.x = -60;
                padeira.anims.play('w_attack2_L', true);
                padeira.once('animationcomplete', () => {padeira.attacking = false;padeira.weapon = true;})
            }
                    
        }
    }

    if (cursors.left.isDown && !padeira.attacking){
        padeira.body.setVelocityX(-350);
        padeira.facing = false
        if (padeira.body.touching.down)
            if (!padeira.weapon)
                padeira.anims.play('left', true);
            else
                padeira.anims.play('w_left', true);

    }

    else if (cursors.right.isDown && !padeira.attacking){
        padeira.body.setVelocityX(350);
        padeira.facing = true
        if (padeira.body.touching.down)
            if (!padeira.weapon)
                padeira.anims.play('right', true);
            else
                padeira.anims.play('w_right', true);

    }

    else if (padeira.body.touching.down){
    	padeira.body.setVelocityX(0)
        if (!padeira.weapon && !padeira.attacking){
        	if(padeira.facing == true)
        	  	padeira.anims.play('idle_R', true);
        	else
        		padeira.anims.play('idle_L', true);
        }
        else if (padeira.weapon && !padeira.attacking){
        	if(padeira.facing == true)
        	  	padeira.anims.play('w_idle_R', true);
        	else
        		padeira.anims.play('w_idle_L', true);
        }
    }
    
    if (cursors.up.isDown && padeira.body.touching.down){

        padeira.body.setVelocityY(-650);
        if (padeira.facing == true){
            if (!padeira.weapon){
                padeira.anims.play('jump_R', true);
            }
            else
                padeira.anims.play('w_jump_R', true);
        }

        else{
            if (!padeira.weapon){
                padeira.anims.play('jump_L', true);
            }
            else
                padeira.anims.play('w_jump_L', true);
        }
    }
    
    else if (!padeira.body.touching.down){

        if (padeira.body.velocity.y >= 0){
            if (padeira.facing == true){
                if (!padeira.weapon)
                    padeira.anims.play('fall_R', true);
                else
                    padeira.anims.play('w_fall_R', true);
            }

            else
                if (!padeira.weapon)
                    padeira.anims.play('fall_L', true);
                else
                    padeira.anims.play('w_fall_L', true);
        }
    }  

}
