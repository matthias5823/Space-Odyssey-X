class HoverDrone extends MovableObject {
    

    imagesWalking = [
        './assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_01.png',
        './assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_02.png',
        './assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_03.png',
        './assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_04.png',
        './assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_05.png',
        './assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_06.png',
        './assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_07.png',
        './assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_08.png'
    ];

    constructor() {
        super().loadImage('./assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_01.png');

        this.x = 200 + Math.random() * 500;
        this.speed = 0.1 + Math.random() * 0.5;
        this.loadImages(this.imagesWalking);
        this.animate();
    };

    animate() {
        this.moveLeft();

        setInterval(() => {
            let i = this.currentImage % this.imagesWalking.length;
            let path = this.imagesWalking[i];
            this.img = this.imgCache[path];
            this.currentImage++;
        }, 250);
    };

}