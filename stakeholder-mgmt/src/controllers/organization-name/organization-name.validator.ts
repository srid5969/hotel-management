import Joi from 'joi';
import {UtilProvider} from '../../providers/util';

const getOrgById = Joi.object({
  orgId: Joi.number().label('orgId').optional(),
});

const getOrgByPubCompId = Joi.object({
  compId: Joi.number().label('compId').required(),
  orgId: Joi.number().label('orgId').required(),
  pubCompId: Joi.number().label('pubCompId').required(),
});

const createOrganization = Joi.object({
  name: Joi.string()
    .required()
    .regex(UtilProvider.regexToMatchString())
    .label(
      'Invalid organization name, only alphanumeric , . _ - space are allowed'
    ),
  orgTypeId: Joi.number().required().label('orgTypeId'),
  companyTypeId: Joi.number().required().label('companyTypeId').allow('', null),
  publicCompanyId: Joi.number()
    .required()
    .label('publicCompanyId')
    .allow('', null),
});

const disableOrganization = Joi.object({
  orgNameIds: Joi.array()
    .items(Joi.number())
    .required()
    .label('orgNameIds')
    .unique(),
});

const updateOrganization = Joi.object({
  orgNameId: Joi.number().required().label('orgNameId'),
  name: Joi.string()
    .required()
    .regex(UtilProvider.regexToMatchString())
    .label(
      'Invalid organization name, only alphanumeric , . _ - space are allowed'
    ),
  orgTypeId: Joi.number().required().label('orgTypeId'),
  companyTypeId: Joi.number().required().label('companyTypeId').allow('', null),
  publicCompanyId: Joi.number()
    .required()
    .label('publicCompanyId')
    .allow('', null),
  isActive: Joi.boolean().required(),
});

export const organizationNameValidator = {
  getOrgByPubCompId,
  createOrganization,
  disableOrganization,
  updateOrganization,
  getOrgById,
};
