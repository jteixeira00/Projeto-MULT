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

    updateAttackingHitbox(retangulo){

        var string = 'w_attack' + (this.animationCounter + 1);

        if (this.facingRight){
            string += '_R';

            if (this.animationCounter == 0){
                retangulo.body.setSize(100, 104, true);
                retangulo.body.offset.y = 4;
                retangulo.body.offset.x = 0;
                return [string, -18, -20, 100, 104];
            }

            else if (this.animationCounter == 1){
                retangulo.body.setSize(100, 168, true);
                retangulo.body.offset.y = -60;
                retangulo.body.offset.x = 0;
                return [string, -18, -84, 100, 168];
            }
            
            else{
                retangulo.body.setSize(158, 168, true);
                retangulo.body.offset.y = -60;
                retangulo.body.offset.x = -58;
                return [string, -79, -84, 158, 168];
            }
        }

        else{
            string += '_L';

            if (this.animationCounter == 0){
                retangulo.body.setSize(100, 104, true);
                retangulo.body.offset.y = 4;
                retangulo.body.offset.x = -64;
                return [string, -82, -20, 100, 104];
            }

            else if (this.animationCounter == 1){
                retangulo.body.setSize(100, 168, true);
                retangulo.body.offset.y = -60;
                retangulo.body.offset.x = -60;
                return [string, -82, -84, 100, 168];
            }
            
            else{
                retangulo.body.setSize(158, 168, true);
                retangulo.body.offset.y = -60;
                retangulo.body.offset.x = -58;
                return [string, -79, -84, 158, 168];
            }
        }
    }
}