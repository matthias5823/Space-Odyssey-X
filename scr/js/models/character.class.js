class Character extends MovableObject {

    speed = 2;

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

    imagesWalk = [
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_01.webp',
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_02.webp',
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_03.webp',
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_04.webp',
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_05.webp',
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_06.webp',
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_07.webp',
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_08.webp',
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_09.webp',
        './assets/imgs/Captian_Leon/02_Run/Leon_Silber_Gehen_10.webp'
    ]

    world;


    constructor() {
        super().loadImage('./assets/imgs/Captian_Leon/01_Idle_sleep/captain_leon_idle_01.png');
        this.loadImages(this.imagesWalk);

        this.animate();
    };

    animate() {

        setInterval(() => {
            if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            };

            
            if (this.world.keyboard.left && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            };
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setInterval(() => {

            if (this.world.keyboard.right || this.world.keyboard.left) {
                // Walk animation
                let i = this.currentImage % this.imagesSleep.length;
                let path = this.imagesWalk[i];
                this.img = this.imgCache[path];
                this.currentImage++;
            }

        }, 150);
    }

    jump() {

    };
}