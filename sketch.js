const sketchPad = document.querySelector('.sketch-page');

let sketchPadPixel = [];

function createSketchPad(size){
    let maxWidth = sketchPad.style.maxWidth = '500px';
    let pixelSize = parseInt(maxWidth) / size;

    for(let i = 0; i < size ** 2; i++) {
        sketchPadPixel[i] = document.createElement('div');   
        sketchPadPixel[i].style.height = `${pixelSize}px`;
        sketchPadPixel[i].style.width = `${pixelSize}px`;
        sketchPadPixel[i].style.backgroundColor = '#d6d6d6';
        sketchPadPixel[i].addEventListener('click', draw(sketchPadPixel[i]));
        sketchPad.appendChild(sketchPadPixel[i]);     
    }
}

function draw(pixel) {
    pixel.onmouseover = () => {pixel.style.backgroundColor = 'black'};
}

createSketchPad(16);