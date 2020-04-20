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
            gravity: { y: 20 },
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
    this.load.spritesheet('padeira_idle', 'Resources/Sprite Sheets/Padeira/Padeira_idle.png', { frameWidth: 72, frameHeight: 108 });
    this.load.spritesheet('padeira_walk_R', 'Resources/Sprite Sheets/Padeira/Padeira_walk_R.png', { frameWidth: 72, frameHeight: 108 });
    this.load.spritesheet('padeira_walk_L', 'Resources/Sprite Sheets/Padeira/Padeira_walk_L.png', { frameWidth: 72, frameHeight: 108 });
    this.load.spritesheet('padeira_jump_R', 'Resources/Sprite Sheets/Padeira/Padeira_jump_R.png', { frameWidth: 72, frameHeight: 108 });
    this.load.spritesheet('padeira_jump_L', 'Resources/Sprite Sheets/Padeira/Padeira_jump_L.png', { frameWidth: 72, frameHeight: 108 });
    this.load.spritesheet('padeira_fall_R', 'Resources/Sprite Sheets/Padeira/Padeira_fall_R.png', { frameWidth: 72, frameHeight: 108 });
    this.load.spritesheet('padeira_fall_L', 'Resources/Sprite Sheets/Padeira/Padeira_fall_L.png', { frameWidth: 72, frameHeight: 108 });
}


function create(){

    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 450, 'padeira_idle');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('padeira_walk_L', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('padeira_idle', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('padeira_walk_R', { start: 0, end: 5 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'jump_R',
        frames: this.anims.generateFrameNumbers('padeira_jump_R', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'jump_L',
        frames: this.anims.generateFrameNumbers('padeira_jump_L', { start: 3, end: 0 }),
        frameRate: 20,
        repeat: 0
    });

    this.anims.create({
        key: 'fall_R',
        frames: this.anims.generateFrameNumbers('padeira_fall_R', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'fall_L',
        frames: this.anims.generateFrameNumbers('padeira_fall_L', { start: 1, end: 0 }),
        frameRate: 20,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    
    this.physics.add.collider(player, platforms);
}

var atual // true = direita, false = esquerda

function update (){


    if (gameOver)
        return;

    if (cursors.left.isDown){
        player.setVelocityX(-300);

        if (player.body.touching.down)
            player.anims.play('left', true);
    }

    else if (cursors.right.isDown){
        player.setVelocityX(300);

        if (player.body.touching.down)
            player.anims.play('right', true);
    }

    else if (player.body.touching.down){
        player.setVelocityX(0);
        player.anims.play('idle', true);
    }
    
    if (cursors.up.isDown && player.body.touching.down){

        player.setVelocityY(-300);
        
        if (player.body.velocity.x >= 0){
            player.anims.play('jump_R', true);
            atual = true;
        }
        
        else{
            player.anims.play('jump_L', true);
            atual = false;
        }
    }
    
    else if (!player.body.touching.down){

        if (player.body.velocity.y >= 0){

            if (player.body.velocity.x >= 0){
                player.anims.play('fall_R', true);
            }

            else
                player.anims.play('fall_L', true);
        }

        else{

            if (!atual && player.body.velocity.x >= 0){
                player.anims.play('jump_R', false);
                atual = true;
            }

            else if (atual && player.body.velocity.x < 0){
                player.anims.play('jump_L', false);
                atual = false;
            }
        }
    }
}
