let canvas;
let world;
let keyboard = new Keyboard();
let userPlayer = 'CaptianLeon';
let intervalIds = [];

const keyMap = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
    Space: 'space'
};


window.addEventListener('keydown', (event) => setKey(event.code, true));
window.addEventListener('keyup', (event) => setKey(event.code, false));


/**
 * Setzt die passende Taste im Keyboard-Objekt.
 * @param {string} code - event.code der Taste, z. B. 'ArrowLeft'
 * @param {boolean} pressed - gedrückt (true) oder losgelassen (false)
 */
function setKey(code, pressed) {
    let action = keyMap[code];
    if (action) keyboard[action] = pressed;
}


/**
 * Erzeugt World und Charakter.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * Startet ein neues Spiel – auch als Neustart nach dem Endscreen.
 */
function startGame() {
    if (world) return;
    document.activeElement.blur();
    keyboard = new Keyboard();
    showScreen('canvas');
    initLevel();
    init();
}


/**
 * Startet ein Intervall und merkt sich seine ID, damit es später gestoppt werden kann.
 * @param {Function} fn - Funktion, die wiederholt ausgeführt wird
 * @param {number} time - Abstand in ms
 * @returns {number} ID des Intervalls
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}


/**
 * Stoppt alle Intervalle des Spiels auf einmal.
 */
function stopAllIntervals() {
    intervalIds.forEach((id) => clearInterval(id));
    intervalIds = [];
}


/**
 * Zeigt genau einen Bildschirm und blendet die anderen aus.
 * @param {string} id - 'start-screen', 'canvas' oder 'end-screen'
 */
function showScreen(id) {
    ['start-screen', 'canvas', 'end-screen'].forEach((screen) => {
        document.getElementById(screen).classList.toggle('off', screen !== id);
    });
}


/**
 * Beendet das Spiel und zeigt den Endscreen über dem letzten Spielbild.
 * @param {boolean} won - true = gewonnen, false = verloren
 */
function endGame(won) {
    if (!world) return;
    let stats = world.getStats();
    world.stop();
    world = null;
    renderEndScreen(won, stats);
}


/**
 * Zurück zum Hauptmenü.
 */
function goHome() {
    showScreen('start-screen');
    openMainMenu();
}