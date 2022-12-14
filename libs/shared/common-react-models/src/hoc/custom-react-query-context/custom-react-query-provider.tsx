import { FC, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useCustomQueryClient } from '../../hooks/use-query-client';
import { CustomReactQueryContext } from './custom-react-query-context';
import { QueryLoaderProvider } from './query-loader';

export interface LoaderQueryKeyType {
  none: string[];
  default: string[];
}
export enum LoaderQueryKeyEnum {
  DEFAULT = 'default',
  NONE = 'none',
}
interface CustomReactQueryProviderProps {
  children: React.ReactNode;
}

export const CustomReactQueryProvider: FC<CustomReactQueryProviderProps> = ({
  children,
}) => {
  const { queryClient } = useCustomQueryClient();
  const [loaderQueryKeys, setLoaderQueryKeys] = useState<LoaderQueryKeyType>({
    none: [],
    default: [],
  });
  const value = { queryClient, loaderQueryKeys, setLoaderQueryKeys };
  return (
    <CustomReactQueryContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        <QueryLoaderProvider>{children}</QueryLoaderProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CustomReactQueryContext.Provider>
  );
};
