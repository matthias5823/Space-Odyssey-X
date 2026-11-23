class PlantCreature extends MovableObject {
    imagesGrow = opponentsAuroria['plant-creature']['Grow'];            // Wachsen Animation
    imagesSnatch = opponentsAuroria['plant-creature']['Snatch'];        // Snapen Animation
    imagesHurt = opponentsAuroria['plant-creature']['Hurt'];            // Hurt Animation
    imagesDead = opponentsAuroria['plant-creature']['Dead'];            // Dead Animation
    y = 365;
    energy = 60;                                                        // für 3 Treffer
    world;                                                              // wird von der World gesetzt (setWorld)
    triggerDistance = 500;                                              // ab dieser Entfernung zum Charakter wacht die Plant auf
    isActivated = false;                                                // war der Charakter schon nah genug?
    growFrame = 0;                                                      // welches Grow-Bild ist dran?
    isGrown = false;                                                    // ist die Grow-Animation fertig?

    sizeGrow = { width: 80, height: 50 };     // Größe während Warten + Grow (anpassen)
    sizeSnatch = { width: 120, height: 140 };  // Größe während Snatch (anpassen)
    groundY = 450;                             // Unterkante der Plant (jetziges y 365 + Standardhöhe 140)
    offset = opponentsAuroria['plant-creature'].offset;

    constructor() {
        super().loadImage(this.imagesGrow[0]);
        this.x = 20 + Math.random() * 2500;
        this.loadImages(this.imagesGrow);
        this.loadImages(this.imagesSnatch);                             // Snatch-Bilder in den Cache laden
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation(this.imagesDead);                // tot → einmal sterben
            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHurt);                    // getroffen → Hurt
            } else if (!this.isActivated) {
                this.waitForCharacter();                                // noch nicht aktiv → warten
            } else if (!this.isGrown) {
                this.playGrowAnimation();                               // aktiv → einmal wachsen
            } else {
                this.setSize(this.sizeSnatch);
                this.playAnimation(this.imagesSnatch);                  // gewachsen → zuschnappen (Schleife)
            }
        }, 250);
    }

    /**
     * Zeigt das erste Grow-Bild und prüft, ob der Charakter näher als triggerDistance ist.
     */
    waitForCharacter() {
        this.setSize(this.sizeGrow); 
        this.img = this.imgCache[this.imagesGrow[0]];                   // Ruhebild anzeigen
        if (!this.world) return;                                        // World noch nicht gesetzt → nächstes Mal prüfen

        let distance = Math.abs(this.world.character.x - this.x);       // Abstand egal ob links oder rechts
        if (distance < this.triggerDistance) {
            this.isActivated = true;                                    // Charakter ist nah → Grow starten
        }
    }

    /**
     * Spielt die Grow-Animation genau einmal ab.
     */
    playGrowAnimation() {
        this.setSize(this.sizeGrow); 
        this.img = this.imgCache[this.imagesGrow[this.growFrame]];      // aktuelles Grow-Bild
        this.growFrame++;
        if (this.growFrame >= this.imagesGrow.length) {
            this.isGrown = true;                                        // fertig gewachsen → ab jetzt Snatch
        }
    }

    /**
 * Setzt Breite und Höhe und schiebt die Plant so, dass sie unten auf dem Boden bleibt.
 */
    setSize(size) {
        this.width = size.width;
        this.height = size.height;
        this.y = this.groundY - this.height; // je größer, desto weiter nach oben
    }






}