import express from 'express';
import {AttendeeController} from './attendee.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {attendeeValidator} from './attendee.validator';
import {handleUserSession} from '../../middleware/handle-user-session';

export const AttendeeRouter = express.Router();

AttendeeRouter.post('/addAttendees', [
  validator(attendeeValidator.addAttendee, 'body'),
  handleUserSession(AttendeeController.addAttendees),
  asyncWrapper(AttendeeController.addAttendees),
]);

AttendeeRouter.get('/getAttendeesList/:meetingId?', [
  validator(attendeeValidator.getAttendeesList, 'body'),
  handleUserSession(AttendeeController.getAttendeesList),
  asyncWrapper(AttendeeController.getAttendeesList),
]);
