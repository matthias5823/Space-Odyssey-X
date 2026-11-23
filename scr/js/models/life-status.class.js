class LifeBar extends DrawableObject {

    imagesLife = [
        './assets/imgs/Lifebar/Lives_0.webp',
        './assets/imgs/Lifebar/Lives_1.webp',
        './assets/imgs/Lifebar/Lives_2.webp',
        './assets/imgs/Lifebar/Lives_3.webp'
    ];

    lifeHaert = 0;

    constructor() {
        super();
        this.loadImages(this.imagesLife);
        this.x = 30;
        this.y = 0;
        this.width = 150;
        this.height = 40;
        this.setPercentage(3);
    }

    setPercentage(lifeHaert) {
        this.percentage = lifeHaert;
        let path = this.imagesLife[this.resolveImageIndex()]
        this.img = this.imgCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 3) {
            return 3;
        }
        else if (this.percentage == 2) {
            return 2;
        }
        else if (this.percentage == 1) {
            return 1;
        }
        else if (this.percentage == 0) {
            return 0;
        }
    }
}