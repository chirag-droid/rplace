export const center = (text, width = 1) => {
  return text.padStart((process.stdout.columns / width + text.length) / 2, ' ');
};

export function colorDiff(color1, color2) {
  const { r: r1, g: g1, b: b1 } = color1;
  const { r: r2, g: g2, b: b2 } = color2;

  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
