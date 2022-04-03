import Jimp from 'jimp';
import path from 'path';
import colors from '../colors.js';
import { colorDiff } from './util.js';

function closestColor(rawColor) {
  let min_diff = Infinity;
  let closestColor = 0;

  for (let color in colors) {
    const diff = colorDiff(rawColor, color);

    if (diff < min_diff) {
      min_diff = diff;
      closestColor = color;
    }
  }

  return closestColor;
}

export const processImage = async (file, height) => {
  const rawFile = await Jimp.read(file);

  rawFile.scale(height / rawFile.getHeight());

  for (let y = 0; y < rawFile.getHeight(); y++) {
    for (let x = 0; x < rawFile.getWidth(); x++) {
      const rawColor = rawFile.getPixelColor(x, y);
      rawFile.setPixelColor(closestColor(rawColor), x, y);
    }
  }

  await rawFile.writeAsync(`images/image.place.jpeg`);

  return {
    path: path.resolve('images/image.place.jpeg'),
    size: {
      width: rawFile.getWidth(),
      height: rawFile.getHeight(),
    },
  };
};
