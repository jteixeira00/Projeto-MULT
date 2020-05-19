"use strict";


var platforms;
var gameOver = false;
var padeira;
var cursors; 
var spacebar;
var score;
var enemies;
var scoreText;

var config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 800,
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
    
    this.load.image('sky', '../../Resources/Sprites/Jogo/lvl1/background.png');
    this.load.image('ground', '../../Resources/Sprites/Jogo/lvl1/chao.png');
    this.load.audio('smash', ['../../Resources/Sound/pancada.ogg' , '../../Resources/Sound/pancada.mp3']);
    
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
    this.load.spritesheet('padeira_attack0_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack0_R.png', { frameWidth: 156, frameHeight: 168 });
    this.load.spritesheet('padeira_attack0_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack0_L.png', { frameWidth: 156, frameHeight: 168 });
    this.load.spritesheet('padeira_attack2_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack2_R.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack2_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack2_L.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack3_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack3_R.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack3_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack3_L.png', { frameWidth: 160, frameHeight: 168 });

    this.load.spritesheet('castelhano_S_idle_R', '../../Resources/Sprite Sheets/Castelhano_small/knight_idle_R.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('castelhano_S_death_R', '../../Resources/Sprite Sheets/Castelhano_small/knight_death_R.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('castelhano_S_attack_R', '../../Resources/Sprite Sheets/Castelhano_small/knight_attack_R.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('castelhano_S_walk_R', '../../Resources/Sprite Sheets/Castelhano_small/knight_walk_S.png', { frameWidth: 148, frameHeight: 116 });
}


function loadAnim(scene){

    scene.smash = scene.sound.add('smash');

    scene.anims.create({
        key: 'c_s_attack_r',
        frames: scene.anims.generateFrameNumbers('castelhano_S_attack_R', { start: 0, end: 9 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_walk_r',
        frames: scene.anims.generateFrameNumbers('castelhano_S_walk_R', { start: 0, end: 9 }),
        frameRate: 15,
        repeat: 0
    });


	scene.anims.create({
        key: 'c_s_idle_r',
        frames: scene.anims.generateFrameNumbers('castelhano_S_idle_R', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_death_r',
        frames: scene.anims.generateFrameNumbers('castelhano_S_death_R', { start: 0, end: 7 }),
        frameRate: 5,
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
        key: 'w_attack0_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack0_R', { start: 0, end: 8 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack0_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack0_L', { start: 8, end: 0 }),
        frameRate: 30,
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
        key: 'w_attack2_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack2_R', { start: 0, end: 11 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack2_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack2_L', { start: 11, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack3_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack3_R', { start: 0, end: 11 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'w_attack3_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack3_L', { start: 11, end: 0 }),
        frameRate: 30,
        repeat: 0
    });
}


function create(){

    this.add.image(1200, 400, 'sky');
    this.physics.world.setBounds(0, 0, 2400, 800);
    
    score = 0;
    scoreText = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#000' });
    scoreText.setScrollFactor(0);

    platforms = this.physics.add.staticGroup();
    enemies = this.add.group();

    platforms.create(1200, 763, 'ground').setScale(1).refreshBody();

    padeira = new Padeira(100, 50, this, 1200, 0, 'padeira_idle_R');

    this.physics.add.collider(padeira, platforms);
    this.physics.add.collider(enemies, platforms);

    for (var i = 0; i < 2; i++) new Castelhano(100, 50, this, 0 + i*2000, 0, 'c_s_idle_r', enemies);

    this.cameras.main.setBounds(0, 0, 2400, 800);
    this.cameras.main.startFollow(padeira);

    loadAnim(this);

    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}


function update (){

    if (gameOver) return;

    updatePadeira(this);  
    
    for (var i = 0; i < enemies.getChildren().length; i++)
        updateEnemies(enemies.getChildren()[i], this);
}


function updatePadeira(scene){

    if (Phaser.Input.Keyboard.JustDown(spacebar) && padeira.body.touching.down && !padeira.immobile){
    	
        if (padeira.weapon){
            
            var array = padeira.updateAttackingHitbox();

            padeira.immobile = true;
            padeira.anims.play(array[0], true);
            //scene.smash.play();
            padeira.once('animationcomplete', () => {padeira.immobile = false;});
            padeira.updateAnimationCounter(); 
            
            var elementos = scene.physics.overlapRect(padeira.x + array[1], padeira.y + array[2], array[3], array[4]);
            for (var i = 0; i < elementos.length; i++){
                if (elementos[i].gameObject != padeira){
                    if (padeira.pixelCollision(padeira, elementos[i].gameObject))
                        elementos[i].gameObject.getHit(padeira.facingRight, padeira.damage);
                }
            }
        }
        
        else if (!padeira.weapon){    
            padeira.immobile = true;
            padeira.body.offset.x = 20;
            if (padeira.facingRight == true){
                padeira.anims.play('w_attack0_R', true);
                padeira.once('animationcomplete', () => {padeira.immobile = false;padeira.weapon = true;})
            }
            else{
                padeira.anims.play('w_attack0_L', true);
                padeira.once('animationcomplete', () => {padeira.immobile = false;padeira.weapon = true;})
            }
        }
    }

    if (cursors.left.isDown && !padeira.immobile){
        padeira.body.setVelocityX(-350);
        padeira.facingRight = false
        if (padeira.body.touching.down)
            if (!padeira.weapon)
                padeira.anims.play('left', true);
            else
                padeira.anims.play('w_left', true);

    }

    else if (cursors.right.isDown && !padeira.immobile){
        padeira.body.setVelocityX(350);
        padeira.facingRight = true
        if (padeira.body.touching.down)
            if (!padeira.weapon)
                padeira.anims.play('right', true);
            else
                padeira.anims.play('w_right', true);

    }

    else if (padeira.body.touching.down){
    	padeira.body.setVelocityX(0)
        if (!padeira.weapon && !padeira.immobile){
        	if(padeira.facingRight == true)
        	  	padeira.anims.play('idle_R', true);
        	else
        		padeira.anims.play('idle_L', true);
        }
        else if (padeira.weapon && !padeira.immobile){
        	if(padeira.facingRight == true)
        	  	padeira.anims.play('w_idle_R', true);
        	else
        		padeira.anims.play('w_idle_L', true);
        }
    }
    
    if (cursors.up.isDown && padeira.body.touching.down){

        padeira.body.setVelocityY(-650);
        if (padeira.facingRight == true){
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
            if (padeira.facingRight == true){
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

// Need armor getting spanked sound

function updateEnemies(enemy, scene){

    var x_padeira = padeira.body.x;

    if (!enemy.alive() && !enemy.immobile){
        enemy.anims.play('c_s_death_r', true);
        enemy.immobile = true;
        enemy.once('animationcomplete', () => {
            score += enemy.value;
            scoreText.setText('Pontuação: ' + score);
            enemy.destroy();
        });
    }

    else if (enemy.alive() && !enemy.immobile){
        
        //if (enemy.body.touching.down){
            if (enemy.body.x > x_padeira + 100){
                enemy.moveLeft();
                enemy.anims.play('c_s_walk_r', true);
            }

            else if (enemy.body.x < x_padeira - 100){   
                enemy.moveRight();
                enemy.anims.play('c_s_walk_r', true); 
                
            }

            else{
                enemy.immobile = true;
                enemy.body.setVelocityX(0)
                enemy.anims.play('c_s_attack_r', true);

                enemy.once('animationcomplete', () => {
                    var array = enemy.getAttackingHitbox(); 
                    // scene.add.rectangle(Math.round(enemy.x) + array[0] + Math.round(array[2]/2), enemy.y + array[1] + Math.round(array[3]/2), array[2], array[3], 0xff0000);
                    var elementos = scene.physics.overlapRect(Math.round(enemy.x) + array[0], enemy.y + array[1], array[2], array[3]);
                    for (var i = 0; i < elementos.length; i++){
                        if (elementos[i].gameObject == padeira){ // ou se atacar a base, to do
                            if (padeira.pixelCollision(enemy, elementos[i].gameObject))    
                                elementos[i].gameObject.getHit(enemy.facingRight, enemy.damage, scene);
                        }
                    }
                    enemy.immobile = false;
                });
            }
        //}
    }
}
