const sketchPad = document.querySelector('.sketch-page');
const resetBtn = document.querySelector('#reset');
const newSketchBtn = document.querySelector('#new-sketch');
const randomizeBtn = document.querySelector('#randomize');

let isRandomized = false;

let defaultSize = 16;
let defaultColor = '#eaeaea';

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
            render(sketchPadPixel[j]);
            sketchPad.appendChild(sketchPadPixel[j]);  
        }
    }
}

function render(pixel, color = defaultColor) {
    pixel.style.backgroundColor = color;
}

function draw() {
    for (let pixel of sketchPadPixel) {
        pixel.addEventListener('mouseover', 
        () => (!isRandomized) ? render(pixel, 'black') : render(pixel, randomize()));
    }
}

function reset() {
    for (let pixel of sketchPadPixel) {
        render(pixel);
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

function randomize() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let color = `rgb(${red}, ${green}, ${blue})`;
    return color;
}

randomizeBtn.addEventListener('click', 
            () => {
                    if (isRandomized) {
                        isRandomized = false;
                        randomizeBtn.textContent = "Randomize" 
                    } 
                    else {
                        isRandomized = true;
                        randomizeBtn.textContent = "Un-Randomize"
                    }
                  });

newSketchBtn.addEventListener('click', newSketch);
resetBtn.addEventListener('click', reset);
createSketchPad(defaultSize);
draw();