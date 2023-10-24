import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {TemplateRepository} from '../../repositories/template.repo';
import {EmailProperties} from '../../business_objects/auth';
// import {emailConfig} from '../../config/email';
// import {MailService} from '../../services/mail.service';
import {
  resendInvitationEmailRes,
  resendInvitationEmailReq,
} from '../../business_objects/send-email';
import {UserRepository} from '../../repositories/users.repo';
import {templateConfig} from '../../config/app';
import {azurePortalUrlConfig} from '../../config/azure';
import {v4 as uuidV4} from 'uuid';
import {EmailService} from '../../services/email.service';

export class SendEmailController {
  private static TemplateRepo = new TemplateRepository();
  private static userRepo = new UserRepository();
  // private static mailService = new MailService();
  private static emailService = new EmailService();

  public static async resendEmail(req: Request, res: Response): Promise<void> {
    const taskName = 'RESEND_INVITATION_EMAIL';
    logger.info(`${taskName}_REQ`, req.body);
    try {
      const {azureuserid} = req.headers;
      if (!azureuserid) {
        logger.info(
          `${taskName}_AUTHORIZATION_HEADER_USERID_MISSING`,
          req.headers
        );
        const noResult = new BadRequestResponse(
          res,
          'Authorization header id missing'
        );
        return noResult.send();
      }
      const reqObj: resendInvitationEmailReq = {
        email: req.body.email,
      };
      const dbUser = await SendEmailController.userRepo.findUserByUsername(
        reqObj.email
      );
      if (!dbUser || dbUser?.id === null) {
        logger.info(`${taskName}_USER_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'Invalid email. User not found'
        );
        return noResult.send();
      }
      if (dbUser?.isPasswordSet === true) {
        logger.info(`${taskName}_ACTIVE_USER_FOUND`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'You cannot resend invite to an active user.'
        );
        return noResult.send();
      }
      const token: string = uuidV4();
      //Using Private Function sendEmail To Send Email.
      const updateResult = await SendEmailController.userRepo.updateInvitationToken(
        dbUser.id,
        token
      );
      if (!updateResult) {
        logger.info(`${taskName}_UPDATE_TOKEN_FAILED`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'An Error Occurred While Updating Token.'
        );
        return noResult.send();
      }
      reqObj.token = token;
      reqObj.fullName = dbUser.fullName;
      const mailResult: boolean = await SendEmailController.sendEmail(reqObj);
      // Checking If We Email Sent Successfully Or Not
      if (!mailResult) {
        logger.info(
          `${taskName}_INVITE_EMAIL_NOT_SENT`,
          JSON.stringify(mailResult)
        );
        const noResult = new BadRequestResponse(
          res,
          'Unable To Send Invite Email'
        );
        return noResult.send();
      }
      // Incase of success, we send success response.
      const resp: resendInvitationEmailRes = {
        email: reqObj.email,
        isEmailSent: true,
        inviteUrl: `${azurePortalUrlConfig.managerPortalUrl}`,
      };
      logger.info(`${taskName}_INVITE_EMAIL_SENT`, JSON.stringify(mailResult));
      const success = new SuccessResponse(res, 'success', resp);
      return success.send();
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      return response.send();
    }
  }

  private static async sendEmail(
    mailObj: resendInvitationEmailReq
  ): Promise<boolean> {
    const taskName = 'SEND_EMAIL';
    logger.info(`${taskName}-REQ`, mailObj);

    // Fetch email template from DB
    const templateFetch: Record<
      string,
      any
    > = await SendEmailController.TemplateRepo.getTemplateByType(
      templateConfig.EMAIL_CREATE_USER_INVITE
    );
    if (templateFetch === null) {
      logger.info(`${taskName}_UNABLE_TO_FETCH_TEMPLATE`, templateFetch);
      return false;
    }
    const emailReq: EmailProperties = {
      name: mailObj.fullName,
      // emailFrom: emailConfig.email_from,
      emailTo: mailObj.email,
      emailSubject: templateFetch?.title,
      emailHTMLContent: templateFetch?.template.toString(),
    };
    const inviteUrl = `${azurePortalUrlConfig.managerPortalUrl}`;
    logger.info(`INVITE_LINK_${mailObj?.fullName}`, inviteUrl);
    const addDetails = emailReq.emailHTMLContent
      .toString()
      .replace('@userFullName', mailObj?.fullName || 'User')
      .replace('@inviteUrl', inviteUrl)
      .replace('@inviteUrlPlain', inviteUrl);
    emailReq.emailHTMLContent = addDetails;
    // Send email to the newly created user
    const mailResult: boolean = await SendEmailController.emailService.sendEMail(
      emailReq
    );
    if (!mailResult) {
      return mailResult;
    }
    // If Email has been successfully sent update the user.
    if (mailResult) {
      return mailResult;
    }
  }
}
