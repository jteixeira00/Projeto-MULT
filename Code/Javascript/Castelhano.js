class Castelhano extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite, array){

        super(hp, dmg, scene, x, y, sprite);~

        this.body.setSize(48, 104, true);
        this.body.offset.y = 0;
        this.body.offset.x = 8;
        
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
        this.facingRight = true;
    }

    moveLeft(){
        this.body.setVelocityX(-250);
        this.facingRight = false;
    }

    alive(){
        if (this.healthPoints > 0) 
            return true;
        return false;
    }

    getAttackingHitbox(){

        return [-24, -52, 80, 60]; // small castelhano
        // dps faz sentido ter isto aqui qnd houver mais classes
    }
}
