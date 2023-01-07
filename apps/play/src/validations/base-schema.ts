import { string } from 'yup';
import { DESCRIPTION_MAX_LENGTH } from './validation-constants';

export const descriptionBaseSchema = () =>
  string().trim().max(DESCRIPTION_MAX_LENGTH, 'Maximum length exceeded');

export const trimmedStringBaseSchema = () =>
  string().trim().max(DESCRIPTION_MAX_LENGTH, 'Maximum length exceeded');
