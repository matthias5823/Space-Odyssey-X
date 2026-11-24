class ShotProjectTarget extends Projectile {
    width = 70;
    height = 40;
    speedX = 10;
    damage = 20;        // so viel Energie zieht ein Treffer beim Gegner ab
    maxDistance = 410;  // maximale Flugweite in Pixeln
    startX = 0;

    constructor(x, y, direction) {
        // Bilder direkt übergeben – "this" darf vor super() noch nicht benutzt werden
        super(x, y, direction, players[userPlayer].images.Shot);
        this.startX = x; // hier wurde der Schuss abgefeuert
    }

// Ist der Schuss schon weiter als maxDistance geflogen
    isOutOfRange() {
        return Math.abs(this.x - this.startX) > this.maxDistance;
    }
}