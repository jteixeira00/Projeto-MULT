
var volumeFrame = 14;

var config = {
    type: Phaser.canvas,
    width: 1200,
    height: 800,
    scene: {
        preload: preload,
        create: create
    }
};

var opcoes = new Phaser.Game(config);

function preload(){
    this.load.image("background","../../Resources/Sprite/Opções/backgrund.png");
    this.load.image("gram+","../../Resources/Sprite/Opções/gramof +.png" );
    this.load.image("gram-","../../Resources/Sprite/Opções/gramof -.png" );
    this.load.image("banner","../../Resources/Sprite/Opções/banner som.png"  );
    this.load.spritesheet("soundbar", "../../Resources/Sprite Sheets/Opções/volume-sheet.png", {frameWidth: 350, frameHeight: 120});
}



function create(){
    
    this.add.image(0,0,"background");
    var gramMais = this.add.image(400, 800, "gram+");
    gramMais.setInteractive();
    gramMais.on("pointerdown", () => this.updateVolume(1));
    var gramMenos = this.add.image(400, 400, "gram-");
    gramMenos.setInteractive();
    gramMenos.on("pointerdown", () => this.updateVolume(-1));
    this.add.image(200, 600, "banner");

    this.anim.create({
        key: "volume",
        frames: this.anims.generateFrameNumbers("volume", {start:1, end: 14}),
        frameRate:10,
        repeat:-1


    });

    volume.anims.pause(volume.anims.currentAnim.frame[14]);


}

function updateVolume(change){
    
    if (change==1){
        if(volumeFrame<14){
            volumeFrame = volumeFrame+1;
            volume.anims.pause(volume.anims.currentAnim.frame[volumeFrame]);

        }
        
        console.log("volume +");
    }
    if(change==-1){
        if(volumeFrame>1){
            volumeFrame = volumeFrame-1;
            volume.anims.pause(volume.anims.currentAnim.frame[volumeFrame]);

        }
        console.log("volume -");
    }


} 