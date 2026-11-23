class DrawableObject {
    img;
    imgCache = {};
    currentImage = 0;
    x = 0;
    y = 310;
    height = 140;
    width = 90;


    // loadImage('img/test.png')
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Lizard || this instanceof Endboss ||
            this instanceof CrystalBeetle || this instanceof PlantCreature) {
            let o = this.offset;
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            // ohne Tausch von links/rechts, weil der Canvas beim Spiegeln selbst umdreht
            ctx.rect(
                this.x + o.left,
                this.y + o.top,
                this.width - o.left - o.right,
                this.height - o.top - o.bottom
            );
            ctx.stroke();
        }
    }

    /**
    * 
    * @param {Array} arr - ['img/image1.png', 'img/image2.png', .... ]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

}