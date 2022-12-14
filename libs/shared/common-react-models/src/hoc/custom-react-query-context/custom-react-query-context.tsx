import { createContext } from 'react';
import { QueryClient } from 'react-query';
import { LoaderQueryKeyType } from './custom-react-query-provider';

export interface CustomReactQueryContextProps {
  queryClient: QueryClient;
  loaderQueryKeys: LoaderQueryKeyType;
  setLoaderQueryKeys: React.Dispatch<React.SetStateAction<LoaderQueryKeyType>>;
}

export const CustomReactQueryContext =
  createContext<CustomReactQueryContextProps>(null!);
