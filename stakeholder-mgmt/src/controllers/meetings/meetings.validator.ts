import Joi from 'joi';

const filterStakeHolderForMeetingsCreation = Joi.object({
  organizationIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('organizationIds'),
  organizationTypeIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('organizationTypeIds'),
});

const getOrgNames = Joi.object({
  orgId: Joi.array()
    .items(Joi.number().required().allow('', null))
    .required()
    .label('orgId'),
});

const riskNotes = Joi.object({
  type: Joi.string().required().label('type').valid('HIGH', 'MEDIUM', 'LOW'),
  text: Joi.string().required().label('text'),
});

const supportNotes = Joi.object({
  type: Joi.string().required().label('type').valid('HIGH', 'MEDIUM', 'LOW'),
  text: Joi.string().required().label('text'),
});

const fileUpload = Joi.object({
  fileName: Joi.string().required().label('fileName'),
  fileType: Joi.string().required().label('fileType'),
  fileUrl: Joi.string().required().label('fileUrl'),
});

const createMeeting = Joi.object({
  organizationTypeIds: Joi.array()
    .items(Joi.number().required().allow('', null))
    .required()
    .label('organizationTypeIds'),
  organizationIds: Joi.array()
    .items(Joi.number().required().allow('', null))
    .required()
    .label('organizationIds'),
  meetingId: Joi.number().label('meetingId').required().allow('', null),
  meetingDate: Joi.date().label('meetingDate').required(),
  meetingStartTime: Joi.string().label('meetingStartTime').required(),
  meetingEndTime: Joi.string().label('meetingEndTime').required(),
  stakeHolderIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('stakeHolderIds'),
  attendeesIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('attendeesIds'),
  meetingAgenda: Joi.string().label('meetingAgenda').optional().allow('', null),
  oppurtunities: Joi.string().label('oppurtunities').optional().allow('', null),
  riskNotes: Joi.array()
    .items(riskNotes.optional().allow('', null))
    .required()
    .label('riskNotes'),
  supportNotes: Joi.array()
    .items(supportNotes.optional().allow('', null))
    .required()
    .label('supportNotes'),
  observations: Joi.string().label('observations').optional().allow('', null),
  fileUpload: Joi.array()
    .items(fileUpload.optional().allow('', null))
    .required()
    .label('fileUpload'),
  isDraft: Joi.boolean().required().label('isDraft'),
});

const editMeeting = Joi.object({
  meetingId: Joi.string().label('meetingId').required(),
});

const filterMeetings = Joi.object({
  meetingFrom: Joi.date().label('meetingFrom').required(),
  meetingTo: Joi.date().label('meetingTo').required(),
  meetingStartTime: Joi.string()
    .label('meetingStartTime')
    .required()
    .allow('', null),
  meetingEndTime: Joi.string()
    .label('meetingEndTime')
    .required()
    .allow('', null),
  organizationIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('organizationIds'),
  organizationTypeIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('organizationTypeIds'),
  companyTypeIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('companyTypeIds'),
  publicCompTypeIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('publicCompTypeIds'),
  priorityLevels: Joi.array()
    .items(
      Joi.string()
        .optional()
        .allow('', null)
        .valid('P0', 'P1', 'P2', 'P3', 'P4')
    )
    .required()
    .label('priorityLevels'),
  createdByIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('createdByIds'),
  entityIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('entityIds'),
});

const filterMeetingByDate = Joi.object({
  meetingFrom: Joi.date().label('meetingFrom').allow('').allow(null),
  meetingTo: Joi.date().label('meetingTo').allow('').allow(null),
});

const filterMeetingByDateForExcelExport = Joi.object({
  meetingFrom: Joi.date().label('meetingFrom').allow('').allow(null),
  meetingTo: Joi.date().label('meetingTo').allow('').allow(null),
});
const getStakeholderMeetings = Joi.object({
  stakeHolderId: Joi.number().required().label('stakeHolderId'),
});

export const meetingsValidator = {
  filterStakeHolderForMeetingsCreation,
  createMeeting,
  editMeeting,
  getOrgNames,
  filterMeetings,
  filterMeetingByDate,
  getStakeholderMeetings,
  filterMeetingByDateForExcelExport,
};
