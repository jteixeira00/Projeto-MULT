class CastelhanoSmall extends Castelhano{

    constructor(scene, x, y, sprite, array){

        super(50, 50, scene, x, y, 200, 750, sprite, array);

        this.body.setSize(48, 104, true);
        this.body.offset.y = 40;
        this.body.offset.x = 8;
        this.value = 400;
        this.range = 0;
    }

    moveRight(){
        this.body.setVelocityX(this.movementSpeed);
        this.body.offset.x = 32;
        this.body.offset.y = 12;
        this.facingRight = true;
        this.range = 60;
    }

    moveLeft(){
        this.body.setVelocityX(-this.movementSpeed);
        this.body.offset.x = 60;
        this.body.offset.y = 12;
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
