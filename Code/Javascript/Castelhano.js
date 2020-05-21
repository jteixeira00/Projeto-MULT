class Castelhano extends Pessoa{

    constructor(hp, dmg, scene, x, y, movementSpeed, knockback, range, sprite, array){

        super(hp, dmg, scene, x, y, sprite);

        this.movementSpeed = movementSpeed;
        this.knockback = knockback;
        this.setDepth(2);
        array.add(this);
    }

    getHit(rightKnockback, damage){

        this.healthPoints -= damage;

        if (this.alive()){
            this.body.setDrag(300,50);
            this.body.setVelocityY(-this.knockback);

            if(rightKnockback)
                this.body.setVelocityX(this.knockback);
            else
                this.body.setVelocityX(-this.knockback); 
        }
    }

    alive(){
        if (this.healthPoints > 0) 
            return true;
        return false;
    }
}
