let img, img_v;

function preload() {
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
    createCanvas(512, 512);
    img.resize(256, 256);

    img_v = createImage(256, 256);

    img.loadPixels();
    img_v.loadPixels();

    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let i = 4 * (y * img.width + x);

            let r = img.pixels[i] / 255;
            let g = img.pixels[i + 1] / 255;
            let b = img.pixels[i + 2] / 255;

            let v = Math.max(r, g, b) * 255;

            img_v.set(x, y, color(v));
        }
    }

    img_v.updatePixels();
    image(img_v, 0, 0);
    image(img, 256, 0);
}