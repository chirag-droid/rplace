import { isConfigured, addImage } from '../stores/image.js';
import * as image from '../prompts/image.js';

export default async function configureImage() {
  // if the image is not configured then ask the user to do so
  if (isConfigured()) {
    if (!(await image.changePrompt())) return;
  } else {
    const rawImage = await image.rawPrompt();
    const height = await image.heightPrompt();
    const location = await image.locationPrompt();
    addImage(rawImage, location, height);
  }
}
