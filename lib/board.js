import apiClient from 'superagent';
import { getUser } from '../stores/users.js';
import { endpoint } from './constants.js';
import Jimp from 'jimp';
import { getLocation } from '../stores/image.js';
import colors from '../colors.js';
import { processedImage } from './image.js';

export async function drawUnsettedPixels(username) {
  const pixelData = await getUnsetPixel(username);

  const query = `
    mutation setPixel($input: ActInput!) {
      act(input: $input) {
        data {
          ... on BasicMessage {
            id
            data {
              ... on GetUserCooldownResponseMessageData {
                nextAvailablePixelTimestamp
              }
            }
          }
        }
      }
    }
  `;

  const { accessToken } = await getUser(username);

  let index = 0;

  let x = pixelData.location[0];
  let y = pixelData.location[1];

  while (x >= 1000) {
    x -= 1000;
    index += 1;
  }

  while (y >= 1000) {
    y -= 1000;
    index += 2;
  }

  const variables = {
    input: {
      actionName: 'r/replace:set_pixel',
      PixelMessageData: {
        coordinate: { x: x, y: y },
        colorIndex: colors[pixelData.color].id,
        canvasIndex: index,
      },
    },
  };

  try {
    const config = await apiClient
      .post(endpoint)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ query, variables });

    if (config.body.data) {
      console.log(
        `Drawing ${
          colors[pixelData.color].name
        } at x: ${x}, y: ${y} in canvas ${index}`
      );
      return (
        config.body.data.act.data[0].data.nextAvailablePixelTimestamp -
        Date.now() +
        20 * 1000
      );
    }

    return config.body.errors[0].extensions.nextAvailablePixelTs - Date.now();
  } catch (error) {
    console.log(error);
    return 5 * 60 * 1000;
  }
}

async function getUnsetPixel(username) {
  const board = await getBoard(username);

  const imageSize = [processedImage.getWidth(), processedImage.getHeight()];
  const location = getLocation();

  for (let x = 0; x < imageSize[0]; x++) {
    for (let y = 0; y < imageSize[1]; y++) {
      const imagePixel = processedImage.getPixelColor(x, y);
      const boardPixel = board.getPixelColor(location[0] + x, location[1] + y);

      if (imagePixel === 0) {
        continue;
      }

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

async function getBoard(username) {
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

async function getCanvasConfig(username) {
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
