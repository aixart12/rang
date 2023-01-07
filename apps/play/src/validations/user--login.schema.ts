import { InferType, object } from 'yup';
import { trimmedStringBaseSchema } from './base-schema';

export const loginSchema = object({
  username: trimmedStringBaseSchema().required('Phone number required'),
  password: trimmedStringBaseSchema().required('Password required'),
});

export type LoginDto = InferType<typeof loginSchema>;
