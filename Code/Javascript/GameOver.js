class GameOver extends Phaser.Scene{
    
    constructor(gameOver, score){
        super(gameOver);
        
    }
    preload(){
        this.load.image("back_btn", '../../Resources/Sprites/gameover_back.png')
        this.load.image("background","../../Resources/Sprites/gameover.png" );
        
    }

    create(){
        var bckground = this.add.image(600, 400, "background");
        bckground.setScrollFactor(0);
        var btn = this.add.image(50, 700, "back_btn");
        btn.setScrollFactor(0)
        btn.setInteractive();
        btn.on("pointerdown", () => Voltar());
        scoreText =  this.add.text(600, 400, score, { fontFamily: "font1", fontSize: '40px', fill: '#ff0000' });
    }
}