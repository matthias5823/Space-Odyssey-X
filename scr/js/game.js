let canvas;
let world;
let keyboard = new Keyboard();
let userPlayer = "CaptianLeon";

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);



    console.log(`My Character is`, world.character);
    console.log(`My chicken is`, world.opponents);


}

window.addEventListener("keydown", (pressKey) => {
    console.log(pressKey);
    
    if (pressKey.keyCode == 39) {
        keyboard.right = true;
    };
    if (pressKey.keyCode == 37) {
        keyboard.left = true;
    };
    if (pressKey.keyCode == 38) {
        keyboard.up = true;
    };
    if (pressKey.keyCode == 40) {
        keyboard.down = true;
    };
    if (pressKey.keyCode == 32) {
        keyboard.space = true;
    };
});

window.addEventListener("keyup", (pressKey) => {
    if (pressKey.keyCode == 39) {
        keyboard.right = false;
    };
    if (pressKey.keyCode == 37) {
        keyboard.left = false;
    };
    if (pressKey.keyCode == 38) {
        keyboard.up = false;
    };
    if (pressKey.keyCode == 40) {
        keyboard.down = false;
    };
    if (pressKey.keyCode == 32) {
        keyboard.space = false;
    };
});

function setCharacter(character){
    if(world)return;  // Prüft ob das spiel bereits läuft das der Charakter nicht veränderbar ist
    userPlayer = character;
}

function startGame() {
    if (world) return;              // läuft schon → nicht noch einmal starten
    document.activeElement.blur();  // Fokus vom Button nehmen, sonst "klickt" die Leertaste ihn
    initLevel();                    // NEU: Level + Gegner erst jetzt erzeugen
    init();                         // World + Charakter erzeugen
}