import Joi from 'joi';

const getPubCompByCompTypeId = Joi.object({
  compId: Joi.number().label('compId').required(),
  orgId: Joi.number().label('orgId').required(),
});

export const PublicCompanyValidator = {
  getPubCompByCompTypeId,
};
