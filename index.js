import intro from './sections/intro.js';
import configureClient from './sections/configureClient.js';
import configureUsers from './sections/configureUsers.js';
import configureImage from './sections/configureImage.js';
import { drawUnsettedPixels } from './lib/board.js';
import { getAll } from './stores/users.js';
import { sleep } from './lib/util.js';

// Clear screen and show title
await intro();

// Manages how the client id and secret is stored and accessed
await configureClient();

// Manages the users logged in
await configureUsers();

// Configure an image
await configureImage();

async function draw(username) {
  while (true) {
    const cooldown = await drawUnsettedPixels(username);

    await sleep(cooldown + Math.floor(Math.random() * 30000));
  }
}

const workers = [];

for (const user in getAll()) {
  console.log('Added Worker ' + user);
  await sleep(Math.floor(Math.random() * 10000));
  workers.push(draw(user));
}
