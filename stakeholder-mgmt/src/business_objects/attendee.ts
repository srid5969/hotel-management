export class addAttendeeReq {
  fullName: string;
  designation: string;
}

export class getAttendeesList {
  meetingId: number;
}

export class addAttendeeRes {
  userObj: any;
  isAttendeeAdded: boolean;
}

class getAttendees {
  fullName: any;
  designation: any;
  createdBy: any;
  updatedBy: any;
}
export class getAttendeesRes {
  attendeesList: Array<getAttendees>;
}

export class dbResponse {
  responseObj: any;
  isSuccess: boolean;
}
