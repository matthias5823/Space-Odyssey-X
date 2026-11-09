class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 400;
    speed = 0.5;




    constructor() {
        super().loadImage('./assets/imgs/Plain/back/Wolken_oben.webp');

        // this.x = Math.random() * 500;

        this.animate();
    }

    animate() {
        this.moveLeft();

    }



}