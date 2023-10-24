import dotenv from 'dotenv';
dotenv.config();

export const emailConfig = {
  email_key:
    process.env.MAIL_KEY ||
    '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',
  email_from: process.env.EMAIL_FROM || 'stakeholdermanagement0@gmail.com',
};
