class WinScreen extends Phaser.Scene{

    constructor(configMenu, currentScene){
        super(configMenu);
        this.currentScene = currentScene;

    }
    preload(){
        this.load.image("menu", '../../Resources/Sprites/Jogo/Pause/menu.png');
        this.load.image("voltar","../../Resources/Sprites/Jogo/Pause/voltar.png");
    }

    create(){
        this.add.image(600, 400, "menu");
        var back = this.add.image(600, 530, "voltar"); 
        back.setInteractive();
        back.on("pointerdown", () => Voltar());
        
        
        scoreText =  this.add.text(600, 400, score, { fontFamily: "font1", fontSize: '40px', fill: '#875214' });
        
    }
}