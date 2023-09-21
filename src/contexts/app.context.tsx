import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated?: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isOpenMobileSideNav?: boolean
  setIsOpenMobileSideNav: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => {},
  isOpenMobileSideNav: false,
  setIsOpenMobileSideNav: () => {},
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated || false)
  const [isOpenMobileSideNav, setIsOpenMobileSideNav] = useState<boolean>(false)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isOpenMobileSideNav,
        setIsOpenMobileSideNav,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
