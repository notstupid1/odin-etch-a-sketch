const sketchPad = document.querySelector('.sketch-page');

let sketchPadPixel = [];

function createSketchPad(size){
    let maxWidth = sketchPad.style.maxWidth = '500px';
    let pixelSize = parseInt(maxWidth) / size;

    for(let i = 0; i < size ** 2; i++) {
        sketchPadPixel[i] = document.createElement('div');   
        sketchPadPixel[i].style.height = `${pixelSize}px`;
        sketchPadPixel[i].style.width = `${pixelSize}px`;
        sketchPadPixel[i].style.backgroundColor = 'grey';
        sketchPadPixel[i].addEventListener("mousedown", () => {sketchPadPixel[i].style.backgroundColor = 'black'});
        sketchPad.appendChild(sketchPadPixel[i]);     
    }
}

createSketchPad(16);