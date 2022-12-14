import { useContext } from 'react';
import { CustomFormContext } from '../../../form';

export const useQueryContext = () => {
  return useContext(CustomFormContext);
};
