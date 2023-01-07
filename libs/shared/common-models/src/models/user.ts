export interface User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  isSuperAdmin: boolean;
  resetToken: string;
  refreshToken: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string;
}
