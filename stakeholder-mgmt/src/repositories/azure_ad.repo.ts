import {ConfirmUserReq} from '../business_objects/auth';
import {azureConfig} from '../config';
import axios from 'axios';
import qs from 'querystring';
import {B2CUser, B2CUserToken} from '../business_objects/b2c';
import {B2CPRovider} from '../providers';

export class AzureUserRepository {
  public async createUser(resource: ConfirmUserReq): Promise<B2CUser> {
    const client = B2CPRovider.getClient();

    const userToBeCreated = {
      accountEnabled: true,
      displayName: resource.email,
      passwordPolicies: 'DisablePasswordExpiration',
      mail: resource.email,
      passwordProfile: {
        password: resource.password,
        forceChangePasswordNextSignIn: false,
      },
      userPrincipalName: `${resource.name}@${azureConfig.tenant}`,
      identities: [
        {
          // TODO signUpType
          signInType: 'email',
          issuer: azureConfig.tenant,
          issuerAssignedId: resource.email.toLocaleLowerCase(),
        },
      ],
    };
    return await client.api('/users').create(userToBeCreated);
  }

  public async getb2cToken(
    email: string,
    password: string
  ): Promise<B2CUserToken> {
    const endpoint = azureConfig.b2cTokenEndpoint;
    const body = {
      grant_type: 'password',
      username: email,
      password: password,
      client_id: azureConfig.client_id,
      scope: `openid ${azureConfig.client_id} offline_access`,
    };
    const {data} = await axios.post(endpoint, qs.stringify(body));
    return data;
  }

  public async getRefreshToken(token: string): Promise<B2CUserToken> {
    const endpoint = azureConfig.b2cTokenEndpoint;
    const data = {
      grant_type: 'refresh_token',
      refresh_token: token,
      client_id: azureConfig.client_id,
    };
    const response = await axios.post<B2CUserToken>(
      endpoint,
      qs.stringify(data)
    );
    delete response.data.resource;
    delete response.data.scope;
    delete response.data.id_token;
    delete response.data.not_before;
    delete response.data.profile_info;
    delete response.data.expires_in;
    delete response.data.expires_on;
    delete response.data.id_token_expires_in;
    delete response.data.refresh_token_expires_in;
    return response.data;
  }

  public async updateUserPassword(
    id: string,
    new_password: string
  ): Promise<string> {
    const client = B2CPRovider.getClient();
    const userToBeUpdated = {
      passwordProfile: {
        password: new_password,
        forceChangePasswordNextSignIn: false,
      },
    };
    const userUpdated = await client
      .api('/users/' + id)
      .update(userToBeUpdated);
    return userUpdated;
  }

  public async revokeRefreshToken(
    id: string,
    refreshToken?: string
  ): Promise<unknown> {
    const client = B2CPRovider.getClient();
    const headerOptions = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    };
    const refreshTokenRevokedStatus = await client
      .api('/users/' + id + '/revokeSignInSessions')
      .post(headerOptions);
    return refreshTokenRevokedStatus;
  }
}
