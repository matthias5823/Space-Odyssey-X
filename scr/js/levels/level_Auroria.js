const levelSectionOne = - 150;
const levelSectionTwo = levelSectionOne + 999;
const levelSectionThree = levelSectionTwo + 999;
const levelSectionFour = levelSectionThree + 999;
const levelSectionFive = levelSectionFour + 999;

const levelAuroria = new Level(
    [
        new HoverDrone(),
        new HoverDrone(),
        new HoverDrone(),
        new Endboss()
    ],
    [
        new Cloud('./assets/imgs/Plain/Objekte/wolke_01.webp'),
        new Cloud('./assets/imgs/Plain/Objekte/wolke_02.webp'),
        new Cloud('./assets/imgs/Plain/Objekte/wolke_03.webp'),
        new Cloud('./assets/imgs/Plain/Objekte/wolke_04.webp'),
    ],
    [
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/01-himmel/01.webp', levelSectionOne),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/02-planeten/01.webp', levelSectionOne),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/05-ferne-felsen/01.webp', levelSectionOne),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/06-fluss/01.webp',levelSectionOne),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/07-ufer/01.webp',levelSectionOne),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/11-boden/01.webp', levelSectionOne),

//  <----------------------- ⊼⊼⊼⊼ End Section One ⊼⊼⊼⊼ ---- ⊽⊽⊽⊽ Beginn Section Two ⊽⊽⊽⊽ -------------

        new BackgroundObkject('./assets/imgs/Plain/Ebenen/01-himmel/02.webp', levelSectionTwo),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/02-planeten/02.webp', levelSectionTwo),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/05-ferne-felsen/02.webp', levelSectionTwo),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/06-fluss/02.webp',levelSectionTwo),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/07-ufer/02.webp',levelSectionTwo),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/11-boden/02.webp', levelSectionTwo),

//  <----------------------- ⊼⊼⊼⊼ End Section Two ⊼⊼⊼⊼ ---- ⊽⊽⊽⊽ Beginn Section Three ⊽⊽⊽⊽ -------------


        new BackgroundObkject('./assets/imgs/Plain/Ebenen/01-himmel/03.webp', levelSectionThree),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/02-planeten/03.webp', levelSectionThree),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/05-ferne-felsen/03.webp', levelSectionThree),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/06-fluss/03.webp',levelSectionThree),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/07-ufer/03.webp',levelSectionThree),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/11-boden/03.webp', levelSectionThree),

//  <----------------------- ⊼⊼⊼⊼ End Section Three ⊼⊼⊼⊼ ---- ⊽⊽⊽⊽ Beginn Section Four ⊽⊽⊽⊽ -------------

        new BackgroundObkject('./assets/imgs/Plain/Ebenen/01-himmel/04.webp', levelSectionFour),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/02-planeten/04.webp', levelSectionFour),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/05-ferne-felsen/04.webp', levelSectionFour),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/06-fluss/04.webp',levelSectionFour),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/07-ufer/04.webp',levelSectionFour),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/11-boden/04.webp', levelSectionFour),

//  <----------------------- ⊼⊼⊼⊼ End Section Four ⊼⊼⊼⊼ ---- ⊽⊽⊽⊽ Beginn Section Five ⊽⊽⊽⊽ -------------

        new BackgroundObkject('./assets/imgs/Plain/Ebenen/01-himmel/05.webp', levelSectionFive),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/02-planeten/05.webp', levelSectionFive),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/05-ferne-felsen/05.webp', levelSectionFive),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/06-fluss/05.webp',levelSectionFive),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/07-ufer/05.webp',levelSectionFive),
        new BackgroundObkject('./assets/imgs/Plain/Ebenen/11-boden/05.webp', levelSectionFive),


    ]
);
