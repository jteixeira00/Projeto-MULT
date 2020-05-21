class CastelhanoHeavy extends Castelhano{

    constructor(scene, x, y, sprite, array){

        super(100, 50, scene, x, y, 250, 200, 50, sprite, array);

        this.body.setSize(96, 208, true);
        this.body.offset.x = 80;
        this.body.offset.y = 40;
        this.value = 100;
    }

    moveRight(){
        this.body.setVelocityX(this.movementSpeed);
        this.body.offset.x = 80;
        this.body.offset.y = 40;
        this.facingRight = true;
    }

    moveLeft(){
        this.body.setVelocityX(-this.movementSpeed);
        this.body.offset.x = 80;
        this.body.offset.y = 40;
        this.facingRight = false;
    }

    getAttackingHitbox(){
        if (this.facingRight == true)
            return [-24, -52, 100, 60];
        else
            return [-76, -52, 100, 60]; 
    }
}
