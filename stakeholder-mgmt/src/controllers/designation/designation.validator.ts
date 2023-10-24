import Joi from 'joi';

const createDesignation = Joi.object({
  designationName: Joi.string().required().label('designationName'),
});

const enableDisableDesignation = Joi.object({
  designationId: Joi.number().required().label('designationId'),
  designationStatus: Joi.boolean().required().label('designationStatus'),
});

export const designationValidator = {
  createDesignation,
  enableDisableDesignation,
};
