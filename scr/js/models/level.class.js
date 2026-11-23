class Level {
opponents;
clouds;
backgroundObjects;
level_end_x = (1000 * 5) - 150;


constructor(opponents, clouds, backgroundObjects){
    this.opponents = opponents;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
}
}