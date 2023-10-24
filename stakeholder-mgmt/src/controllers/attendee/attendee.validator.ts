//Write code here
import Joi from 'joi';

const addAttendee = Joi.object({
  attendeesList: Joi.array()
    .items({
      fullName: Joi.string().label('fullName').required(),
      designation: Joi.string().label('designation').required(),
    })
    .required(),
});

const getAttendeesList = Joi.object({
  meetingId: Joi.string().optional(),
});

export const attendeeValidator = {
  addAttendee,
  getAttendeesList,
};
