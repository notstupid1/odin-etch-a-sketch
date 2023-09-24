const sketchPad = document.querySelector('.sketch-page');
const resetBtn = document.querySelector('#reset');
const newSketchBtn = document.querySelector('#new-sketch');

let defaultSize = 16;

let sketchPadPixel = [];

let maxWidth = sketchPad.style.maxWidth = '500px';

function createSketchPad(size){
    let pixelSize = parseInt(maxWidth) / size;

    if (sketchPadPixel.length !== 0) {
        for (let i = 0; i < sketchPadPixel.length; i++) {
            sketchPad.removeChild(sketchPadPixel[i]);   
        }
        sketchPadPixel.length = 0;
    }

    for(let i = 0; i < size; i++) {
        for(let j = (i * size); j < size * (i+1); j++) {
            sketchPadPixel[j] = document.createElement('div');   
            sketchPadPixel[j].style.height = `${pixelSize}px`;
            sketchPadPixel[j].style.width = `${pixelSize}px`;
            render(sketchPadPixel[j], '#d6d6d6');
            sketchPad.appendChild(sketchPadPixel[j]);  
        }
    }
    console.log(sketchPadPixel.length);
    console.log(sketchPadPixel);
}

function render(pixel, color) {
    pixel.style.backgroundColor = color;
}

function draw() {
    for (let pixel of sketchPadPixel) {
        pixel.addEventListener('mouseover', () => render(pixel, 'black'));
    }
}

function reset() {
    for (let pixel of sketchPadPixel) {
        render(pixel, '#d6d6d6');
    }
}

function newSketch() {
    let size = parseInt(prompt("Enter size of grid: "));
    if (size < 8) {
        alert("Size too small! Min Size - 8");
        return;
    }
    if (size > 100) {
        alert("Size too large! Max Size - 100");
        return;
    }
    createSketchPad(size);
    draw();
}

newSketchBtn.addEventListener('click', newSketch);
resetBtn.addEventListener('click', reset);
createSketchPad(defaultSize);
draw();