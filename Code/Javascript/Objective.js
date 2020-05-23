class Objective extends Phaser.GameObjects.Rectangle{

    constructor(x, y, scene, width, height){
        
        super(scene, x, y, width, height, null, 0);
        this.healthPoints = 5000;
        scene.physics.world.enableBody(this, 0);
    }

    getHit(damage, healthMeter){
        this.healthPoints = this.healthPoints - damage;
        this.updateHealth(healthMeter);
    }

    updateHealth(meter){

        var counter = 2 * (22 - Math.round(this.healthPoints / 227));
        
        if (counter <= 44) 
            meter.anims.play("healthBarCasa", true);
            meter.anims.pause(meter.anims.currentAnim.frames[counter]);      

    }
}
