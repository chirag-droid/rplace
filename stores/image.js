import Configstore from 'configstore';

const imageConfig = new Configstore('rplace/image');

export function addImage(path, location, height) {
  imageConfig.set('path', path);
  imageConfig.set('location', location);
  imageConfig.set('height', height);
}

export function getPath() {
  return imageConfig.get('path');
}

export function getLocation() {
  return imageConfig.get('location');
}

export function getHeight() {
  return imageConfig.get('height');
}

export function isConfigured() {
  return imageConfig.has('path');
}
