export class createEntityReq {
  name: string;
  domain: string;
  userId?: number;
}

export class disableEntityReq {
  userId?: number;
  entityIds: Array<number>;
}

export class updateEntityReq {
  userId?: number;
  entityId: number;
  isActive: boolean;
  name: string;
  domain: string;
}
