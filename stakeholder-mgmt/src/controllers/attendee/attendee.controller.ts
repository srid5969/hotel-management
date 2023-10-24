import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {AttendeeRepository} from '../../repositories/attendee.repo';
import {UserRepository} from '../../repositories/users.repo';
import {
  addAttendeeReq,
  addAttendeeRes,
  getAttendeesList,
  getAttendeesRes,
} from '../../business_objects/attendee';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
} from '../../util';

export class AttendeeController {
  private static attendeeRepo = new AttendeeRepository();
  private static userRepo = new UserRepository();
  //#region  addAttendee
  public static async addAttendees(req: Request, res: Response) {
    const taskName = 'Add_Attendee';
    logger.info(`${taskName}-REQ`, JSON.stringify(req.body));
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
    const reqObj: Array<addAttendeeReq> = req.body.attendeesList;
    // {
    //   fullName: req.body.fullName,
    //   designation: req.body.designation,
    // };
    try {
      const dbUserId = await AttendeeController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const addAttendee = await AttendeeController.attendeeRepo.addAttendee(
        reqObj,
        dbUserId.id
      );
      if (!addAttendee.isSuccess) {
        logger.info(
          `${taskName}_ERROR_ADDING_ATTENDEE`,
          JSON.stringify(addAttendee)
        );
        // const errObj: any = {};
        // addAttendee.responseObj.errors.map((er: any) => {
        //   errObj[er.value] = er.message;
        // });
        const error = `Attendee with name ${addAttendee.responseObj.errors[0].value} already exist`;
        const noResult = new BadRequestResponse(res, error);
        return noResult.send();
      }
      const resp: addAttendeeRes = {
        userObj: addAttendee,
        isAttendeeAdded: true,
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

  //#region  getAttendeesList
  public static async getAttendeesList(req: Request, res: Response) {
    const taskName = 'Add_Attendee';
    logger.info(`${taskName}-REQ`, JSON.stringify(req.body));
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
    try {
      const reqObj: getAttendeesList = {
        meetingId: parseInt(req.params.meetingId),
      };
      if (!reqObj.meetingId) {
        const AttendeesList: any[] = await AttendeeController.attendeeRepo.getAttendees();
        if (!AttendeesList) {
          logger.info(
            `${taskName}_ERROR_ADDING_ATTENDEE`,
            JSON.stringify(AttendeesList)
          );
          const noResult = new BadRequestResponse(
            res,
            JSON.stringify(AttendeesList)
          );
          return noResult.send();
        }
        const resp: getAttendeesRes = {
          attendeesList: AttendeesList,
        };
        const success = new SuccessResponse(res, 'success', resp);
        return success.send();
      } else {
        const AttendeesList: any[] = await AttendeeController.attendeeRepo.getAttendeesListByMeetingIdQuery(
          reqObj.meetingId
        );
        if (!AttendeesList) {
          logger.info(
            `${taskName}_ERROR_ADDING_ATTENDEE`,
            JSON.stringify(AttendeesList)
          );
          const noResult = new BadRequestResponse(
            res,
            JSON.stringify(AttendeesList)
          );
          return noResult.send();
        }
        const resp: getAttendeesRes = {
          attendeesList: AttendeesList,
        };
        const success = new SuccessResponse(res, 'success', resp);
        return success.send();
      }
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
}
