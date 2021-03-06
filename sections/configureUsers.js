import { passPrompt, userPrompt, choicePrompt } from '../prompts/users.js';
import { isConfigured } from '../stores/users.js';

export default async function configureUsers() {
  let next = false;

  // for loop that only stops when the user
  // chooses to start the main script
  while (!next) {
    // Check if the user has logged in previously
    if (!isConfigured()) {
      // If not then make the user add a user.
      await addUser();
    } else {
      // make the user choose whether they want to add
      // one more user or not.
      const choice = await choicePrompt();
      if (choice === 0) {
        next = true;
      } else {
        await addUser();
      }
    }
  }
}

async function addUser() {
  // get the username and password
  const user = await userPrompt();
  const pass = await passPrompt(user);
}
