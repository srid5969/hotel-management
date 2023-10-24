import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';
const pwdComplexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 6,
};
const login = Joi.object({
  email: Joi.string().label('email').required(),
  password: Joi.string().required().label('password'),
});

const email = Joi.object({
  email: Joi.string().label('email').required(),
});

const logout = Joi.object({
  userId: Joi.string().label('userId').required(),
});

const refreshToken = Joi.object({
  userId: Joi.string().label('userId').required(),
});

const createUser = Joi.object({
  email: Joi.string().label('email').required(),
  fullName: Joi.string().label('fullName').required(),
  mobile: Joi.string().label('mobile').required(),
  priorityLevel: Joi.string()
    .label('priorityLevel')
    .required()
    .valid('P0', 'P1', 'P2', 'P3', 'P4'),
  imageUrl: Joi.string().optional().allow('', null),
  imageName: Joi.string().optional().allow('', null),
  imageType: Joi.string().optional().allow('', null),
  designationId: Joi.number().required().label('designationId'),
  description: Joi.string().optional().label('description').allow('', null),
  roleIds: Joi.array()
    .items(Joi.number().required())
    .required()
    .label('roleIds'),
});

const verifyOtp = Joi.object({
  otp: Joi.number().label('otp').required(),
  email: Joi.string().label('email').required(),
});

const generateOtp = Joi.object({
  email: Joi.string().label('email').required(),
  isForgotPassword: Joi.boolean()
    .label('isForgotPassword')
    .required()
    .allow(null),
});

const updatePassword = Joi.object({
  email: Joi.string().label('email').required(),
  newPassword: PasswordComplexity(
    pwdComplexityOptions,
    'newPassword'
  ).required(),
  confirmPassword: PasswordComplexity(
    pwdComplexityOptions,
    'confirmPassword'
  ).required(),
});

const setPassword = Joi.object({
  email: Joi.string().label('email').required(),
  newPassword: PasswordComplexity(
    pwdComplexityOptions,
    'newPassword'
  ).required(),
  confirmPassword: PasswordComplexity(
    pwdComplexityOptions,
    'confirmPassword'
  ).required(),
  token: Joi.string().label('token').required(),
});

const changePassword = Joi.object({
  currentPassword: Joi.string().label('currentPassword').required().trim(),
  newPassword: PasswordComplexity(pwdComplexityOptions, 'newPassword')
    .required()
    .trim(),
  confirmNewPassword: PasswordComplexity(
    pwdComplexityOptions,
    'confirmNewPassword'
  )
    .required()
    .trim(),
});

export const authValidator = {
  login,
  email,
  createUser,
  generateOtp,
  verifyOtp,
  updatePassword,
  changePassword,
  setPassword,
  logout,
  refreshToken,
};
