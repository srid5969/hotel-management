import {logger} from '../util';
import {sendNotification} from '../providers/email_service';
import {EmailProperties} from '../business_objects/auth';

export class EmailService {
  public async sendEMail(reqEmail: EmailProperties): Promise<boolean> {
    try {
      const emailProvider = await sendNotification(
        reqEmail.emailSubject,
        reqEmail.emailHTMLContent,
        reqEmail.emailTo,
        reqEmail.name
      );
      logger.info('Response in Email service', emailProvider);
      return emailProvider;
    } catch (error) {
      //Error while sending the SMS
      logger.error('Util_SERVICE_SENDMAIL_ERROR', error);
      return false;
    }
  }
}
