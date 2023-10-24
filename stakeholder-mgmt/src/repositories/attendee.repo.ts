import sequelize from '../config/sequelize';
import {QueryTypes} from 'sequelize';
import {attendeeModel} from '../models/attendee.model';
import {logger} from '../util/logger';
import {addAttendeeReq, dbResponse} from '../business_objects/attendee';
import {attendeesProvider} from '../sql-provider/getAttendeeList';

export class AttendeeRepository {
  //#region addAttendee
  public async addAttendee(reqObj: Array<addAttendeeReq>, loginUserId: number) {
    const t = await sequelize.transaction();
    const taskName = 'Add_Attendee';
    logger.info(`${taskName}`, 'Transaction started');
    try {
      //#region adding Attendee
      const attendeeArray: any[] = [];
      for (let index = 0; index < reqObj.length; index++) {
        const attendeeObj = {
          fullName: reqObj[index].fullName,
          designation: reqObj[index].designation,
          createdBy: loginUserId,
          updatedBy: loginUserId,
        };
        attendeeArray.push(attendeeObj);
      }
      const attendeeResult = await attendeeModel.bulkCreate(attendeeArray, {
        transaction: t,
      });

      //#endregion
      //commit transaction..
      await t.commit();
      logger.info(`${taskName}`, 'Transaction successfully committed');
      const resp: dbResponse = {
        responseObj: attendeeResult,
        isSuccess: true,
      };
      return resp;
    } catch (error) {
      await t.rollback();
      logger.info(`${taskName}_ERROR_TRANSACTION_ROLLBACK`, error);
      const resp: dbResponse = {
        responseObj: error,
        isSuccess: false,
      };
      return resp;
    }
  }
  //#endregion

  //#region getAttendees
  async getAttendees() {
    const getAllAttendees = attendeeModel.findAll({
      order: [['updatedBy', 'DESC']],
    });
    return getAllAttendees;
  }
  //#endregion

  //#region getAttendeesListByMeetingIdQuery
  async getAttendeesListByMeetingIdQuery(meetingId: number) {
    const getAttendeeListQuery = attendeesProvider.filterAttendesByMeetingId(
      meetingId
    );
    const getAttendeeList = await sequelize.query(getAttendeeListQuery, {
      type: QueryTypes.SELECT,
    });
    return getAttendeeList;
  }
  //#endregion
}
