class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 400;
    speed = 0.5;

    imagesClouds = [
        './assets/imgs/Plain/back/Wolken_oben.webp',
        './assets/imgs/Plain/back/Wolken_unten.webp'
    ]


    constructor() {
        super().loadImage('./assets/imgs/Plain/back/Wolken_oben.webp');

        this.x = 200 + Math.random() * 500;
        this.speed = 0.1 + Math.random() * 0.5;
        this.loadImages(this.imagesClouds);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 70);

    }



}