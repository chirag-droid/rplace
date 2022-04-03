import clear from 'clear';
import figlet from 'figlet';
import gradient from 'gradient-string';

import { center } from '../lib/util.js';

const title = () => {
  // The title of the cli
  let text = center('r/place was better');

  // if the cli can fit more letters use a figlet font
  const columns = process.stdout.columns;
  if (columns >= 56) {
    const plainText = columns < 92 ? 'r/place' : 'r/place  2022';
    text = figlet.textSync(center(plainText, 8), 'ANSI Shadow');
  }

  // apply gradient to the text and log it
  console.log(gradient.morning(text));
  console.log();
};

export async function intro() {
  // Clear the console
  clear();

  // Display the title
  title();
}
