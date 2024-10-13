let img;

function preload() {
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
    createCanvas(512, 512);
    img.resize(256, 256);
    img.filter(GRAY);
    let histogram = new Array(256).fill(0);

    img.loadPixels();

    //zliczanie w gray filter
    for (let i = 0; i < img.pixels.length; i += 4) {
        let brightness = img.pixels[i];
        histogram[brightness]++;
    }

    background(255);
    let maxCount = max(histogram);

    //skalowanie z x i najwieksza wartoscia
    for (let i = 0; i < 256; i++) {
        let height = map(histogram[i], 0, maxCount, 0, 256);
        stroke(0);
        line(i * 2, 256, i * 2, 256 - height);
    }
}