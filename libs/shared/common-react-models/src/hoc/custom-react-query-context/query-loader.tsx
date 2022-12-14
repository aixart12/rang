import * as _ from 'lodash';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { QueryKey, useIsFetching, useIsMutating } from 'react-query';
import Loader from '../../components/loader';
import { CustomReactQueryContext } from './custom-react-query-context';

interface QueryLoaderContextType {
  isQueryLoading: boolean;
  isFetching: boolean;
  isMutating: boolean;
}

interface QueryLoaderProviderProps {
  children: React.ReactNode;
}
export const QueryLoaderContext = createContext<QueryLoaderContextType>(null!);
export const QueryLoaderProvider: FC<QueryLoaderProviderProps> = ({
  children,
}) => {
  const { loaderQueryKeys } = useContext(CustomReactQueryContext);

  const queryFilterPredicate = (queryKey: QueryKey) => {
    return !loaderQueryKeys.none.includes(queryKey.toString());
  };
  const isFetching = useIsFetching({
    predicate: (query) => queryFilterPredicate(query.queryKey),
  });
  const isMutating = useIsMutating();
  const [isQueryLoading, setIsQueryLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsQueryLoading(!!isFetching || !!isMutating);
  }, [isFetching, isMutating]);
  const value = {
    isQueryLoading,
    isFetching: !!isFetching,
    isMutating: !!isMutating,
  };
  return (
    <QueryLoaderContext.Provider value={value}>
      {children}
      {isQueryLoading && <Loader />}
    </QueryLoaderContext.Provider>
  );
};
