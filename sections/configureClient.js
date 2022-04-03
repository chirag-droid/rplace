import { idPrompt, changePrompt, secretPrompt } from '../prompts/client.js';
import { isConfigured, setClient } from '../stores/client.js';

export async function configureClient() {
  if (isConfigured()) {
    // if the user has logged on previously ask them
    // if they want to keep the same config
    if (!(await changePrompt())) return;
  }

  // If the user has not previously configured client
  // then make him do so and store in the config file
  setClient(await idPrompt(), await secretPrompt());
}
