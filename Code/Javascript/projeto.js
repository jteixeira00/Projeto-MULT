"use strict";


var steps;
var padeira;
var portal;
var cursors; 
var background;
var objective;
var spacebar;
var score;
var enemies;
var platforms;
var portals;
var portals_array;
var scoreText;
var openP;
var inicio;
var falling;
var fim;
var endP;
var stepsON;
var healthMeter;
var volume;
var volumeFrame = 14;
var drop;
var drops;

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
        key: "level",
        preload: preload,
        create: create,
        update: update
    }
};

var configMenu = {

        key: 'PauseScene',
        active: true,
        visible: true
        // pack: false,
        // cameras: null,
        // map: {},
        // physics: {},
        // loader: {},
        // plugins: false,
        // input: {}
  
}

var game = new Phaser.Game(config);

function preload(){
    
    this.load.image('ground', '../../Resources/Sprites/Jogo/lvl1/chao.png');
    this.load.image('plataforma', '../../Resources/Sprites/Jogo/lvl1/plataforma.png');
    this.load.audio('smash', ['../../Resources/Sound/pancada.ogg' , '../../Resources/Sound/pancada.mp3']);
    this.load.image('pause_btn', '../../Resources/Sprites/Jogo/Pause/Pausar.png');
    this.load.spritesheet('sky', '../../Resources/Sprites/Jogo/lvl1/background-sheet.png', { frameWidth: 2400, frameHeight: 800 });
    
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
 
    this.load.spritesheet('padeira_attack0_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack0_R.png', { frameWidth: 156, frameHeight: 168 });
    this.load.spritesheet('padeira_attack0_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack0_L.png', { frameWidth: 156, frameHeight: 168 });
    this.load.spritesheet('padeira_attack1_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack1_R.png', { frameWidth: 164, frameHeight: 168 });
    this.load.spritesheet('padeira_attack1_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack1_L.png', { frameWidth: 164, frameHeight: 168 });
    this.load.spritesheet('padeira_attack2_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack2_R.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack2_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack2_L.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack3_R', '../../Resources/Sprite Sheets/Padeira/Padeira_attack3_R.png', { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet('padeira_attack3_L', '../../Resources/Sprite Sheets/Padeira/Padeira_attack3_L.png', { frameWidth: 160, frameHeight: 168 });

    this.load.spritesheet('c_h_idle_R', '../../Resources/Sprite Sheets/Castelhano_heavy/knight_idle_R.png', { frameWidth: 322, frameHeight: 254 });
    this.load.spritesheet('c_h_idle_L', '../../Resources/Sprite Sheets/Castelhano_heavy/knight_idle_L.png', { frameWidth: 322, frameHeight: 254 });
    this.load.spritesheet('c_h_death_R', '../../Resources/Sprite Sheets/Castelhano_heavy/knight_death_R.png', { frameWidth: 322, frameHeight: 254 });
    this.load.spritesheet('c_h_death_L', '../../Resources/Sprite Sheets/Castelhano_heavy/knight_death_L.png', { frameWidth: 322, frameHeight: 254 });
    this.load.spritesheet('c_h_attack_R', '../../Resources/Sprite Sheets/Castelhano_heavy/knight_attack_R.png', { frameWidth: 322, frameHeight: 254 });
    this.load.spritesheet('c_h_attack_L', '../../Resources/Sprite Sheets/Castelhano_heavy/knight_attack_L.png', { frameWidth: 322, frameHeight: 254 });
    this.load.spritesheet('c_h_walk_R', '../../Resources/Sprite Sheets/Castelhano_heavy/knight_walk_R.png', { frameWidth: 322, frameHeight: 254 });
    this.load.spritesheet('c_h_walk_L', '../../Resources/Sprite Sheets/Castelhano_heavy/knight_walk_L.png', { frameWidth: 322, frameHeight: 254 });

    this.load.spritesheet('c_m_idle_R', '../../Resources/Sprite Sheets/Castelhano_medium/knight_idle_R.png', { frameWidth: 153, frameHeight: 126 });
    this.load.spritesheet('c_m_idle_L', '../../Resources/Sprite Sheets/Castelhano_medium/knight_idle_L.png', { frameWidth: 153, frameHeight: 126 });
    this.load.spritesheet('c_m_death_R', '../../Resources/Sprite Sheets/Castelhano_medium/knight_death_R.png', { frameWidth: 153, frameHeight: 126 });
    this.load.spritesheet('c_m_death_L', '../../Resources/Sprite Sheets/Castelhano_medium/knight_death_L.png', { frameWidth: 153, frameHeight: 126 });
    this.load.spritesheet('c_m_attack_R', '../../Resources/Sprite Sheets/Castelhano_medium/knight_attack_R.png', { frameWidth: 153, frameHeight: 126 });
    this.load.spritesheet('c_m_attack_L', '../../Resources/Sprite Sheets/Castelhano_medium/knight_attack_L.png', { frameWidth: 153, frameHeight: 126 });
    this.load.spritesheet('c_m_walk_R', '../../Resources/Sprite Sheets/Castelhano_medium/knight_walk_R.png', { frameWidth: 153, frameHeight: 126 });
    this.load.spritesheet('c_m_walk_L', '../../Resources/Sprite Sheets/Castelhano_medium/knight_walk_L.png', { frameWidth: 153, frameHeight: 126 });

    this.load.spritesheet('c_s_idle_R', '../../Resources/Sprite Sheets/Castelhano_small/knight_idle_R.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('c_s_idle_L', '../../Resources/Sprite Sheets/Castelhano_small/knight_idle_L.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('c_s_death_R', '../../Resources/Sprite Sheets/Castelhano_small/knight_death_R.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('c_s_death_L', '../../Resources/Sprite Sheets/Castelhano_small/knight_death_L.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('c_s_attack_R', '../../Resources/Sprite Sheets/Castelhano_small/knight_attack_R.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('c_s_attack_L', '../../Resources/Sprite Sheets/Castelhano_small/knight_attack_L.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('c_s_walk_R', '../../Resources/Sprite Sheets/Castelhano_small/knight_walk_R.png', { frameWidth: 148, frameHeight: 116 });
    this.load.spritesheet('c_s_walk_L', '../../Resources/Sprite Sheets/Castelhano_small/knight_walk_L.png', { frameWidth: 148, frameHeight: 116 });

    this.load.spritesheet('portal_anim', '../../Resources/Sprite Sheets/Portal/portal.png',{ frameWidth: 217, frameHeight: 156 });
    this.load.spritesheet('portal_op', '../../Resources/Sprite Sheets/Portal/portal_open.png',{ frameWidth: 232, frameHeight: 156 });
    this.load.spritesheet('portal_ed', '../../Resources/Sprite Sheets/Portal/portal_close.png',{ frameWidth: 277, frameHeight: 156 });


    this.load.image("minicarro",'../../Resources/Sprites/Jogo/lvl1/carrinho drop.png' );

    this.load.spritesheet('health', '../../Resources/Sprite Sheets/health bread.png',{ frameWidth: 88, frameHeight: 16 });

    this.load.audio('level1_music', '../../Sounds/level1_music.wav');
    this.load.audio('swoosh_0', '../../Sounds/swoosh_0.wav');  
    this.load.audio('swoosh_1', '../../Sounds/swoosh_1.wav'); 
    this.load.audio('swoosh_2', '../../Sounds/swoosh_2.wav'); 
    this.load.audio('steps', '../../Sounds/audiosteps.wav'); 
    this.load.audio('fall', '../../Sounds/fall.mp3');    
}


function loadAnim(scene){

    scene.smash = scene.sound.add('smash'); 

    scene.anims.create({
        key: 'portal',
        frames: scene.anims.generateFrameNumbers('portal_anim', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });

        scene.anims.create({
        key: 'portalO',
        frames: scene.anims.generateFrameNumbers('portal_op', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });

        scene.anims.create({
        key: 'portalE',
        frames: scene.anims.generateFrameNumbers('portal_ed', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_attack_R',
        frames: scene.anims.generateFrameNumbers('c_h_attack_R', { start: 0, end: 5 }),
        frameRate: 2,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_attack_L',
        frames: scene.anims.generateFrameNumbers('c_h_attack_L', { start: 9, end: 4 }),
        frameRate: 2,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_walk_R',
        frames: scene.anims.generateFrameNumbers('c_h_walk_R', { start: 0, end: 9 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_walk_L',
        frames: scene.anims.generateFrameNumbers('c_h_walk_L', { start: 9, end: 0 }),
        frameRate: 15,
        repeat: 0
    });

	scene.anims.create({
        key: 'c_h_idle_R',
        frames: scene.anims.generateFrameNumbers('c_h_idle_R', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

	scene.anims.create({
        key: 'c_h_idle_L',
        frames: scene.anims.generateFrameNumbers('c_h_idle_L', { start: 3, end: 0 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_death_R',
        frames: scene.anims.generateFrameNumbers('c_h_death_R', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_death_L',
        frames: scene.anims.generateFrameNumbers('c_h_death_L', { start: 7, end: 0 }),
        frameRate: 5,
        repeat: 0
    });   

    scene.anims.create({
        key: 'c_m_attack_R',
        frames: scene.anims.generateFrameNumbers('c_m_attack_R', { start: 0, end: 5 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_m_attack_L',
        frames: scene.anims.generateFrameNumbers('c_m_attack_L', { start: 9, end: 4 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_m_walk_R',
        frames: scene.anims.generateFrameNumbers('c_m_walk_R', { start: 0, end: 9 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_m_walk_L',
        frames: scene.anims.generateFrameNumbers('c_m_walk_L', { start: 9, end: 0 }),
        frameRate: 15,
        repeat: 0
    });

	scene.anims.create({
        key: 'c_m_idle_R',
        frames: scene.anims.generateFrameNumbers('c_m_idle_R', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

	scene.anims.create({
        key: 'c_m_idle_L',
        frames: scene.anims.generateFrameNumbers('c_m_idle_L', { start: 3, end: 0 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_m_death_R',
        frames: scene.anims.generateFrameNumbers('c_m_death_R', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_m_death_L',
        frames: scene.anims.generateFrameNumbers('c_m_death_L', { start: 7, end: 0 }),
        frameRate: 5,
        repeat: 0
    });        

    scene.anims.create({
        key: 'c_s_attack_R',
        frames: scene.anims.generateFrameNumbers('c_s_attack_R', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_attack_L',
        frames: scene.anims.generateFrameNumbers('c_s_attack_L', { start: 9, end: 4 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_walk_R',
        frames: scene.anims.generateFrameNumbers('c_s_walk_R', { start: 0, end: 9 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_walk_L',
        frames: scene.anims.generateFrameNumbers('c_s_walk_L', { start: 9, end: 0 }),
        frameRate: 15,
        repeat: 0
    });

	scene.anims.create({
        key: 'c_s_idle_R',
        frames: scene.anims.generateFrameNumbers('c_s_idle_R', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

	scene.anims.create({
        key: 'c_s_idle_L',
        frames: scene.anims.generateFrameNumbers('c_s_idle_L', { start: 3, end: 0 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_death_R',
        frames: scene.anims.generateFrameNumbers('c_s_death_R', { start: 0, end: 7 }),
        frameRate: 5,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_death_L',
        frames: scene.anims.generateFrameNumbers('c_s_death_L', { start: 7, end: 0 }),
        frameRate: 5,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_walk_L',
        frames: scene.anims.generateFrameNumbers('padeira_walk_L', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_idle_L',
        frames: scene.anims.generateFrameNumbers('padeira_idle_L', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_idle_R',
        frames: scene.anims.generateFrameNumbers('padeira_idle_R', { start: 3, end: 0 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_walk_R',
        frames: scene.anims.generateFrameNumbers('padeira_walk_R', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_jump_R',
        frames: scene.anims.generateFrameNumbers('padeira_jump_R', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_jump_L',
        frames: scene.anims.generateFrameNumbers('padeira_jump_L', { start: 3, end: 0 }),
        frameRate: 15   ,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_fall_R',
        frames: scene.anims.generateFrameNumbers('padeira_fall_R', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_fall_L',
        frames: scene.anims.generateFrameNumbers('padeira_fall_L', { start: 1, end: 0 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_fall_P',
        frames: scene.anims.generateFrameNumbers('padeira_fall_P', { start: 0, end: 0 }),
        frameRate: 40,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_in_R',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_in_R', { start: 14, end: 0 }),
        frameRate: 50,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_in_L',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_in_L', { start: 0, end: 14 }),
        frameRate: 50,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_idle_R',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_idle_R', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_idle_L',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_idle_L', { start: 3, end: 0 }),
        frameRate: 7,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_walk_R',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_walk_R', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_walk_L',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_walk_L', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_jump_R',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_jump_R', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_jump_L',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_jump_L', { start: 3, end: 0 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_fall_R',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_fall_R', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_weapon_fall_L',
        frames: scene.anims.generateFrameNumbers('padeira_weapon_fall_L', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_attack0_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack0_R', { start: 0, end: 8 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_attack0_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack0_L', { start: 8, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_attack1_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack1_R', { start: 0, end: 7 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_attack1_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack1_L', { start: 7, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_attack2_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack2_R', { start: 0, end: 11 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_attack2_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack2_L', { start: 11, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_attack3_R',
        frames: scene.anims.generateFrameNumbers('padeira_attack3_R', { start: 0, end: 11 }),
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'padeira_attack3_L',
        frames: scene.anims.generateFrameNumbers('padeira_attack3_L', { start: 11, end: 0 }),
        frameRate: 30,
        repeat: 0
    });
}


function create(){



	var config = {
    mute: false,
    volume: 1,
    loop: true
	}


	playSound(this,"level1_music",config);

    this.add.image(1200, 400, 'sky');

    this.physics.world.setBounds(0, 0, 2400, 800);

    background = this.add.sprite(1200, 400, 'sky');

    this.anims.create({
        key: "sky1",
        frames: this.anims.generateFrameNumbers("sky", {start:0, end: 3}),
        frameRate:1,
        repeat:0   
    });

    this.anims.create({
        key: "sky2",
        frames: this.anims.generateFrameNumbers("sky", {start:4, end: 6}),
        frameRate:3,
        repeat:0  
    });

    this.anims.create({
        key: "sky3",
        frames: this.anims.generateFrameNumbers("sky", {start:7, end: 10}),
        frameRate:3,
        repeat:0   
    });

    background.anims.play("sky1", true);
    background.anims.pause(background.anims.currentAnim.frames[0]);
  
    healthMeter = this.add.sprite(150, 760, "health");

    this.anims.create({
        key: "health",
        frames: this.anims.generateFrameNumbers("health", {start:0, end: 9}),
        frameRate:1,
        repeat:-1   
    });

    healthMeter.setScrollFactor(0);
    healthMeter.anims.play("health", true);
    healthMeter.anims.pause(healthMeter.anims.currentAnim.frames[9]);
    healthMeter.setScale(3);

    var pause_btn = this.add.image(1120,60, 'pause_btn');
    pause_btn.setScrollFactor(0)
    pause_btn.setInteractive();
    pause_btn.on("pointerdown", () => pause());
    
    score = 0;
    scoreText =  this.add.text(24, 36, '0', { fontFamily: "font1", fontSize: '40px', fill: '#cfae5c' });
    scoreText.setScrollFactor(0);

    enemies = this.add.group();
    portals = this.add.group();
    
    var array = platformsDesign(this);
    platforms = array[0];
    var portals_array = array[1];

    const sizePortais = (portals_array.length);


    objective = new Objective(1415, 673, this, 540, 145);
    padeira = new Padeira(500, 50, this, 1200, 0, 'padeira_idle_R',game);
    
    this.physics.add.collider(objective, platforms);
    this.physics.add.collider(padeira, platforms);
    this.physics.add.collider(enemies, platforms);
   
    var i = 0;
    let castelaGenesis = setInterval(() => {
        var randIndex = Math.floor((sizePortais) * Math.random());
        new Portal(this, portals_array[randIndex][0], portals_array[randIndex][1], 'portal',portals);
        new CastelhanoSmall(this, portals_array[randIndex][0], portals_array[randIndex][1], 'c_s_idle_R', enemies);
        i++;
        if(i == 4) clearInterval(castelaGenesis)
    }, 1000);
    	
    this.cameras.main.setBounds(0, 0, 2400, 800);
    this.cameras.main.startFollow(padeira);

    loadAnim(this);

    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    game.scene.add("PauseScene", PauseScene, false);

    
    tempocarroca(this);
    drops = this.add.group();
    this.physics.add.collider(drops, platforms);
    this.physics.add.overlap(padeira, drops, spawnCarroca);

}


function update (){

    if (padeira.healthPoints <= 0 || objective.healthPoints <= 0) return;

    updatePadeira(this);

    for (var i = 0; i < portals.getChildren().length; i++)
    	updatePortal(portals.getChildren()[i],this);
    
    for (var i = 0; i < enemies.getChildren().length; i++)
        updateEnemies(enemies.getChildren()[i], this);
    
    updateBackgroud(this);
}


function tempocarroca(scene){

    scene.time.addEvent({
        delay: 5000,
        callback: ()=>{
            dropcarroca(scene)
        },
        loop: true
    })
}


function dropcarroca(scene){
    
    if(drops.getChildren().length == 0){
        var x = Phaser.Math.Between(30, 2370);
        drop = scene.add.sprite(x, 0, "minicarro");
        scene.physics.world.enableBody(drop, 0);
        drops.add(drop);
    }

    if(drops.getChildren().length == 1) drop.destroy();
}


function pause(){
    
    if(game.scene.isPaused("default")) game.scene.resume("default");

    else{ 
        game.scene.start("PauseScene");
        game.scene.resume("PauseScene");
        game.scene.bringToTop("PauseScene");
        game.scene.pause("level");  
    }
}


class PauseScene extends Phaser.Scene{

    constructor(configMenu){
        super(configMenu);

    }
    preload(){
        this.load.image("menu", '../../Resources/Sprites/Jogo/Pause/menu.png')
        this.load.image("gram+","../../Resources/Sprites/Jogo/Pause/gramof +.png" );
        this.load.image("gram-","../../Resources/Sprites/Jogo/Pause/gramof -.png" );
        this.load.spritesheet("volume", "../../Resources/Sprites/Jogo/Pause/volume-sheet.png", {frameWidth: 277, frameHeight: 64});
    }

    create(){
        var btn = this.add.image(600, 400, "menu");
        btn.setScrollFactor(0)
        btn.setInteractive();
        btn.on("pointerdown", () => hideMenu());

        var gramMais = this.add.image(805, 350+40, "gram+").setScale(0.8);
        var gramMenos = this.add.image(390, 380+40, "gram-");
        volume = this.add.sprite(585,400+40, "volume");

        gramMais.setInteractive();
        gramMais.on("pointerdown", () => updateVolume(1));
        gramMenos.setInteractive();
        gramMenos.on("pointerdown", () => updateVolume(-1));
            
        this.anims.create({
            key: "volume",
            frames: this.anims.generateFrameNumbers("volume", {start:0, end: 14}),
            frameRate:1,
            repeat:-1   
        });

        volume.anims.play("volume", true);
        volume.anims.pause(volume.anims.currentAnim.frames[volumeFrame]);
    }
}


function updateVolume(change){
    
    if (change==1){
        if(volumeFrame<14){
            console.log("volume +");
            volumeFrame = volumeFrame+1;
            volume.anims.play("volume", true);
            volume.anims.pause(volume.anims.currentAnim.frames[volumeFrame]);
        }
    }

    if(change==-1){
        if(volumeFrame>0){
            console.log("volume -");
            volumeFrame = volumeFrame-1;
            volume.anims.play("volume", true);
            volume.anims.pause(volume.anims.currentAnim.frames[volumeFrame]);
        }   
    }
}


function hideMenu(){
    game.scene.resume("level");
    game.scene.sendToBack("PauseScene");

    game.scene.pause("PauseScene");
    cursors.right.reset();
    cursors.left.reset();
    cursors.up.reset();
    cursors.down.reset();
}

function updatePadeira(scene){


	var config = {
	    mute: false,
	    volume: 3,
	    rate: 2,
	    loop: true
	}    
    
    if (Phaser.Input.Keyboard.JustDown(spacebar) && padeira.body.touching.down && !padeira.immobile){
       	if(stepsON){
        	stepsON = false;
        	steps.stop();
        }
    	
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
                    //if (pixelCollision(padeira, elementos[i].gameObject, scene))
                        elementos[i].gameObject.getHit(padeira.facingRight, padeira.damage);
                }
            }
        }
        
        else if (!padeira.weapon){
            padeira.immobile = true;
            padeira.body.offset.x = 20;
            if (padeira.facingRight == true){
                padeira.anims.play('padeira_attack0_R', true);
                playSound(game,"swoosh_0",{volume: 2});
                padeira.once('animationcomplete', () => {padeira.immobile = false;padeira.weapon = true;})
            }
            else{
                padeira.anims.play('padeira_attack0_L', true);
                playSound(game,"swoosh_0",{volume: 2});
                padeira.once('animationcomplete', () => {padeira.immobile = false;padeira.weapon = true;})
            }
        }
    }

    if (cursors.left.isDown && !padeira.immobile){
        padeira.body.setVelocityX(-350);
        padeira.facingRight = false
        if (padeira.body.touching.down){
        	if(!falling){
        		playSound(game,"fall",{volume: 1});
        		falling = true;
        	}
            if (!padeira.weapon){
            	if(!stepsON){
            		steps = playSound(game,'steps',config);
            		stepsON = true;
            	}
                padeira.anims.play('padeira_walk_L', true);
            }
            else{
            	if(!stepsON){
            		steps = playSound(game,'steps',config);
            		stepsON = true;
            	}
                padeira.anims.play('padeira_weapon_walk_L', true);
            }
        }

    }

    else if (cursors.right.isDown && !padeira.immobile){
        padeira.body.setVelocityX(350);
        padeira.facingRight = true
        if (padeira.body.touching.down){
        	if(!falling){
        		playSound(game,"fall",{volume: 1});
        		falling = true;
        	}
            if (!padeira.weapon){
            	if(!stepsON){
            		steps = playSound(game,'steps',config);
            		stepsON = true;
            	}
                padeira.anims.play('padeira_walk_R', true);
            }
            else{
            	if(!stepsON){
            		steps = playSound(game,'steps',config);
            		stepsON = true;
            	}
                padeira.anims.play('padeira_weapon_walk_R', true);
            }
        }

    }

    else if (padeira.body.touching.down){
    	padeira.body.setVelocityX(0)
        if (!padeira.weapon && !padeira.immobile){
        	if (stepsON){
        		stepsON = false;
        		steps.stop();
        	}
        	if(!falling){
        		playSound(game,"fall",{volume: 1});
        		falling = true;
        	}
        	if(padeira.facingRight == true)
        	  	padeira.anims.play('padeira_idle_R', true);
        	else
        		padeira.anims.play('padeira_idle_L', true);
        }
        else if (padeira.weapon && !padeira.immobile){
        	if (stepsON){
        		stepsON = false;
        		steps.stop();
        	}
        	if(padeira.facingRight == true)
        	  	padeira.anims.play('padeira_weapon_idle_R', true);
        	else
        		padeira.anims.play('padeira_weapon_idle_L', true);
        }
    }
    
    if (cursors.up.isDown && padeira.body.touching.down){
    	if (stepsON){
        		stepsON = false;
        		steps.stop();
        }
		falling = false;
        padeira.body.setVelocityY(-650);
        if (padeira.facingRight == true){
            if (!padeira.weapon){
                padeira.anims.play('padeira_jump_R', true);
            }
            else
                padeira.anims.play('padeira_weapon_jump_R', true);
        }

        else{
            if (!padeira.weapon){
                padeira.anims.play('padeira_jump_L', true);
            }
            else
                padeira.anims.play('padeira_weapon_jump_L', true);
        }
    }
    
    else if (!padeira.body.touching.down){
        if (stepsON){
        		stepsON = false;
        		steps.stop();
        }
        if (padeira.body.velocity.y >= 0){
            if (padeira.facingRight == true){
                if (!padeira.weapon)
                    padeira.anims.play('padeira_fall_R', true);
                else
                    padeira.anims.play('padeira_weapon_fall_R', true);
            }

            else
                if (!padeira.weapon)
                    padeira.anims.play('padeira_fall_L', true);
                else
                    padeira.anims.play('padeira_weapon_fall_L', true);
        }
    }
    
}

function spawnCarroca(){
    console.log("yay");
    drop.destroy();
}

// Need armor getting spanked sound

function updateEnemies(enemy, scene){

    var x_padeira = padeira.body.x;
    var x_objetivo = objective.body.x;

    if (Math.abs(enemy.body.x - x_padeira) > Math.min(Math.abs(enemy.body.x - x_objetivo) , Math.abs(enemy.body.x - (x_objetivo + objective.body.width))))
        var closer = objective;
    else
        var closer = padeira;
        
    if (!enemy.alive() && !enemy.immobile){
        enemy.anims.play('c_s_death_R', true);
        enemy.immobile = true;
        enemy.once('animationcomplete', () => {
            score += enemy.value;
            scoreText.setText(score);
            enemy.destroy();
        });
    }

    else if (enemy.alive() && !enemy.immobile){
        if (enemy.body.touching.down){
            if (enemy.body.x > closer.body.x + closer.body.width + enemy.range){
                enemy.moveLeft();
                enemy.anims.play('c_s_walk_R', true);
            }

            else if (enemy.body.x < closer.body.x - enemy.range){   
                enemy.moveRight();
                enemy.anims.play('c_s_walk_R', true);              
            }

            else{
                enemy.immobile = true;
                enemy.body.setVelocityX(0)
                enemy.anims.play('c_s_attack_L', true);
                enemy.once('animationcomplete', () => {
                    var array = enemy.getAttackingHitbox(); 
                    //scene.add.rectangle(Math.round(enemy.x) + array[0] + Math.round(array[2]/2), enemy.y + array[1] + Math.round(array[3]/2), array[2], array[3], 0xff0000);
                    var elementos = scene.physics.overlapRect(Math.round(enemy.x) + array[0], enemy.y + array[1], array[2], array[3]);
                    for (var i = 0; i < elementos.length; i++){
                        if (elementos[i].gameObject == padeira){ 
                            //if (pixelCollision(enemy, elementos[i].gameObject, scene))    
                                elementos[i].gameObject.getHit(enemy.facingRight, enemy.damage, scene,healthMeter);


                        }
                        else if (elementos[i].gameObject == objective){
                            elementos[i].gameObject.getHit(enemy.damage);
                        }
                    }
                    enemy.immobile = false;
                    });
            }
        }
    }
}


function pixelCollision(s1, s2, scene){

    var xs1 = s1.x - s1.width / 2;
    var xs2 = s2.x - s2.width / 2
    var ys1 = s1.y - s1.height / 2;
    var ys2 = s2.y - s2.height / 2;

    var xMin = Math.max(xs1, xs2);
    var xMax = Math.min(xs1 + s1.width, xs2 + s2.width);
    var yMin = Math.max(ys1, ys2);
    var yMax = Math.min(ys1 + s1.height, ys2 + s2.height);

    for (var y = yMin; y < yMax; y++){  
        for (var x = xMin; x < xMax; x++){

            var xlocalA = Math.round(x - xs1);
            var ylocalA = Math.round(y - ys1);
                
            var xlocalB = Math.round(x - xs2);
            var ylocalB = Math.round(y - ys2);

            var a1 = scene.textures.getPixelAlpha(Math.round(xlocalA), Math.round(ylocalA), s1.anims.getCurrentKey(), s1.anims.currentFrame.textureFrame);
            var a2 = scene.textures.getPixelAlpha(Math.round(xlocalB), Math.round(ylocalB), s2.anims.getCurrentKey(), s2.anims.currentFrame.textureFrame); 
            
            if (a1 != 0 && a2 != 0) return true;           
        }
    }
    return false;   
}


function updatePortal(portal, scene){

	if(!openP){
		portal.anims.play('portalO',true);
		portal.once('animationcomplete', () => {openP = true; inicio = new Date().getTime(); endP = false;})
    }
    
	else if(openP && !endP){
		fim = new Date().getTime();
		portal.anims.play('portal',true);
		if(fim - inicio > 3000){
			endP = true;
        } 
    }
    
	else{
		portal.anims.play('portalE',true);
		portal.once('animationcomplete', () => {portal.destroy();})
	}
}


function updateBackgroud(scene){

    if (objective.healthPoints / 50 >= 66) background.anims.play('sky1', true);

    else if (objective.healthPoints / 50 >= 33) background.anims.play('sky2', true);

    else background.anims.play('sky3', true);
}
