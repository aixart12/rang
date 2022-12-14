import { AxiosError } from 'axios';
import httpStatus from 'http-status-codes';
import * as _ from 'lodash';
import { useMemo } from 'react';
import { MutationCache, QueryCache, QueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useToastMessage } from './use-toast-message';

export const useCustomQueryClient = () => {
  const navigate = useNavigate();
  const showToast = useToastMessage();
  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            (!(error as AxiosError).response ||
              (error as AxiosError).response?.status ===
                httpStatus.INTERNAL_SERVER_ERROR) &&
              showToast({
                title: 'Server Error',
                description: 'Please contact the administrator',
                status: 'error',
              });
            if (
              (error as AxiosError).response?.status === httpStatus.UNAUTHORIZED
            ) {
              navigate('/login');
            }
          },
        }),
        defaultOptions: {
          queries: {
            retry: (index, error) => {
              return (
                !_.includes(
                  [httpStatus.UNAUTHORIZED, httpStatus.FORBIDDEN],
                  (error as AxiosError).response?.status
                ) && index < 3
              );
            },
            refetchOnWindowFocus: false,
          },
        },
        mutationCache: new MutationCache({
          onError: (error) => {
            (error as AxiosError).response?.status ===
              httpStatus.INTERNAL_SERVER_ERROR &&
              showToast({
                title: 'Server Error',
                description: 'Please contact the administrator',
                status: 'error',
              });
            return error;
          },
        }),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return { queryClient };
};
