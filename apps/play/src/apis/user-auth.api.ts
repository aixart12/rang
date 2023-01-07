import { axiosInstance } from '@rang/shared/common-models';

export const loginUser = async (loginDetails: any) => {
  const res = await axiosInstance.get('/auth/', loginDetails);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.put('/auth/logout');
  return res.data;
};

export const verifyToken = async () => {
  const res = await axiosInstance.get('/auth/verify-token');
  return res.data;
};
