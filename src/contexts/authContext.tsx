import { ReactNode, createContext, useEffect, useState } from 'react';

import { UserDTO } from '@dtos/userDTO';
import { api } from '@services/api';
import { storageUserGet, storgeUserSave } from '@storage/storageUser';

export type AuthContextDataProps = {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  singIn(email: string, password: string): Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorage] = useState(true);

  async function singIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user) {
        setUser(data.user);
        storgeUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData () {
    try {
      const userLogged = await storageUserGet();
  
      if(userLogged) setUser(userLogged);

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorage(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        singIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
