import express from 'express';
import {MeetingsController} from './meetings.controller';
import {asyncWrapper} from '../../middleware/async-wrapper';
import {validator} from '../../middleware/validator';
import {meetingsValidator} from './meetings.validator';
import {meetingAttachmentsUpload} from '../../config/multerParam';
import {handleUserSession} from '../../middleware/handle-user-session';

export const MeetingsRouter = express.Router();

MeetingsRouter.get('/get-org-types', [
  handleUserSession(MeetingsController.getOrgDdlData),
  asyncWrapper(MeetingsController.getOrgDdlData),
]);

MeetingsRouter.post('/get-org-names', [
  validator(meetingsValidator.getOrgNames, 'body'),
  handleUserSession(MeetingsController.getOrgNameData),
  asyncWrapper(MeetingsController.getOrgNameData),
]);

MeetingsRouter.post('/get-stakeholders-org', [
  validator(meetingsValidator.filterStakeHolderForMeetingsCreation, 'body'),
  handleUserSession(MeetingsController.getStakeholdersData),
  asyncWrapper(MeetingsController.getStakeholdersData),
]);

MeetingsRouter.post('/create-or-update-meeting', [
  validator(meetingsValidator.createMeeting, 'body'),
  handleUserSession(MeetingsController.createMeetings),
  asyncWrapper(MeetingsController.createMeetings),
]);

MeetingsRouter.get('/get-meetings', [
  handleUserSession(MeetingsController.getMeetingsByUserId),
  asyncWrapper(MeetingsController.getMeetingsByUserId),
]);

MeetingsRouter.post('/export-excel', [
  validator(meetingsValidator.filterMeetingByDateForExcelExport, 'body'),
  handleUserSession(MeetingsController.getMeetingsByUserId),
  asyncWrapper(MeetingsController.exportMeetingToExcelByUserId),
]);

MeetingsRouter.get('/edit-meeting/:meetingId', [
  validator(meetingsValidator.editMeeting, 'params'),
  handleUserSession(MeetingsController.editMeetingByUserId),
  asyncWrapper(MeetingsController.editMeetingByUserId),
]);

MeetingsRouter.post('/filter-meeting', [
  validator(meetingsValidator.filterMeetings, 'body'),
  handleUserSession(MeetingsController.filterMeetingsById),
  asyncWrapper(MeetingsController.filterMeetingsById),
]);

MeetingsRouter.post(
  '/upload-file',
  meetingAttachmentsUpload.array('uploadFile', 5),
  [
    handleUserSession(MeetingsController.uploadFile),
    asyncWrapper(MeetingsController.uploadFile),
  ]
);

MeetingsRouter.get('/download-report/:meetingId', [
  validator(meetingsValidator.editMeeting, 'params'),
  handleUserSession(MeetingsController.downloadMeeting),
  asyncWrapper(MeetingsController.downloadMeeting),
]);

MeetingsRouter.get('/meeting-filter-ddl', [
  handleUserSession(MeetingsController.getFilterDDLData),
  asyncWrapper(MeetingsController.getFilterDDLData),
]);

MeetingsRouter.post('/filter-meeting-by-date', [
  validator(meetingsValidator.filterMeetingByDate, 'body'),
  handleUserSession(MeetingsController.filterMeetingForAdmin),
  asyncWrapper(MeetingsController.filterMeetingForAdmin),
]);

MeetingsRouter.post('/get-stakeholder-meetings', [
  validator(meetingsValidator.getStakeholderMeetings, 'body'),
  handleUserSession(MeetingsController.getMeetingInfoByStakeholderId),
  asyncWrapper(MeetingsController.getMeetingInfoByStakeholderId),
]);
