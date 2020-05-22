class CastelhanoHeavy extends Castelhano{

    constructor(scene, x, y, sprite, array){

        super(200, 100, scene, x, y, 250, 200, 50, sprite, array);

        this.body.setSize(96, 208, true);
        this.body.offset.x = 80;
        this.body.offset.y = 48;
        this.value = 200;
        this.movementSpeed = 50;
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
            return [44, 40, 100, 60];
        }
        else
            return [-132, 40, 100, 60]; 
    }
}
