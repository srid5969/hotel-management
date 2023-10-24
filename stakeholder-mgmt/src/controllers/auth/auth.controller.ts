/* eslint-disable @typescript-eslint/no-unused-vars */
import {v4 as uuidv4} from 'uuid';
import {Request, Response} from 'express';
import moment from 'moment';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  NoContentResponse,
  UnauthorizedResponse,
} from '../../util';
import {AzureUserRepository} from '../../repositories/azure_ad.repo';
import {
  CreateUserReq,
  CreateUserRes,
  LoginReq,
  CreateOTPReq,
  CreateOtpRes,
  VerifyOTPReq,
  VerifyOTPRes,
  UpdatePasswordReq,
  UpdatePasswordRes,
  ConfirmUserReq,
  SetPasswordReq,
  SetPasswordRes,
  CreateUserObj,
  //EmailProperties,
} from '../../business_objects/auth';
import {UserRepository} from '../../repositories/users.repo';
import {OtpRepository} from '../../repositories/otp.repo';
// import {MailService} from '../../services/mail.service';
import {
  EmailProperties,
  LoginRes,
  MailObj,
  changePasswordReq,
  changePasswordRes,
} from '../../business_objects/auth';
// import {emailConfig} from '../../config/email';
import {TemplateRepository} from '../../repositories/template.repo';
import {azurePortalUrlConfig, templateConfig} from '../../config';
import {EntityRepository} from '../../repositories/entity.repo';
import {notificationConfig} from '../../config/app';
import {notificationConfigRepository} from '../../repositories/notification.repo';
import {PriorityLevelRepository} from '../../repositories/priority-level.repo';
import {DesignationRepository} from '../../repositories/designation.repo';
import {RoleRepository} from '../../repositories/role.repo';
import {EmailService} from '../../services/email.service';
import {B2CUserToken} from '../../business_objects/b2c';

export class AuthController {
  static azureRepo = new AzureUserRepository();
  static userRepo = new UserRepository();
  static otpRepo = new OtpRepository();
  // static mailService = new MailService();
  private static emailService = new EmailService();
  static TemplateRepo = new TemplateRepository();
  static entityRepo = new EntityRepository();
  static notificationConfigRepo = new notificationConfigRepository();
  private static priorityRepo = new PriorityLevelRepository();
  private static designationRepo = new DesignationRepository();
  private static roleRepo = new RoleRepository();

  //#region createUser
  public static async createUser(req: Request, res: Response): Promise<void> {
    const taskName = 'CREATE-USER';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body.email));
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
      const azureIdUser = await AuthController.userRepo.findUserByAzureId(
        azureuserid
      );
      if (!azureIdUser) {
        logger.info(`${taskName}_AZURE_ID_DOES_NOT_EXIST`, azureIdUser);
        const noRes = new NoContentResponse(
          res,
          'No user exists with this ID or no ID was provided.'
        );
        return noRes.send();
      }
      //parse req object
      const reqObj: CreateUserReq = {
        email: req.body.email.trim(),
        fullName: req.body.fullName,
        mobile: req.body.mobile,
        priorityLevel: req.body.priorityLevel,
        imageUrl: req.body?.imageUrl,
        imageName: req.body?.imageName,
        imageType: req.body?.imageType,
        designationId: req.body.designationId,
        description: req.body.description,
        roleIds: req.body.roleIds,
      };
      //find user by username in USER table, if user name already exist throw error
      let dbUser = await AuthController.userRepo.findUserByEmail(reqObj.email);
      if (dbUser && dbUser.id !== null) {
        logger.info(`${taskName}_USER_NAME_ALREADY_EXIST`, dbUser);
        const noRes = new NoContentResponse(res, 'Email already exists.');
        return noRes.send();
      }
      // fine user by phoneNumber in USER table, if user with this phoneNumber already exist then throw error
      dbUser = await AuthController.userRepo.findUserByPhoneNumber(
        reqObj.mobile
      );
      if (dbUser && dbUser.id !== null) {
        logger.info(`${taskName}_USER_NAME_ALREADY_EXIST`, dbUser);
        const noRes = new NoContentResponse(
          res,
          'Phone Number already exists.'
        );
        return noRes.send();
      }
      const strName = reqObj.email.toString().split('@');
      const domain: string = strName[1];
      const entity: any = await AuthController.entityRepo.checkDomain(domain);
      if (!entity) {
        logger.info(`${taskName}_ENTITY_NOT_FOUND`, strName[1]);
        const noResult = new BadRequestResponse(
          res,
          'This domain does not belong to Pure Health Group Email ID or is disabled.'
        );
        return noResult.send();
      }
      const token: string = uuidv4();
      const createUserObj: CreateUserObj = {
        email: reqObj.email,
        fullName: reqObj.fullName,
        mobile: reqObj.mobile,
        lastModifiedBy: azureIdUser?.id,
        lastModifiedByDate: new Date().toISOString(),
        entityId: entity?.id,
        inviteToken: token,
        inviteTokenCreationTime: new Date().toISOString(),
        priorityLevel: reqObj.priorityLevel,
        imageUrl: reqObj.imageUrl,
        imageName: reqObj.imageName,
        imageType: reqObj.imageType,
        designationId: reqObj.designationId,
        description: reqObj.description,
        roleIds: reqObj.roleIds,
      };
      const result = await AuthController.userRepo.createDbUser(createUserObj);
      const mailObj: MailObj = {
        email: reqObj.email,
        templateType: templateConfig.EMAIL_CREATE_USER_INVITE,
        token: token,
        fullName: reqObj.fullName,
      };
      const mailResult: boolean = await AuthController.sendEmail(mailObj);
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
      const resp: CreateUserRes = {
        isUserCreated: result,
        inviteUrl: `${azurePortalUrlConfig.managerPortalUrl}`,
      };
      // If Email has been successfully sent update the user.
      if (mailResult) {
        logger.info(
          `${taskName}_INVITE_EMAIL_SENT`,
          JSON.stringify(mailResult)
        );
        resp.isUserCreationInviteSent = true;
        await AuthController.userRepo.updateisUserCreationInviteSent(
          reqObj.email
        );
      }
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

  //#region createUserDDL
  static async createUserDDL(req: Request, res: Response) {
    const taskName = 'CREATE_USER_DDL';
    logger.info(`${taskName}`, 'GET_REQUEST');
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
      const azureIdUser = await AuthController.userRepo.findUserByAzureId(
        azureuserid
      );
      if (!azureIdUser) {
        logger.info(`${taskName}_AZURE_ID_DOES_NOT_EXIST`, azureIdUser);
        const noRes = new NoContentResponse(
          res,
          'No user exists with this ID or no ID was provided.'
        );
        return noRes.send();
      }
      const priorityLevelListByUserPriorityLevel =
        await AuthController.priorityRepo.getPriorityLevelByLevel(
          azureIdUser.priorityLevel
        );
      const designationList =
        await AuthController.designationRepo.getDesignationList();
      const isAllRolesRequired = true;
      const roleList = await AuthController.roleRepo.getRoleList(
        isAllRolesRequired,
        null
      );
      const resp = {
        priorityLevel: priorityLevelListByUserPriorityLevel,
        designationList,
        roleList,
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

  //#region verifyOtp
  public static async verifyOtp(req: Request, res: Response): Promise<void> {
    const taskName = 'VERIFY_OTP';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body.email));
      const reqObj: VerifyOTPReq = {
        email: req.body.email,
        otp: req.body.otp,
      };
      //find user by username in USER table, if user not exist throw invalid credentials error
      const dbUser = await AuthController.userRepo.findUserByUsername(
        reqObj.email
      );
      if (!dbUser || dbUser.length <= 0) {
        logger.info(`${taskName}_USER_NAME_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(res, 'Invalid email');
        return noResult.send();
      }
      const otpDetails = await AuthController.otpRepo.getOtpbyUserId(dbUser.id);
      if (!otpDetails || otpDetails.length <= 0) {
        logger.info(`${taskName}_OTP_FETCH_FAILED`, otpDetails);
        const noResult = new BadRequestResponse(res, 'No OTP Found');
        return noResult.send();
      }
      if (parseInt(otpDetails.otpText) !== parseInt(reqObj.otp.toString())) {
        if (parseInt(otpDetails.otpMaximumRetries) === 2) {
          logger.info(`${taskName}_OTP_RETRY_LIMIT_REACHED`, otpDetails);
          const noResult = new BadRequestResponse(
            res,
            'You have reached the maximum number of retries. Please use the resend button to get a new OTP code.'
          );
          return noResult.send();
        }
        const updateFailedRetries =
          await AuthController.otpRepo.updateOtpRetries(dbUser.id);
        logger.info(`${taskName}_OTP_CHECK_FAILED`, otpDetails);
        const noResult = new BadRequestResponse(
          res,
          `The OTP you provided is not valid. Please try again by entering the otp received in your email inbox. You have ${
            2 - updateFailedRetries.otpMaximumRetries
          } attempts left.`
        );
        return noResult.send();
      }
      const otpExpiration =
        await AuthController.notificationConfigRepo.getNotificationConfigByType(
          notificationConfig.USER_LOGIN_OTP_EXPIRY
        );
      if (!otpExpiration) {
        logger.info(
          `${taskName}_OTP_EXPIRATION_CONFIG_NOT_FOUND`,
          otpExpiration
        );
        const noResult = new BadRequestResponse(
          res,
          'OTP Expiration Config Not Found.'
        );
        return noResult.send();
      }
      let otpCreationTime: any = new Date(otpDetails.otpDate);
      otpCreationTime =
        otpCreationTime.getTime() +
        parseFloat(otpExpiration.timeInHrs) * 60 * 60 * 1000;
      if (otpCreationTime < new Date().getTime()) {
        if (parseInt(otpDetails.otpMaximumRetries) === 2) {
          logger.info(`${taskName}_OTP_RETRY_LIMIT_REACHED`, otpDetails);
          const noResult = new BadRequestResponse(
            res,
            'You have reached the maximum number of retries. Please use the resend button to get a new OTP code.'
          );
          return noResult.send();
        }
        const updateFailedRetries =
          await AuthController.otpRepo.updateOtpRetries(dbUser.id);
        logger.info(`${taskName}_OTP_EXPIRED`, reqObj);
        const noResult = new BadRequestResponse(
          res,
          `The OTP has expired. Please use the resend button to get a new OTP code. You have ${
            2 - updateFailedRetries.otpMaximumRetries
          } tries left.`
        );
        return noResult.send();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const delOtp = await AuthController.otpRepo.deleteOtpByUserId(dbUser.id);
      let updateLoginStatus: any;
      if (!dbUser?.passwordResetVerificationId) {
        updateLoginStatus = await AuthController.userRepo.successfulLogin(
          dbUser.azureId
        );
        if (!updateLoginStatus) {
          logger.info('LOGIN_STATUS_SET_FAILED', updateLoginStatus);
          const noResult = new BadRequestResponse(
            res,
            'An error occurred while updated login status of user.'
          );
          return noResult.send();
        }
      }
      if (dbUser?.passwordResetVerificationId) {
        const assignTokenValidity =
          await AuthController.userRepo.forgotPasswordTokenValidity(
            dbUser.emailId
          );
      }
      const sessionId: string = uuidv4();
      const setSessionId = await AuthController.userRepo.setUserSessionId(
        dbUser.id,
        sessionId
      );
      const resp: VerifyOTPRes = {
        isOTPVerified: true,
        isPasswordSet: dbUser.isPasswordSet,
        userName: reqObj.email,
        token: dbUser?.passwordResetVerificationId
          ? {access_token: ''}
          : {access_token: dbUser.accessToken},
        isLogin: dbUser?.passwordResetVerificationId
          ? false
          : updateLoginStatus.isLogin,
        sessionId: sessionId,
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

  //#region generateOtp
  public static async generateOtp(req: Request, res: Response): Promise<void> {
    const taskName = 'GENERATE_OTP';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body.email));
      const reqObj: CreateOTPReq = {
        email: req.body.email,
        isForgotPassword: req.body.isForgotPassword,
      };
      //find user by username in USER table, if user not exist throw invalid credentials error
      const dbUser = await AuthController.userRepo.findUserByUsername(
        reqObj.email
      );
      if (!dbUser || dbUser.length <= 0) {
        logger.info(`${taskName}_USER_NAME_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(res, 'Invalid email');
        return noResult.send();
      }
      const otp = Math.floor(1000 + Math.random() * 9000);
      const otpDetails = await AuthController.otpRepo.getOtpbyUserId(dbUser.id);
      if (otpDetails?.id || otpDetails?.length > 0) {
        const otpExpiration =
          await AuthController.notificationConfigRepo.getNotificationConfigByType(
            notificationConfig.USER_OTP_RESEND_TIME
          );
        if (!otpExpiration) {
          logger.info(
            `${taskName}_OTP_RESEND_TIME_CONFIG_NOT_FOUND`,
            otpExpiration
          );
          const noResult = new BadRequestResponse(
            res,
            'OTP Resend Time Config Not Found.'
          );
          return noResult.send();
        }
        let otpResendTime: any = new Date(otpDetails.otpDate);
        otpResendTime =
          otpResendTime.getTime() +
          parseFloat(otpExpiration.timeInHrs) * 60 * 60 * 1000;
        if (otpResendTime > new Date().getTime()) {
          logger.info(`${taskName}_OTP_REGENERATION_WAIT_INTERVAL`, reqObj);
          const noResult = new BadRequestResponse(
            res,
            `Please wait for ${moment
              .duration(otpResendTime - new Date().getTime())
              .asSeconds()
              .toFixed()} seconds before resending OTP.`
          );
          return noResult.send();
        }
        const updateOtp = await AuthController.otpRepo.updateOtpbyUserId(
          dbUser.id,
          otp
        );
        if (!updateOtp) {
          logger.info(`${taskName}_OTP_INSERT_FAILED`, updateOtp);
          const noResult = new BadRequestResponse(res, 'Otp creation failed');
          return noResult.send();
        }
      } else {
        const otpInsert = await AuthController.otpRepo.createOtp(
          dbUser.id,
          otp
        );
        if (!otpInsert.id || otpInsert.length <= 0) {
          logger.info(`${taskName}_OTP_INSERT_FAILED`, otpInsert);
          const noResult = new BadRequestResponse(res, 'Otp creation failed');
          return noResult.send();
        }
      }
      // If forgot password flow is requested, we set an access token (uuid) to validate the request.
      if (reqObj?.isForgotPassword === true) {
        const assignVerificationId =
          await AuthController.userRepo.forgotUserPassword(reqObj.email);
      }
      // If we don't call forgot password flow, we simply remove the verificationId from db to avoid misuse of it.
      if (reqObj?.isForgotPassword === false) {
        const assignVerificationId =
          await AuthController.userRepo.loginFlowRequest(reqObj.email);
      }
      // Fetch email template from DB
      const mailObj: MailObj = {
        email: reqObj.email,
        templateType: templateConfig.EMAIL_SEND_OTP,
        otp: otp,
        fullName: dbUser?.fullName,
      };
      const mailResult = await AuthController.sendEmail(mailObj);
      if (!mailResult) {
        logger.info(
          `${taskName}_OTP_EMAIL_NOT_SENT`,
          JSON.stringify(mailResult)
        );
        const noResult = new BadRequestResponse(res, 'Unable To Send OTP');
        return noResult.send();
      }
      const resp: CreateOtpRes = {
        isOTPSent: true,
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

  //#region login
  /**
   * login
   * @description login
   * @param req
   * @param res
   */
  public static async login(req: Request, res: Response): Promise<void> {
    const taskName = 'LOGIN';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body.email));
      //parse req object
      const reqObj: LoginReq = {
        email: req.body.email.toString().trim(),
        password: req.body.password,
      };
      //find user by username in USER table, if user not exist throw invalid credentials error
      const dbUser = await AuthController.userRepo.findUserByUsername(
        reqObj.email //Email
      );
      if (!dbUser || dbUser.length <= 0) {
        logger.info(`${taskName}_USER_NAME_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'Invalid credentials. Please Login Again'
        );
        return noResult.send();
      }

      //if user exists, check user is active? if not throw user is not active error
      if (!dbUser.isActive) {
        logger.info(`${taskName}_USER_IS_INACTIVE`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'User account is inactive'
        );
        return noResult.send();
      }
      //if user exists, check entity is active? if not throw entity is not active error
      const entityStatus = await AuthController.entityRepo.getEntitybyId(
        dbUser.entityId
      );
      if (!entityStatus.isActive) {
        logger.info(`${taskName}_ENTITY_IS_INACTIVE`, entityStatus);
        const noResult = new BadRequestResponse(res, 'User entity is inactive');
        return noResult.send();
      }
      await AuthController.userRepo.setLoginFalseOnLoginValidation(
        dbUser.azureId
      );
      //found that user is active, performs the azure ad login api request...
      const adUser = await AuthController.azureRepo.getb2cToken(
        reqObj.email,
        reqObj.password
      );
      const userRoleInfo = await AuthController.userRepo.getUserRoleInfo(
        dbUser.id
      );

      const resObj = {
        id: dbUser.id,
        email: dbUser.email,
        azureId: dbUser.azureId,
        fullName: dbUser.fullName,
        isPasswordSet: dbUser.isPasswordSet,
        isActive: dbUser.isActive,
        userRoles: userRoleInfo.map((x: any) => x.role),
      };

      const response: LoginRes = {
        user: resObj,
      };
      await AuthController.userRepo.saveTokens(
        adUser.access_token,
        adUser.refresh_token,
        dbUser.azureId
      );
      //returns the success response
      const success = new SuccessResponse(res, 'success', response);
      return success.send();
    } catch (err) {
      if (
        err?.statusCode === 400 ||
        err?.response?.status === 400 ||
        err?.response
      ) {
        logger.error(
          `${taskName}_AZURE_AD_ERROR`,
          `invalid email: ${
            req.body.email
          } or password. (errorCode: ADLGN0001) Error details:${JSON.stringify(
            err
          )}`
        );
        const noResult = new BadRequestResponse(
          res,
          'Invalid credentials. Please Login Again'
        );
        return noResult.send();
      }
      logger.error(`${taskName}_ERROR`, err);
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      return response.send();
    }
  }
  //#endregion

  //#region refreshToken
  /**
   * refreshToken
   * @description gets the new access token and refresh tokens when access token is expired
   * @param req
   * @param res
   */
  public static async refreshToken(req: Request, res: Response): Promise<void> {
    const taskName = 'REFRESH_TOKEN';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.headers));
      //check for authorization header
      const {userId} = req.params;
      const dbUser = await AuthController.userRepo.findUserByAzureId(userId);
      if (!dbUser) {
        logger.info(`${taskName}_USER_NOT_FOUND`, userId);
        const noResult = new BadRequestResponse(res, 'User not found.');
        return noResult.send();
      }
      //#region Verify access token with stored DB token
      let accessToken = req.headers.authorization;
      if (!accessToken) {
        const noResult = new BadRequestResponse(
          res,
          'Invalid Session. Access Token Does Not Exist.'
        );
        return noResult.send();
      }
      if (accessToken?.search('Bearer') !== -1) {
        accessToken = accessToken.replace('Bearer ', '');
      }
      if (dbUser?.accessToken !== accessToken) {
        const noResult = new UnauthorizedResponse(res, {
          code: 'INVALID_TOKEN',
          message: 'Invalid Token',
        });
        return noResult.send();
      }
      //#endregion
      //authorization header found, proceed to get the new access and refresh tokens...
      const refreshToken = await AuthController.azureRepo.getRefreshToken(
        dbUser?.refreshToken
      );
      //#region Revoke Old Refresh Token As We Get New One
      const revokeRefreshToken =
        await AuthController.azureRepo.revokeRefreshToken(
          userId,
          dbUser?.refreshToken
        );
      logger.info(`${taskName}_REVOKE_OLD_REFRESH_TOKEN`, revokeRefreshToken);
      //#endregion

      await AuthController.userRepo.saveTokens(
        refreshToken.access_token,
        refreshToken.refresh_token,
        userId
      );
      //returns the success response
      const success = new SuccessResponse(res, 'success', refreshToken);
      return success.send();
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      const response = new BadRequestResponse(res, 'Invalid token');
      return response.send();
    }
  }
  //#endregion

  //#region setPassword
  public static async setPassword(req: Request, res: Response): Promise<void> {
    const taskName = 'SET_PASSWORD';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body.email));
      const reqObj: SetPasswordReq = {
        email: req.body.email.toString().trim(),
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
        token: req.body.token,
      };
      //check for user in db
      const dbUser = await AuthController.userRepo.findUserByUsername(
        reqObj.email
      );
      if (!dbUser) {
        logger.info(`${taskName}_USER_NOT_FOUND`, reqObj.email);
        const noResult = new BadRequestResponse(res, 'User not found.');
        return noResult.send();
      }
      if (reqObj.token !== dbUser.inviteToken) {
        logger.info(`${taskName}_TOKEN_INVALID`, reqObj.token);
        const noResult = new BadRequestResponse(res, 'Invalid Token');
        return noResult.send();
      }
      const tokenExpiration =
        await AuthController.notificationConfigRepo.getNotificationConfigByType(
          notificationConfig.USER_INVITE_TOKEN_EXPIRY
        );
      if (!tokenExpiration) {
        logger.info(
          `${taskName}_TOKEN_EXPIRATION_CONFIG_NOT_FOUND`,
          tokenExpiration
        );
        const noResult = new BadRequestResponse(
          res,
          'Token Expiration Config Not Found.'
        );
        return noResult.send();
      }
      let tokenCreationTime: any = new Date(dbUser.inviteTokenCreationTime);
      tokenCreationTime =
        tokenCreationTime.getTime() +
        parseFloat(tokenExpiration.timeInHrs) * 60 * 60 * 1000;
      if (tokenCreationTime < new Date().getTime()) {
        logger.info(`${taskName}_LINK_EXPIRED`, reqObj);
        const noResult = new BadRequestResponse(
          res,
          'The link has expired. Please contact admin to resend the invitation link.'
        );
        return noResult.send();
      }
      if (!dbUser || dbUser?.id === null) {
        logger.info(`${taskName}_USER_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'Invalid user. User not found'
        );
        return noResult.send();
      }

      //check if password and confirm password are equal
      if (reqObj.newPassword !== reqObj.confirmPassword) {
        logger.info(`${taskName}_PASSWORDS_SHOULD_BE_SAME`, reqObj);
        const noResult = new BadRequestResponse(
          res,
          'The password and confirm password is not same.'
        );
        return noResult.send();
      }

      if (dbUser.isPasswordSet) {
        logger.info(`${taskName}_PASSWORDS_ALREADY_SET`, reqObj);
        const noResult = new BadRequestResponse(
          res,
          'The password for this user has already been set'
        );
        return noResult.send();
      }

      const strName = reqObj.email.toString().split('@');
      const userReqObj: ConfirmUserReq = {
        email: reqObj.email,
        password: reqObj.newPassword,
        name: strName[0],
      };
      const adUser = await AuthController.createAdUserAndSetPassword(
        userReqObj
      );

      if (!adUser) {
        logger.info(`${taskName}_UNABLE_TO_CREATE_USER_AZURE_AD`, adUser);
        const noResult = new BadRequestResponse(
          res,
          'Unable to create user. Please try again and contact PureCS IT support team if problem persist.'
        );
        return noResult.send();
      }

      const id: any = await AuthController.userRepo.addDbUserAzureId(
        adUser.id,
        dbUser.id
      );
      if (!id) {
        logger.info(`${taskName}_ADD_AZUREID_TO_DB_ON_SIGNUP_FAILED`, id);
        const noResult = new BadRequestResponse(res, 'Update AzureId Failed');
        return noResult.send();
      }
      const checkUserAzureId = await AuthController.userRepo.findUserByAzureId(
        adUser.id
      );
      if (!checkUserAzureId) {
        logger.info(
          `${taskName}_UNABLE_TO_SET_USER_AZURE_AD`,
          checkUserAzureId
        );
        const noResult = new BadRequestResponse(
          res,
          'An unexpected error occurred while setting password. Please try again and contact PureCS IT support team if problem persist.'
        );
        return noResult.send();
      }
      const afterPassSet = await AuthController.userRepo.afterSetPassword(
        id.id
      );
      if (!afterPassSet) {
        logger.info(`${taskName}_UPDATE_PASSWORD_SET_FLAG_FAILED`, id);
        const noResult = new BadRequestResponse(res, 'Update Password Failed');
        return noResult.send();
      }
      const resp: UpdatePasswordRes = {
        email: reqObj.email,
        isSetPassword: true,
      };
      const success = new SuccessResponse(res, 'success', resp);
      return success.send();
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      if (err?.message.includes('password complexity')) {
        logger.error(
          `${taskName}_AZURE_AD_PASSWORD_COMPLEXITY_ERROR`,
          'Password complexity requirements error. Please provide a different password'
        );
        const noResult = new BadRequestResponse(
          res,
          'Invalid password policy. Password should be at least 10 characters long, and should require any 3 of the following: Uppercase character, Lowercase character, Special character, Number.'
        );
        return noResult.send();
      }
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      return response.send();
    }
  }
  //#endregion

  //#region updatePassword
  public static async updatePassword(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'UPDATE_PASSWORD';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body.email));
      const reqObj: UpdatePasswordReq = {
        email: req.body.email.toString().trim(),
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
      };
      //check for user in db
      const dbUser = await AuthController.userRepo.findUserByUsername(
        reqObj.email
      );
      if (!dbUser || dbUser?.id === null) {
        logger.info(`${taskName}_USER_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'Invalid user. User not found'
        );
        return noResult.send();
      }
      //check if password and confirm password are equal
      if (reqObj.newPassword !== reqObj.confirmPassword) {
        logger.info(`${taskName}_PASSWORDS_SHOULD_BE_SAME`, reqObj);
        const noResult = new BadRequestResponse(
          res,
          'The password and confirm password is not same.'
        );
        return noResult.send();
      }

      if (!dbUser.isPasswordSet) {
        logger.info(`${taskName}_PASSWORDS_NOT_SET`, reqObj);
        const noResult = new BadRequestResponse(
          res,
          'The password for this user has not been set'
        );
        return noResult.send();
      }

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
      const dbUsr = await AuthController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      if (!dbUsr || dbUsr?.id === null) {
        logger.info(`${taskName}_USER_NOT_FOUND`, dbUsr);
        const noResult = new BadRequestResponse(
          res,
          'Invalid user id. User not found'
        );
        return noResult.send();
      }
      if (dbUser.id !== dbUsr.id) {
        logger.info(`${taskName}_USER_NOT_THE_SAME`, dbUsr);
        const noResult = new BadRequestResponse(
          res,
          'Cant set password for other users'
        );
        return noResult.send();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await AuthController.setADPassword(
        azureuserid.toString(),
        reqObj
      );
      const resp: SetPasswordRes = {
        email: reqObj.email,
        isSetPassword: true,
      };
      const success = new SuccessResponse(res, 'success', resp);
      return success.send();
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      if (err?.message.includes('password complexity')) {
        logger.error(
          `${taskName}_AZURE_AD_PASSWORD_COMPLEXITY_ERROR`,
          'Password complexity requirements error. Please provide a different password'
        );
        const noResult = new BadRequestResponse(
          res,
          'Invalid password policy. Password should be at least 10 characters long, and should require any 3 of the following: Uppercase character, Lowercase character, Special character, Number.'
        );
        return noResult.send();
      }
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      return response.send();
    }
  }
  //#endregion

  //#region createAdUserAndSetPassword
  private static async createAdUserAndSetPassword(reqObj: ConfirmUserReq) {
    const taskName = 'CREATE_USER_AZURE_AND_SET_PASSWORD';
    try {
      logger.info(`${taskName}`, JSON.stringify(reqObj.email));
      const adUser: any = await AuthController.azureRepo.createUser(reqObj);
      if (!adUser || adUser.length <= 0) {
        logger.info(`${taskName}_UNABLE_TO_CREATE_USER_AZURE_AD`, adUser);
        return false;
      }
      return adUser;
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      return err;
    }
  }
  //#endregion

  //#region setADPassword
  private static async setADPassword(azId: string, reqObj: UpdatePasswordReq) {
    const taskName = 'SET_AD_PASSWORD';
    try {
      logger.info(`${taskName}`, JSON.stringify(reqObj.email));
      //Proceed to change password
      const result = await AuthController.azureRepo.updateUserPassword(
        azId,
        reqObj.newPassword
      );
      return result;
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      return err;
    }
  }
  //#endregion

  //#region sendEmail
  public static async sendEmail(mailObj: MailObj): Promise<boolean> {
    const taskName = 'SEND_EMAIL';
    logger.info(`${taskName}-REQ`, mailObj);

    // Fetch email template from DB
    const templateFetch: Record<string, any> =
      await AuthController.TemplateRepo.getTemplateByType(mailObj.templateType);
    if (templateFetch === null) {
      logger.info(`${taskName}_UNABLE_TO_FETCH_TEMPLATE`, templateFetch);
      return false;
    }
    const emailReq: EmailProperties = {
      name: mailObj?.fullName,
      // emailFrom: emailConfig.email_from,
      emailTo: mailObj.email,
      emailSubject: templateFetch?.title,
      emailHTMLContent: templateFetch?.template.toString(),
    };
    if (mailObj.templateType === templateConfig.EMAIL_SEND_OTP) {
      const addDetails = emailReq.emailHTMLContent
        .toString()
        .replace('@userFullName', mailObj?.fullName || 'User')
        .replace('@OTP', mailObj?.otp.toString());
      emailReq.emailHTMLContent = addDetails;
    }
    if (mailObj.templateType === templateConfig.EMAIL_CREATE_USER_INVITE) {
      const inviteUrl = `${azurePortalUrlConfig.managerPortalUrl}`;
      logger.info('INVITE_URL', JSON.stringify(inviteUrl));
      const addDetails = emailReq.emailHTMLContent
        .toString()
        .replace('@userFullName', mailObj?.fullName || 'User')
        .replace('@inviteUrl', inviteUrl)
        .replace('@inviteUrlPlain', inviteUrl);
      emailReq.emailHTMLContent = addDetails;
    }
    // Send email to the newly created user
    const mailResult: boolean = await AuthController.emailService.sendEMail(
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
  //#endregion

  //#region  forgotPassword
  public static async forgotPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'FORGET_PASSWORD';
    try {
      logger.info(`${taskName}_REQ`, JSON.stringify(req.body.email));
      //parse req object
      const reqObj: UpdatePasswordReq = {
        email: req.body.email.toString().trim(),
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
      };
      //find user by username
      const dbUser = await AuthController.userRepo.findUserByUsername(
        reqObj.email
      );
      if (!dbUser || dbUser?.id === null) {
        logger.info(`${taskName}_USER_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'Invalid user. User not found'
        );
        return noResult.send();
      }
      if (
        !dbUser.passwordResetVerificationId ||
        !dbUser.passwordResetTokenValidity
      ) {
        const noResult = new BadRequestResponse(
          res,
          'The following session is not valid.'
        );
        return noResult.send();
      }
      const tokenValidityCheck =
        await AuthController.notificationConfigRepo.getNotificationConfigByType(
          notificationConfig.FORGOT_PASSWORD_TOKEN_VALIDITY
        );
      if (!tokenValidityCheck) {
        logger.info(
          `${taskName}_TOKEN_VALIDITY_CONFIG_NOT_FOUND`,
          tokenValidityCheck
        );
        const noResult = new BadRequestResponse(
          res,
          'Token Validity Config Not Found.'
        );
        return noResult.send();
      }
      let tokenCreationTime: any = new Date(dbUser.passwordResetTokenValidity);
      tokenCreationTime =
        tokenCreationTime.getTime() +
        parseFloat(tokenValidityCheck.timeInHrs) * 60 * 60 * 1000;
      if (tokenCreationTime < new Date().getTime()) {
        const noResult = new BadRequestResponse(
          res,
          'Session expired. Please try again.'
        );
        return noResult.send();
      }
      //#region After HandOver Changes
      //This step is added for verifying that new password shouldn't be matched with current password
      try {
        const adUser: B2CUserToken = await AuthController.azureRepo.getb2cToken(
          req.body.email.toString().trim(),
          req.body.newPassword
        );
        if (adUser.access_token) {
          const noResult = new BadRequestResponse(
            res,
            'New password should not be same with current password.'
          );
          return noResult.send();
        }
      } catch (err) {
        logger.error(`${taskName}_ERROR`, err);
      }
      //#endregion
      //user is found, proceed to change password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // In case we have a success scenario we remove the token and expiration time of token from DB against the user who requested forgot password.
      const removeTokenFromDB =
        await AuthController.userRepo.forgotPasswordSuccess(dbUser.emailId);
      const result = await AuthController.azureRepo.updateUserPassword(
        dbUser.azureId.toString(),
        reqObj.newPassword
      );
      //returns the success response
      const resp: UpdatePasswordRes = {
        email: reqObj.email,
        isSetPassword: true,
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

  //#region logout
  static async logout(req: Request, res: Response): Promise<void> {
    const taskName = 'LOGOUT_USER';
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

      //#region  Set isLogin To False and set accessToken and refreshToken to null
      const logoutUser: any = await AuthController.userRepo.logoutUser(
        req.params.userId
      );
      if (!logoutUser) {
        logger.info(`${taskName}_ALREADY_LOGGED_OUT`, logoutUser);
        const noResult = new BadRequestResponse(
          res,
          'User is already logged out or the user does not exist.'
        );
        return noResult.send();
      }
      //#endregion

      //#region Revoke Refresh Token On Logout
      const reqObj = {
        userId: req.params.userId,
        refreshToken: logoutUser?.refreshToken,
      };
      const revokeRefreshToken =
        await AuthController.azureRepo.revokeRefreshToken(
          reqObj.userId,
          reqObj.refreshToken
        );
      //#endregion
      const resp = {
        userId: azureuserid.toString(),
        logout: true,
        revokeTokenResult: revokeRefreshToken,
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

  //#region revokeToken
  static async revokeToken(req: Request, res: Response) {
    const reqObj = {
      userId: req.body.userId,
      refreshToken: req.body.refreshToken,
    };
    const a = await AuthController.azureRepo.revokeRefreshToken(
      reqObj.userId,
      reqObj.refreshToken
    );
    const success = new SuccessResponse(res, 'success', a);
    return success.send();
  }
  //#endregion

  //#region changeADPassword

  private static async changeADPassword(
    azId: string,
    reqObj: changePasswordReq
  ) {
    const taskName = 'CHANGE_AD_PASSWORD';
    try {
      logger.info(`${taskName}`, JSON.stringify(reqObj.email));
      //Proceed to change password
      const result = await AuthController.azureRepo.updateUserPassword(
        azId,
        reqObj.newPassword
      );
      return result;
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      return err;
    }
  }
  //#endregion

  //#region changePassword
  static async changePassword(req: Request, res: Response) {
    const taskName = 'CHANGE_PASSWORD';
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
      const reqObj: changePasswordReq = {
        currentPassword: req.body.currentPassword,
        newPassword: req.body.newPassword,
        confirmNewPassword: req.body.confirmNewPassword,
      };
      const dbUser = await AuthController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      if (!dbUser || dbUser.length <= 0) {
        logger.info(`${taskName}_USER_NAME_NOT_FOUND`, dbUser);
        const noResult = new BadRequestResponse(res, 'User Not Found');
        return noResult.send();
      }
      reqObj.email = dbUser.emailId;
      //if user exists, check user is active? if not throw user is not active error
      if (!dbUser.isActive) {
        logger.info(`${taskName}_USER_IS_INACTIVE`, dbUser);
        const noResult = new BadRequestResponse(
          res,
          'User account is inactive'
        );
        return noResult.send();
      }

      //check if password and confirm password are equal
      if (reqObj.newPassword !== reqObj.confirmNewPassword) {
        logger.info(`${taskName}_PASSWORDS_SHOULD_BE_SAME`, reqObj);
        const noResult = new BadRequestResponse(
          res,
          'The password and confirm password is not same.'
        );
        return noResult.send();
      }
      // check if user has already set the password or not.
      if (!dbUser.isPasswordSet) {
        logger.info(`${taskName}_PASSWORDS_NOT_SET`, reqObj);
        const noResult = new BadRequestResponse(
          res,
          'The password for this user has not been set'
        );
        return noResult.send();
      }
      //found that user is active, performs the azure ad login api request...
      const validateUser = await AuthController.azureRepo.getb2cToken(
        dbUser.emailId,
        reqObj.currentPassword
      );
      if (!validateUser) {
        const noResult = new BadRequestResponse(
          res,
          'Invalid credentials. Please Login Again'
        );
        return noResult.send();
      }
      //#region
      //This step is added for verifying that new password shouldn't be matched with current password
      try {
        const adUser: B2CUserToken = await AuthController.azureRepo.getb2cToken(
          dbUser.emailId,
          reqObj.newPassword
        );
        if (adUser.access_token) {
          const noResult = new BadRequestResponse(
            res,
            'New password should not be same with current password.'
          );
          return noResult.send();
        }
      } catch (err) {
        logger.error(`${taskName}_ERROR`, err);
      }
      //#endregion
      const changePassword = await AuthController.changeADPassword(
        azureuserid.toString(),
        reqObj
      );
      const resp: changePasswordRes = {
        email: reqObj.email,
        isPasswordChanged: true,
        result: changePassword,
      };

      //#region  Set isLogin To False and set accessToken and refreshToken to null on Change Password Success
      const logoutUser: any = await AuthController.userRepo.logoutUser(
        azureuserid.toString()
      );
      if (!logoutUser) {
        logger.info(`${taskName}_FAILED`, logoutUser);
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while logging out user or the user does not exist.'
        );
        return noResult.send();
      }
      //#endregion

      //#region Revoke Refresh Token On Change Password Success
      const revokeRefreshToken =
        await AuthController.azureRepo.revokeRefreshToken(
          logoutUser?.azureId,
          logoutUser?.refreshToken
        );
      //#endregion
      const success = new SuccessResponse(res, 'success', resp);
      return success.send();
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      const noResult = new BadRequestResponse(
        res,
        'Invalid credentials. Please Login Again'
      );
      return noResult.send();
    }
  }
  //#endregion
}
