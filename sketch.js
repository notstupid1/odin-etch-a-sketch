const sketchPad = document.querySelector('.sketch-page');
const resetBtn = document.querySelector('#reset');
const newSketchBtn = document.querySelector('#new-sketch');
const randomizeBtn = document.querySelector('#randomize');
const effectBtn = document.querySelector('#effect');

let isRandomizeEnabled = false;
let isEffectEnabled = false;
let gradDark = 0;

let defaultSize = 16;
let defaultColor = '#eaeaea';

let sketchPadPixel = [];

let maxWidth = sketchPad.style.maxWidth = '600px';

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
        pixel.addEventListener('mouseover', () => decideColor(pixel));
    }
}

function decideColor(pixel) {
    let color;
    if(!isRandomizeEnabled) color = 'rgb(0, 0, 0)'; 
    else color = randomize();
    if(isEffectEnabled) {
        if(isRandomizeEnabled) color = effect(pixel, color);
        else color = effect(pixel);
    }

    render(pixel, color);
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

function effect(pixel, color = defaultColor) {
    let r, g, b, darkness;
    if (pixel.style.backgroundColor.slice(0, 3) === 'rgb') {
        let parsedColor = pixel.style.backgroundColor.split('(')[1].split(')')[0].split(',');
        r = parseInt(parsedColor[0]);
        g = parseInt(parsedColor[1]);
        b = parseInt(parsedColor[2]);
    }
    if (color !== defaultColor) {
        gradDark += 0.5;
        darkness = (r + g + b) / 3;

        let parsedColor = color.split('(')[1].split(')')[0].split(',');
        r = parseInt(parsedColor[0]);
        g = parseInt(parsedColor[1]);
        b = parseInt(parsedColor[2]);
        
        if (darkness - (darkness / 10) * gradDark > 0) {
            r = r - (r / 10) * gradDark;
            g = g - (g / 10) * gradDark;
            b = b - (b / 10) * gradDark;
        } else {
            gradDark = 0;
            r = g = b = 0;
        }
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        darkness = (r + g + b) / 3;
        if (darkness - (255 / 10) > 0) {
            r = r - (255 / 10);
            g = g - (255 / 10);
            b = b - (255 / 10);
        } else {
            r = g = b = 0;
        }
        return `rgb(${r}, ${g}, ${b})`;
    }
    return color;
}

randomizeBtn.addEventListener('click', 
            () => {
                    if (isRandomizeEnabled) {
                        isRandomizeEnabled = false;
                        randomizeBtn.textContent = "Randomize" 
                    } 
                    else {
                        isRandomizeEnabled = true;
                        randomizeBtn.textContent = "Un-Randomize"
                    }
                  });

effectBtn.addEventListener('click', 
                  () => {
                          if (isEffectEnabled) {
                              isEffectEnabled = false;
                              effectBtn.textContent = "Add Effect" 
                          } 
                          else {
                              isEffectEnabled = true;
                              effectBtn.textContent = "Remove Effect"
                          }
                        });

newSketchBtn.addEventListener('click', newSketch);
resetBtn.addEventListener('click', reset);
createSketchPad(defaultSize);
draw();