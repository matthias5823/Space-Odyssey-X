class HoverDrone extends MovableObject {

     constructor(){
        super().loadImage('./assets/imgs/opponent/Echsen_Kreatur/Echsen_Kreatur_01.png');

        this.x = 200 + Math.random() * 500;
    };

}