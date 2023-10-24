require('dotenv').config();
import {logger} from '../util';
import axios from 'axios';
import qs from 'qs';

const TENANT_ID =
  process.env.EMAIL_TENANT_ID || '66095314-82d7-48e8-be7c-967c923aa1dd';
const CLIENT_ID =
  process.env.EMAIL_CLIENT_ID || '53d9c00a-4c10-4a1e-ac26-04201432bfef';
const CLIENT_SECRET =
  process.env.EMAIL_CLIENT_SECRET || '7iy8Q~Oicq6f9k30B_I6PrNVScoDkgTXB83x1aOM';
const AAD_ENDPOINT =
  process.env.EMAIL_AAD_ENDPOINT || 'https://login.microsoftonline.com';
const GRAPH_ENDPOINT =
  process.env.EMAIL_GRAPH_ENDPOINT || 'https://graph.microsoft.com';
const EMAIL_FROM_AD =
  process.env.EMAIL_FROM_AD || 'noreply.stakeholder@purehealth.ae';

function addRecipients(messageBody: any, rcpts: any = {}) {
  const cloned = Object.assign({}, messageBody);

  Object.keys(rcpts).forEach((element: any) => {
    if (rcpts[element].length > 0) {
      cloned.message[element + 'Recipients'] = createRecipients(rcpts[element]);
    }
  });

  return cloned;
}

function createRecipients(rcpts: any) {
  return rcpts.map((rcpt: any) => {
    return {
      emailAddress: {
        address: rcpt.address,
        name: rcpt.name || '',
      },
    };
  });
}

const createEmailAsJson = (rcpts: any, subject: any, body: any) => {
  let messageAsJson = {
    message: {
      subject: subject,
      body: {
        contentType: 'HTML',
        content: body,
      },
    },
  };

  messageAsJson = addRecipients(messageAsJson, rcpts);

  return messageAsJson;
};

const getAuthToken = async () => {
  const formData = {
    grant_type: 'client_credentials',
    scope: `${GRAPH_ENDPOINT}/.default`,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  console.log('url', `${AAD_ENDPOINT}/${TENANT_ID}/oauth2/v2.0/token`);

  const tokenObject = await axios({
    url: `${AAD_ENDPOINT}/${TENANT_ID}/oauth2/v2.0/token`,
    method: 'POST',
    data: qs.stringify(formData),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const {
    data: {access_token},
  } = tokenObject;

  return access_token;
};

export const sendNotification = async (
  subject: any,
  body: any,
  toAddress: any,
  name?: any
) => {
  const toAddressArray: any = [];
  if (typeof toAddress === 'object')
    for (let index = 0; index < toAddress.length; index++) {
      const obj = {
        address: toAddress[index],
        name: name || 'StakeholderManagement-User',
      };
      toAddressArray.push(obj);
    }
  console.log(typeof toAddress);
  if (typeof toAddress === 'string') {
    const obj = {
      address: toAddress,
      name: name || 'StakeholderManagement-User',
    };
    toAddressArray.push(obj);
  }

  // {address: toAddressArray, name: 'StakeholderManagement-User'}
  const recipientAddresses = {
    to: toAddressArray,
  };
  const from = EMAIL_FROM_AD;
  const message1 = createEmailAsJson(recipientAddresses, subject, body);
  const access_token = await getAuthToken();
  try {
    const response = await axios({
      url: `${GRAPH_ENDPOINT}/v1.0/users/${from}/sendMail`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(message1),
    });
    if (response.statusText === 'Accepted' && response.status === 202) {
      return true;
    }
    logger.info('sendNotification Status: ', response.statusText);
    return false;
  } catch (error) {
    console.log(error);
  }
};
