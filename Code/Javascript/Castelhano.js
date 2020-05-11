class Castelhano extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite){

        super(hp, dmg, scene, x, y, sprite);
    }

    getHit(rightKnockback){

        console.log("Ah! Mataram-me!");

        this.body.setDrag(200,200);
        this.body.setVelocityY(-1000);

        if(rightKnockback)
            this.body.setVelocityX(350);
        else
            this.body.setVelocityX(-350); 
    }
}
