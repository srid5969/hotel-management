import Joi from 'joi';
import {UtilProvider} from '../../providers/util';

const getStakeHolder = Joi.object({
  email: Joi.string().label('email').required(),
});

const importantLinks = Joi.object({
  typeId: Joi.number().required().label('typeId'),
  url: Joi.string()
    .required()
    .label(
      'Important Links URL(s) is required, you can ignore by clicking on delete action of Important Links section'
    ),
});

const createUpdateStakeHolder = Joi.object({
  stakeHolderId: Joi.number().label('stakeHolderId').required().allow('', null),
  fullName: Joi.string()
    .trim()
    .strict()
    .required()
    .regex(UtilProvider.regexToMatchString())
    .label('Invalid full name, only alphanumeric , . _ - space are allowed'),
  organizationTypeId: Joi.number().label('organizationTypeId').required(),
  companyTypeId: Joi.number().label('companyTypeId').required().allow('', null),
  publicCompanyId: Joi.number()
    .label('publicCompanyId')
    .optional()
    .allow('', null),
  organizationId: Joi.number().label('organizationId').required(),
  designation: Joi.string()
    .optional()
    .allow('', null)
    .regex(UtilProvider.regexToMatchString())
    .label('Invalid designation, only alphanumeric , . _ - space are allowed'),
  email: Joi.string()
    .optional()
    .allow('', null)
    .regex(UtilProvider.regexToMatchEmail())
    .label('Invalid email, only alphanumeric , . _ @ - space are allowed'),
  mobile: Joi.string().label('mobile').optional().allow('', null),
  description: Joi.string()
    .optional()
    .allow('', null)
    //.regex(UtilProvider.regexToMatchString())
    .label('Invalid description, only alphanumeric , . _ - space are allowed'),
  cityId: Joi.number().label('cityId').required(),
  priorityLevel: Joi.string().label('priorityLevel').required(),
  imageUrl: Joi.string().required().allow('', null),
  imageName: Joi.string().required().allow('', null),
  imageType: Joi.string().required().allow('', null),
  importantLinks: Joi.array().items(importantLinks).required().allow('', null),
  mergedIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .label('mergedIds')
    .required()
    .unique(),
});

const filterStakeHolder = Joi.object({
  statusIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('statusIds'),
  stakeHolderIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('stakeHolderIds'),
  cityIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('cityIds'),
  organizationIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('organizationIds'),
  organizationTypeIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('organizationTypeIds'),
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
  roleIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .required()
    .label('roleIds'),
});

const stakeHolderActions = Joi.object({
  type: Joi.string().valid('APPROVED', 'REJECTED').required().label('type'),
  stakeHolderId: Joi.number().label('stakeHolderId').required(),
  comment: Joi.string().label('comment').required().allow(''),
});

const getStakeHolderById = Joi.object({
  stakeHolderId: Joi.number().label('stakeHolderId').required(),
});

const getStakeholdersForMerging = Joi.object({
  stakeholderIds: Joi.array()
    .items(Joi.number())
    .min(2)
    .required()
    .label('stakeholderIds'),
});

const disableStakeholder = Joi.object({
  stakeholderId: Joi.number().required().label('stakeholderId'),
});

const enableStakeholder = Joi.object({
  stakeholderId: Joi.number().required().label('stakeholderId'),
});

const getProfileInfo = Joi.object({
  stakeHolderId: Joi.number().required().label('stakeHolderId'),
});

export const stakeHolderValidator = {
  getStakeHolder,
  createUpdateStakeHolder,
  filterStakeHolder,
  stakeHolderActions,
  getStakeHolderById,
  getStakeholdersForMerging,
  disableStakeholder,
  enableStakeholder,
  getProfileInfo,
};
