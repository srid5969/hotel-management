import dotenv from 'dotenv';
import {Options} from 'sequelize';
dotenv.config();

export const environment = process.env.NODE_ENV;
export const appConfig = {
  port: process.env.PORT || 3000,
  appInsightsKey:
    process.env.APP_INSIGHTS_KEY || '00000000-0000-0000-0000-000000000000',
  serviceName: process.env.SERVICE_NAME || 'APP_SERVICE',
};

export const dbConfig: Options = {
  username: process.env.DB_USERNAME || 'dbadmin@stakeholdermgmtdevstg',
  password: process.env.DB_PASSWORD || 'M@gento12345',
  database: process.env.DB_NAME || 'Stakeholder_management_stg',
  host:
    process.env.DB_HOST || 'stakeholdermgmtdevstg.postgres.database.azure.com',
  port: parseInt(process.env.DB_PORT) || 5432,
  pool: {max: 60},
  dialect: 'postgres',
  dialectOptions: {
    options: {
      requestTimeout: 300000,
      encrypt: true,
    },
    ssl: {
      require: true,
    },
  },
};

export const templateConfig = {
  EMAIL_CREATE_USER_INVITE: 'EMAIL_CREATE_USER_INVITE',
  EMAIL_SEND_OTP: 'EMAIL_SEND_OTP',
  CREATE_UPDATE_MEETING: 'CREATE_UPDATE_MEETING',
  ESCALATION_EMAIL_3_MONTHS: 'ESCALATION_EMAIL_3_MONTHS',
  ESCALATION_EMAIL_3_MONTHS_STAKEHOLDER:
    'ESCALATION_EMAIL_3_MONTHS_STAKEHOLDER',
  ESCALATION_EMAIL_2_MONTHS_STAKEHOLDER:
    'ESCALATION_EMAIL_2_MONTHS_STAKEHOLDER',
  DOWNLOAD_REPORT: 'DOWNLOAD_REPORT',
  STAKEHOLDER_ACTION_TEMPLATE: 'STAKEHOLDER_ACTION_TEMPLATE',
};

export const statusConfig = {
  AUTO_APPROVED: 'AUTO_APPROVED',
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  REJECTED: 'REJECTED',
  APPROVED: 'APPROVED',
};

export const statusTypeConfig = {
  STAKE_HOLDER: 'STAKE_HOLDER',
};

export const notificationConfig = {
  USER_INVITE_TOKEN_EXPIRY: 'USER_INVITE_TOKEN_EXPIRY',
  USER_LOGIN_OTP_EXPIRY: 'USER_LOGIN_OTP_EXPIRY',
  USER_OTP_RESEND_TIME: 'USER_OTP_RESEND_TIME',
  MEETING_NOT_CREATED_ESCALATION_WARNING_2_MONTHS:
    'MEETING_NOT_CREATED_ESCALATION_WARNING_2_MONTHS',
  MEETING_NOT_CREATED_ESCALATION_WARNING_3_MONTHS:
    'MEETING_NOT_CREATED_ESCALATION_WARNING_3_MONTHS',
  EDIT_MEETING_EXPIRY_TIME: 'EDIT_MEETING_EXPIRY_TIME',
  FORGOT_PASSWORD_TOKEN_VALIDITY: 'FORGOT_PASSWORD_TOKEN_VALIDITY',
};

export const faqTypesConfig = {
  MEETING_GUIDELINES: 'MEETING_GUIDELINES',
  MEETING_STAKEHOLDER_FORM: 'MEETING_STAKEHOLDER_FORM',
  CORPORATE_AFFAIRS_INSTRUCTIONS: 'CORPORATE_AFFAIRS_INSTRUCTIONS',
};
export const meetingPriorityConfig = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};
export const meetingPriorityConfigValue = {
  1: 'HIGH',
  2: 'MEDIUM',
  3: 'LOW',
};
export const stakeholderPriorityLevelConfig = {
  P0: 'P0',
  P1: 'P1',
  P2: 'P2',
  P3: 'P3',
  P4: 'P4',
};

export const stakeHolderLinksTypeConfig = {
  LINKEDIN: 'LINKEDIN',
  NEWSARTICLES: 'NEWS-ARTICLES',
};

export const rolesConfig = {
  ADMIN: 'ADMIN',
  STAKEHOLDER_MANAGER: 'STAKEHOLDER_MANAGER',
  CXRO: 'CXRO', //new role added
};
