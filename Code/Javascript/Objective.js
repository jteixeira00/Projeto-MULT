class Objective extends Phaser.GameObjects.Rectangle{

    constructor(x, y, scene, width, height){
        
        super(scene, x, y, width, height, '#000000', 0);
        this.healthPoints = 5000;
        scene.physics.world.enableBody(this, 0);
    }

    getHit(damage){
        this.healthPoints = this.healthPoints - damage;
    }
}
