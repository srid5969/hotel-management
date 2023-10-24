export class stakeHolderDropdownRes {
  city: Array<any>;
  country: Array<any>;
  organizationType: Array<any>;
  priorityLevel: Array<any>;
  stakeholderLinkTypes: Array<any>;
}

export class createUpdateStakeHolderReq {
  stakeHolderId?: number;
  fullName: string;
  organizationTypeId: number;
  companyTypeId: number;
  publicCompanyId: number;
  organizationId: number;
  designation: string;
  email: string;
  mobile: string;
  description?: string;
  cityId: number;
  priorityLevel: string;
  imageUrl?: string;
  imageName?: string;
  imageType?: string;
  importantLinks?: Array<importantLinksReq>;
  mergedIds: Array<number>;
}

export class stakeHolderList {
  stakeHolder: any;
  importantLinks?: Array<any>;
}
export class getStakeHoldersRes {
  stakeHolderList: Array<stakeHolderList>;
}

export class stakeHolderAdditionalReq {
  statusId: number;
}

export class importantLinksReq {
  typeId: number;
  url: string;
}

export class createUpdateStakeHolderRes {
  userObj: any;
  isStakeHolderCreated: boolean;
}

export class filteredStakeholderReq {
  statusIds: Array<number>;
  stakeHolderIds: Array<number>;
  cityIds: Array<number>;
  organizationIds: Array<number>;
  organizationTypeIds: Array<number>;
  priorityLevels: Array<string>;
  createdByIds: Array<number>;
  roleIds: Array<number>;
}

export class stakeHolderActionReq {
  type: string;
  stakeHolderId: number;
  comment: string;
}

export class getStakeholdersForMergingReq {
  stakeholderIds: Array<number>;
}

export class getStakeholdersForMergingRes {
  stakeHolderOne: any;
  stakeHolderTwo: any;
}

export class stakeholderActionEmail {
  requesterName: string;
  comment: string;
  status: string;
  stakeholderInfo: {
    fullName: string;
    email: string;
    organization: string;
    designation: string;
    priorityLevel: string;
    status: string;
  };
  requesterEmail: string;
  templateType: string;
}
