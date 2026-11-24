class Lizard extends MovableObject {
    imagesWalking = opponentsAuroria['lizard']['Walk'];           // Walk-Animation 
    imagesHurt = opponentsAuroria['lizard']['Hurt'];              // Hurt-Animation bei treffer
    imagesDead = opponentsAuroria['lizard']['DeadShoot'];         // Sterbe-Animation bei Tod durch Schuss
    imagesDeadJump = opponentsAuroria['lizard']['DeadJump'];       // Sterbe-Animation bei Tod durch Springen
    height = 80;
    y = 370;
    energy = 40;                                          // 2 Treffer à 20 Schaden
    offset = opponentsAuroria['lizard'].offset;

    constructor(x = 300 + Math.random() * 1500) {
        super().loadImage(this.imagesWalking[0]);
        this.x = x;                                   // Position vom Level
        this.speed = 0.1 + Math.random() * 0.5;
        this.loadImages(this.imagesWalking);              // Walk-Bilder in den Cache laden
        this.loadImages(this.imagesHurt);                 // Hurt-Bilder in den Cache laden
        this.loadImages(this.imagesDead);                 // Dead-Bilder in den Cache laden
        this.loadImages(this.imagesDeadJump);             // DeadJump-Bilder in den Cache laden        
        this.animate();
    };

    animate() {
        // Bewegung: nur laufen, wenn nicht tot und nicht gerade verletzt
        this.moveInterval = setInterval(() => this.moveLizard(), 70);

        // Animation: tot → Dead, verletzt → Hurt, sonst → Walk
        this.animationInterval = setInterval(() => this.animateLizard(), 70);
    };


    // Tötet den Lizard sofort und tauscht die Sterbe-Animation gegen DeadJump.

    killByJump() {
        this.energy = 0;                        // sofort tot → isDead() ist true
        this.imagesDead = this.imagesDeadJump;  // animate() spielt jetzt DeadJump statt DeadShoot
    }

    /**
    * Bewegt den Lizard: dreht sich zum Charakter, wenn er nah ist,
    * und läuft auf ihn zu, bis sich die Hitboxen berühren.
    */
    moveLizard() {
        if (this.isDead() || this.isHurt()) return;          // tot oder verletzt → nicht laufen
        if (!this.isCharacterWithin(800)) return;            // erst losgehen, wenn der Charakter näher als 800 px ist
        if (this.isCharacterWithin(500)) {
            this.faceCharacter();                            // Charakter nah → zu ihm drehen
        }
        this.walkUntilTouchingCharacter();
    }

    /**
     * Wählt die passende Animation: tot → Dead, verletzt → Hurt,
     * steht am Charakter → Bild anhalten, sonst → Walk.
     */
    animateLizard() {
        if (this.isDead()) {
            this.playDeadAnimation(this.imagesDead);
        } else if (this.isHurt()) {
            this.playAnimation(this.imagesHurt);
        } else if (!this.isTouchingCharacter()) {
            this.playAnimation(this.imagesWalking);          // nur laufen, wenn er sich auch bewegt
        }
    }
}