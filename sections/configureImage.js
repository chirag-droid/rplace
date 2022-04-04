import { isConfigured, addImage, imageConfig } from '../stores/image.js';
import * as image from '../prompts/image.js';

export default async function configureImage() {
  // if the image is not configured then ask the user to do so
  if (isConfigured()) {
    if (!(await image.changePrompt())) return;

    imageConfig.clear();
    return configureImage();
  }

  const rawImage = await image.rawPrompt();
  const height = await image.heightPrompt();
  const location = await image.locationPrompt();
  return addImage(rawImage, location, height);
}
