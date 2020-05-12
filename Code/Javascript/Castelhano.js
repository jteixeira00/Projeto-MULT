class Castelhano extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite){

        super(hp, dmg, scene, x, y, sprite);
    }

    getHit(rightKnockback, damage){

        this.healthPoints -= damage;

        console.log("Ah! Mataram-me!");

        this.body.setDrag(300,50);
        this.body.setVelocityY(-200);

        if(rightKnockback)
            this.body.setVelocityX(200);
        else
            this.body.setVelocityX(-200); 
    }

    alive(){
        if (this.healthPoints > 0) 
            return true;
        return false;
    }
}
