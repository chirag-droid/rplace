export const center = (text, width = 1) => {
  return text.padStart((process.stdout.columns / width + text.length) / 2, ' ');
};
