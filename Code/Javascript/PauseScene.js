class PauseScene extends Phaser.Scene{

    constructor(configMenu){
        super(configMenu);

    }
    preload(){
        this.load.image("menu", '../../Resources/Sprites/Jogo/Pause/menu.png')
        this.load.image("gram+","../../Resources/Sprites/Jogo/Pause/gramof +.png" );
        this.load.image("gram-","../../Resources/Sprites/Jogo/Pause/gramof -.png" );
        this.load.image("resume", "../../Resources/Sprites/Jogo/Pause/resume.png");
        this.load.spritesheet("volume", "../../Resources/Sprites/Jogo/Pause/volume-sheet.png", {frameWidth: 277, frameHeight: 64});
        this.load.image("voltar","../../Resources/Sprites/Jogo/Pause/voltar.png");
    }

    create(){
        this.add.image(600, 400, "menu");
        var btn = this.add.image(810, 530, "resume");
        btn.setScrollFactor(0);
        btn.setInteractive();
        btn.on("pointerdown", () => hideMenu());
        var back = this.add.image(390, 530, "voltar"); 
        back.setInteractive();
        back.on("pointerdown", () => Voltar());
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