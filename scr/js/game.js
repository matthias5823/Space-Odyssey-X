let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);



    console.log(`My Character is`, world.character);
    console.log(`My chicken is`, world.hoverDrones);


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
