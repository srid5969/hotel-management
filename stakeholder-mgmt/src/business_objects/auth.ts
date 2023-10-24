export class LoginReq {
  email: string;
  password: string;
}

export class LoginRes {
  user: any;
  token?: any;
}

export class SignUpReq {
  userName: string;
}

export class CreateUserReq {
  email: string;
  fullName: string;
  mobile: string;
  priorityLevel: string;
  imageUrl?: string;
  imageName?: string;
  imageType?: string;
  designationId: number;
  description?: string;
  roleIds: Array<number>;
}

export class CreateUserObj {
  email: string;
  fullName: string;
  mobile: string;
  lastModifiedBy: number;
  lastModifiedByDate: string;
  entityId: number;
  inviteToken: string;
  inviteTokenCreationTime: string;
  priorityLevel: string;
  imageUrl?: string;
  imageName?: string;
  imageType?: string;
  designationId: number;
  description?: string;
  roleIds: Array<number>;
}

export class CreateUserRes {
  isUserCreated: boolean;
  isUserCreationInviteSent?: boolean;
  inviteUrl: string;
}

export class SignUpRes {
  confirm: boolean;
}

export class CreateOTPReq {
  email: string;
  isForgotPassword?: boolean;
}

export class CreateOtpRes {
  isOTPSent: boolean;
}

export class VerifyOTPReq {
  otp: number;
  email: string;
}

class AccessToken {
  access_token: string;
}

export class VerifyOTPRes {
  isOTPVerified: boolean;
  isPasswordSet: boolean;
  userName: string;
  token: AccessToken;
  isLogin: boolean;
  sessionId: string;
}

export class UpdatePasswordReq {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export class SetPasswordReq {
  email: string;
  newPassword: string;
  confirmPassword: string;
  token: string;
}

export class UpdatePasswordRes {
  email: string;
  isSetPassword: boolean;
}

export class SetPasswordRes {
  email: string;
  isSetPassword: boolean;
}

export class ConfirmUserReq {
  email: string;
  password: string;
  name: string;
}

export class EmailProperties {
  name?: string;
  emailFrom?: string;
  emailSubject: string;
  emailTo: string | string[];
  emailHTMLContent: string;
}

export class MailObj {
  email: string;
  templateType: string;
  token?: string;
  otp?: number;
  fullName?: string;
}

export class changePasswordReq {
  email?: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export class changePasswordRes {
  email: string;
  isPasswordChanged: boolean;
  result: any;
}
