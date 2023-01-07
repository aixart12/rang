import { axiosInstance } from '@rang/shared/common-models';
import { UserResultDto } from '../validations/select-post.schema';

export const getAllByUserIdAndResultId = async (
  userId: number,
  resultId: number
) => {
  const res = await axiosInstance.get(
    `user-result/user/${userId}/result/${resultId}`
  );
  return res.data;
};

export const postUserResult = async (data: UserResultDto) => {
  console.log(
    '🚀 ~ file: usre-result.apis.ts:15 ~ postUserResult ~ data',
    data
  );
  const res = await axiosInstance.post('user-result', data);
  return res.data;
};
