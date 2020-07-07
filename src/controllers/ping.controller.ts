import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/core';
import {appInfo} from '../utils/app.info';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          success: {type: 'boolean'},
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      success: true,
      greeting: `Hello from ${appInfo.name.toUpperCase()}-${appInfo.version}.`,
      date: new Date(),
      url: this.req.url,
    };
  }
}
