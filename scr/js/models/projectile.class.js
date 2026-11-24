class Projectile extends MovableObject {
    speedX = 10;        // Standard-Tempo (kann jede Unterklasse überschreiben)
    direction = 1;      // 1 = nach rechts, -1 = nach links
    damage = 0;         // Schaden beim Treffer (setzt jede Unterklasse selbst)
    hasHit = false;     // hat das Geschoss schon getroffen?
    velocityX = null;   // gesetzt durch aimAt(), sonst fliegt das Geschoss gerade (speedX * direction)
    velocityY = 0;      // senkrechte Geschwindigkeit, 0 = gerade

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
        // Interval für die Bewegung
        this.moveInterval = setInterval(() => {
            this.x += this.velocityX ?? this.speedX * this.direction;   // ?? = "falls null, dann …"
            this.y += this.velocityY;
        }, 1000 / 60);
        // Interval für die Animation
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.images);
        }, 80);
    }

    /**
     * Setzt das Geschoss so, dass seine Mitte genau auf dem Punkt liegt.
     * @param {{x: number, y: number}} point - z. B. der Mündungspunkt
     */
    centerOn(point) {
        this.x = point.x - this.width / 2;
        this.y = point.y - this.height / 2;
    }

    /**
     * Richtet das Geschoss auf die Mitte der Hitbox des Ziels aus.
     * Die Richtung wird einmal berechnet – das Geschoss fliegt danach gerade weiter.
     * @param {MovableObject} target - Ziel, z. B. der Charakter
     */
    aimAt(target) {
        let hb = target.getHitbox();
        let dx = hb.x + hb.width / 2 - (this.x + this.width / 2);    // Abstand waagerecht
        let dy = hb.y + hb.height / 2 - (this.y + this.height / 2);  // Abstand senkrecht
        let length = Math.hypot(dx, dy) || 1;                        // Gesamtabstand (nie 0)
        this.velocityX = dx / length * this.speedX;                  // Tempo bleibt gleich, nur aufgeteilt
        this.velocityY = dy / length * this.speedX;
        this.otherDirection = dx < 0;                                // Bild in Flugrichtung spiegeln
    }
}