class Projectile extends MovableObject {
    speedX = 10;        // Standard-Tempo (kann jede Unterklasse überschreiben)
    direction = 1;      // 1 = nach rechts, -1 = nach links
    damage = 0;         // Schaden beim Treffer (setzt jede Unterklasse selbst)
    hasHit = false;     // hat das Geschoss schon getroffen?

    /**
     * @param {number} x - Startposition X
     * @param {number} y - Startposition Y
     * @param {number} direction - 1 = rechts, -1 = links
     * @param {Array} images - Bilder der Flug-Animation
     */
    constructor(x, y, direction, images) {
        super();
        this.images = images;
        this.loadImage(images[0]);           // Startbild, damit draw() nie undefined bekommt
        this.loadImages(images);             // alle Flugbilder in den Cache laden
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.otherDirection = direction < 0; // nach links → Bild spiegeln
        this.fly();
    }

    // Bewegt das Geschoss in Flugrichtung und spielt die Flug-Animation ab.
    fly() {
        this.moveInterval = setInterval(() => {
            this.x += this.speedX * this.direction;
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.images);
        }, 80);
    }
}