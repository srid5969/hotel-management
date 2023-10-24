import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {UserRepository} from '../../repositories/users.repo';
import {meetingsRepository} from '../../repositories/meetings.repo';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {notificationConfigRepository} from '../../repositories/notification.repo';
import {notificationConfig, templateConfig} from '../../config/app';
import {userNotificationRepository} from '../../repositories/userNotification.repo';
import {
  getNotificationReq,
  sendEscalationEmails,
} from '../../business_objects/userNotifcation';
import {TemplateRepository} from '../../repositories/template.repo';
import {corporateEmailRepository} from '../../repositories/corporateEmails.repo';
import {EmailProperties} from '../../business_objects/auth';
// import {emailConfig} from '../../config/email';
// import {MailService} from '../../services/mail.service';
import {
  stakeHolderInfo,
  markAsReadReq,
} from '../../business_objects/userNotifcation';
import {EmailService} from '../../services/email.service';
const inlineCss = require('inline-css');

export class UserNotificationController {
  private static userRepo = new UserRepository();
  private static meetingRepo = new meetingsRepository();
  private static notificationConfigRepo = new notificationConfigRepository();
  private static userNotificationRepo = new userNotificationRepository();
  private static templateRepo = new TemplateRepository();
  private static corporateEmailsRepo = new corporateEmailRepository();
  // private static mailService = new MailService();
  private static emailService = new EmailService();

  //#region getNotification
  static async getNotification(req: Request, res: Response) {
    const taskName = 'CREATE_NOTIFICATION';
    logger.info(`${taskName}`, req.params);
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
      // Checks If User Exists
      const dbUser =
        await UserNotificationController.userRepo.findUserByAzureId(
          req.params.userId
        );
      if (!dbUser) {
        logger.info(`${taskName}_USER_NOT_FOUND`, req.params);
        const noResult = new BadRequestResponse(res, 'User Not Found');
        return noResult.send();
      }
      // Gets The Type Of Notification Configs
      const getNotificationWarningTime =
        await UserNotificationController.notificationConfigRepo.getNotificationConfigByType(
          notificationConfig.MEETING_NOT_CREATED_ESCALATION_WARNING_2_MONTHS
        );
      const getEscalationTime =
        await UserNotificationController.notificationConfigRepo.getNotificationConfigByType(
          notificationConfig.MEETING_NOT_CREATED_ESCALATION_WARNING_3_MONTHS
        );
      if (!getNotificationWarningTime || !getEscalationTime) {
        logger.info(
          `${taskName}_ESCALATION_OR_NOTIFICATION_WARNING_CONFIG_NOT_FOUND`,
          getNotificationWarningTime
        );
        const noResult = new BadRequestResponse(
          res,
          'Notification Warning Or Escalation Config Not Found.'
        );
        return noResult.send();
      }
      // SET Notification Obj
      const notificationObj: getNotificationReq = {
        userId: dbUser.id,
      };
      // Get Meeting Based Upon User ID
      const lastUserMeeting: any =
        await UserNotificationController.meetingRepo.getLatestMeetingById(
          dbUser.id
        );
      // Set Variables For Comparing Time
      let lastMeetingTime;
      let lastMeetingTimeForCorporateEscalation;
      // This Condition Runs In Case If There Is No Meeting Created By The User.
      if (lastUserMeeting.length <= 0) {
        // We get time here to check 2 months period.
        lastMeetingTime = new Date(dbUser.updatedAt);
        lastMeetingTime =
          lastMeetingTime.getTime() +
          parseFloat(getNotificationWarningTime.timeInHrs) * 60 * 60 * 1000;
        // We get time here to check 3 months period.
        lastMeetingTimeForCorporateEscalation = new Date(dbUser.updatedAt);
        lastMeetingTimeForCorporateEscalation =
          lastMeetingTimeForCorporateEscalation.getTime() +
          parseFloat(getEscalationTime.timeInHrs) * 60 * 60 * 1000;
        // Firstly we check notice period for 3 months.
        if (lastMeetingTimeForCorporateEscalation < new Date().getTime()) {
          notificationObj.notificationId = getEscalationTime.id;
          await UserNotificationController.userNotificationRepo.createNotification(
            notificationObj
          );
        }
        // Here we check notice period for 2 months.
        else if (lastMeetingTime < new Date().getTime()) {
          notificationObj.notificationId = getNotificationWarningTime.id;
          await UserNotificationController.userNotificationRepo.createNotification(
            notificationObj
          );
        }
      }
      // Otherwise if the user has created any meeting before, we check from this meetings table.
      // We get time here to check 2 months period.
      lastMeetingTime = new Date(lastUserMeeting[0]?.createdAt);
      lastMeetingTime =
        lastMeetingTime.getTime() +
        parseFloat(getNotificationWarningTime.timeInHrs) * 60 * 60 * 1000;
      // We get time here to check 3 months period.
      lastMeetingTimeForCorporateEscalation = new Date(
        lastUserMeeting[0]?.createdAt
      );
      lastMeetingTimeForCorporateEscalation =
        lastMeetingTimeForCorporateEscalation.getTime() +
        parseFloat(getEscalationTime.timeInHrs) * 60 * 60 * 1000;

      // Firstly we check notice period for 3 months.
      if (lastMeetingTimeForCorporateEscalation < new Date().getTime()) {
        notificationObj.notificationId = getEscalationTime.id;
        await UserNotificationController.userNotificationRepo.createNotification(
          notificationObj
        );
      }
      // Here we check notice period for 2 months.
      else if (lastMeetingTime < new Date().getTime()) {
        notificationObj.notificationId = getNotificationWarningTime.id;
        await UserNotificationController.userNotificationRepo.createNotification(
          notificationObj
        );
      }
      const userNotifications =
        await UserNotificationController.userNotificationRepo.getNotification(
          notificationObj
        );

      const success = new SuccessResponse(res, 'success', userNotifications);
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
  //#endregion

  //#region readNotification
  static async readNotification(req: Request, res: Response) {
    const taskName = 'MARK_NOTIFCATION_AS_READ';
    logger.info(`${taskName}`, req.body);
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
      const dbUser =
        await UserNotificationController.userRepo.findUserByAzureId(
          azureuserid.toString()
        );
      const notificationObj: markAsReadReq = {
        notificationIds: req.body.notificationIds,
        userId: dbUser.id,
      };
      const markAsRead =
        await UserNotificationController.userNotificationRepo.markNotificationAsRead(
          notificationObj
        );
      if (!markAsRead) {
        logger.info(`${taskName}_ERROR`, markAsRead);
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while marking notification as read.'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', markAsRead);
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
  //#endregion
  //#region  checkUsersForEscalationEmails
  static async checkUsersForEscalationEmails(req: Request, res: Response) {
    const taskName = 'CHECK_USER_FOR_ESCALATION_EMAILS';
    logger.info(`${taskName}`, `GET_${taskName}`);
    try {
      // Gets The Type Of Notification Configs
      const getNotificationWarningTime =
        await UserNotificationController.notificationConfigRepo.getNotificationConfigByType(
          notificationConfig.MEETING_NOT_CREATED_ESCALATION_WARNING_2_MONTHS
        );
      const getEscalationTime =
        await UserNotificationController.notificationConfigRepo.getNotificationConfigByType(
          notificationConfig.MEETING_NOT_CREATED_ESCALATION_WARNING_3_MONTHS
        );
      if (!getNotificationWarningTime || !getEscalationTime) {
        logger.info(
          `${taskName}_ESCALATION_OR_NOTIFICATION_WARNING_CONFIG_NOT_FOUND`,
          getNotificationWarningTime
        );
        const noResult = new BadRequestResponse(
          res,
          'Notification Warning Or Escalation Config Not Found.'
        );
        return noResult.send();
      }
      //#region  Check CreatedAt By Meeting Created By User
      const escalationByMeeting: any =
        await UserNotificationController.meetingRepo.checkEscalationByMeeting();
      // Set Variables For Comparing Time
      let lastMeetingTime;
      let lastMeetingTimeForCorporateEscalation;
      const twoMonthsEscalation: sendEscalationEmails = {
        userInfo: [],
      };
      const threeMonthsEscalation: sendEscalationEmails = {
        userInfo: [],
      };
      for (let index = 0; index < escalationByMeeting.length; index++) {
        const stakeHolderManager =
          await UserNotificationController.userRepo.checkUserForEscalation(
            escalationByMeeting[index]?.lastModifiedBy
          );
        // We get time here to check 2 months period.
        lastMeetingTime = new Date(escalationByMeeting[index]?.createdAt);
        lastMeetingTime =
          lastMeetingTime.getTime() +
          parseFloat(getNotificationWarningTime.timeInHrs) * 60 * 60 * 1000;
        // We get time here to check 3 months period.
        lastMeetingTimeForCorporateEscalation = new Date(
          escalationByMeeting[index]?.createdAt
        );
        lastMeetingTimeForCorporateEscalation =
          lastMeetingTimeForCorporateEscalation.getTime() +
          parseFloat(getEscalationTime.timeInHrs) * 60 * 60 * 1000;

        // Firstly we check notice period for 3 months.
        if (lastMeetingTimeForCorporateEscalation < new Date().getTime()) {
          const obj: stakeHolderInfo = {
            fullName: stakeHolderManager[0].fullName,
            entity: stakeHolderManager[0].entityName,
            designation: stakeHolderManager[0]?.designation,
            priorityLevel: stakeHolderManager[0]?.priorityLevel,
            email: stakeHolderManager[0].emailId,
          };
          threeMonthsEscalation.userInfo.push(obj);
        }
        // Here we check notice period for 2 months.
        else if (lastMeetingTime < new Date().getTime()) {
          const obj: stakeHolderInfo = {
            fullName: stakeHolderManager[0].fullName,
            entity: stakeHolderManager[0].entityName,
            designation: stakeHolderManager[0]?.designation,
            priorityLevel: stakeHolderManager[0]?.priorityLevel,
            email: stakeHolderManager[0].emailId,
          };
          twoMonthsEscalation.userInfo.push(obj);
        }
      }
      //#endregion

      //#region  Check CreatedAt By User Date Of Creation
      const stakeHoldersToExclude = escalationByMeeting
        .map((x: any) => x.lastModifiedBy)
        .map(Number);
      let stakeHoldersByCreatedAt =
        await UserNotificationController.userRepo.getUsersList();
      stakeHoldersByCreatedAt = stakeHoldersByCreatedAt
        .map((x: any) => x.id)
        .map(Number)
        .filter((id: any) => {
          return !stakeHoldersToExclude.includes(id);
        });
      for (let index = 0; index < stakeHoldersByCreatedAt.length; index++) {
        const stakeHolderManager =
          await UserNotificationController.userRepo.checkUserForEscalation(
            stakeHoldersByCreatedAt[index]
          );
        // We get time here to check 2 months period.
        lastMeetingTime = new Date(stakeHolderManager[0]?.createdAt);
        lastMeetingTime =
          lastMeetingTime.getTime() +
          parseFloat(getNotificationWarningTime.timeInHrs) * 60 * 60 * 1000;
        // We get time here to check 3 months period.
        lastMeetingTimeForCorporateEscalation = new Date(
          stakeHolderManager[0]?.createdAt
        );
        lastMeetingTimeForCorporateEscalation =
          lastMeetingTimeForCorporateEscalation.getTime() +
          parseFloat(getEscalationTime.timeInHrs) * 60 * 60 * 1000;

        // Firstly we check notice period for 3 months.
        if (lastMeetingTimeForCorporateEscalation < new Date().getTime()) {
          const obj: stakeHolderInfo = {
            fullName: stakeHolderManager[0].fullName,
            entity: stakeHolderManager[0].entityName,
            designation: stakeHolderManager[0]?.designation,
            priorityLevel: stakeHolderManager[0]?.priorityLevel,
            email: stakeHolderManager[0].emailId,
          };
          threeMonthsEscalation.userInfo.push(obj);
        }
        // Here we check notice period for 2 months.
        else if (lastMeetingTime < new Date().getTime()) {
          const obj: stakeHolderInfo = {
            fullName: stakeHolderManager[0].fullName,
            entity: stakeHolderManager[0].entityName,
            designation: stakeHolderManager[0]?.designation,
            priorityLevel: stakeHolderManager[0]?.priorityLevel,
            email: stakeHolderManager[0].emailId,
          };
          twoMonthsEscalation.userInfo.push(obj);
        }
      }
      //#endregion

      // Send Email To All With Two Months Escalation
      if (twoMonthsEscalation.userInfo.length > 0) {
        twoMonthsEscalation.taskName = 'SEND_ESCALATION_WARNING_EMAIL';
        twoMonthsEscalation.templateType =
          'ESCALATION_EMAIL_2_MONTHS_STAKEHOLDER';
        await UserNotificationController.sendEscalationEmails(
          twoMonthsEscalation
        );
      }
      if (threeMonthsEscalation.userInfo.length > 0) {
        threeMonthsEscalation.taskName = 'SEND_ESCALATION_EMAIL_CORPORATE';
        threeMonthsEscalation.templateType = 'ESCALATION_EMAIL_3_MONTHS';
        await UserNotificationController.sendEscalationEmails(
          threeMonthsEscalation
        );
      }
      const resp = {
        twoMonthsEscalation,
        threeMonthsEscalation,
      };
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
  //#endregion

  //#region sendEscalationEmails
  private static async sendEscalationEmails(emailObj: sendEscalationEmails) {
    const taskName = emailObj.taskName;
    logger.info(`${taskName}`, emailObj);
    // Fetch email template from DB
    const templateFetch: Record<string, any> =
      await UserNotificationController.templateRepo.getTemplateByType(
        emailObj.templateType
      );
    if (templateFetch === null) {
      logger.info(`${taskName}_UNABLE_TO_FETCH_TEMPLATE`, templateFetch);
      return false;
    }
    if (emailObj.templateType === templateConfig.ESCALATION_EMAIL_3_MONTHS) {
      let corporateEmails =
        await UserNotificationController.corporateEmailsRepo.getCorporateEmails();
      corporateEmails = corporateEmails.map(
        (corporate: any) => corporate.email
      );
      emailObj.emails = corporateEmails;
      let stakeHoldersInjection = `<tbody><tr>
      <th>#</th>
      <th>Name</th>
	  <th>Entity</th>
      <th>Designation</th>
      <th>Priority</th>
    </tr>`;
      for (let index = 0; index < emailObj.userInfo.length; index++) {
        stakeHoldersInjection = `${stakeHoldersInjection} <tr>
       <td>${index + 1}</td>
       <td>${emailObj.userInfo[index].fullName}</td>
       <td>${emailObj.userInfo[index].entity}</td>
       <td>${emailObj.userInfo[index].designation}</td>
       <td>${emailObj.userInfo[index].priorityLevel}</td>
     </tr>`;
      }
      stakeHoldersInjection = `${stakeHoldersInjection} </tbody>`;
      const emailReq: EmailProperties = {
        // emailFrom: emailConfig.email_from,
        emailTo: emailObj.emails,
        emailSubject: templateFetch?.title,
        emailHTMLContent: templateFetch?.template.toString(),
      };
      const addDetails = emailReq.emailHTMLContent
        .toString()
        .replace('@stakeHolders', stakeHoldersInjection);
      emailReq.emailHTMLContent = addDetails;
      const cssinline = await inlineCss(emailReq.emailHTMLContent, {
        url: emailReq.emailHTMLContent,
        // applyTableAttributes: true,
        // applyWidthAttributes: true,
        // removeStyleTags: true,
        applyLinkTags: true,
      });
      emailReq.emailHTMLContent = cssinline;
      const mailResult: boolean =
        await UserNotificationController.emailService.sendEMail(emailReq);
      if (!mailResult) {
        return mailResult;
      }
      // If Email has been successfully sent update the user.
      if (mailResult) {
        return mailResult;
      }
    } else if (
      emailObj.templateType ===
      templateConfig.ESCALATION_EMAIL_2_MONTHS_STAKEHOLDER
    ) {
      let mailResultFinal: boolean;
      for (let index = 0; index < emailObj.userInfo.length; index++) {
        const emailReq: EmailProperties = {
          name: emailObj.userInfo[index].fullName,
          // emailFrom: emailConfig.email_from,
          emailTo: emailObj.userInfo[index].email,
          emailSubject: templateFetch?.title,
          emailHTMLContent: templateFetch?.template.toString(),
        };
        const addDetails = emailReq.emailHTMLContent
          .toString()
          .replace(
            '@stakeholderName',
            emailObj?.userInfo[index].fullName || 'User'
          );
        emailReq.emailHTMLContent = addDetails;
        const mailResult: boolean =
          await UserNotificationController.emailService.sendEMail(emailReq);
        mailResultFinal = mailResult;
        logger.info(
          `SEND_EMAIL_TO_${emailObj.userInfo[index].fullName}_STATUS`,
          mailResult
        );
      }
      if (!mailResultFinal) {
        return mailResultFinal;
      }
      // If Email has been successfully sent update the user.
      if (mailResultFinal) {
        return mailResultFinal;
      }
    }
    return false;
  }
  //#endregion
}
