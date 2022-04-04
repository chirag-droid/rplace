import ConfigStore from 'configstore';

class ClientStore extends ConfigStore {
  get = (key) => process.env[key] || super.get(key);
  has = (key) => process.env[key] || super.has(key);
}

export const clientConfig = new ClientStore('rplace/client');

export function isConfigured() {
  return clientConfig.has('CLIENT_ID') && clientConfig.has('CLIENT_SECRET');
}

export function setClient(clientId, clientSecret) {
  clientConfig.set('CLIENT_ID', clientId);
  clientConfig.set('CLIENT_SECRET', clientSecret);
}

export function getClient() {
  const clientId = clientConfig.get('CLIENT_ID');
  const clientSecret = clientConfig.get('CLIENT_SECRET');

  if (clientId && clientSecret) {
    return { clientId, clientSecret };
  }
}
