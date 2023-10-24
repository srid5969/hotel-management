export class PubCompByCompIdReq {
  compId: number;
  orgId?: number;
}

export class PubCompByCompIdRes {
  publicCompList: any;
  organizationNameList?: any;
}
