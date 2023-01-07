import { axiosInstance, User } from '@rang/shared/common-models';
import { LoginDto } from '../validations/user--login.schema';
import { UserDto } from '../validations/user-signup.schema';

export const getAllUsers = async () => {
  const res = await axiosInstance.get(`/users`);
  return res?.data;
};

export const createUser = async (data: UserDto) => {
  const res = await axiosInstance.post('/auth/signup', data);
  return res?.data;
};

export const loginUser = async (data: any) => {
  const res = await axiosInstance.post('/auth/login', data);
  return res?.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.put('auth/logout');
  return res?.data;
};

export const getLoggedInUserData = async () => {
  const res = await axiosInstance.get(`/users/loggedIn-user`);
  return res.data;
};
