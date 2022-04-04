import Jimp from 'jimp';

export const center = (text, width = 1) => {
  return text.padStart((process.stdout.columns / width + text.length) / 2, ' ');
};

export function colorDiff(color1, color2) {
  const { r: r1, g: g1, b: b1 } = Jimp.intToRGBA(color1);
  const { r: r2, g: g2, b: b2 } = Jimp.intToRGBA(color2);

  return 2 * (r1 - r2) ** 2 + 4 * (g1 - g2) ** 2 + 3 * (b1 - b2) ** 2;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
