const portraits = {
    CaptianLeon: './assets/imgs/Captian_Leon/portait_Captian_Leon.png',
    Zix: './assets/imgs/Zix/portait_Zix.png'
};

const enemyInfos = [
    { name: 'Lizard', image: opponentsAuroria['lizard']['Walk'][0], tip: 'Spring ihm auf den Kopf – oder 2 Treffer.' },
    { name: 'Pflanze', image: opponentsAuroria['plant-creature']['Snatch'][5], tip: 'Wächst, wenn du näher kommst. 3 Treffer, halte Abstand.' },
    { name: 'Kristallkäfer', image: opponentsAuroria['crystal-beetle']['Walk'][0], tip: 'Schießt aus der Ferne. Nur mit 3 Treffern zu besiegen.' },
    { name: 'Warlord Vrex', image: finalOpponents['Auroria'].images.Walking[0], tip: 'Schwert und Laser. 10 Treffer – spar dir Batterien auf!' }
];

let settings = loadSettings();


window.addEventListener('DOMContentLoaded', () => {
    userPlayer = settings.character;
    openMainMenu();
});


/**
 * Lädt die Einstellungen aus dem Local Storage – fehlende Werte bekommen Standardwerte.
 * @returns {{sound: boolean, character: string}}
 */
function loadSettings() {
    let defaults = { sound: true, character: 'CaptianLeon' };
    let saved = JSON.parse(localStorage.getItem('spaceOdysseySettings')) || {};
    return { ...defaults, ...saved };
}


/**
 * Speichert die Einstellungen im Local Storage.
 */
function saveSettings() {
    localStorage.setItem('spaceOdysseySettings', JSON.stringify(settings));
}


/**
 * Schreibt HTML in den Startbildschirm.
 * @param {string} html - Inhalt des Menüs
 */
function renderStartScreen(html) {
    document.getElementById('start-screen').innerHTML = html;
}


/**
 * Zeigt das Hauptmenü.
 */
function openMainMenu() {
    renderStartScreen(mainMenuTemplate());
}


/**
 * Zeigt die Charakterauswahl.
 */
function openCharacterMenu() {
    let cards = Object.keys(players)
        .map((key) => characterCardTemplate(key, players[key].name, portraits[key], key === userPlayer))
        .join('');
    renderStartScreen(characterMenuTemplate(cards));
}


/**
 * Zeigt die Einstellungen.
 */
function openSettingsMenu() {
    renderStartScreen(settingsMenuTemplate(settings.sound));
}


/**
 * Zeigt die Einleitung mit allen Gegnern.
 */
function openIntroMenu() {
    let enemies = enemyInfos.map((enemy) => enemyInfoTemplate(enemy.image, enemy.name, enemy.tip)).join('');
    renderStartScreen(introMenuTemplate(enemies));
}


/**
 * Wählt einen Charakter, speichert die Wahl und zeigt die Auswahl neu an.
 * @param {string} key - Schlüssel aus players.js
 */
function selectCharacter(key) {
    if (world) return;
    userPlayer = key;
    settings.character = key;
    saveSettings();
    openCharacterMenu();
}


/**
 * Schaltet den Ton an oder aus und speichert die Einstellung.
 */
function toggleSound() {
    settings.sound = !settings.sound;
    saveSettings();
    openSettingsMenu();
}


/**
 * Zeigt den Endscreen mit der Statistik der Runde.
 * @param {boolean} won - gewonnen?
 * @param {Object} stats - Statistik aus world.getStats()
 */
function renderEndScreen(won, stats) {
    let endScreen = document.getElementById('end-screen');
    endScreen.innerHTML = endScreenTemplate(won, stats);
    endScreen.classList.remove('off');
}
