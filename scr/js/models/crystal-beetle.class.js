class CrystalBeetle extends MovableObject {
    imagesWalking = opponentsAuroria['crystal-beetle']['Walk'];
    imagesShoot = opponentsAuroria['crystal-beetle']['Shoot'];
    imagesHurt = opponentsAuroria['crystal-beetle']['Hurt'];
    imagesDead = opponentsAuroria['crystal-beetle']['DeadShooht'];  // Schlüssel heißt in deiner Datei so (Tippfehler)
    imagesBullet = players['Zix'].images.Shot;                      // PLATZHALTER, bis es eigene Geschoss-Bilder gibt
    height = 80;
    y = 365;
    energy = 60;                // 3 Treffer à 20
    offset = opponentsAuroria['crystal-beetle'].offset;
    world;                      // wird von der World gesetzt
    triggerDistance = 500;      // ab dieser Entfernung fängt er an zu schießen
    isShooting = false;
    shootFrame = 0;
    shootFireFrame = 5;         // bei diesem Bild fliegt das Geschoss los
    nextShotTime = 0;           // frühester Zeitpunkt (ms) für den nächsten Schuss

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.x = 1000 + Math.random() * 2500;
        this.speed = 0.3 + Math.random() * 0.5;
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesShoot);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.animate();
    }

    animate() {
        // Bewegung: nur laufen, wenn nicht tot, nicht verletzt und nicht am Schießen
        this.moveInterval = setInterval(() => {
            if (!this.isDead() && !this.isHurt() && !this.isShooting) {
                this.updateDirection();          // zum Charakter drehen
                if (this.otherDirection) {
                    this.moveRight();            // schaut nach rechts → nach rechts laufen
                } else {
                    this.moveLeft();             // schaut nach links → nach links laufen
                }
            }
        }, 70);

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
     * Ist der Charakter näher als triggerDistance?
     */
    isCharacterNear() {
        if (!this.world) return false;
        return Math.abs(this.world.character.x - this.x) < this.triggerDistance;
    }

    /**
     * Startet einen Schuss, wenn der Charakter nah ist und die Pause vorbei ist.
     */
    checkShooting() {
        let now = new Date().getTime();
        if (this.isCharacterNear() && now > this.nextShotTime) {
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

    updateDirection() {
        if (!this.isCharacterNear()) return;                  // Charakter weit weg → Richtung beibehalten
        this.otherDirection = this.world.character.x > this.x; // Charakter rechts → nach rechts drehen
    }




}