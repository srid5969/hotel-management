import {logger} from '../util';
import {MailProvider} from '../providers/mail';
import {EmailProperties} from '../business_objects/auth';

export class MailService {
  private mailProvider = new MailProvider();
  public async sendEMail(reqEmail: EmailProperties): Promise<boolean> {
    try {
      const result: any = await this.mailProvider.sendEmail(
        reqEmail.emailFrom,
        reqEmail.emailTo,
        reqEmail.emailSubject,
        reqEmail.emailHTMLContent
      );
      logger.info('Response in Email service', result);
      return result;
    } catch (error) {
      //Error while sending the SMS
      logger.error('Util_SERVICE_SENDMAIL_ERROR', error);
      return false;
    }
  }
}
