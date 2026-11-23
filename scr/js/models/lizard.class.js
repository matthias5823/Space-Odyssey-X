class Lizard extends MovableObject {
    imagesWalking = opponentsAuroria['lizard']['Walk'];           // Walk-Animation 
    imagesHurt = opponentsAuroria['lizard']['Hurt'];              // Hurt-Animation bei treffer
    imagesDead = opponentsAuroria['lizard']['DeadShoot'];         // Sterbe-Animation bei Tod durch Schuss
    imagesDeadJump = opponentsAuroria['lizard']['DeadJump'];       // Sterbe-Animation bei Tod durch Springen
    height = 80;
    y = 370;
    energy = 40;                                          // 2 Treffer à 20 Schaden
    offset = opponentsAuroria['lizard'].offset;

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.x = 300 + Math.random() * 1500;
        this.speed = 0.1 + Math.random() * 0.5;
        this.loadImages(this.imagesWalking);              // Walk-Bilder in den Cache laden
        this.loadImages(this.imagesHurt);                 // Hurt-Bilder in den Cache laden
        this.loadImages(this.imagesDead);                 // Dead-Bilder in den Cache laden
        this.loadImages(this.imagesDeadJump);             // DeadJump-Bilder in den Cache laden        
        this.animate();
    };

    animate() {
        // Bewegung: nur laufen, wenn nicht tot und nicht gerade verletzt
        this.moveInterval = setInterval(() => {
            if (!this.isDead() && !this.isHurt()) {
                this.moveLeft();
            }
        }, 70);

        // Animation: tot → Dead, verletzt → Hurt, sonst → Walk
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation(this.imagesDead);
            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);
            } else {
                this.playAnimation(this.imagesWalking);
            }
        }, 70);
    };

  
 // Tötet den Lizard sofort und tauscht die Sterbe-Animation gegen DeadJump.

    killByJump() {
        this.energy = 0;                        // sofort tot → isDead() ist true
        this.imagesDead = this.imagesDeadJump;  // animate() spielt jetzt DeadJump statt DeadShoot
    }
}