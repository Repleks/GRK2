let img, img_r, img_g, img_b, img_sum;

function preload() {
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
    createCanvas(512, 512);
    img.resize(256, 256);

    img_r = createImage(256, 256);
    img_g = createImage(256, 256);
    img_b = createImage(256, 256);
    img_sum = createImage(256, 256);

    img.loadPixels();
    img_r.loadPixels();
    img_g.loadPixels();
    img_b.loadPixels();

    for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
            let i = 4 * (y * img.width + x);

            img_r.pixels[i] = img.pixels[i];
            img_r.pixels[i + 1] = 0;
            img_r.pixels[i + 2] = 0;
            img_r.pixels[i + 3] = 255;

            img_g.pixels[i] = 0;
            img_g.pixels[i + 1] = img.pixels[i + 1];
            img_g.pixels[i + 2] = 0;
            img_g.pixels[i + 3] = 255;

            img_b.pixels[i] = 0;
            img_b.pixels[i + 1] = 0;
            img_b.pixels[i + 2] = img.pixels[i + 2];
            img_b.pixels[i + 3] = 255;
        }
    }

    img_r.updatePixels();
    img_g.updatePixels();
    img_b.updatePixels();

    img_sum.blend(img_r, 0, 0, 256, 256, 0, 0, 256, 256, ADD);
    img_sum.blend(img_g, 0, 0, 256, 256, 0, 0, 256, 256, ADD);
    img_sum.blend(img_b, 0, 0, 256, 256, 0, 0, 256, 256, ADD);

    image(img_r, 0, 0);
    image(img_g, 256, 0);
    image(img_b, 0, 256);
    image(img_sum, 256, 256);
}