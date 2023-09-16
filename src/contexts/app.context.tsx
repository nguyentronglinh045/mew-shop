import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated?: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isOpenMobileSideNav?: boolean
  setIsOpenMobileSideNav: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => {},
  isOpenMobileSideNav: false,
  setIsOpenMobileSideNav: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated || false)
  const [isOpenMobileSideNav, setIsOpenMobileSideNav] = useState<boolean>(false)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isOpenMobileSideNav,
        setIsOpenMobileSideNav
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
