import 'isomorphic-fetch';
import {
  AuthenticationProvider,
  Client,
  ClientOptions,
} from '@microsoft/microsoft-graph-client';
import {azureConfig} from '../config';
import axios from 'axios';
import qs from 'querystring';

class HealthAppAuthProvider implements AuthenticationProvider {
  public async getAccessToken() {
    const endpoint = `${azureConfig.baseUrl}/${azureConfig.tenant}/${azureConfig.tokenEndpoint}`;
    const data = {
      grant_type: azureConfig.grant_type,
      client_id: azureConfig.client_id,
      client_secret: azureConfig.client_secret,
      scope: azureConfig.scope,
    };

    const response = await axios.post(endpoint, qs.stringify(data));
    return response.data.access_token;
  }
}

const clientOptions: ClientOptions = {
  authProvider: new HealthAppAuthProvider(),
};

let client: Client;
export class B2CPRovider {
  static getClient() {
    if (!client) {
      client = Client.initWithMiddleware(clientOptions);
    }
    return client;
  }
}
