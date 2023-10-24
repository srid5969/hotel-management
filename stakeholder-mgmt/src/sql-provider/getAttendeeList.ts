export const attendeesProvider = {
  filterAttendesByMeetingId(meetingId: number): string {
    const query = `
            SELECT
            "attendee"."id" AS "attendeeId",
            "attendee"."fullName",
            "attendee"."designation",
            "attendee"."createdBy",
            "attendee"."updatedBy",
            (Select  CASE WHEN "id" IS NOT NULL THEN 1 ELSE 0 end from "attendeeMeetings" WHERE "attendeeId"=attendee."id" AND "meetingId"='${meetingId}' limit 1 ) isSelected
            FROM "attendee"`;
    return query;
  },
};
