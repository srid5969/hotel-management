export const constants = {
  errorMessage: {
    unexpectedError: 'An unexpected error has occurrred',
  },

  statusCode: {},

  TemplateTypeCode: {
    EMAIL_CREATE_USER_INVITE: 'EMAIL_CREATE_USER_INVITE',
  },

  dbUserRoles: {
    P1: 1,
    P2: 2,
    P3: 3,
    P4: 4,
  },
  //for handling changes related to removal of prority level restriction - if priority
  // level is required back in future, then set this to TRUE and allowed all users roles.
  restrictiionType: {
    IS_PRIORITY_BASED: false,
  },

  UserRoles: {
    Allowed: [1, 3],
  },
};
