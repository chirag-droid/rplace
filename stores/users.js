import ConfigStore from 'configstore';
import logSymbols from 'log-symbols';

import { getToken } from '../lib/auth.js';

const usersConfig = new ConfigStore('rplace/users');

// Add the user, and add expires in seconds to current time
export async function addUser(username, password, { accessToken, expiresIn }) {
  // lowercase username bcs usernames are case insensitive
  username = username.toLowerCase();

  usersConfig.set(username, {
    username,
    password,
    accessToken,
    expiresAt: expiresIn * 1000 + new Date().getTime(),
  });
}

// Get the user by its username
export async function getUser(username) {
  username = username.toLowerCase();

  const user = usersConfig.get(username);

  // If the user doesn't exist, simply return
  if (!user) return;

  // Before returning the user, check if it is not expired
  // and refresh it if necessary
  if (user.expiresAt < new Date().getTime() + 180000) {
    refreshUser(username);
  }

  return usersConfig.get(username);
}

// refreshes the token if it expires
export async function refreshUser(username) {
  username = username.toLowerCase();
  // get the password of the user
  const { password } = await usersConfig.get(username);

  const { error, expiresIn, accessToken } = await getToken(username, password);

  // if there is error log it and delete the respective user.
  if (error) {
    // console.log(`removing u/${username} due to login failure.`)
    usersConfig.delete(username);
    return;
  }

  await addUser(username, password, {
    accessToken,
    expiresIn,
  });
}

export function deleteUser(username) {
  usersConfig.delete(username.toLowerCase());
}

export function getSize() {
  return usersConfig.size;
}

export function isConfigured() {
  return usersConfig.size > 0;
}
