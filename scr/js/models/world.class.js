class World {
    character = new Character();
    level = levelAuroria;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    lifeBar = new LifeBar();
    shotProjectTarget = [];
    enemyShots = [];



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkShotCollisions();
        this.checkJumpOnOpponents();
        this.checkEnemyShotCollisions();
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
        this.removeOldShots();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);


        this.ctx.translate(-this.camera_x, 0); // Back
        //  <--------------------------- ⊽⊽⊽⊽ Beginn Space for fix Objects ⊽⊽⊽⊽ -------------

        this.addToMap(this.lifeBar);
        this.addToMap(this.statusBar);
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

                    let isTarget = opponent instanceof Lizard || opponent instanceof PlantCreature || opponent instanceof CrystalBeetle;

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
                let gone = shot.hasHit || shot.x < -200 || shot.x > this.level.level_end_x + 200;
                if (gone) shot.stop();
                return !gone;
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






}