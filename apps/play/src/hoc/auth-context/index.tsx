import { createContext, FC, useContext, useEffect, useState } from 'react';
import { User } from '@rang/shared/common-models';
import { useQuery } from 'react-query';
import {
  CustomReactQueryContext,
  USER_TOKEN,
} from '@rang/shared/common-react-models';
import { getLoggedInUserData } from '../../apis/user.apis';
interface AuthContextType {
  userData: User | undefined;
  refetchUser: () => void;
}
export const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<User>();
  const { queryClient } = useContext(CustomReactQueryContext);
  const { data: user, refetch: refetchUser } = useQuery<User>(
    `logged-In-user-data`,
    getLoggedInUserData,
    {
      enabled: !!localStorage.getItem(USER_TOKEN),
    }
  );

  const value = {
    userData,
    refetchUser,
  };
  useEffect(() => {
    if (localStorage.getItem(USER_TOKEN)) {
      refetchUser();
    } else {
      queryClient.clear();
      queryClient.refetchQueries([`user-data-${userData?.id}`]);
      setUserData(undefined);
    }
  }, [localStorage.getItem(USER_TOKEN)]);
  useEffect(() => {
    setUserData(user);
  }, [user, refetchUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
