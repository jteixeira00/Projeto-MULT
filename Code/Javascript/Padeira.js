class Padeira extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite){

        super(hp, dmg, scene, x, y, sprite);

        this.animationCounter = 0;
        this.weapon = false;
        this.invulnerable = false;
        this.setDepth(1);
        this.body.setSize(72, 104, true); 
        this.body.offset.y = 64;
    }

    updateAnimationCounter(){
        if (padeira.animationCounter == 2)
		    padeira.animationCounter = 0
        else
            padeira.animationCounter += 1
    }

    updateAttackingHitbox(){
        
        var string = 'padeira_attack' + (this.animationCounter + 1);

        if (this.facingRight){
            string += '_R';

            if (this.animationCounter == 0) return [string, -18, -20, 100, 104];

            else if (this.animationCounter == 1) return [string, -18, -84, 100, 168];
            
            else return [string, -79, -84, 158, 168];
        }

        else{
            string += '_L';

            if (this.animationCounter == 0) return [string, -82, -20, 100, 104];

            else if (this.animationCounter == 1) return [string, -82, -84, 100, 168];
            
            else return [string, -79, -84, 158, 168];
        }
    }

    getHit(rightKnockback, damage, scene, healthMeter){

        if (!this.invulnerable){
            this.healthPoints -= damage;

            this.body.setDrag(300,50);
            this.body.setVelocityY(-200);

            if(rightKnockback)
                this.body.setVelocityX(200);
            else
                this.body.setVelocityX(-200);

            healthMeter.anims.play("health", true);
            healthMeter.anims.pause(healthMeter.anims.currentAnim.frames[Math.round(this.healthPoints / 50) - 1]);
            
            this.invulnerable = true;
            scene.time.delayedCall(1000, () => {this.invulnerable = false;}, null, this);
        }
    }
}