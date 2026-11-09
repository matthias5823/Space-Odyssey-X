class MovableObject {

    x = 50;
    y = 250;
    img;
    height = 150;
    width = 100;
    imgCache = {};
    currentImage = 0;
    speed = 0.5;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    moveRight() {

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}