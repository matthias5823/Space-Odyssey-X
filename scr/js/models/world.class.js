class World {
    character = new Character();    // Erstellt - Läd den Spiel Character
    level = levelAuroria;           // Lädt das LevelAuroria
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    lifeBar = new LifeBar();        // Läd die Anzeige der Herzen (Leben)
    shotProjectTarget = [];
    enemyShots = [];
    statusBar = new StatusBar(players[userPlayer].images.Energy, 0, 20, 180, 50);       // Lädt die Energy (Treffer) Bar ein für den Charakter
    bossBar = new StatusBar(finalOpponents['Auroria'].images.Energy, 730, 10, 260, 58); // Lädt die Energy (Treffer) Bar ein für den Endboss 
    ammoBar = new ItemCounter('./assets/imgs/items/icons/battery.webp', 10, 75, 30);    // mit Balken (max. 30)
    coinCounter = new ItemCounter('./assets/imgs/items/icons/coin.webp', 10, 118);
    diamondCounter = new ItemCounter('./assets/imgs/items/icons/diamond.webp', 100, 118);
    coins = 0;
    diamonds = 0;
    totalCoins = 0;        // Münzen im Level insgesamt
    totalDiamonds = 0;     // Diamanten im Level insgesamt


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.countCollectibles();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkShotCollisions();
        this.checkJumpOnOpponents();
        this.checkEnemyShotCollisions();
        this.checkItemCollection();
        this.checkGameEnd();
        this.ammoBar.setValue(this.character.ammo);     // Startwert anzeigen
    }

    setWorld() {
        this.character.world = this;
        this.level.opponents.forEach((opponent) => {
            opponent.world = this;                  // jeder Gegner kennt jetzt die World und damit auch den Charakter
        });
    }

    checkCollisions() {
        setInterval(() => {
            this.level.opponents.forEach((opponents) => {
                if (this.character.isColliding(opponents) && !opponents.isDead()) {
                    this.hitCharacter(2);
                }
            })
        }, 1000);
    }

    draw() {
        this.animationFrameId = requestAnimationFrame(function () { // ID der Zeichenschleife merken
            self.draw();
        });
        this.removeOldShots();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.items);          // NEU: Items in der Spielwelt

        this.addObjectsToMap(this.level.clouds);


        this.ctx.translate(-this.camera_x, 0); // Back
        //  <--------------------------- ⊽⊽⊽⊽ Beginn Space for fix Objects ⊽⊽⊽⊽ -------------

        this.addToMap(this.lifeBar);
        this.addToMap(this.statusBar);
        this.drawBossBar();
        this.addToMap(this.ammoBar);
        this.addToMap(this.coinCounter);
        this.addToMap(this.diamondCounter);
        this.ctx.translate(this.camera_x, 0); // Forwards
        //  <----------------------- ⊼⊼⊼⊼ End Space for fix Objects ⊼⊼⊼⊼ -----------------
        this.addToMap(this.character);
        this.addObjectsToMap(this.shotProjectTarget);
        this.addObjectsToMap(this.enemyShots);
        this.addObjectsToMap(this.level.opponents);



        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immmer wieder aufgerufe
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        };

        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        };
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    removeOldShots() {
        this.shotProjectTarget = this.shotProjectTarget.filter(shot => {
            let gone = shot.x < -200 || shot.x > this.level.level_end_x + 200 || shot.isOutOfRange();
            if (gone) shot.stop();
            return !gone;
        });
    }

    checkShotCollisions() {
        setInterval(() => {
            this.shotProjectTarget.forEach((shot) => {
                this.level.opponents.forEach((opponent) => {
                    if (shot.hasHit || opponent.isDead()) return; // verbrauchter Schuss oder toter Gegner → überspringen

                    let isTarget = opponent instanceof Lizard || opponent instanceof PlantCreature ||
                        opponent instanceof CrystalBeetle || opponent instanceof Endboss;

                    if (isTarget && shot.isColliding(opponent)) {
                        shot.hasHit = true;          // Schuss verbraucht
                        opponent.hit(shot.damage);   // Energie abziehen + Hurt starten
                    }
                });
            });
            this.removeHitObjects();
        }, 1000 / 60);
    }


    removeHitObjects() {
        this.shotProjectTarget = this.shotProjectTarget.filter((shot) => {
            if (shot.hasHit) shot.stop();
            return !shot.hasHit;
        });
        this.level.opponents = this.level.opponents.filter((opponent) => {
            if (opponent.isRemovable) opponent.stop(); // Intervalle stoppen
            return !opponent.isRemovable;              // nur fertig gestorbene Gegner entfernen
        });

    }


    checkJumpOnOpponents() {
        // 60× pro Sekunde, sonst wird der kurze Moment des Draufspringens verpasst
        setInterval(() => {
            this.level.opponents.forEach((opponent) => {
                if (opponent instanceof Lizard && !opponent.isDead() && this.character.isJumpingOn(opponent)) {
                    opponent.killByJump();                                                                          // Lizard stirbt mit DeadJump
                    this.character.speedY = 10;                                                                     // Charakter prallt leicht ab
                }
            });
        }, 1000 / 60);
    }

    checkEnemyShotCollisions() {
        setInterval(() => {
            // trifft ein Gegner-Schuss den Charakter?
            this.enemyShots.forEach((shot) => {
                if (!shot.hasHit && shot.isColliding(this.character)) {
                    shot.hasHit = true;
                    this.hitCharacter(shot.damage);
                }
            });

            // verbrauchte oder aus dem Level geflogene Schüsse entfernen
            this.enemyShots = this.enemyShots.filter((shot) => {
                let gone = shot.hasHit || shot.x < -200 || shot.x > this.level.level_end_x + 200 ||
                    shot.y > this.canvas.height || shot.y < -100;
                if (gone) shot.stop();       // ← hier wird gone benutzt: Intervalle stoppen
                return !gone;                // ← und hier: nur Schüsse behalten, die NICHT weg sind
            });
        }, 1000 / 60);
    }

    hitCharacter(damage) {
        if (this.character.isDead() || this.character.isInvulnerable()) return;  // Game Over → kein Schaden mehr

        this.character.hit(damage);                            // Energie abziehen
        if (this.character.energy == 0) {
            this.character.loseLife();                         // Leben weg, Energie wieder 100
        }

        this.statusBar.setPercentage(this.character.energy);  // Energie-Balken aktualisieren
        this.lifeBar.setPercentage(this.character.lives);     // Leben-Anzeige aktualisieren (3, 2, 1, 0)
    }

    drawBossBar() {
        let boss = this.level.opponents.find((opponent) => opponent instanceof Endboss);
        if (boss && boss.isActive) {
            this.addToMap(this.bossBar);
        }
    }

    /**
     * Prüft 60× pro Sekunde, ob der Charakter ein Item berührt, und sammelt es ein.
     */
    checkItemCollection() {
        setInterval(() => {
            if (this.character.isDead()) return;
            this.level.items.forEach((item) => {
                if (!item.isCollected && this.character.isColliding(item)) {
                    item.isCollected = true;     // zuerst markieren, damit es nicht doppelt zählt
                    item.collect(this);          // jedes Item weiß selbst, was es tut
                }
            });
            this.removeCollectedItems();
        }, 1000 / 60);
    }


    /**
     * Entfernt eingesammelte Items aus dem Level und stoppt ihre Animation.
     */
    removeCollectedItems() {
        this.level.items = this.level.items.filter((item) => {
            if (item.isCollected) item.stop();
            return !item.isCollected;
        });
    }

    /**
     * Zählt, wie viele Münzen und Diamanten es im Level insgesamt gibt.
     */
    countCollectibles() {
        this.totalCoins = this.level.items.filter((item) => item instanceof Coin).length;
        this.totalDiamonds = this.level.items.filter((item) => item instanceof Diamond).length;
    }

    /**
     * Prüft regelmäßig, ob das Spiel vorbei ist:
     * Charakter fertig gestorben → verloren, Endboss entfernt → gewonnen.
     */
    checkGameEnd() {
        setStoppableInterval(() => {
            if (this.character.isRemovable) {
                endGame(false);
            } else if (this.isBossDefeated()) {
                endGame(true);
            }
        }, 200);
    }

    /**
     * Ist der Endboss nach seiner Dead-Animation aus dem Level entfernt?
     * @returns {boolean}
     */
    isBossDefeated() {
        return !this.level.opponents.some((opponent) => opponent instanceof Endboss);
    }

    /**
     * Stoppt das komplette Spiel: alle Intervalle und die Zeichenschleife.
     */
    stop() {
        stopAllIntervals();
        cancelAnimationFrame(this.animationFrameId);
    }

    /**
     * Liefert die Statistik der Runde für den Endscreen.
     * @returns {{coins: number, totalCoins: number, diamonds: number, totalDiamonds: number}}
     */
    getStats() {
        return {
            coins: this.coins,
            totalCoins: this.totalCoins,
            diamonds: this.diamonds,
            totalDiamonds: this.totalDiamonds
        };
    }

}