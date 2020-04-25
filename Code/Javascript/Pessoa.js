"use strict";


class Pessoa extends Phaser.GameObjects.Sprite{

    constructor(hp, dmg, scene, x, y, sprite){
        
        super(scene, x, y, sprite);
        
        this.healthPoints = hp;
        this.damage = dmg;

        scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0); 

        this.body.setBounce(0);
        this.body.setCollideWorldBounds(true);
    }
}


class Padeira extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite){

        super(hp, dmg, scene, x, y, sprite);
        
        // True = Direita, False = Esquerda
        this.facing = true;
        this.attacking = false;
        this.animationCounter = 0;
        // True = Weapon Out, False = Weapon In
        this.weapon = false;
    }

    swap(target) {
        
        if (target == true)
            target = false;
        else
            target = true;
    }
}


class Castelhano extends Pessoa{

    constructor(hp, dmg, scene, x, y, sprite){

        super(hp, dmg, scene, x, y, sprite);
    }
}
