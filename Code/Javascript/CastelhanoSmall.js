class CastelhanoSmall extends Castelhano{

    constructor(scene, x, y, sprite, array){

        super(100, 25, scene, x, y, 250, 200, sprite, array);

        this.body.setSize(48, 104, true);
        this.body.offset.y = 40;
        this.body.offset.x = 8;
        this.value = 100;
    }

    moveRight(){
        this.body.setVelocityX(this.movementSpeed);
        this.body.offset.x = 32;
        this.body.offset.y = 12;
        this.facingRight = true;
    }

    moveLeft(){
        this.body.setVelocityX(-this.movementSpeed);
        this.body.offset.x = 60;
        this.body.offset.y = 12;
        this.facingRight = false;
    }

    getAttackingHitbox(){
        if (this.facingRight == true)
            return [-24, -52, 100, 60];
        else
            return [-76, -52, 100, 60]; 
    }
}
