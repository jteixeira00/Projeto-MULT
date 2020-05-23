class Objective extends Phaser.GameObjects.Rectangle{

    constructor(x, y, scene, width, height){
        
        super(scene, x, y, width, height, null, 0);
        this.healthPoints = 5000;
        scene.physics.world.enableBody(this, 0);
    }

    getHit(damage, healthMeter){
        this.updateHealth(healthMeter, damage);
        this.healthPoints = this.healthPoints - damage;
    }

    updateHealth(healthMeter, dano){

        var counter = 2 * (22 - Math.round((this.healthPoints - dano) / 227));
        
        if (counter <= 44) 
            healthMeter.anims.play("healthBarCasa", true);
            healthMeter.anims.pause(healthMeter.anims.currentAnim.frames[counter]);      

    }
}
