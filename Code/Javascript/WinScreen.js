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


        var stringScore = score.toString();
        var size = stringScore.length
       
        scoreText =  this.add.text(590 - size * 8, 420, score, { fontFamily: "font1", fontSize: '40px', fill: '#875214' });

        var text_1 =  this.add.text(458, 300, "Vitoria, Vitoria,", { fontFamily: "font1", fontSize: '40px', fill: '#875214' });
        var text_2 =  this.add.text(396, 340, "Acabou-se a Historia!", { fontFamily: "font1", fontSize: '40px', fill: '#875214' });
        
    }
}