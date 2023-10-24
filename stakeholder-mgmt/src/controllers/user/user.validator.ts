import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';
const pwdComplexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

const expr = Joi.object().keys({
  designation: Joi.string().label('designation_name').required(),
  company: Joi.string().label('company_name').min(2).required(),
  startDate: Joi.string().label('start_date').min(2).required(),
  endDate: Joi.string().label('end_date').min(2).required(),
  workingPresently: Joi.boolean().label('working_presently').required(),
});

const edu = Joi.object().keys({
  degree: Joi.string().label('degree_name').required(),
  institution: Joi.string().label('institution_name').required(),
  startDate: Joi.string().label('start_date').min(2).required(),
  endDate: Joi.string().label('end_date').min(2).required(),
});

const updateUser = Joi.object({
  emailId: Joi.string()
    .email({tlds: {allow: false}})
    .label('emailId')
    .required(),
  newEmailId: Joi.string()
    .email({tlds: {allow: false}})
    .label('newEmailId')
    .required()
    .allow(null),
  fullName: Joi.string().label('fullName').required(),
  mobile: Joi.string().label('mobile').required(),
  designationId: Joi.string().label('designationId').required(),
  entityId: Joi.string().label('entityId').required(),
  description: Joi.string().label('description').required().allow(null),
  priorityLevel: Joi.string()
    .label('priorityLevel')
    .required()
    .valid('P0', 'P1', 'P2', 'P3', 'P4'),
  imageName: Joi.string().label('imageName').required().allow(null),
  imageType: Joi.string().label('imageType').required().allow(null),
  imageUrl: Joi.string().label('imageUrl').required().allow(null),
  roleId: Joi.number().label('roleId').required().allow(null),
});

const changePassword = Joi.object({
  oldPassword: PasswordComplexity(
    pwdComplexityOptions,
    'old password'
  ).required(),
  newPassword: PasswordComplexity(
    pwdComplexityOptions,
    'new password'
  ).required(),
});

const updateUserFCMToken = Joi.object({
  fcmToken: Joi.string().label('fcm_token').required(),
});

const getUser = Joi.object({
  userId: Joi.string().label('userId').required(),
});

const updateActivities = Joi.object({
  activityID: Joi.number().label('activities_Id').required(),
  activities: Joi.array()
    .items(Joi.string())
    .label('activities_array')
    .required(),
});

const updateExperience = Joi.object({
  experience: Joi.array().items(expr).required(),
});

const updateEducation = Joi.object({
  education: Joi.array().items(edu).required(),
});

const updateTnCAccepted = Joi.object({
  accepted: Joi.boolean().label('accepted_boolean').required(),
});

const getUserByUserId = Joi.object({
  userId: Joi.number().label('userId').required(),
});

const filterUsers = Joi.object({
  isPasswordSet: Joi.boolean().label('isPasswordSet').required().allow(null),
  isActive: Joi.boolean().label('isActive').required().allow(null),
  entityIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .label('entityIds')
    .required(),
  priorityIds: Joi.array()
    .items(
      Joi.string()
        .optional()
        .allow('', null)
        .valid('P0', 'P1', 'P2', 'P3', 'P4')
    )
    .label('priorityIds')
    .required(),
  designationIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .label('designationIds')
    .required(),
  emailIds: Joi.array()
    .items(Joi.string().optional().allow('', null))
    .label('emailIds')
    .required(),
  roleIds: Joi.array()
    .items(Joi.number().optional().allow('', null))
    .label('roleIds')
    .required(),
});

const enableDisableUser = Joi.object({
  userId: Joi.number().required().label('userId'),
  userStatus: Joi.boolean().required().label('userStatus'),
});

const verifyUser = Joi.object({
  emailId: Joi.string()
    .email({tlds: {allow: false}})
    .label('emailId')
    .required(),
});

export const userValidator = {
  updateUser,
  changePassword,
  updateUserFCMToken,
  getUser,
  filterUsers,
  enableDisableUser,
  updateActivities,
  updateExperience,
  updateEducation,
  updateTnCAccepted,
  getUserByUserId,
  verifyUser,
};
