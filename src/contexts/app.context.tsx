import { createContext, useState } from 'react'
import { extendedPurchases } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated?: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isOpenMobileSideNav?: boolean
  setIsOpenMobileSideNav: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: extendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<extendedPurchases[]>>
  reset: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => {},
  isOpenMobileSideNav: false,
  setIsOpenMobileSideNav: () => {},
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated || false)
  const [isOpenMobileSideNav, setIsOpenMobileSideNav] = useState<boolean>(false)
  const [extendedPurchases, setExtendedPurchases] = useState<extendedPurchases[]>(initialAppContext.extendedPurchases)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isOpenMobileSideNav,
        setIsOpenMobileSideNav,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
