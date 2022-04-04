import Jimp from 'jimp';
import colors from '../colors.js';
import { colorDiff } from './util.js';
import { getPath, getHeight } from '../stores/image.js';

function closestColor(rawColor) {
  let min_diff = Infinity;
  let closestColor = 0;

  for (let color in colors) {
    const diff = colorDiff(rawColor, Number.parseInt(color));

    if (diff < min_diff) {
      min_diff = diff;
      closestColor = Number.parseInt(color);
    }
  }

  return closestColor;
}

const processImage = async () => {
  const file = getPath();
  const height = getHeight();

  const rawFile = await Jimp.read(file);

  rawFile.scale(height / rawFile.getHeight());

  for (let y = 0; y < rawFile.getHeight(); y++) {
    for (let x = 0; x < rawFile.getWidth(); x++) {
      const rawColor = rawFile.getPixelColor(x, y);
      rawFile.setPixelColor(closestColor(rawColor), x, y);
    }
  }

  return rawFile;
};

export const processedImage = await processImage();
