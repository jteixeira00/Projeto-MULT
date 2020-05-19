class Pessoa extends Phaser.GameObjects.Sprite{

    constructor(hp, dmg, scene, x, y, sprite){
        
        super(scene, x, y, sprite);
        
        this.healthPoints = hp;
        this.damage = dmg;
        this.immobile = false;
        this.facingRight = true;
        
        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0); 
        
        this.body.setBounce(0);
        this.body.setCollideWorldBounds(true);
    }

    pixelCollision(s1, s2){

        var xMin = Math.max(s1.x, s2.x);
        var xMax = Math.min(s1.x + s1.width, s2.x + s2.width);
        var yMin = Math.max(s1.y, s2.y);
        var yMax = Math.min(s1.y + s1.height, s2.y + s2.height);

        for (var y = yMin; y < yMax; y++){  
            for (var x = xMin; x < xMax; x++){

                var xlocalA = Math.round(x - s1.x);
                var ylocalA = Math.round(y - s1.y);
                    
                var xlocalB = Math.round(x - s2.x);
                var ylocalB = Math.round(y - s2.y);
                
                if (s1.texture.manager.getPixelAlpha(xlocalA, ylocalA, s1.anims.getCurrentKey(), s1.anims.currentFrame.index) != 0 && s2.texture.manager.getPixelAlpha(xlocalB, ylocalB, s2.anims.getCurrentKey(), s2.anims.currentFrame.index) != 0){
                    console.log("pixel collision!");
                    return true;
                }
            }
        }
        return false;   
    }
}
