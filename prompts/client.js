import inquirer from 'inquirer';

export const idPrompt = async () =>
  (
    await inquirer.prompt({
      name: 'clientId',
      type: 'input',
      message: 'Enter your client id',
    })
  ).clientId;

export const secretPrompt = async () =>
  (
    await inquirer.prompt({
      name: 'clientSecret',
      type: 'password',
      mask: '*',
      message: 'Enter your client secret',
    })
  ).clientSecret;

export const changePrompt = async () =>
  (
    await inquirer.prompt({
      name: 'changeClient',
      type: 'confirm',
      message: 'Do you want to change your client config',
      default: false,
    })
  ).changeClient;
