import { ReactNode, createContext } from "react";

import { UserDTO  } from "@dtos/userDTO";

export type AuthContextDataProps = {
  user: UserDTO;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'Leonardo',
          email: 'leo-feitosa@live.com',
          avatar: 'string',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}