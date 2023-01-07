import { InferType, number, object, string } from 'yup';
import { trimmedStringBaseSchema } from './base-schema';
// the yup schema for the add user form
export const addUserSchema = object({
  firstName: string().required('FirstName is required'),
  lastName: string().required('LastName is required'),
  phoneNumber: string().required('Phone Number is required'),
  password: string().required('Password required'),
});

export type UserDto = InferType<typeof addUserSchema>;
