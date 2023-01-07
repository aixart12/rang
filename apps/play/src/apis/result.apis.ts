import { axiosInstance } from '@rang/shared/common-models';

export const getAllResults = async () => {
  const res = await axiosInstance.get('/results');
  return res?.data;
};

export const getResultById = async (resultId: number) => {
  const res = await axiosInstance.get(`/results/${resultId}`);
  return res?.data;
};
