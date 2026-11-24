class StatusBar extends DrawableObject {
    percentage = 100;

    /**
     * @param {string[]} images - 10 Bilder, vom leersten (Index 0) bis zum vollen (Index 9)
     * @param {number} x - Position links
     * @param {number} y - Position oben
     * @param {number} width - Breite
     * @param {number} height - Höhe
     */
    constructor(images, x, y, width, height) {
        super();
        this.images = images;
        this.loadImages(images);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setPercentage(100);
    }


    /**
     * Setzt den Füllstand und zeigt das passende Bild.
     * @param {number} percentage - 0 bis 100
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        this.img = this.imgCache[this.images[this.resolveImageIndex()]];
    }


    /**
     * Rechnet den Prozentwert in einen Bild-Index um: 1–10 % → 0, 11–20 % → 1 … 91–100 % → 9.
     * @returns {number} Index zwischen 0 und images.length - 1
     */
    resolveImageIndex() {
        let index = Math.ceil(this.percentage / 10) - 1;
        return Math.max(0, Math.min(index, this.images.length - 1)); // nie kleiner 0, nie größer als letztes Bild
    }
}