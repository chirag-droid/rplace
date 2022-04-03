import inquirer from 'inquirer';

import { validateUser } from '../lib/validate.js';
import { login } from '../lib/auth.js';
import { getSize } from '../stores/users.js';

export const choicePrompt = async () => {
  const choices = ['Next', 'Add a new user'];

  const choice = (
    await inquirer.prompt({
      name: 'choice',
      message: `${getSize()} users currently logged in. Do you want to start`,
      type: 'list',
      choices,
    })
  ).choice;

  return choices.indexOf(choice);
};

export const userPrompt = async () =>
  (
    await inquirer.prompt({
      name: 'user',
      type: 'input',
      message: 'Enter your reddit username',
      filter: (user) => user.replace(/^u]\//, ''),
      validate: (user) => validateUser(user),
    })
  ).user;

export const passPrompt = async (username) =>
  (
    await inquirer.prompt({
      name: 'pass',
      type: 'password',
      message: 'Enter your reddit password',
      mask: '*',
      validate: (password) => login(username, password),
    })
  ).pass;
