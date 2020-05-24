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
var carrinho;
var inicio;
var falling;
var fim;
var endP;
var stepsON;
var healthMeter;
var objectiveHealthMeter;
var volume;
var volumeFrame = 7;
var drop;
var drops;
var enemyCount = 0;
var masterW;
var musicTrack;
var mapElements;
var WaveCount = 0;
var growth;
var cart = false;

var currentLevel;

var softBurn;
var hardBurn;
var waitsoftBurn = false;
var waithardBurn = false;



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

var gameOver ={
    key: 'GameOver',
    active: true,
    visible: true
}

var selectLevel = {
    key: 'LevelSelect',
    active: true,
    visible: true
}



class LevelSelection extends Phaser.Scene{

    constructor(configMenu){
        super(configMenu);

    }
    preload(){
        this.load.image("background", '../../Resources/Sprites/Level Select/background.png');
        this.load.image("1", '../../Resources/Sprites/Level Select/1.png');
        this.load.image("2", '../../Resources/Sprites/Level Select/2.png');
    }

    create(){
        var background = this.add.image(600,400,"background");
        var lvl1 = this.add.image(400, 400, "1");
        var lvl2 = this.add.image(800,400, "2");
        lvl1.setInteractive();
        lvl2.setInteractive();
       
        lvl1.on("pointerdown", () => setlevel(1));
        lvl2.on("pointerdown",() => setlevel(2));
    }


    
    
}


function setlevel(level){
    currentLevel = level;
    
    lvlselect.destroy(true);
    game = new Phaser.Game(config);
    

}


var LevelSelectionScene = new LevelSelection();
var lvlselectConfig = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 800,
    scene: LevelSelectionScene
}



var lvlselect = new Phaser.Game(lvlselectConfig);
var game;  





window.addEventListener("message", messageHandler);
function messageHandler(ev){
    masterW = ev.source;
    var aux = ev.data;
    console.log(aux);
    if(aux>=0 || aux<=15){
        volumeFrame = ev.data;
    }
    
    
    console.log(aux);
    
}


function preload(){



    mapElements = platformsDesign(this,currentLevel);
    this.load.spritesheet('sky', mapElements[9], { frameWidth: 2400, frameHeight: 800 });
    this.load.image('ground', '../../Resources/Sprites/Jogo/lvl1/chao.png');
    this.load.image('plataforma', '../../Resources/Sprites/Jogo/lvl1/plataforma.png');
    this.load.image('pause_btn', '../../Resources/Sprites/Jogo/Pause/Pausar.png');
    
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
    
    this.load.spritesheet('carrinho', '../../Resources/Sprite Sheets/Carrinho/carrinho.png',{ frameWidth: 118, frameHeight: 108 });
    this.load.spritesheet('health', '../../Resources/Sprite Sheets/HUD/health bread.png',{ frameWidth: 88, frameHeight: 16 });
    this.load.spritesheet('healthBarCasa', '../../Resources/Sprites/Jogo/lvl1/healthbar.png',{ frameWidth: 120, frameHeight: 40 });

    this.load.audio('level1_music', '../../Resources/Sounds/level1_music.wav');
    this.load.audio('level2_music', '../../Resources/Sounds/level2_music.mp3');
    this.load.audio('swoosh_0', '../../Resources/Sounds/swoosh_0.wav');  
    this.load.audio('swoosh_1', '../../Resources/Sounds/swoosh_1.wav'); 
    this.load.audio('swoosh_2', '../../Resources/Sounds/swoosh_2.wav');
    this.load.audio('metal_1', '../../Resources/Sounds/metal_1.mp3');  
    this.load.audio('metal_2', '../../Resources/Sounds/metal_2.mp3'); 
    this.load.audio('metal_3', '../../Resources/Sounds/metal_3.mp3');  
    this.load.audio('HeavyHit_1', '../../Resources/Sounds/HeavyHit_1.mp3');  
    this.load.audio('HeavyHit_2', '../../Resources/Sounds/HeavyHit_2.mp3'); 
    this.load.audio('bigWoosh', '../../Resources/Sounds/bigWoosh.mp3'); 
    this.load.audio('HeavyDeath', '../../Resources/Sounds/HeavyDeath.mp3'); 
    this.load.audio('slash_1', '../../Resources/Sounds/slash_1.mp3');  
    this.load.audio('slash_2', '../../Resources/Sounds/slash_2.mp3'); 
    this.load.audio('slash_3', '../../Resources/Sounds/slash_3.mp3'); 
    this.load.audio('HeavyWalk', '../../Resources/Sounds/HeavyWalk.mp3');
    this.load.audio('padeiraHit', '../../Resources/Sounds/padeiraHit.mp3');
    this.load.audio('hitWood', '../../Resources/Sounds/hitWood.wav');
    this.load.audio('softBurn', '../../Resources/Sounds/softBurn.wav');
    this.load.audio('hardBurn', '../../Resources/Sounds/hardBurn.wav');
    this.load.audio('smallDeath', '../../Resources/Sounds/smallDeath.mp3')  
    this.load.audio('steps', '../../Resources/Sounds/audiosteps.wav'); 
    this.load.audio('cart', '../../Resources/Sounds/wooden_cart.mp3'); 
    this.load.audio('fall', '../../Resources/Sounds/fall.mp3'); 
    this.load.audio('cartGet', '../../Resources/Sounds/cartGet.wav');  
    this.load.audio('medievalDeath', '../../Resources/Sounds/medievalDeath.wav');    
}


function loadAnim(scene){

    scene.anims.create({
        key: 'carrinho',
        frames: scene.anims.generateFrameNumbers('carrinho', { start: 0, end: 19 }),
        frameRate: 15,
        repeat: 0
    });

    scene.anims.create({
        key: 'portal',
        frames: scene.anims.generateFrameNumbers('portal_anim', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });

        scene.anims.create({
        key: 'portalO',
        frames: scene.anims.generateFrameNumbers('portal_op', { start: 0, end: 5 }),
        frameRate: 20,
        repeat: 0
    });

        scene.anims.create({
        key: 'portalE',
        frames: scene.anims.generateFrameNumbers('portal_ed', { start: 0, end: 7 }),
        frameRate: 20,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_attack_R',
        frames: scene.anims.generateFrameNumbers('c_h_attack_R', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_attack_L',
        frames: scene.anims.generateFrameNumbers('c_h_attack_L', { start: 9, end: 4 }),
        frameRate: 8,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_walk_R',
        frames: scene.anims.generateFrameNumbers('c_h_walk_R', { start: 0, end: 9 }),
        frameRate: 5,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_h_walk_L',
        frames: scene.anims.generateFrameNumbers('c_h_walk_L', { start: 9, end: 0 }),
        frameRate: 5,
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
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_m_attack_L',
        frames: scene.anims.generateFrameNumbers('c_m_attack_L', { start: 9, end: 4 }),
        frameRate: 10,
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
        frameRate: 30,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_walk_L',
        frames: scene.anims.generateFrameNumbers('c_s_walk_L', { start: 9, end: 0 }),
        frameRate: 30,
        repeat: 0
    });

	scene.anims.create({
        key: 'c_s_idle_R',
        frames: scene.anims.generateFrameNumbers('c_s_idle_R', { start: 0, end: 3 }),
        frameRate: 14,
        repeat: 0
    });

	scene.anims.create({
        key: 'c_s_idle_L',
        frames: scene.anims.generateFrameNumbers('c_s_idle_L', { start: 3, end: 0 }),
        frameRate: 14,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_death_R',
        frames: scene.anims.generateFrameNumbers('c_s_death_R', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'c_s_death_L',
        frames: scene.anims.generateFrameNumbers('c_s_death_L', { start: 7, end: 0 }),
        frameRate: 10,
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
    
	var configLvlMusic = {
        mute: false,
        volume: 1*(volumeFrame/10),
        loop: true
    }

    if(currentLevel == 1)
    	musicTrack = playSound(this,"level1_music",configLvlMusic);
    else if(currentLevel == 2)
        musicTrack = playSound(this,"level2_music",{volume: 0.7*(volumeFrame/10),loop: true});

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
    objectiveHealthMeter = this.add.sprite( 1050, 760, 'healthBarCasa');

    this.anims.create({
        key: "health",
        frames: this.anims.generateFrameNumbers("health", {start:0, end: 9}),
        frameRate:1,
        repeat:-1   
    });
    
    this.anims.create({
        key: "healthBarCasa",
        frames: this.anims.generateFrameNumbers("healthBarCasa", {start:0, end: 44}),
        frameRate:1,
        repeat:-1   
    });

    healthMeter.setScrollFactor(0);
    healthMeter.anims.play("health", true);
    healthMeter.anims.pause(healthMeter.anims.currentAnim.frames[9]);
    healthMeter.setScale(3);

    objectiveHealthMeter.setScrollFactor(0);
    objectiveHealthMeter.anims.play("healthBarCasa", true);
    objectiveHealthMeter.anims.pause(objectiveHealthMeter.anims.currentAnim.frames[0]);
    objectiveHealthMeter.setScale(3);
    
    var pause_btn = this.add.image(1120,60, 'pause_btn');
    pause_btn.setScrollFactor(0)
    pause_btn.setInteractive();
    pause_btn.on("pointerdown", () => pause());
    
    score = 0;
    scoreText =  this.add.text(24, 36, '0', { fontFamily: "font1", fontSize: '40px', fill: '#cfae5c' });
    scoreText.setScrollFactor(0);
    
    enemies = this.add.group();
    portals = this.add.group();
    
    platforms = this.physics.add.staticGroup();
    var plat = mapElements[0];
    for(var i = 0; i < plat.length; i++){
        platforms.create(plat[i][0], plat[i][1], plat[i][2]);
    }
    growth = mapElements[3];
    
    objective = new Objective(mapElements[5], mapElements[6], this, mapElements[7], mapElements[8]);
    padeira = new Padeira(500, 50, this, 1200, 0, 'padeira_idle_R',game);
    
    this.physics.add.collider(objective, platforms);
    this.physics.add.collider(padeira, platforms);
    this.physics.add.collider(enemies, platforms);
    //this.physics.add.collider(enemies, enemies);

    this.time.delayedCall(4000, () => {genesis(this);}, null, this);
    
    this.cameras.main.setBounds(0, 0, 2400, 800);
    this.cameras.main.startFollow(padeira);
    
    loadAnim(this);
    
    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    game.scene.add("PauseScene", PauseScene, false);
    game.scene.add("GameOver", GameOver, false);
    
    drops = this.add.group();
    this.physics.add.collider(drops, platforms);
    this.physics.add.overlap(padeira, drops, () => { spawnCarroca(this)} );
    
    tempocarroca(this);
}

function endWave(){
    var vidaPadeira = (500) * 0.3 + padeira.healthPoints;
    if(vidaPadeira > 500){
        padeira.damage = padeira.damage + Math.round((vidaPadeira-500)/5)
    }
    else{
        padeira.healthPoints = vidaPadeira;
        padeira.updateHealth(healthMeter);
    }

    var vidaCasa = (5000) * 0.2 + objective.healthPoints;
    if(vidaCasa > 5000){
        padeira.damage = padeira.damage + 10
    }
    else{
        objective.healthPoints = vidaCasa;
        objective.updateHealth(objectiveHealthMeter);
    }
}


function genesis(game){
    WaveCount++;
    var portals_array = mapElements[1];
    var waveNumber = mapElements[4];    
    if(enemyCount == 0){
        var wave = dificuldade(mapElements[2],mapElements[3],portals_array,0);
        const sizeWave = wave.length;
        var i = 0;
        
        let waveGenesis = setInterval(() => { 
            if(wave[i][2] == "S"){
                new Portal(game, wave[i][0], wave[i][1], 'portal',portals,"S");
                new CastelhanoSmall(game, wave[i][0], wave[i][1], 'c_s_idle_R', enemies);
                enemyCount += 1;
            }
            if(wave[i][2] == "M"){
                new Portal(game, wave[i][0], wave[i][1], 'portal',portals,"M");
                new CastelhanoMedium(game, wave[i][0], wave[i][1], 'c_m_idle_R', enemies);
                enemyCount += 1;
            }
            if(wave[i][2] == "H"){
                new Portal(game, wave[i][0], wave[i][1] - 20, 'portal',portals,"H");
                new CastelhanoHeavy(game, wave[i][0], wave[i][1] - 72, 'c_h_idle_R', enemies);
                enemyCount += 1;
            }
            i++;
            if(i == sizeWave) clearInterval(waveGenesis);
        }, 1000);
    }

}


function randInt(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function dificuldade(start,growth,arrayPortais){
    var array = [];
    var aux = [];
    var enemyType;
    var enemyNumber = Math.round(start * 5 + growth * WaveCount)
    alert(enemyNumber + "\nWAVE " + WaveCount);
    growth *= growth;

    for(var i = 0; i < enemyNumber;i++){
        const index = arrayPortais[randInt(0,arrayPortais.length)];
        const enemyProb = randInt(0,100);
        if(enemyProb % 10 == 0){
            enemyType = "H";
            index[1] = index[1];
        }
        else if(enemyProb % 5 == 0){
            enemyType = "M";
        }
        else
            enemyType = "S";

        array.push([index[0],index[1],enemyType]);
    }

    return array;
}


function GameOverS(){
    game.scene.pause("level"); 
    musicTrack.stop();
    if(waithardBurn)
        hardBurn.stop();
    if(waitsoftBurn)
        softBurn.stop();
    playSound(game,"medievalDeath",{volume: 1.2*(volumeFrame/10)});
    game.scene.start("GameOver");
    game.scene.resume("GameOver");
    game.scene.bringToTop("GameOver");

     
}


function update (){

    if (padeira.healthPoints <= 0 || objective.healthPoints <= 0){
        console.log("end");
        //game over
        GameOverS();
    }

    updatePadeira(this);

    for (var i = 0; i < portals.getChildren().length; i++)
    	updatePortal(portals.getChildren()[i], this);
    
    for (var i = 0; i < enemies.getChildren().length; i++)
        updateEnemies(enemies.getChildren()[i], this);
    
    if (carrinho) updateCarro();
    
    updateBackgroud(this);
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


function Voltar(){
    console.log("voltar");
    masterW.postMessage("voltar","*");
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
    musicTrack.setVolume(1*(volumeFrame/10))
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


function damageCastelaSound(height){

    if(height != 208){
        var num = randInt(1,4)
        if(num == 1)
            playSound(game,"metal_1",{volume: 0.2*(volumeFrame/10)});
        if(num == 2)
            playSound(game,"metal_2",{volume: 0.2*(volumeFrame/10)});
        if(num == 3)
            playSound(game,"metal_3",{volume: 0.2*(volumeFrame/10)});
    }
    else{
        var num = randInt(1,3)
        if(num == 1)
            playSound(game,"HeavyHit_1",{volume: 0.6*(volumeFrame/10)});
        if(num == 2)
            playSound(game,"HeavyHit_2",{volume: 0.6*(volumeFrame/10)});
    }
}

function castelaAttack(height){
    var configS = {
        volume: 1.2*(volumeFrame/10)
    }    

    if(height != 208){
        var num = randInt(1,4)
        if(num == 1)
            playSound(game,"slash_1",configS);
        if(num == 2)
            playSound(game,"slash_2",configS);
        if(num == 3)
            playSound(game,"slash_3",configS);
    }
    else{
        playSound(game,"bigWoosh",configS);

    }
}


function updatePadeira(scene){

	var config = {
	    mute: false,
	    volume: 3*(volumeFrame/10),
	    rate: 2,
	    loop: true
	}    
    
    if (Phaser.Input.Keyboard.JustDown(spacebar) && padeira.body.touching.down && !padeira.immobile){
       	if(stepsON){
        	stepsON = false;
        	steps.stop();
        }
    	
        if (padeira.weapon){
            
            var array = padeira.updateAttackingHitbox(volumeFrame);

            padeira.immobile = true;
            padeira.anims.play(array[0], true);
            padeira.once('animationcomplete', () => {padeira.immobile = false;});
            padeira.updateAnimationCounter(); 
            
            var elementos = scene.physics.overlapRect(padeira.x + array[1], padeira.y + array[2], array[3], array[4]);
            for (var i = 0; i < elementos.length; i++){
                if (enemies.contains(elementos[i].gameObject)){
                    //if (pixelCollision(padeira, elementos[i].gameObject, scene))
                        damageCastelaSound(elementos[i].gameObject.body.height);
                        elementos[i].gameObject.getHit(padeira.facingRight, padeira.damage);
                }
            }
        }
        
        else if (!padeira.weapon){
            padeira.immobile = true;
            padeira.body.offset.x = 20;
            if (padeira.facingRight == true){
                padeira.anims.play('padeira_attack0_R', true);
                playSound(game,"swoosh_0",{volume: 1*(volumeFrame/10)});
                padeira.once('animationcomplete', () => {padeira.immobile = false;padeira.weapon = true;})
            }
            else{
                padeira.anims.play('padeira_attack0_L', true);
                playSound(game,"swoosh_0",{volume: 1*(volumeFrame/10)});
                padeira.once('animationcomplete', () => {padeira.immobile = false;padeira.weapon = true;})
            }
        }
    }

    if (cursors.left.isDown && !padeira.immobile){
        padeira.body.setVelocityX(-350);
        padeira.facingRight = false
        if (padeira.body.touching.down){
        	if(!falling){
        		playSound(game,"fall",{volume: 0.6*(volumeFrame/10)});
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
        		playSound(game,"fall",{volume: 0.6*(volumeFrame/10)});
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
        		playSound(game,"fall",{volume: 0.6*(volumeFrame/10)});
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
        	if(!falling){
        		playSound(game,"fall",{volume: 0.6*(volumeFrame/10)});
        		falling = true;
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
        falling = false;
        if (padeira.body.velocity.y >= 0){
            if (padeira.facingRight == true){
                if (!padeira.weapon)
                    padeira.anims.play('padeira_fall_R', true);
                else
                    padeira.anims.play('padeira_weapon_fall_R', true);
            }

            else{
                if (!padeira.weapon)
                    padeira.anims.play('padeira_fall_L', true);
                else
                    padeira.anims.play('padeira_weapon_fall_L', true);
            }
        }
    }
    
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
        drop.setDepth(1);
        drops.add(drop);
    }

    else if(drops.getChildren().length == 1) drop.destroy();
}


function spawnCarroca(scene){
    drop.destroy();
    playSound(game,"cartGet",{volume: 0.8*(volumeFrame/10)});
    carrinho = scene.add.sprite(0, 600, "carrinho");
    scene.physics.world.enableBody(carrinho, 0);
    scene.physics.add.collider(carrinho, platforms);
    scene.physics.add.overlap(enemies, carrinho, atropelar, null, scene);
}


function atropelar(enemy, carro){
    enemy.getHit(true, 1000);
    damageCastelaSound(enemy.body.height);
}


function updateCarro(){
    var config = {
        volume: 0.7*(volumeFrame/10),
        rate: 2,
        loop: false
    } 
    carrinho.anims.play("carrinho", true);
    carrinho.body.setVelocityX(1000);
    if(!cart){
        playSound(game,'cart',config);
        cart = true;
    }

    if (carrinho.body.x > 2400) {
        carrinho.destroy();
        carrinho = null;
        cart = false;
    }
}


function updateEnemies(enemy, scene){

    var x_padeira = padeira.body.x;
    var x_objetivo = objective.body.x;

    if (Math.abs(enemy.body.x - x_padeira) > Math.min(Math.abs(enemy.body.x - x_objetivo) , Math.abs(enemy.body.x - (x_objetivo + objective.body.width))) || enemy.body.height == 208){
        var closer = objective;
    }
    else{
        var closer = padeira;
    }
        
    if (!enemy.alive() && !enemy.immobile){
    	if (enemy.facingRight){

            enemyCount -= 1;
            if(enemyCount == 0 && WaveCount != mapElements[4])
                scene.time.delayedCall(9000, () => {endWave();genesis(scene);}, null, this);
            
    		if(enemy.body.height == 104){
                playSound(game,"smallDeath",{volume: (volumeFrame/10)});
    	        enemy.anims.play('c_s_death_R', true);
    	    }
    	    else if(enemy.body.height == 105){
                playSound(game,"smallDeath",{volume: (volumeFrame/10)});
    	        enemy.anims.play('c_m_death_R', true);
    	    }
    	    else{
                playSound(game,"HeavyDeath",{volume: (volumeFrame/10)});
    	    	enemy.anims.play('c_h_death_R', true);
    	    }
        }
    	else{
            enemyCount -= 1;
            if(enemyCount == 0 && WaveCount != mapElements[4])
                scene.time.delayedCall(9000, () => {endWave();genesis(scene);}, null, this);
    		if(enemy.body.height == 104){
                playSound(game,"smallDeath",{volume: (volumeFrame/10)});
    			enemy.anims.play('c_s_death_L', false);
    		}
    		else if(enemy.body.height == 105){
                playSound(game,"smallDeath",{volume: (volumeFrame/10)});
    	        enemy.anims.play('c_m_death_L', true);
    	    }
    	    else{
                playSound(game,"HeavyDeath",{volume: (volumeFrame/10)});
    	    	enemy.anims.play('c_h_death_L', true);
    	    }
    	}
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
                if(enemy.body.height == 104){
               		enemy.anims.play('c_s_walk_L', true);
            	}
            	else if(enemy.body.height == 105){
               		enemy.anims.play('c_m_walk_L', true);
            	}
            	else{
            		enemy.anims.play('c_h_walk_L', true);
            	}
            }

            else if (enemy.body.x < closer.body.x - enemy.range){   
                enemy.moveRight();
                if(enemy.body.height == 104){
                    enemy.anims.play('c_s_walk_R', true);
                }
                else if(enemy.body.height == 105){
                    enemy.anims.play('c_m_walk_R', true);
                } 
                else{
                	enemy.anims.play('c_h_walk_R', true);
                }              
            }

            else{
                enemy.immobile = true;
                enemy.body.setVelocityX(0)
                if (enemy.facingRight && enemy.body.touching.down){
                	if(enemy.body.height == 104){
                        castelaAttack(enemy.body.body);
                	    enemy.anims.play('c_s_attack_R', true);
                	}
                	else if(enemy.body.height == 105){
                        castelaAttack(enemy.body.body);
                	    enemy.anims.play('c_m_attack_R', true);
                	}
                	else{
                        castelaAttack(enemy.body.body);
                		enemy.anims.play('c_h_attack_R', true);
                	}
                }
                else{
                	if(enemy.body.height == 104){
                        castelaAttack(enemy.body.body);
                	  	enemy.anims.play('c_s_attack_L', true);
                	}
                	else if(enemy.body.height == 105){
                        castelaAttack(enemy.body.body);
                	  	enemy.anims.play('c_m_attack_L', true);
                	}
                	else{
                        castelaAttack(enemy.body.body);
                		enemy.anims.play('c_h_attack_L', true);
                	}
                }
                enemy.once('animationcomplete', () => {
                    var array = enemy.getAttackingHitbox(); 
                    // scene.add.rectangle(Math.round(enemy.x) + array[0] + Math.round(array[2]/2), enemy.y + array[1] + Math.round(array[3]/2), array[2], array[3], 0xff0000);
                    var elementos = scene.physics.overlapRect(Math.round(enemy.x) + array[0], enemy.y + array[1], array[2], array[3]);
                    for (var i = 0; i < elementos.length; i++){
                        if (elementos[i].gameObject == padeira){ 
                            //if (pixelCollision(enemy, elementos[i].gameObject, scene))    
                                playSound(game,"padeiraHit",{volume: 0.4*(volumeFrame/10)});
                                elementos[i].gameObject.getHit(enemy.facingRight, enemy.damage, scene, healthMeter);
                        }
                        else if (elementos[i].gameObject == objective){
                            playSound(game,"hitWood",{volume: 0.4*(volumeFrame/10)});
                            elementos[i].gameObject.getHit(enemy.damage, objectiveHealthMeter);  
                        }
                    }
                    enemy.immobile = false;
                    });
            }
        }
    }
}


function pixelCollision(s1, s2, scene){

    var sprite1 = scene.textures.getFrame(s1.anims.getCurrentKey(), s1.anims.currentFrame.textureFrame);
    var sprite2 = scene.textures.getFrame(s2.anims.getCurrentKey(), s2.anims.currentFrame.textureFrame);
    var datas1 = sprite1.data.cut;
    var datas2 = sprite2.data.cut;

    var ctx = scene.textures._tempContext;

    if (sprite1 && sprite2){
        
        var xs1 = s1.x - s1.width / 2;
        var xs2 = s2.x - s2.width / 2;
        var ys1 = s1.y - s1.height / 2;
        var ys2 = s2.y - s2.height / 2;

        var xMin = Math.max(xs1, xs2);
        var xMax = Math.min(xs1 + s1.width, xs2 + s2.width);
        var yMin = Math.max(ys1, ys2);
        var yMax = Math.min(ys1 + s1.height, ys2 + s2.height);

        if (xMax - xMin > 0 && yMax - yMin > 0){

            ctx.clearRect(0, 0, sprite1.source.image.width, sprite1.source.image.height);
            ctx.drawImage(sprite2.source.image, 0, 0, sprite1.source.image.width, sprite1.source.image.height);
            var imageDataS1 = ctx.getImageData(0, 0, sprite1.source.image.width, sprite1.source.image.height);
            
            ctx.clearRect(0, 0, sprite2.source.image.width, sprite2.source.image.height);
            ctx.drawImage(sprite2.source.image, 0, 0, sprite2.source.image.width, sprite2.source.image.height);
            var imageDataS2 = ctx.getImageData(0, 0, sprite2.source.image.width, sprite2.source.image.height);

            for (var y = 0; y < yMax - yMin; y++){  
                for (var x = 0; x < xMax - xMin; x++){

                    var xlocalA = Math.round(x - xs1);
                    var ylocalA = Math.round(y - ys1);
                    var xlocalB = Math.round(x - xs2);
                    var ylocalB = Math.round(y - ys2);

                    xlocalA += datas1.x - sprite1.x
                    ylocalA += datas1.y - sprite1.y
                    var pixelNumS1 = xlocalA + ylocalA * s1.width;

                    xlocalB += datas2.x - sprite2.x
                    ylocalB += datas2.y - sprite2.y
                    var pixelNumS2 = xlocalB + ylocalB * s2.width;
                    
                    var pixelPostAlphaS1 = pixelNumS1 * 4 + 3;
                    var pixelPostAlphaS2 = pixelNumS2 * 4 + 3;

                    var a1 = imageDataS1.data[pixelPostAlphaS1];
                    var a2 = imageDataS2.data[pixelPostAlphaS2];

                    if (a1 != 0 && a2 != 0) return true;           
                }
            }
        }
    }
    return false;   
}


function updatePortal(portal, scene){

	if(portal.enemy == "H")
		portal.setScale(1.5);

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

    if (objective.healthPoints / 50 >= 66){
        background.anims.play('sky1', true);
    }

    else if (objective.healthPoints / 50 >= 33){
        if(!waitsoftBurn){
            softBurn = playSound(game,"softBurn",{volume: 4*(volumeFrame/10),loop:true});
            waitsoftBurn = true;
            if(waithardBurn){
                hardBurn.stop();
                waithardBurn = false;
            }
        }
        background.anims.play('sky2', true);
    }

    else{
        if(!waithardBurn){
            hardBurn = playSound(game,"hardBurn",{volume: 3*(volumeFrame/10),loop:true});
            waithardBurn = true;
            if(waitsoftBurn){
                softBurn.stop();
                waitsoftBurn = false;
            }
        }
        background.anims.play('sky3', true);
    }
}
