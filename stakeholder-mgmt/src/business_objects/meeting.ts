export class getOrgTypeDdlDataReq {
  organizationTypeList: any;
}

export class getOrgDdlDataReq {
  orgId: Array<number>;
}

export class getStakeholderForMeetingsCreationReq {
  organizationIds: Array<number>;
  organizationTypeIds: Array<number>;
  statusId?: number;
  priorityLevel?: Array<string>;
  userId: number;
}

class fileUploadReq {
  fileName: string;
  fileType: string;
  fileUrl: string;
}

class meetingRiskReq {
  type: string;
  text: string;
}

class meetingSupportReq {
  type: string;
  text: string;
}

export class createMeetingReq {
  organizationTypeIds: Array<number>;
  organizationIds: Array<number>;
  meetingId?: number;
  meetingDate: Date;
  meetingStartTime: string;
  meetingEndTime: string;
  stakeHolderIds: Array<number>;
  attendeesIds: Array<number>;
  meetingAgenda?: string;
  oppurtunities?: string;
  riskNotes?: Array<meetingRiskReq>;
  supportNotes?: Array<meetingSupportReq>;
  observations?: string;
  fileUpload?: Array<fileUploadReq>;
  userId?: number;
  isDraft: boolean;
}

class getMeetings {
  meetingInfo: any;
  stakeHoldersInvolved: Array<any>;
  riskInvolved: Array<any>;
  supportRequired: Array<any>;
  ministriesInvolved: Array<any>;
  companiesInvolved: Array<any>;
  meetingFiles?: Array<any>;
}
export class getMeetingsRes {
  meetingsList: Array<getMeetings>;
}

export class editMeetingRes {
  meetingInfo: any;
  stakeHoldersInvolved: Array<any>;
  attendeesInvolved: Array<any>;
  riskInvolved: Array<any>;
  supportRequired: Array<any>;
  organizationsInvolved: Array<any>;
  organizationTypesInvolved: Array<any>;
  meetingFiles: Array<any>;
}

export class filterMeetingReq {
  userId?: number | null;
  meetingFrom: Date;
  meetingTo: Date;
  meetingStartTime?: string;
  meetingEndTime?: string;
  organizationTypeIds?: Array<number>;
  organizationIds?: Array<number>;
  priorityLevels?: Array<string>;
  publicCompTypeIds?: Array<number>;
  companyTypeIds?: Array<number>;
  createdByIds: Array<number>;
  entityIds: Array<number>;
}

export class sendMeetingEmails {
  userInfo: {
    fullName: string;
    entity: string;
    designation: string;
    priorityLevel: string;
  };
  meetingInfo: {
    meetingId: string;
    meetingDate: string;
    meetingStartTime: string;
    meetingEndTime: string;
    meetingAgenda?: string;
  };
  taskName?: string;
  templateType?: string;
  emails: Array<any>;
  stakeHolders: Array<any>;
  attendees: Array<any>;
}
