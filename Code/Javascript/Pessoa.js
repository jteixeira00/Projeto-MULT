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

    
}
