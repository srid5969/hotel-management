export class faqObjRes {
  faqType: string;
  faqs: Array<any>;
}

export class addUpdateFaqReqTypes {
  faqTypeId?: number;
  faqTypeName: string;
  sortNumber: number;
  lastModifiedBy: number;
  isActive: boolean;
}

export class activeInactiveReq {
  faqId: number;
  isActive: boolean;
}
