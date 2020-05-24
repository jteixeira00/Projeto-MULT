class GameOver extends Phaser.Scene{
    
    constructor(gameOver, score){
        super(gameOver);
        
    }
    preload(){
        this.load.image("back_btn", '../../Resources/Sprites/Game Over/gameover_back.png')
        this.load.image("background","../../Resources/Sprites/Game Over/gameover.png" );
        
    }

    create(){
        var bckground = this.add.image(600, 400, "background");

        var padera = this.add.sprite(600, 738, "padeira_death");
        padera.anims.play("padeira_death",true);

        var pepe_1 = this.add.sprite(250, 734, "pepehands");
        pepe_1.anims.play("pepehands",true);

        var pepe_2 = this.add.sprite(950, 734, "pepehands");
        pepe_2.anims.play("pepehands",true);
        pepe_2.flipX = true;

        bckground.setScrollFactor(0);
        var btn = this.add.image(70, 740, "back_btn");
        btn.setScrollFactor(0)
        btn.setInteractive();
        btn.on("pointerdown", () => Voltar());
        scoreText =  this.add.text(600, 400, score, { fontFamily: "font1", fontSize: '40px', fill: '#ff0000' });
    }
}