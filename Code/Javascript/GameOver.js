class GameOver extends Phaser.Scene{

    constructor(gameOver){
        super(gameOver);

    }
    preload(){
        this.load.image("back_btn", '../../Resources/Sprites/gameover_back.png')
        this.load.image("background","../../Resources/Sprites/gameover.png" );
        
    }

    create(){
        var bckground = this.add.image(600, 400, "background");
        bckground.setScrollFactor(0);
        var btn = this.add.image(600, 400, "back_btn");
        btn.setScrollFactor(0)
        btn.setInteractive();
        btn.on("pointerdown", () => Voltar());

    }
}