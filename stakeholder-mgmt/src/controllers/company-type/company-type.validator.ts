import Joi from 'joi';

const getCompTypeByOrgId = Joi.object({
  orgId: Joi.number().label('orgId').required(),
});

export const companyTypeValidator = {
  getCompTypeByOrgId,
};
