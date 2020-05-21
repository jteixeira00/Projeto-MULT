class Padeira extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite,game){

        super(hp, dmg, scene, x, y, sprite);

        this.animationCounter = 0;
        this.weapon = false;
        this.invulnerable = false; //ligar por 1s depois de levar porrada
        // ver one shot timers
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
        var config = {
            mute: false,
            volume: 2,
            loop: false
        }
        var string = 'padeira_attack' + (this.animationCounter + 1);

        if (this.facingRight){
            string += '_R';

            if (this.animationCounter == 0){
                playSound(game,"swoosh_1",config);
                return [string, -18, -20, 100, 104];
            }

            else if (this.animationCounter == 1){
                playSound(game,"swoosh_2",config);
                return [string, -18, -84, 100, 168];
            }
            
            else{
                playSound(game,"swoosh_2",config);
                return [string, -79, -84, 158, 168];
            }
        }

        else{
            string += '_L';

            if (this.animationCounter == 0){
                playSound(game,"swoosh_1",config);
                return [string, -82, -20, 100, 104];
            }

            else if (this.animationCounter == 1){
                playSound(game,"swoosh_2",config);
                return [string, -82, -84, 100, 168];
            }
            
            else{
                playSound(game,"swoosh_2",config);
                return [string, -79, -84, 158, 168];
            }
        }
    }

    getHit(rightKnockback, damage, scene){

        if (!this.invulnerable){
            this.healthPoints -= damage;

            this.body.setDrag(300,50);
            this.body.setVelocityY(-200);

            if(rightKnockback)
                this.body.setVelocityX(200);
            else
                this.body.setVelocityX(-200);

            // this.invulnerable = true;
            scene.time.delayedCall(1000, () => {this.invulnerable = false;}, null, this);
        }
    }
}