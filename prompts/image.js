import inquirer from 'inquirer';
import { validateImage, validateLocation } from '../lib/validate.js';

export const rawPrompt = async () =>
  (
    await inquirer.prompt({
      name: 'path',
      type: 'input',
      message: 'path to raw image file',
      validate: validateImage,
    })
  ).path;

export const changePrompt = async () =>
  (
    await inquirer.prompt({
      name: 'changeClient',
      type: 'confirm',
      message: 'Do you want to change your image config',
      default: false,
    })
  ).changeClient;

export const heightPrompt = async () =>
  (
    await inquirer.prompt({
      name: 'size',
      type: 'number',
      message: 'choose the maximum height for the image',
      validate: (h) => (h >= 10 ? true : 'height should atleast be 10'),
    })
  ).size;

export const locationPrompt = async () =>
  (
    await inquirer.prompt({
      name: 'location',
      type: 'input',
      message: 'Please enter the x,y location of the board.',
      validate: (location) => validateLocation(location),
    })
  ).location
    .split(',')
    .map((v) => Number.parseInt(v.trim(v)));
