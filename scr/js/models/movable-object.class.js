class MovableObject extends DrawableObject {
    speed = 0.5;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    offset = { top: 0, right: 0, bottom: 0, left: 0 }; // wie viel px von jeder Seite NICHT zur Hitbox gehören
    lastHit = 0;
    deadFrame = 0;        // welches Bild der Sterbe-Animation ist dran?
    isRemovable = false;  // true, wenn die Sterbe-Animation fertig ist → World darf das Objekt löschen

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        return this.y < 310;
    }

    // character.isColliding(opponents)
    isColliding(mo) {
        let a = this.getHitbox();   // a = Hitbox vom Charakter
        let b = mo.getHitbox();     // b = Hitbox vom jeweiligen Gegner
        return a.x + a.width > b.x &&
            a.x < b.x + b.width &&
            a.y + a.height > b.y &&
            a.y < b.y + b.height;
    }

    hit(damage = 2) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Defferenz in ms
        timePassed = timePassed / 1000; // Differenz in sec
        return timePassed < 1.5;
    }


    isDead() {
        return this.energy == 0;
    }


    playAnimation(images) {
        // Walk animation
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }

    isStay() {
        return !(Keyboard.left && Keyboard.right)
    }

    /**
    * Spielt die Sterbe-Animation genau einmal ab.
    * Nach dem letzten Bild wird das Objekt als entfernbar markiert.
    */
    playDeadAnimation(images) {
        if (this.deadFrame < images.length) {
            this.img = this.imgCache[images[this.deadFrame]]; // aktuelles Sterbe-Bild zeigen
            this.deadFrame++;                                 // nächstes Bild
        } else {
            this.isRemovable = true;                          // fertig gestorben → darf gelöscht werden
        }
    }

    /**
     * Stoppt Bewegung und Animation, damit gelöschte Objekte nicht im Hintergrund weiterlaufen.
     */
    stop() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }


    // Liefert das echte Treffer-Rechteck (Bild minus Offset).
    // Schaut das Objekt nach links (otherDirection), werden links und rechts getauscht,
    // weil das Bild dann gespiegelt ist.

    getHitbox() {
        let left = this.otherDirection ? this.offset.right : this.offset.left;
        let right = this.otherDirection ? this.offset.left : this.offset.right;

        return {
            x: this.x + left,                                          // linke Kante der Hitbox
            y: this.y + this.offset.top,                               // obere Kante der Hitbox
            width: this.width - left - right,                          // Breite ohne linken/rechten Rand
            height: this.height - this.offset.top - this.offset.bottom // Höhe ohne oberen/unteren Rand
        };
    }

    isHitting(mo) {
    // Statt des ganzen Bildes vom Ziel (mo) wird nur seine Hitbox genommen,
    // also das Bild minus Offset. b hat x, y, width und height.
    let b = mo.getHitbox();

    // Zwei Rechtecke überschneiden sich nur, wenn alle vier Bedingungen stimmen:
    return this.x + this.width > b.x &&    // rechte Kante vom Schuss liegt rechts von der linken Kante der Hitbox
        this.x < b.x + b.width &&          // linke Kante vom Schuss liegt links von der rechten Kante der Hitbox
        this.y + this.height > b.y &&      // Unterkante vom Schuss liegt unter der Oberkante der Hitbox
        this.y < b.y + b.height;           // Oberkante vom Schuss liegt über der Unterkante der Hitbox
}
}