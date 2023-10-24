export class faqObjRes {
  faqType: string;
  faqs: Array<any>;
}

export class addUpdateFaqReq {
  faqId?: number;
  typeId: number;
  sortNumber: number;
  question: string;
  answer: string;
  lastModifiedBy: number;
  isActive: boolean;
}

export class activeInactiveReq {
  faqId: number;
  isActive: boolean;
}
