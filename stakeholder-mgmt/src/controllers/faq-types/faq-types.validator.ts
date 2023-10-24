import Joi from 'joi';
import {UtilProvider} from '../../providers/util';

const addUpdateFaqTypes = Joi.object({
  faqTypeId: Joi.number().label('faqId').required().allow(null),
  faqTypeName: Joi.string()
    .required()
    .regex(UtilProvider.regexToMatchString())
    .label(
      'Invalid faq-type name, only alphanumeric , . _ - space are allowed'
    ),
  sortNumber: Joi.number().label('sortNumber').required(),
  isActive: Joi.boolean().label('isActive').required(),
});
const getfaqTypeById = Joi.object({
  faqTypeId: Joi.number().label('faqTypeId').optional(),
});
export const faqTypesValidator = {
  addUpdateFaqTypes,
  getfaqTypeById,
};
