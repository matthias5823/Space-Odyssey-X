class Cloud extends MovableObject {
    height = 250;
    width = 400;
    



    constructor() {
        super().loadImage('./assets/imgs/Plain/back/Wolken_oben.webp');

        // this.x = Math.random() * 500;
        this.y = 20;

        this.animate();
    }

      animate() {
        setInterval(() => {
            this.x -= 0.5;
        }, 1000 / 60)

    }

}