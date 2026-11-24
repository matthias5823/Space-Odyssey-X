class CrystalBeetle extends MovableObject {
    imagesWalking = opponentsAuroria['crystal-beetle']['Walk'];
    imagesShoot = opponentsAuroria['crystal-beetle']['Shoot'];
    imagesHurt = opponentsAuroria['crystal-beetle']['Hurt'];
    imagesDead = opponentsAuroria['crystal-beetle']['DeadShooht'];             // Schlüssel heißt in deiner Datei so (Tippfehler)
    imagesBullet = finalOpponents['Auroria'].images.Shot;                      // PLATZHALTER, bis es eigene Geschoss-Bilder gibt
    height = 80;
    y = 365;
    offset = opponentsAuroria['crystal-beetle'].offset;

    energy = 60;                // 3 Treffer à 20

    world;                      // wird von der World gesetzt
    triggerDistance = 500;      // ab dieser Entfernung fängt er an zu schießen
    stopDistance = 200;         // NEU: näher als 200 px läuft er nicht heran
    isShooting = false;
    shootFrame = 0;
    shootFireFrame = 5;         // bei diesem Bild fliegt das Geschoss los
    nextShotTime = 0;           // frühester Zeitpunkt (ms) für den nächsten Schuss

    constructor(x = 1000 + Math.random() * 2500) {
        super().loadImage(this.imagesWalking[0]);
        this.x = x;
        this.speed = 0.3 + Math.random() * 0.5;
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesShoot);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.animate();
    }

    animate() {
        // Bewegung: nur laufen, wenn nicht tot, nicht verletzt und nicht am Schießen
        this.moveInterval = setInterval(() => this.moveBeetle(), 70);

        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation(this.imagesDead);
            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);
            } else if (this.isShooting) {
                this.playShootAnimation();
            } else {
                this.playAnimation(this.imagesWalking);
                this.checkShooting();               // beim Laufen prüfen, ob er schießen soll
            }
        }, 70);
    }

    /**
     * Startet einen Schuss, wenn der Charakter nah ist und die Pause vorbei ist.
     */
    checkShooting() {
        let now = new Date().getTime();
        if (this.isCharacterWithin(this.triggerDistance) && now > this.nextShotTime) {
            this.isShooting = true;
            this.shootFrame = 0;
        }
    }


    // Spielt die Schuss-Animation einmal ab und feuert beim passenden Bild.

    playShootAnimation() {
        this.img = this.imgCache[this.imagesShoot[this.shootFrame]];
        if (this.shootFrame === this.shootFireFrame) {
            this.fireShot();
        }
        this.shootFrame++;
        if (this.shootFrame >= this.imagesShoot.length) {
            this.isShooting = false;
            // unregelmäßige Pause: zufällig zwischen 1 und 3 Sekunden
            this.nextShotTime = new Date().getTime() + 1000 + Math.random() * 2000;
        }
    }


    // Erzeugt ein Geschoss in Richtung Charakter.

    fireShot() {
        let direction = this.otherDirection ? 1 : -1;               // schießt immer in Blickrichtung
        let startX = direction < 0 ? this.x : this.x + this.width;  // vorne am Käfer starten
        let startY = this.y + this.height / 2;
        this.world.enemyShots.push(new EnemyShot(startX, startY, direction, this.imagesBullet));
    }

    /**
     * Bewegt den Käfer: dreht sich zum Charakter, wenn er nah ist,
     * und läuft auf ihn zu, bleibt aber in stopDistance stehen.
     */
    moveBeetle() {
        if (this.isDead() || this.isHurt() || this.isShooting) return; // in diesen Zuständen nicht laufen
        if (!this.isCharacterWithin(800)) return;   // erst losgehen, wenn der Charakter näher als 800 px ist
        if (this.isCharacterWithin(this.triggerDistance)) {
            this.faceCharacter();                                      // nur drehen, wenn der Charakter nah ist
        }
        this.walkUnlessTooClose(this.stopDistance);
    }


}