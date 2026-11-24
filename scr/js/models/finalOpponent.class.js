class Endboss extends MovableObject {
    data = finalOpponents['Auroria'];          // alle Werte aus finals-Opponents.js
    y = 160;
    height = 290;
    width = 210;
    offset = this.data.offset;
    energy = this.data.energy;
    maxEnergy = this.data.energy;              // für die Prozentanzeige der Energieleiste
    speed = this.data.speed;
    hurtDuration = 400;                        // kurze Hurt-Phase, damit er weiterkämpft

    imagesWalking = this.data.images.Walking;
    imagesShoot = this.data.images.Shoot;
    imagesSword = this.data.images.SwordCombat;
    imagesHurt = this.data.images.Hurt;
    imagesDead = this.data.images.Dead;
    imagesBullet = this.data.images.Shot;

    world;
    isActive = false;                          // wird true, sobald der Charakter nah genug ist
    activationDistance = 700;                  // ab hier wird der Boss aktiv
    shootDistance = 450;                       // ab hier schießt er
    attack = null;                             // laufender Angriff: 'sword', 'shoot' oder null
    attackFrame = 0;                           // aktuelles Bild des Angriffs
    attackHitFrame = 5;                        // bei diesem Bild trifft das Schwert / fliegt der Schuss
    nextAttackTime = 0;                        // frühester Zeitpunkt (ms) für den nächsten Angriff
    swordHitFrame = 5;                         // Bild, bei dem das Schwert trifft
    shootHitFrame = 3;                         // Bild 4: hier ist das Mündungsfeuer in der Grafik
    muzzle = { x: 0.1, y: 0.52 };              // Waffenmündung im Bild (Boss schaut nach links)


    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesShoot);
        this.loadImages(this.imagesSword);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.x = 4150;
        this.animate();
    }

    /**
     * Startet Bewegung (60× pro Sekunde) und Animation (alle 100 ms).
     */
    animate() {
        this.moveInterval = setInterval(() => this.moveBoss(), 1000 / 60);
        this.animationInterval = setInterval(() => this.animateBoss(), 100);
    }

    /**
     * Läuft auf den Charakter zu – nur wenn aktiv und gerade nicht verletzt, tot oder am Angreifen.
     */
    moveBoss() {
        if (!this.isActive || this.isDead() || this.isHurt() || this.attack) return;
        this.faceCharacter();
        this.walkUntilTouchingCharacter();
    }

    /**
     * Wählt die Animation: tot → Dead, verletzt → Hurt, Angriff läuft → Angriff, sonst laufen.
     */
    animateBoss() {
        if (this.isDead()) {
            this.playDeadAnimation(this.imagesDead);
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (this.attack) {
            this.playAttack();
        } else {
            this.playAnimation(this.imagesWalking);
            this.chooseAction();
        }
    }

    /**
     * Entscheidet, was der Boss als Nächstes tut: aktiv werden, Schwert oder Schuss.
     */
    chooseAction() {
        if (!this.isActive) {
            this.isActive = this.isCharacterWithin(this.activationDistance);
            return;
        }
        if (new Date().getTime() < this.nextAttackTime) return;      // Pause zwischen Angriffen
        if (this.isTouchingCharacter()) {
            this.startAttack('sword');
        } else if (this.isCharacterWithin(this.shootDistance)) {
            this.startAttack('shoot');
        }
    }

    /**
     * Startet einen Angriff.
     * @param {string} type - 'sword' oder 'shoot'
     */
    startAttack(type) {
        this.faceCharacter();
        this.attack = type;
        this.attackFrame = 0;
    }

    /**
     * Spielt den laufenden Angriff Bild für Bild ab und löst ihn beim attackHitFrame aus.
     */
    playAttack() {
        let hitFrame = this.attack === 'sword' ? this.swordHitFrame : this.shootHitFrame;
        if (this.attackFrame === hitFrame) {
            this.executeAttack();
        }
        this.attackFrame++;
        if (this.attackFrame >= images.length) {
            this.endAttack();
        }
    }

    /**
     * Führt den Treffer aus: Schwert trifft nur, wenn der Charakter noch dran ist.
     */
    executeAttack() {
        if (this.attack === 'shoot') {
            this.fireShot();
        } else if (this.isTouchingCharacter()) {
            this.world.hitCharacter(this.swordDamage);
        }
    }

    /**
     * Beendet den Angriff und legt eine zufällige Pause (0,8–2 s) bis zum nächsten fest.
     */
    endAttack() {
        this.attack = null;
        this.nextAttackTime = new Date().getTime() + 800 + Math.random() * 1200;
    }

    /**
     * Erzeugt ein Geschoss an der Waffenmündung und zielt auf den Charakter.
     */
    fireShot() {
        let muzzle = this.getMuzzlePoint(this.muzzle);
        let direction = this.otherDirection ? 1 : -1;
        let shot = new EnemyShot(muzzle.x, muzzle.y, direction, this.imagesBullet);
        shot.damage = this.shotDamage;
        shot.centerOn(muzzle);                   // Mitte des Schusses = Mündung
        shot.aimAt(this.world.character);        // Richtung zur aktuellen Hitbox des Charakters
        this.world.enemyShots.push(shot);
    }

    /**
     * Zieht Energie ab und aktualisiert die Energieleiste des Bosses.
     * @param {number} damage - Schaden
     */
    hit(damage) {
        super.hit(damage);
        this.world.bossBar.setPercentage(this.energy / this.maxEnergy * 100);
    }
}