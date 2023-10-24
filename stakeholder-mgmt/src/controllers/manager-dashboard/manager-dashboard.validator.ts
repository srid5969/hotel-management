import Joi from 'joi';

const getUser = Joi.object({
  userId: Joi.string().label('userId').required(),
});

const filterDashboard = Joi.object({
  meetingFrom: Joi.date().label('meetingFrom').required(),
  meetingTo: Joi.date().label('meetingTo').required(),
  organizationIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('organizationIds'),
  organizationTypeIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('organizationTypeIds'),
  cityIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('cityIds'),
});

const getOrgNames = Joi.object({
  orgId: Joi.array()
    .items(Joi.number().required().allow('', null))
    .required()
    .label('orgId'),
});

export const managerDashboardValidator = {
  getUser,
  filterDashboard,
  getOrgNames,
};
