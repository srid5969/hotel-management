import sendGrid from '@sendgrid/mail';
import {logger} from '../util';
import {emailConfig} from '../config/email';

export class MailProvider {
  /**
   * sendEmail
   * @param from
   * @param to
   * @param subject
   * @param plainTextContent
   * @param htmlContent
   * @returns
   */
  public async sendEmail(
    from: string,
    to: string | string[],
    subject: string,
    htmlContent: string
  ) {
    sendGrid.setApiKey(emailConfig.email_key);

    const msg: any = {
      from: from ? from : emailConfig.email_from,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    return new Promise(resolve => {
      sendGrid
        .send(msg)
        .then(response => {
          logger.info('MAIL_SENT_RESPONSE', {response, emailConfig});
          resolve(true);
        })
        .catch(err => {
          const errObj: any = {
            sendGridError: err?.response?.body?.errors,
            exception: err,
          };
          logger.error('MAIL_FAILED', {errObj, emailConfig});
          resolve(false);
        });
    });
  }
}
