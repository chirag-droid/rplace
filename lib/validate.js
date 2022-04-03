import client from 'superagent';

import { baseUrl, userAgent } from './constants.js';

// Validates if the user exists or not
const validateUser = async (user) => {
  user = user.replace(/^u\//, '');

  await client.get(`${baseUrl}/user/${user}.json`).set('user-agent', userAgent);

  return true;
};

export { validateUser };
