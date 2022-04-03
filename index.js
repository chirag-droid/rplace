import intro from './sections/intro.js';
import configureClient from './sections/configureClient.js';
import configureUsers from './sections/configureUsers.js';
import configureImage from './sections/configureImage.js';

// Clear screen and show title
await intro();

// Manages how the client id and secret is stored and accessed
await configureClient();

// Manages the users logged in
await configureUsers();

// Configure an image
await configureImage();
