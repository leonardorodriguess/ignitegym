import { ReactNode, createContext, useEffect, useState } from 'react';

import { storageAuthTokenSabe } from '@storage/storageAuthToken';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

import { api } from '@services/api';
import { UserDTO } from '@dtos/userDTO';

export type AuthContextDataProps = {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  singOut(): Promise<void>;
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

  async function storageUserAndToken(userData: UserDTO, token: string) {
    try{
      setIsLoadingUserStorage(true);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      await setUser(userData);
      await storageUserSave(userData);
      await storageAuthTokenSabe(token);

    }catch(error) {
      throw error;
    }finally {
      setIsLoadingUserStorage(false);
    }
  }
  
  async function singIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token) {
        storageUserAndToken(data.user, data.token);
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


  async function singOut(){
    try {
      setIsLoadingUserStorage(true);
      setUser({} as UserDTO);
      await storageUserRemove();

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
        singOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
