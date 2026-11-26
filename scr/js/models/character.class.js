class Character extends MovableObject {

    isShooting = false; // setzt den Wert auf ture wenn die Schuss- Animation gerade läuft. 
    shootFrame = 0; // nimmt den Index wert von der Schuss animation
    shootFireFrame = players[userPlayer].shootFireFrame;   // Bild mit Mündungsfeuer, wann die Schuss Animtion startet
    spaceLocked = false; // verhindert Dauerfeuer, solange die Taste gehalten wird
    shotOfSet = players[userPlayer].shotOfSet;
    speed = players[userPlayer].speed;
    invulnerableUntil = 0; // bis zu diesem Zeitpunkt (ms) bekommt der Charakter keinen Schaden
    offset = players[userPlayer].offset;
    muzzle = players[userPlayer].muzzle;                    // Waffenmündung im Bild
    ammo = 12;                // Schüsse zu Beginn
    maxAmmo = 30;             // mehr passt nicht ins Magazin

    imagesSleep = players[userPlayer].images.Sleep;
    imagesWalking = players[userPlayer].images.Walking;
    imagesJumping = players[userPlayer].images.Jumping;
    imagesHurt = players[userPlayer].images.Hurt;
    imagesDead = players[userPlayer].images.Dead;
    imagesShoot = players[userPlayer].images.Shoot;

    y = 310;
    lives = 3;

    world;


    constructor() {
        super().loadImage(players[userPlayer]['images']['Walking'][0]);
        this.loadImages(this.imagesSleep);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesShoot);
        this.applyGravity();
        this.animate();
    };

    animate() {

        setStoppableInterval(() => {
            if (this.isDead()) return;   // Game Over → keine Steuerung mehr

            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            };


            if (this.world.keyboard.left && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            };


            if (this.world.keyboard.up && !this.isAboveGround()) {
                this.jump();
            }

            if (this.world.keyboard.space && !this.isShooting && !this.spaceLocked && this.ammo > 0) {
                this.isShooting = true;
                this.shootFrame = 0;
                this.spaceLocked = true;
            }
            if (!this.world.keyboard.space) {
                this.spaceLocked = false;
            }

            // Kamera-Haltepunkt: rechter Canvas-Rand trifft das Level-Ende
            let cameraStop = this.world.level.level_end_x - this.world.canvas.width + 100;
            this.world.camera_x = -Math.min(this.x, cameraStop) + 100

            // this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setStoppableInterval(() => {
            this.updateAnimation();   // passendes Bild anzeigen
            this.updateShooting();    // Schuss-Ablauf läuft unabhängig davon weiter
        }, 150);
    }

    // wird aufgerufen wenn die Energy = 0 ist. Zieht ein laben ab, füllt die Energy auf

    loseLife() {
        this.lives--;                              // ein Leben weniger
        if (this.lives > 0) {
            this.energy = 100;                     // Energie wieder voll
            this.lastHit = new Date().getTime();   // kurz Hurt-Animation als Zeichen
            this.invulnerableUntil = new Date().getTime() + 2000; // NEU: 2 Sekunden Schutz
        }
        // bei 0 Leben bleibt energy 0 → isDead() ist true → Dead-Animation (Game Over)
    }

    /**
     * Erzeugt einen Schuss genau an der Waffenmündung, gerade in Blickrichtung.
     */
    fireShot() {
        let direction = this.otherDirection ? -1 : 1;
        let muzzle = this.getMuzzlePoint(this.muzzle);
        let shot = new ShotProjectTarget(muzzle.x, muzzle.y, direction);
        shot.centerOn(muzzle);
        this.world.shotProjectTarget.push(shot);
        this.ammo--;                                  // Munition verbrauchen
        this.world.ammoBar.setValue(this.ammo);       // Anzeige aktualisieren
    }

    // Prüft, ob der Charakter von oben auf mo fällt.
    isJumpingOn(mo) {
        let a = this.getHitbox();
        let b = mo.getHitbox();
        return this.isAboveGround() &&
            this.speedY < 0 &&
            a.x + a.width > b.x &&
            a.x < b.x + b.width &&
            a.y + a.height > b.y &&
            a.y + a.height < b.y + b.height;
    }
    // Ist der Charakter gerade geschützt
    isInvulnerable() {
        return new Date().getTime() < this.invulnerableUntil;
    }

    /**
     * Wählt das Bild passend zum aktuellen Zustand.
     * Steuert nur die Anzeige – der Schuss selbst läuft in updateShooting().
     */
    updateAnimation() {
        if (this.isDead()) {
            this.playDeadAnimation(this.imagesDead);
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (this.isShooting) {
            this.img = this.imgCache[this.imagesShoot[this.shootFrame]]; // aktuelles Schuss-Bild 
        } else if (this.isAboveGround()) {
            this.playAnimation(this.imagesJumping);
        } else if (this.world.keyboard.right || this.world.keyboard.left) {
            this.playAnimation(this.imagesWalking);
        }
    }

    /**
     * Zählt den Schuss-Ablauf Bild für Bild weiter und feuert beim shootFireFrame.
     * Läuft unabhängig von der Animation – auch beim Springen oder wenn der Charakter getroffen wird.
     */
    updateShooting() {
        if (!this.isShooting || this.isDead()) return;   // kein Schuss aktiv oder tot → nichts tun

        if (this.shootFrame === this.shootFireFrame) {
            this.fireShot();                              // Geschoss erzeugen
        }
        this.shootFrame++;

        if (this.shootFrame >= this.imagesShoot.length) {
            this.isShooting = false;                      // Ablauf fertig
        }
    }


}