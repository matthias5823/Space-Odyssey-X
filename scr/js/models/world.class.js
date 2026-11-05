class World {
    character = new Character();
    hoverDrones = [
        new HoverDrone(),
        new HoverDrone(),
        new HoverDrone(),
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.hoverDrones.forEach(drone => {
            this.ctx.drawImage(drone.img, drone.x, drone.y, drone.width, drone.height);
        });

        // Draw() wird immmer wieder aufgerufe
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

}