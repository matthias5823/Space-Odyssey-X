class BackgroundObkject extends MovableObject {
    height = 563;
    width = 1000;
    constructor(imagePath , x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 563 - this.height;
        // this.y = -90
        
    }

}