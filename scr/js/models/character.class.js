class Character extends MovableObject {
    
    speed = 10;
    
    imagesSleep = [
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_01.png',
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_02.png',
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_03.png',
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_04.png',
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_05.png',
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_06.png',
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_07.png',
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_08.png',
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_09.png',
        './assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_10.png'
    ];

    world;


    constructor() {
        super().loadImage('./assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_01.png');
        this.loadImages(this.imagesSleep);

        this.animate();
    };

    animate() {

        setInterval(() => {
            if (this.world.keyboard.right) {
                this.x += this.speed
            };
            if (this.world.keyboard.left) {
                this.x -= this.speed
            }
        }, 1000 / 60);


        setInterval(() => {

            if (this.world.keyboard.right || this.world.keyboard.left) {
                // Walk animation
                let i = this.currentImage % this.imagesSleep.length;
                let path = this.imagesSleep[i];
                this.img = this.imgCache[path];
                this.currentImage++;
            }

        }, 150);
    }

    jump() {

    };
}