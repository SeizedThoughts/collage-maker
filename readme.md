###setup
create a directory for the input images.

then, just make a config.json file in this format:

```json
{
    "leftRight": true,
    "format": "png",
    "directory": "art",
    "name": "out",
    "width": 16,
    "height": 9,
    "imageWidth": 1920,
    "imageHeight": 1080
}
```

format, directory, and name are all optional.
they default to png, art, and out respectively.

finally, execute:
npm install

###usage

to create a collage, add images to the input folder and execute:
npm run compose

###config key

leftRight defines the fill order: left to right, top to bottom or top to bottom, left to right
format defines the image format of the output image.
directory defines a custom directory for images to be stored.
name defines a custom output image name.
width defines the number of images across.
height defines the number of images high.
imageWidth defines the width, in pixels, that the output image should be.
imageHeight defines the height, in pixels, that the output image should be.