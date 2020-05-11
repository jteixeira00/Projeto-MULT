class Padeira extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite){

        super(hp, dmg, scene, x, y, sprite);

        this.facingRight = true;
        this.attacking = false;
        this.animationCounter = 0;
        this.weapon = false;
    }

    updateAnimationCounter(){
        if (padeira.animationCounter == 2)
		    padeira.animationCounter = 0
        else
            padeira.animationCounter += 1
    }

    updateAttackingHitbox(){

        var string = 'w_attack' + (this.animationCounter + 1);

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
}