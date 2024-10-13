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

            let cmax = Math.max(r, g, b); // V?
            let cmin = Math.min(r, g, b);
            let delta = cmax - cmin; // c

            let h = 0;
            if(delta === 0) {
                h = 0;
            }
            if (cmax === r) {
                h = ((g - b) / delta) % 6;
            }
            else if (cmax === g) {
                h = ((b - r) / delta) + 2;

            }
            else {
                h = ((r - g) / delta) + 4;
            }

            // h/=6;
            // if(h<0) h+=1; nie dziala, cale czarne

            h *= 60;
            if (h < 0) h += 360;
            img_h.set(x, y, color(h)); // Skala odcienia przeskalowana

            let s = (cmax === 0 ? 0 : delta / cmax) * 255;
            img_s.set(x, y, color(s)); // HSV

            let v = cmax * 255;
            img_v.set(x, y, color(v)); // V chroma
        }
    }

    img_h.updatePixels();
    img_s.updatePixels();
    img_v.updatePixels();

    image(img_h, 0, 0);
    image(img_s, 256, 0);
    image(img_v, 0, 256);
    image(img, 256, 256);
}
