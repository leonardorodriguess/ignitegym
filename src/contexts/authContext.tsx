import { ReactNode, createContext, useEffect, useState } from 'react';

import { UserDTO } from '@dtos/userDTO';
import { api } from '@services/api';
import { storageUserGet, storgeUserSave } from '@storage/storageUser';

export type AuthContextDataProps = {
  user: UserDTO;
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
    const userLogged = await storageUserGet();

    if(userLogged) setUser(userLogged);
  }

  useEffect(() => {
    loadUserData();
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
