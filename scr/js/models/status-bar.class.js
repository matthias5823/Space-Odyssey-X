class StatusBar extends DrawableObject {
    imagesEnergy = players[userPlayer]['images']['Energy'];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.imagesEnergy);
        this.x = 0;
        this.y = 20;
        this.width = 180;
        this.height = 50;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.imagesEnergy[this.resolveImageIndex()]
        this.img = this.imgCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 9;
        }
        else if (this.percentage > 90) {
            return 8;
        }
        else if (this.percentage > 80) {
            return 7;
        }
        else if (this.percentage > 70) {
            return 6;
        }
        else if (this.percentage > 60) {
            return 5;
        }
        else if (this.percentage > 50) {
            return 4;
        }
        else if (this.percentage > 40) {
            return 3;
        }
        else if (this.percentage > 30) {
            return 2;
        }
        else if (this.percentage > 20) {
            return 1;
        }
        else if (this.percentage > 10) {
            return 0;
        }
        else {
            return 0;
        }

    }
}