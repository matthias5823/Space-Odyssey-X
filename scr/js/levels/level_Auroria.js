const levelAuroria = new Level(
    [
        new HoverDrone(),
        new HoverDrone(),
        new HoverDrone(),
    ],
    [
        new Cloud()
    ],
    [
        new BackgroundObkject('./assets/imgs/Plain/back/01_Himmelsverlauf.webp', -719),
        new BackgroundObkject('./assets/imgs/Plain/back/03_Ferne_Berge.webp', -719),
        new BackgroundObkject('./assets/imgs/Plain/back/Auroria_Felsberg.webp', -719),
        new BackgroundObkject('./assets/imgs/Plain/down/05_Laufboden.webp', -719),

        new BackgroundObkject('./assets/imgs/Plain/back/01_Himmelsverlauf.webp', 0),
        new BackgroundObkject('./assets/imgs/Plain/back/03_Ferne_Berge.webp', 0),
        new BackgroundObkject('./assets/imgs/Plain/back/02_Flusstal.webp', 0),
        new BackgroundObkject('./assets/imgs/Plain/back/Auroria_Felsberg.webp', 0),
        new BackgroundObkject('./assets/imgs/Plain/down/05_Laufboden.webp', 0),
        
        new BackgroundObkject('./assets/imgs/Plain/back/01_Himmelsverlauf.webp', 719),
        new BackgroundObkject('./assets/imgs/Plain/back/03_Ferne_Berge.webp', 719),
        new BackgroundObkject('./assets/imgs/Plain/back/Auroria_Felsberg.webp', 719),
        new BackgroundObkject('./assets/imgs/Plain/down/05_Laufboden.webp', 719),
    ]
);
