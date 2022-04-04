import { idPrompt, changePrompt, secretPrompt } from '../prompts/client.js';
import { isConfigured, setClient, clientConfig } from '../stores/client.js';

export default async function configureClient() {
  if (isConfigured()) {
    if (!(await changePrompt())) return;

    // if the user has logged on previously ask them
    // if they want to keep the same config
    clientConfig.clear();
    return configureClient();
  }
  // If the user has not previously configured client
  // then make him do so and store in the config file
  return setClient(await idPrompt(), await secretPrompt());
}
