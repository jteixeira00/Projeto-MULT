class LevelSelection extends Phaser.Scene{

    constructor(configMenu){
        super(configMenu);

    }
    preload(){
        this.load.image("menu", '../../Resources/Sprites/Jogo/Pause/menu.png')
        
    }

    create(){
        var menu = this.add.image(600,400,"menu");
        menu.setScrollFactor(0);
        menu.setInteractive();
        menu.on("pointerdown", () => console.log("asdasd"));
    }
}