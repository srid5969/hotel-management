export class addDesignationReq {
  designationName: string;
  lastModifiedBy?: number;
}

export class enableDisableDesignationReq {
  designationId: number;
  designationStatus: boolean;
  lastModifiedBy?: number;
}
