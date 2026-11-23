class Endboss extends MovableObject {

    y = 160;
    height = 290;
    width = 210;
    offset = finalOpponents['Auroria'].offset

    imagesWalking = finalOpponents['Auroria'].images.Walking;
    imagesShoot = finalOpponents['Auroria'].images.Shoot;
    imagesSword = finalOpponents['Auroria'].images.SwordCombat;
    imagesHurt = finalOpponents['Auroria'].images.Hurt;
    imagesDead = finalOpponents['Auroria'].images.Dead;

  

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.x = 4150;
        
        this.animate();
    };

    animate() {
        this.playAnimation(this.imagesWalking);

        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 100);
    };

}