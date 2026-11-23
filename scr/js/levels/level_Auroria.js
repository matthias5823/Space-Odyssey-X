const levelSectionStart = -100;   // x-Position des ersten Hintergrund-Abschnitts
const levelSectionWidth = 999;    // Breite eines Abschnitts
const levelSectionCount = 5;      // Anzahl der Abschnitte

// Ebenen des Hintergrunds, von hinten nach vorne
const backgroundLayers = [
    '01-himmel',
    '02-planeten',
    '03-wolken',
    '05-ferne-felsen',
    '06-fluss',
    '07-ufer',
    '11-boden'
];

let levelAuroria; // wird erst beim Spielstart gefüllt


/**
 * Erzeugt das Level Auroria mit Gegnern, Wolken und Hintergrund.
 * Wird erst beim Spielstart aufgerufen, damit die Gegner nicht schon im Menü loslaufen.
 */
function initLevel() {
    levelAuroria = new Level(
        createOpponents(),
        createClouds(),
        createBackgrounds()
    );
}


/**
 * Erzeugt alle Gegner des Levels.
 * @returns {MovableObject[]} Liste der Gegner
 */
function createOpponents() {
    return [
        new Lizard(), new Lizard(), new Lizard(),
        new CrystalBeetle(), new CrystalBeetle(), new CrystalBeetle(),
        new PlantCreature(), new PlantCreature(), new PlantCreature(), new PlantCreature(),
        new Endboss()
    ];
}


/**
 * Erzeugt die Wolken des Levels.
 * @returns {Cloud[]} Liste der Wolken
 */
function createClouds() {
    return [
        new Cloud('./assets/imgs/Plain/Objekte/wolke_01.webp'),
        new Cloud('./assets/imgs/Plain/Objekte/wolke_02.webp'),
        new Cloud('./assets/imgs/Plain/Objekte/wolke_03.webp'),
        new Cloud('./assets/imgs/Plain/Objekte/wolke_04.webp')
    ];
}


/**
 * Erzeugt alle Hintergrund-Ebenen für alle Abschnitte des Levels.
 * Abschnitt 1 nutzt die Bilder 01.webp, Abschnitt 2 die Bilder 02.webp usw.
 * @returns {BackgroundObkject[]} Liste der Hintergrundobjekte
 */
function createBackgrounds() {
    let backgrounds = [];
    for (let section = 0; section < levelSectionCount; section++) {
        let x = levelSectionStart + section * levelSectionWidth;   // Startposition des Abschnitts
        let number = '0' + (section + 1);                           // "01", "02", … "05"
        backgroundLayers.forEach((layer) => {
            let path = `./assets/imgs/Plain/Ebenen/${layer}/${number}.webp`;
            backgrounds.push(new BackgroundObkject(path, x));
        });
    }
    return backgrounds;
}