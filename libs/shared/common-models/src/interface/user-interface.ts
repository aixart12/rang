import { User } from '../models';

export interface UserWithAdminFlagCheck extends User {
  isRequestedFromAdmin: boolean;
}
