class World {
    character = new Character();
    hoverDrones = [
        new HoverDrone(),
        new HoverDrone(),
        new HoverDrone(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObkject('./assets/imgs/Plain/back/01_Himmel_Planeten.webp', 0),
        new BackgroundObkject('./assets/imgs/Plain/back/03_Ferne_Berge.webp', 0),
        new BackgroundObkject('./assets/imgs/Plain/back/02_Flusstal.webp', 0),
        new BackgroundObkject('./assets/imgs/Plain/back/Auroria_Felsberg.webp', 0),
        new BackgroundObkject('./assets/imgs/Plain/down/05_Laufboden.webp', 0)
    ]
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);

        this.addObjectsToMap(this.hoverDrones);
        


        // Draw() wird immmer wieder aufgerufe
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

}