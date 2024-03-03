import { ReactNode, createContext, useState } from 'react';

import { UserDTO } from '@dtos/userDTO';

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
  const [user, setUser] = useState({
    id: '1',
    name: 'Leonardo',
    email: 'leo-feitosa@live.com',
    avatar: 'string',
  });

  function singIn(email: string, password: string) {
    setUser({
      id: '',
      name: '',
      email,
      avatar: '',
    });
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
