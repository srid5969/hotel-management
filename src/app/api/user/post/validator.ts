import {  z} from "zod";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,30}$/;

export const userRegistration=z.object(
    {
        email:z.string().email('Invalid email format'),
        password:z.string().refine((val) => passwordRegex.test(val), {
            message:
              'Password must be between 8 and 30 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
          }),
          phoneNumber:z.string().default('0000-000-0000')
    }
)