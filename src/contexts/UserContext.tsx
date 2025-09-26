import { useState, createContext, ReactNode } from "react";
import { User } from "../types";

export interface UserContextType {
  userData: User | null;
  setUserData: (user: User | null) => void;
}

const Context = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null);

  return (
    <Context.Provider value={{ userData, setUserData }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
