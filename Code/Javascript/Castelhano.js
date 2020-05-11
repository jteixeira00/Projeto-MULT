class Castelhano extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite){

        super(hp, dmg, scene, x, y, sprite);
    }

    getHit(){

        console.log("Ah; mataram-me!");
    }
}
