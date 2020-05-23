class CastelhanoHeavy extends Castelhano{

    constructor(scene, x, y, sprite, array){

        super(500, 100, scene, x, y, 25, 50, sprite, array);

        this.body.setSize(96, 208, true);
        this.body.offset.x = 80;
        this.body.offset.y = 48;
        this.value = 1000;
        this.range = 0;
    }

    moveRight(){
        this.body.setVelocityX(this.movementSpeed);
        this.body.offset.x = 80;
        this.body.offset.y = 48;
        this.facingRight = true;
        this.range = 140;
    }

    moveLeft(){
        this.body.setVelocityX(-this.movementSpeed);
        this.body.offset.x = 80;
        this.body.offset.y = 48;
        this.facingRight = false;
        this.range = 0;

    }

    getAttackingHitbox(){
        if (this.facingRight == true){
            return [0, -80, 140, 202];
        }
        else
            return [-184, -80, 140, 202]; 
    }
}
