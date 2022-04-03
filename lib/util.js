import { intToRGBA } from 'jimp';

export const center = (text, width = 1) => {
  return text.padStart((process.stdout.columns / width + text.length) / 2, ' ');
};

export function colorDiff(color1, color2) {
  const { r: r1, g: g1, b: b1 } = intToRGBA(color1);
  const { r: r2, g: g2, b: b2 } = intToRGBA(color2);

  return (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
}
