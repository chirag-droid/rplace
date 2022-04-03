import apiClient from 'superagent';
1491, 1349;
import { getUser } from '../stores/users.js';
import { endpoint } from './constants.js';
import Jimp from 'jimp';
import { getLocation } from '../stores/image.js';

export async function getUnsetPixels(username) {
  const image = await Jimp.read(getLocation());
  const board = await getBoard(username);

  const imageSize = [image.getWidth(), image.getHeight()];
  const location = getLocation();

  for (x = 0; x < imageSize[0]; x++) {
    for (y = 0; y < imageSize[1]; y++) {
      const imagePixel = image.getPixelColor(x, y);
      const boardPixel = board.getPixelColor(location[0] + x, location[1] + y);

      if (imagePixel !== boardPixel) {
        return {
          color: imagePixel,
          location: [location[0] + x, location[1] + y],
        };
      }
    }
  }

  return {
    color: 0x00000000,
    location: [0, 0],
  };
}

export async function getBoard(username) {
  let width = 0,
    height = 0;
  let promises = [];

  const configs = await getCanvasConfig(username);

  configs.forEach((config) => {
    (width += config.dx), (height += config.dy);
    promises.push(getCanvas(username, config.index));
  });

  const board = new Jimp(width, height, 'white');

  const canvases = await Promise.all(promises);

  configs.forEach((config) => {
    board.blit(canvases[config.index], config.dx, config.dy);
  });

  return board;
}

async function getCanvas(username, id) {
  const { accessToken } = await getUser(username);

  const query = `
    subscription replace($input: SubscribeInput!) {
      subscribe(input: $input) {
        ... on BasicMessage {
          data {
            ... on FullFrameMessageData {
              name
            }
          }
        }
      }
    }
  `;

  const variables = {
    input: {
      channel: {
        teamOwner: 'AFD2022',
        category: 'CANVAS',
        tag: id.toString(),
      },
    },
  };

  const canvas = await apiClient
    .post(endpoint)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ query, variables });

  return await Jimp.read(canvas.body.data.subscribe.data.name);
}

export async function getCanvasConfig(username) {
  const { accessToken } = await getUser(username);

  const query = `
  subscription replace($input: SubscribeInput!) {
    subscribe(input: $input) {
      ... on BasicMessage {
        data {
          ... on ConfigurationMessageData {
            canvasConfigurations {
                index
                dx
                dy
            }
          }
        }
      }
    }
  }
  `;

  const variables = {
    input: {
      channel: {
        teamOwner: 'AFD2022',
        category: 'CONFIG',
      },
    },
  };

  const config = await apiClient
    .post(endpoint)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({ query, variables });

  return config.body.data.subscribe.data.canvasConfigurations;
}
