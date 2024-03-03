import { ReactNode, createContext, useState } from 'react';

import { UserDTO } from '@dtos/userDTO';
import { api } from '@services/api';

export type AuthContextDataProps = {
  user: UserDTO;
  singIn(email: string, password: string): void;
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
      }
    } catch (error) {
      throw error;
    }
  }

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
