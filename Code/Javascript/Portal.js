class Portal extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, sprite,array,enemy){
        
        super(scene, x, y, sprite);

        scene.add.existing(this);
        this.enemy = enemy;
        array.add(this);

        if(x > 1200){
            this.flipX = true;
        }
        else{
            this.flipX = false;
        }

    }
 }