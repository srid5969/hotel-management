import Joi from 'joi';

const resendEmail = Joi.object({
  email: Joi.string().label('email').required(),
});

export const resendEmailValidator = {
  resendEmail,
};
