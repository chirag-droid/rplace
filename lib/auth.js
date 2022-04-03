import client from 'superagent';
import { baseUrl } from './constants.js';
import { getClient } from '../stores/client.js';
import { addUser } from '../stores/users.js';

// get the access token and stuff.
export const getToken = async (username, password) => {
  const { clientId, clientSecret } = getClient();

  const res = await client
    .post(`${baseUrl}/api/v1/access_token`)
    .auth(clientId, clientSecret)
    .type('form')
    .send({ grant_type: 'password' })
    .send({ username })
    .send({ password });

  const error = res.body.error || res.body.errors;

  if (error) {
    return { error };
  }

  return {
    expiresIn: res.body.expires_in,
    accessToken: res.body.access_token,
  };
};

// login the user
export const login = async (username, password) => {
  username = username.replace(/^u\//, '');

  // get token
  const { error, expiresIn, accessToken } = await getToken(username, password);

  // return on error
  if (error) {
    if (error === 'unsported_grant_type') {
      return `make sure to add ${username} in list of developers`;
    }
    return `check your password again.`;
  }

  // add the user to the config
  await addUser(username, password, {
    accessToken,
    expiresIn,
  });

  return true;
};
