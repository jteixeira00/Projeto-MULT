class CastelhanoMedium extends Castelhano{

    constructor(scene, x, y, sprite, array){

        super(100, 50, scene, x, y, 100, 200, sprite, array);

        this.body.setSize(48, 105, true);
        this.body.offset.y = 20;
        this.body.offset.x = 8;
        this.value = 200;
        this.range = 0;
    }

    moveRight(){
        this.body.setVelocityX(this.movementSpeed);
        this.body.offset.x = 32;
        this.body.offset.y = 20;
        this.facingRight = true;
        this.range = 76;
    }

    moveLeft(){
        this.body.setVelocityX(-this.movementSpeed);
        this.body.offset.x = 60;
        this.body.offset.y = 20;
        this.facingRight = false;
        this.range = 8;
    }

    getAttackingHitbox(){
        if (this.facingRight == true)
            return [-24, -52, 100, 60];
        else
            return [-76, -52, 100, 60]; 
    }
}
