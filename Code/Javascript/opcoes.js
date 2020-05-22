
var volumeFrame = 14;
var volume; 
var masterW;
var config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

(function(){
    window.addEventListener("load", create);
}());

var opcoes = new Phaser.Game(config);





function preload(){
    this.load.image("background","../Javascript/res/backgrund.png");
    this.load.image("gram+","../Javascript/res/gramof +.png" );
    this.load.image("gram-","../Javascript/res/gramof -.png" );
    this.load.image("banner","../Javascript/res/banner som.png"  );
    this.load.image("voltar", "../Javascript/res/voltar.png" );
    this.load.spritesheet("soundbar", "res/volume-sheet.png", {frameWidth: 294, frameHeight: 72});
}



function create(){
    
    this.add.image(600,400,"background");
    var gramMais = this.add.image(880, 335, "gram+");
    volume = this.add.sprite(600,400, "soundbar");
    gramMais.setInteractive();
    gramMais.on("pointerdown", () => updateVolume(1));
    var gramMenos = this.add.image(350, 380, "gram-");
    gramMenos.setInteractive();
    gramMenos.on("pointerdown", () => updateVolume(-1));
    this.add.image(600, 130, "banner");

    var voltarBtn = this.add.image(50, 700, "voltar");
    voltarBtn.setInteractive();
    voltarBtn.on("pointerdown",()=>Voltar());

    this.anims.create({
        key: "volume",
        frames: this.anims.generateFrameNumbers("soundbar", {start:0, end: 14}),
        frameRate:1,
        repeat:-1


    });
    volume.anims.play("volume", true);
    volume.anims.pause(volume.anims.currentAnim.frames[volumeFrame]);

}




function updateVolume(change){
    
    if (change==1){
        if(volumeFrame<14){
            console.log("volume +");
            volumeFrame = volumeFrame+1;
            masterW.postMessage(volumeFrame, "*");
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


}

function messageHandler(ev){
    masterW = ev.source;

}
    
function Voltar(){
    console.log("voltar");
    masterW.postMessage("voltar","*");


}

function update(){

    

}

