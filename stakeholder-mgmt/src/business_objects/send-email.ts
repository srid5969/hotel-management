export class resendInvitationEmailReq {
  email: string;
  token?: string;
  fullName?: string;
}

export class resendInvitationEmailRes {
  email: string;
  isEmailSent: boolean;
  inviteUrl: string;
}
