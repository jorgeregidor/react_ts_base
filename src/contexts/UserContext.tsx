import {useState, createContext, ReactNode} from 'react'
import { UserContextType, User } from '../types'

const Context = createContext<UserContextType | undefined>(undefined)

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [userData, setUserData] = useState<User | null>(null)
  
  return <Context.Provider value={{userData, setUserData}}>
    {children}
  </Context.Provider>
}

export default Context