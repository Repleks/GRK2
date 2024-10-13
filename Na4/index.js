let img, img_h, img_s, img_v;

function preload() {
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
    createCanvas(512, 512);
    img.resize(256, 256);

    img_h = createImage(256, 256);
    img_s = createImage(256, 256);
    img_v = createImage(256, 256);

    img.loadPixels();
    img_h.loadPixels();
    img_s.loadPixels();
    img_v.loadPixels();

    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let i = 4 * (y * img.width + x);

            let r = img.pixels[i] / 255;
            let g = img.pixels[i + 1] / 255;
            let b = img.pixels[i + 2] / 255;

            let cmax = Math.max(r, g, b);
            let cmin = Math.min(r, g, b);
            let delta = cmax - cmin; // c

            let s = (cmax === 0 ? 0 : delta / cmax) * 255; // HSV
            img_s.set(x, y, color(s));

            let v = cmax * 255; // V chroma
            img_v.set(x, y, color(v));
        }
    }

    img_s.updatePixels();
    img_v.updatePixels();

    image(img_s, 256, 0);
    image(img_v, 0, 256);
    image(img, 256, 256);
}