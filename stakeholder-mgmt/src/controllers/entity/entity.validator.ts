import Joi from 'joi';

import {UtilProvider} from '../../providers/util';

const createEntity = Joi.object({
  name: Joi.string()
    .required()
    .regex(UtilProvider.regexToMatchString())
    .label('Invalid entity name, only alphanumeric , . _ - space are allowed'),
  domain: Joi.string()
    .required()
    .regex(UtilProvider.regexToMatchDomain())
    .label('Invalid domain, only alphanumeric and . are allowed'),
});

const getEntitybyId = Joi.object({
  Id: Joi.number().required().label('id'),
});

const disableEntity = Joi.object({
  entityIds: Joi.array()
    .items(Joi.number())
    .required()
    .label('entityIds')
    .unique(),
});

const updateEntity = Joi.object({
  name: Joi.string()
    .required()
    .regex(UtilProvider.regexToMatchString())
    .label('Invalid entity name, only alphanumeric , . _ - space are allowed'),
  domain: Joi.string()
    .required()
    .regex(UtilProvider.regexToMatchDomain())
    .label('Invalid domain, only alphanumeric and . are allowed'),
  entityId: Joi.number().required().label('entityIds'),
  isActive: Joi.boolean().required().label('isActive'),
});

export const entityValidator = {
  createEntity,
  disableEntity,
  updateEntity,
  getEntitybyId,
};
