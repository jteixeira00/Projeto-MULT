class Castelhano extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite, array){

        super(hp, dmg, scene, x, y, sprite);

        this.setDepth(2);
        this.body.setSize(48, 104, true);
        this.body.offset.y = 40;
        this.body.offset.x = 8;
        this.value = 100;
        this.anims.play(sprite,true);
        array.add(this);
    }

    getHit(rightKnockback, damage){

        this.healthPoints -= damage;

        if (this.alive()){
            this.body.setDrag(300,50);
            this.body.setVelocityY(-200);

            if(rightKnockback)
                this.body.setVelocityX(200);
            else
                this.body.setVelocityX(-200); 
        }
    }

    moveRight(){
        this.body.setVelocityX(250);
        this.body.offset.x = 32;
        this.body.offset.y = 12;
        this.facingRight = true;
        //this.flipX = false;
    }

    moveLeft(){
        this.body.setVelocityX(-250);
        this.body.offset.x = 60;
        this.body.offset.y = 12;
        this.facingRight = false;
        //this.flipX = true;
    }

    alive(){
        if (this.healthPoints > 0) 
            return true;
        return false;
    }

    getAttackingHitbox(){
        
        if (this.facingRight == true)
            return [-24, -52, 100, 60];
        else
            return [-76, -52, 100, 60]; 
        
        // small castelhano
        // dps faz sentido ter isto aqui qnd houver mais classes
    }
}
