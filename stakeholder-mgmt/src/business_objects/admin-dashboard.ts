class riskNotes {
  highRisk: Array<any>;
  highCount: number;
  mediumRisk: Array<any>;
  mediumCount: number;
  lowRisk: Array<any>;
  lowCount: number;
}

class supportRequired {
  highSupport: Array<any>;
  highCount: number;
  mediumSupport: Array<any>;
  mediumCount: number;
  lowSupport: Array<any>;
  lowCount: number;
}
// class stakeHolders {
//   stakeHolderInfo: any;
//   riskInvolved: any;
//   supportRequired: any;
// }

export class getDashboardDataRes {
  stakeHoldersCreated?: number;
  pendingApprovals?: number;
  stakeHoldersApproved?: number;
  stakeHolderRejected?: number;
  meetingsCreated?: number;
  userMeetings?: Array<any>;
  riskNotes?: riskNotes;
  supportRequired?: supportRequired;
  stakeHolders?: Array<any>;
}

export class filterDashboardReq {
  userId?: number;
  meetingFrom: Date;
  meetingTo: Date;
  organizationTypeIds?: Array<number>;
  organizationIds?: Array<number>;
  cityIds?: Array<number>;
  entityIds?: Array<number>;
  createdByIds?: Array<number>;
  riskType?: Array<string>;
}

export class filterByDateObj {
  meetingFrom: Date;
  meetingTo: Date;
}
