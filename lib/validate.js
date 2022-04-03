import client from 'superagent';

import { baseUrl, userAgent } from './constants.js';
import Jimp from 'jimp';

// Validates if the user exists or not
const validateUser = async (user) => {
  user = user.replace(/^u\//, '');

  await client.get(`${baseUrl}/user/${user}.json`).set('user-agent', userAgent);

  return true;
};

const validateImage = async (file) => {
  try {
    await Jimp.read(file);
    return true;
  } catch (error) {
    if (!file.match(/\.(jpg|jpeg|png|bmp)$/g)) return 'Unsupported file format';
    return 'Couldn process your image';
  }
};

const validateLocation = (location) => {
  if (!location || !location.match(/^\d+ *, *\d+$/))
    return 'Please type location in x, y format';

  return true;
};

export { validateUser, validateImage, validateLocation };
