export class UpdateUserProfileReq {
  emailId: string;
  newEmailId: string;
  fullName: string;
  mobile: string;
  designationId: string;
  entityId: string;
  description: string;
  priorityLevel: string;
  imageUrl: string;
  imageName: string;
  imageType: string;
  roleId: number;
}

export class CreateUserReq {
  userName: string;
  password: string;
  name: string;
}

export class GetProfileReq {
  userName: string;
}

export class UpdatePasswordReq {
  userName: string;
  newPassword: string;
  confirmPassword: string;
}

export class GetProfileRes {
  userName: string;
  fullName: string;
  contactNo: string;
  isActive: boolean;
  entityName: string;
  designation: string;
  department: string;
  bio: string;
  imageURL: string;
  fcmToken: string;
  enablePushNotification: boolean;
  restrictProfile: boolean;
  hobbies: string[];
  interests: string[];
  achievements: string[];
  experience: ExperienceObj[];
  education: EducationObj[];
}

export class ExperienceObj {
  designation: string;
  company: string;
  startDate: string;
  endDate: string;
  workingPresently: boolean;
}

export class EducationObj {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export class UpdateUserFCMTokenReq {
  fcmToken: string;
}

export class UpdateUserActivities {
  activityID: number;
  activities: string[];
}

export class UpdateExperiences {
  experience: ExperienceObj[];
}

export class UpdateEducation {
  education: EducationObj[];
}

export class UpdateTNCAccepted {
  accepted: boolean;
}

export class filterUsersReq {
  isPasswordSet: boolean;
  isActive: boolean;
  entityIds: Array<number>;
  priorityIds: Array<string>;
  designationIds: Array<number>;
  emailIds: Array<string>;
  roleIds: Array<number>;
}

export class enableDisableUserReq {
  userId: number;
  userStatus: boolean;
}

export class verifyUserReq {
  emailId: string;
}

export class verifyUserRes {
  userDetails: any;
  rolesList: any;
}
