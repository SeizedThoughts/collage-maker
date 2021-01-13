const sharp = require('sharp');
const fs = require('fs');

const startTime = Date.now();

const {leftRight, format, directory, name, width, height, imageWidth, imageHeight} = JSON.parse(fs.readFileSync('config.json'));
const definedImgs = fs.readdirSync(`./${(directory ? directory : 'art')}`);

const images = [];

const imagePromises = [];

for(let i = 0; i < definedImgs.length; i++){
    imagePromises.push(
        sharp(`./${(directory ? directory : 'art')}/${definedImgs[i]}`)
            .resize(imageWidth / width, imageHeight / height)
            .raw()
            .toBuffer()
    );
}

Promise.all(imagePromises).then((results) => {
    const loadTime = Date.now();
    
    for(let i = 0; i < results.length; i++){
        const x = (leftRight ? i % width : Math.floor(i / height));
        const y = (leftRight ? Math.floor(i / width) : i % height);
        const buffer = results[i];
        const image = {
            input: buffer,
            top: (imageHeight / height) * y,
            left: (imageWidth / width) * x,
            raw: {
                width: (imageWidth / width),
                height: (imageHeight / height),
                channels: 3
            }
        };

        images.push(image);
    }

    sharp({
        create: {
            width: imageWidth,
            height: imageHeight,
            channels: 3,
            background: {
                r: 0,
                g: 0,
                b: 0
            }
        }
    }).composite(images)
        .toFile(`./out/${(name ? name : 'out')}.${(format ? format : 'png')}`)
        .then(() => {
            console.log('Load images (seconds):', (loadTime - startTime) / 1000);
            console.log('Composite image (seconds):', (Date.now() - startTime) / 1000);
        });
});