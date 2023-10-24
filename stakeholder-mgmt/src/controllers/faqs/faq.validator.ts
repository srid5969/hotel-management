import Joi from 'joi';

const addUpdateFaq = Joi.object({
  faqsList: Joi.array().items({
    faqId: Joi.number().label('faqId').required().allow(null),
    typeId: Joi.number().label('typeId').required(),
    sortNumber: Joi.number().label('sortNumber').required(),
    question: Joi.string().required().label('question'),
    answer: Joi.string().required().label('answer'),
    isActive: Joi.boolean().label('isActive').required(),
  }),
});

const activeInactiveFaq = Joi.object({
  faqId: Joi.number().label('faqId').required(),
  isActive: Joi.boolean().label('isActive').required(),
});

const getFaqbyId = Joi.object({
  faqId: Joi.number().label('faqId').optional(),
});

export const faqValidator = {
  addUpdateFaq,
  activeInactiveFaq,
  getFaqbyId,
};
