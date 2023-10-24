export class createOrganizationReq {
  name: string;
  userId?: number;
  orgTypeId: number;
  companyTypeId?: number;
  publicCompanyId?: number;
}

export class updateOrganizationReq {
  userId?: number;
  orgNameId: number;
  isActive: boolean;
  orgTypeId: number;
  companyTypeId?: number;
  publicCompanyId?: number;
  name: string;
}
