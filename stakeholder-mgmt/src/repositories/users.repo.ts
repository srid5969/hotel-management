import {userModel} from '../models/user.model';
import {Op} from 'sequelize';
import {userProvider} from '../sql-provider/getUserDetails';
import {QueryTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';
import {
  UpdateUserProfileReq,
  UpdateUserFCMTokenReq,
  filterUsersReq,
  enableDisableUserReq,
} from '../business_objects/user';
import sequelize from '../config/sequelize';
import {CreateUserObj} from '../business_objects/auth';
import {logger} from '../util/logger';
import {userRoleModel} from '../models/userRole.model';
import {roleModel} from '../models/role.model';
export class UserRepository {
  async findUserByUsername(uName: string) {
    const dbUser: any = await userModel.findOne({
      where: {emailId: {[Op.iLike]: uName}},
    });
    return dbUser;
  }

  async afterSetPassword(dbId: number) {
    await userModel.update(
      {
        isPasswordSet: true,
        lastModifiedBy: dbId,
        lastModifiedOn: Date.now(),
      },
      {
        where: {id: dbId},
      }
    );
    return true;
  }
  async checkInviteToken(email: string, token: string) {
    const dbUser: any = await userModel.findOne({
      where: {inviteToken: token, emailId: email},
      attributes: ['inviteTokenCreationTime'],
    });
    return dbUser;
  }
  async findUserByAzureId(azId: string | string[]) {
    const dbUser: any = await userModel.findOne({
      where: {azureId: azId},
    });
    return dbUser;
  }

  async findUserByUserId(dbId: number) {
    const dbUser: any = await userModel.findOne({
      where: {id: dbId, IS_ACTIVE: true},
    });
    return dbUser;
  }
  async updateInvitationToken(userId: number, token: string) {
    const updateToken = await userModel.findOne({where: {id: userId}});
    if (!updateToken) {
      return null;
    }
    updateToken.update({
      inviteToken: token,
      inviteTokenCreationTime: new Date().toISOString(),
    });
    return updateToken;
  }
  async getUserDbIdByAzureId(azId: string): Promise<number> {
    //assuming that first user creation, so that add 1 as initial user id
    const count = await userModel.count();
    if (count === 0) {
      return 1;
    }
    //atleast one user is found, gets the user id
    const dbUser: any = await userModel.findOne({
      where: {azureId: azId},
    });
    return dbUser.id;
  }

  async createDbUser(createUserObj: CreateUserObj) {
    const t = await sequelize.transaction();
    const taskName = 'CREATE_USER';
    logger.info(`${taskName}`, 'Transaction started');
    const userResult: any = await userModel.create(
      {
        fullName: createUserObj.fullName,
        emailId: createUserObj.email,
        priorityLevel: createUserObj.priorityLevel,
        mobile: createUserObj.mobile,
        lastModifiedBy: createUserObj.lastModifiedBy,
        lastModifiedDate: createUserObj.lastModifiedByDate,
        entityId: createUserObj.entityId,
        inviteToken: createUserObj.inviteToken,
        inviteTokenCreationTime: createUserObj.inviteTokenCreationTime,
        imageUrl: createUserObj.imageUrl,
        imageName: createUserObj.imageName,
        imageType: createUserObj.imageType,
        designationId: createUserObj.designationId,
        description: createUserObj?.description,
      },
      {
        transaction: t,
      }
    );
    const roles = [];
    for (let index = 0; index < createUserObj.roleIds.length; index++) {
      const element = createUserObj.roleIds[index];
      const obj = {
        userId: userResult.id,
        roleId: element,
        lastModifiedBy: createUserObj.lastModifiedBy,
        lastModifiedDate: new Date().toISOString(),
      };
      roles.push(obj);
    }
    await userRoleModel.bulkCreate(roles, {
      transaction: t,
    });
    //* commit transaction..
    await t.commit();
    logger.info(`${taskName}`, 'Transaction successfully committed');
    return userResult;
  }

  async updateisUserCreationInviteSent(email: string) {
    await userModel.update(
      {
        isUserCreationInviteSent: true,
      },
      {
        where: {emailId: email},
      }
    );
  }

  async addDbUserAzureId(azId: string, userRecordId: number) {
    // find user by userId
    const addAzureId = await userModel.findOne({
      where: {id: userRecordId},
    });
    //update user
    await addAzureId.update({
      azureId: azId,
    });
    return addAzureId;
  }

  async updateDbUser(
    req: UpdateUserProfileReq,
    loginUserId: number,
    userRecordId: number
  ) {
    //update user
    await userModel.update(
      {
        emailId: !req.newEmailId ? req.emailId : req.newEmailId,
        fullName: req.fullName,
        mobile: req.mobile,
        designationId: req.designationId,
        entityId: req.entityId,
        description: req.description,
        priorityLevel: req.priorityLevel,
        imageUrl: req.imageUrl,
        imageType: req.imageType,
        imageName: req.imageName,
        lastModifiedBy: loginUserId,
      },
      {
        where: {id: userRecordId},
      }
    );
    return req;
  }

  async updateRole(
    req: UpdateUserProfileReq,
    loginUserId: number,
    userRecordId: number
  ) {
    let updateRoleResult = await userRoleModel.findOne({
      where: {userId: userRecordId},
    });

    updateRoleResult = await updateRoleResult.update({
      roleId: req.roleId,
      lastModifiedBy: loginUserId,
      lastModifiedDate: new Date().toISOString(),
    });
    return updateRoleResult;
  }

  async getUsersList() {
    const dbUsers: any = await userModel.findAll({
      attributes: [
        'id',
        'fullName',
        'emailId',
        'mobile',
        'imageUrl',
        'priorityLevel',
        'description',
      ],
    });
    return dbUsers;
  }

  async getUserListForManagement() {
    let dbUsersQuery = userProvider.getUsersList();
    dbUsersQuery = `${dbUsersQuery} ORDER BY "user"."lastModifiedDate" DESC`;
    const dbUsers = await sequelize.query(dbUsersQuery, {
      type: QueryTypes.SELECT,
    });
    return dbUsers;
  }

  async updateUserFCMToken(req: UpdateUserFCMTokenReq, dbId: number) {
    //update user fcm token
    const userResult: any = await userModel.update(
      {
        fcmToken: req.fcmToken,
      },
      {
        where: {id: dbId, isActive: true},
      }
    );
    return userResult;
  }

  async updateUserTnCAccepted(tncAcptd: boolean, usrId: number) {
    await userModel.update(
      {
        tncAccepted: Date.now(),
      },
      {
        where: {id: usrId},
      }
    );
    return true;
  }
  async getUserInfoByAzureId(azureId: string) {
    const query = userProvider.getUserInfoByAzureId(azureId);
    const result: any = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return result;
  }

  async getUserInfoByUserId(userId: number) {
    const query = userProvider.getUserInfoByUserId(userId);
    const result: any = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return result;
  }

  async getUserInfoByEmailId(emailId: string) {
    const query = userProvider.getUserInfoByUserEmailId(emailId);
    const result: any = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return result;
  }

  async getUserRoleInfo(userId: number) {
    const query = userProvider.getUserRoleInfo(userId);
    const result: any = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return result;
  }

  async checkUserForEscalation(userId: string) {
    const query = userProvider.checkUserForEscalation(userId);
    const result: any = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return result;
  }

  async searchUser(searchQuery: string) {
    const dbUsers = await userModel.findAll({
      where: {
        isActive: true,
        [Op.or]: [
          {
            userName: {
              [Op.iLike]: `%${searchQuery}%`,
            },
          },
          {
            fullName: {
              [Op.iLike]: `%${searchQuery}%`,
            },
          },
        ],
      },
      attributes: [['azureId', 'user'], 'fullName', 'imageUrl', 'designation'],
    });
    return dbUsers;
  }

  async saveTokens(accessToken: string, refreshToken: string, userId: string) {
    let dbUser = await userModel.findOne({
      where: {azureId: userId},
    });
    dbUser = await dbUser.update({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    return dbUser;
  }

  // This specific query is made in case user did not press logout API and simply closed the browser window.
  // So at time of user login (Before sending OTP), in case login API is called, we first set isLogin to false for safety.
  async setLoginFalseOnLoginValidation(userId: string) {
    let dbUser = await userModel.findOne({
      where: {azureId: userId},
    });
    dbUser = await dbUser.update({
      isLogin: false,
    });
    return dbUser;
  }

  async successfulLogin(userId: string) {
    let dbUser = await userModel.findOne({
      where: {azureId: userId},
    });
    dbUser = await dbUser.update({
      isLogin: true,
    });
    return dbUser;
  }

  async logoutUser(userId: string) {
    let dbUser = await userModel.findOne({
      where: {azureId: userId},
    });
    if (!dbUser) {
      return null;
    }
    const element: any = dbUser;
    if (!element.isLogin) {
      return null;
    }
    dbUser = await dbUser.update({
      isLogin: false,
      accessToken: null,
      refreshToken: null,
    });
    return dbUser;
  }

  //#region findUserByEmail
  async findUserByEmail(email: string) {
    const user: any = await userModel.findOne({
      where: {emailId: {[Op.iLike]: email}},
    });
    return user;
  }
  //#endregion

  //#region findUserByPhoneNumber
  async findUserByPhoneNumber(phoneNumber: string) {
    const user = await userModel.findOne({
      where: {mobile: phoneNumber},
    });
    return user;
  }
  //#endregion

  async getUserRoleId(code: string) {
    const userRoleId: any = await roleModel.findOne({
      where: {code: code},
    });
    return userRoleId;
  }

  async findUserRoleInfo(userId: number, roleId: number) {
    const query = userProvider.findUserRoleInfo(userId, roleId);
    const result: any = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return result;
  }
  async forgotUserPassword(emailId: string) {
    let findUser = await userModel.findOne({
      where: {emailId: emailId},
    });
    findUser = await findUser.update({
      passwordResetVerificationId: uuidv4(),
    });
    return findUser;
  }

  async loginFlowRequest(emailId: string) {
    let findUser = await userModel.findOne({
      where: {emailId: emailId},
    });
    findUser = await findUser.update({
      passwordResetVerificationId: null,
    });
    return findUser;
  }

  async forgotPasswordTokenValidity(emailId: string) {
    let findUser = await userModel.findOne({
      where: {emailId: emailId},
    });
    findUser = await findUser.update({
      passwordResetTokenValidity: new Date().toISOString(),
      isLogin: false,
    });
    return findUser;
  }

  async forgotPasswordSuccess(emailId: string) {
    let findUser = await userModel.findOne({
      where: {emailId: emailId},
    });
    findUser = await findUser.update({
      passwordResetVerificationId: null,
      passwordResetTokenValidity: null,
    });
    return findUser;
  }

  async filterUsersQuery(filterObj: filterUsersReq) {
    let filterQuery = userProvider.filterUsersList(filterObj);
    filterQuery = `${filterQuery} ORDER BY "user"."lastModifiedDate" DESC`;
    const filterResult = await sequelize.query(filterQuery, {
      type: QueryTypes.SELECT,
    });
    return filterResult;
  }

  async enableDisableUserQuery(reqObj: enableDisableUserReq) {
    let updateStatus = await userModel.findOne({
      where: {id: reqObj.userId},
    });
    updateStatus = await updateStatus.update({
      isActive: reqObj.userStatus,
    });
    return updateStatus;
  }

  async setUserSessionId(userId: string, sessionId: string) {
    let updateSession = await userModel.findOne({
      where: {id: userId},
    });
    updateSession = await updateSession.update({
      sessionId: sessionId,
    });
    return updateSession;
  }

  async setUserAzureId(userId: string, azureId: string) {
    let updateSession = await userModel.findOne({
      where: {id: userId},
    });
    updateSession = await updateSession.update({
      azureId: azureId,
    });
    return updateSession;
  }
}
