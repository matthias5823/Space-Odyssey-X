const levelSectionStart = -100;   // x-Position des ersten Hintergrund-Abschnitts
const levelSectionWidth = 999;    // Breite eines Abschnitts
const levelSectionCount = 5;      // Anzahl der Abschnitte

const spawnStart = 600;    // erster Gegner-Platz – genug Abstand zum Start des Charakters
const spawnEnd = 3900;     // letzter Platz – vor dem Endboss (x = 4150)
const spawnJitter = 80;    // zufällige Verschiebung innerhalb des Platzes (± px)

// Ebenen des Hintergrunds, von hinten nach vorne
const backgroundLayers = [
    '01-himmel',
    '02-planeten',
    '03-wolken',
    '05-ferne-felsen',
    '06-fluss',
    '07-ufer',
    '08-inseln',
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
        createBackgrounds(),
        createItems()
    );
}


/**
 * Erzeugt alle Gegner des Levels mit Abstand zueinander.
 * Die Reihenfolge der Typen wird gemischt, jeder bekommt einen eigenen Platz.
 * @returns {MovableObject[]} Liste der Gegner
 */
function createOpponents() {
    let types = shuffle([
        Lizard, Lizard, Lizard,
        CrystalBeetle, CrystalBeetle, CrystalBeetle,
        PlantCreature, PlantCreature, PlantCreature, PlantCreature
    ]);
    let positions = createSpawnPositions(types.length);
    let opponents = types.map((Type, i) => new Type(positions[i])); // jeder Typ an seinem Platz
    opponents.push(new Endboss());                                  // Endboss bleibt fest am Ende
    return opponents;
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

/**
 * Teilt die Strecke von spawnStart bis spawnEnd in gleich große Plätze
 * und gibt für jeden Platz eine leicht zufällige x-Position zurück.
 * @param {number} count - Anzahl der Gegner
 * @returns {number[]} x-Positionen, von links nach rechts
 */
function createSpawnPositions(count) {
    let slotWidth = (spawnEnd - spawnStart) / count;               // Breite eines Platzes
    let positions = [];
    for (let i = 0; i < count; i++) {
        let center = spawnStart + slotWidth * (i + 0.5);           // Mitte des Platzes
        let jitter = (Math.random() * 2 - 1) * spawnJitter;        // zwischen -80 und +80
        positions.push(center + jitter);
    }
    return positions;
}

/**
 * Mischt ein Array zufällig (Fisher-Yates).
 * @param {Array} array - das zu mischende Array
 * @returns {Array} dasselbe Array, gemischt
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];               // zwei Elemente tauschen
    }
    return array;
}

const itemHeightGround = 385;   // erreichbar im Stehen
const itemHeightJump = 250;     // nur im Sprung erreichbar
const itemHeightHigh = 170;     // nur ganz oben im Sprung


/**
 * Erzeugt alle Items des Levels.
 * @returns {Collectible[]} Liste der Items
 */
function createItems() {
    return [
        ...createItemRow(Coin, 450, 5, 60, itemHeightGround),
        ...createItemRow(Coin, 1300, 5, 60, itemHeightJump),
        ...createItemRow(Coin, 2100, 6, 55, itemHeightGround),
        ...createItemRow(Coin, 2900, 5, 60, itemHeightJump),
        ...createItemRow(Coin, 3550, 4, 60, itemHeightGround),
        ...createItemRow(Battery, 800, 4, 850, itemHeightGround),
        ...createItemRow(Diamond, 1550, 3, 1100, itemHeightHigh),
        new MedKit(1900, itemHeightGround)
    ];
}


/**
 * Erzeugt mehrere gleiche Items in einer Reihe.
 * @param {Function} Type - Klasse, z. B. Coin
 * @param {number} startX - x-Position des ersten Items
 * @param {number} count - Anzahl
 * @param {number} gap - Abstand zwischen den Items
 * @param {number} y - Höhe
 * @returns {Collectible[]} die erzeugten Items
 */
function createItemRow(Type, startX, count, gap, y) {
    let row = [];
    for (let i = 0; i < count; i++) {
        row.push(new Type(startX + i * gap, y));
    }
    return row;
}