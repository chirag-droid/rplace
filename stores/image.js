import Configstore from 'configstore';

const imageConfig = new Configstore('rplace/image');

export function addImage(path, location, size) {
  imageConfig.set('path', path);
  imageConfig.set('location', location);
  imageConfig.set('size', size);
}

export function getPath() {
  return imageConfig.get('path');
}

export function getLocation() {
  return imageConfig.get('location');
}

export function getSize() {
  return imageConfig.get('size');
}

export function isConfigured() {
  return imageConfig.has('path');
}
