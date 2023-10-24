//Write code here
import Joi from 'joi';

const getOrgNames = Joi.object({
  orgId: Joi.array()
    .items(Joi.number().required().allow('', null))
    .required()
    .label('orgId')
    .allow('', null),
});

const filterDashboard = Joi.object({
  meetingFrom: Joi.date().label('meetingFrom').allow('').allow(null),
  meetingTo: Joi.date().label('meetingTo').allow('').allow(null),
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
  createdByIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('createdByIds'),
  entityIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('entityIds'),
  riskType: Joi.array()
    .items(Joi.string().optional().allow('', null))
    .required()
    .label('riskType'),
});

export const adminDashboardValidator = {
  getOrgNames,
  filterDashboard,
};
