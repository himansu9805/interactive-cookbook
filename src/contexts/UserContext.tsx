import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => { },
});

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
