import { InferType, number, object } from 'yup';
import { trimmedStringBaseSchema } from './base-schema';

export const selectPostSchema = object({
  ResultId: number().required(),
  userInput: trimmedStringBaseSchema().required(),
  userInputValue: trimmedStringBaseSchema().required(),
});

export type SelectedPostDto = InferType<typeof selectPostSchema>;

export interface UserResultDto {
  UserId: number | undefined;
  ResultId: number;
  userInput: string;
  userInputValue: string;
}
