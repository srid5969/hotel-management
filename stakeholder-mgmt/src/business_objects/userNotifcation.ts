export class getNotificationReq {
  userId: number;
  notificationId?: number;
}

export class stakeHolderInfo {
  fullName: string;
  entity?: string;
  designation?: string;
  priorityLevel?: string;
  email: string;
}

export class sendEscalationEmails {
  userInfo: Array<stakeHolderInfo>;
  taskName?: string;
  templateType?: string;
  emails?: Array<any> | string;
}

export class markAsReadReq {
  notificationIds: Array<number>;
  userId: number;
}
