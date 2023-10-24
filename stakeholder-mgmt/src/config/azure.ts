import dotenv from 'dotenv';
dotenv.config();
export const azureConfig = {
  baseUrl: 'https://login.microsoftonline.com',
  tenant:
    process.env.STAKEHOLDER_MGMT_AZURE_AD_TENANT_NAME ||
    'stakeholdermgmtauthb2cdev.onmicrosoft.com',
  tokenEndpoint: 'oauth2/v2.0/token',
  grant_type: 'client_credentials',
  client_id:
    process.env.STAKEHOLDER_MGMT_AZURE_AD_CLIENT_ID ||
    '417092d9-b79b-4d77-b875-1321633f7eae',
  client_secret:
    process.env.STAKEHOLDER_MGMT_AZURE_AD_CLIENT_SECRET ||
    'saK8Q~7ndyWORXJ304T7D3FRDurWaSx6yxM.qb_1',
  scope: 'https://graph.microsoft.com/.default',
  b2cTokenEndpoint:
    process.env.STAKEHOLDER_MGMT_B2C_TOKEN_ENDPOINT ||
    'https://stakeholdermgmtauthb2cdev.b2clogin.com/stakeholdermgmtauthb2cdev.onmicrosoft.com/b2c_1_sign_in/oauth2/v2.0/token',
};

export const azureFileUploadConfig = {
  storageAccount:
    process.env.STORAGE_ACCOUNT_FILE_UPLOAD || 'stkhldrmanagerportaldev',
  connectionString:
    process.env.CONNECTION_STRING_FILE_UPLOAD ||
    'DefaultEndpointsProtocol=https;AccountName=stkhldrmanagerportaldev;AccountKey=zRlb/T3G8bA+uygrHKOt9l2XCcErhNX87eGQO4BTYo8WrR4pfXJltX17aTi/ySJKDkeVOS9NoHlR+AStWptp3Q==;EndpointSuffix=core.windows.net',
  key:
    process.env.KEY_FILE_UPLOAD ||
    'zRlb/T3G8bA+uygrHKOt9l2XCcErhNX87eGQO4BTYo8WrR4pfXJltX17aTi/ySJKDkeVOS9NoHlR+AStWptp3Q==',
  userProfileContainer:
    process.env.USER_PROFILE_CONTAINER_FILE_UPLOAD || 'userprofile',
  stakeholderProfileContainer:
    process.env.STAKEHOLDER_PROFILE_CONTAINER_FILE_UPLOAD ||
    'stakeholderprofile',
  meetingAttachmentsContainer:
    process.env.MEETING_ATTACHMENTS_CONTAINER_FILE_UPLOAD ||
    'meetingattachments',
  meetingReportContainer:
    process.env.MEETING_REPORT_CONTAINER_FILE_UPLOAD || 'meetingreports',
};

export const azurePortalUrlConfig = {
  managerPortalUrl:
    process.env.MANAGER_PORTAL_URL ||
    'https://stkhldrmanagerportaldev.z1.web.core.windows.net',
};
