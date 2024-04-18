import { useState, useContext, createContext } from 'react'
import { AuthenticationToken, ReactProps, SidebarOptionStrings } from '../types'

const StorageContext = createContext(
  {} as {
    authenticationToken: AuthenticationToken
    handleChangeAuthentication: (data: AuthenticationToken) => void

    activeLink: SidebarOptionStrings
    setActiveLink: React.Dispatch<React.SetStateAction<SidebarOptionStrings>>
    getActiveLink: () => SidebarOptionStrings
    activeLinkHandler: (name: SidebarOptionStrings) => void
  }
)

export function StorageProvider({ children }: ReactProps) {
  const [authenticationToken, setAuthenticationToken] =
    useState<AuthenticationToken>({
      identity: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') as string)
        : null,
      isAuthenticated:
        localStorage.getItem('isAuthenticated') === 'true' ? true : false,
    })

  function handleChangeAuthentication({
    identity,
    isAuthenticated,
  }: AuthenticationToken) {
    setAuthenticationToken({
      identity,
      isAuthenticated,
    })
    localStorage.setItem('user', JSON.stringify(identity))
    localStorage.setItem('isAuthenticated', isAuthenticated.toString())
  }

  // Sidebar active link
  const [activeLink, setActiveLink] = useState<SidebarOptionStrings>(
    getActiveLink()
  )
  function getActiveLink() {
    let activeLink: SidebarOptionStrings
    if (localStorage.getItem('activeLink'))
      activeLink = localStorage.getItem('activeLink') as SidebarOptionStrings
    else return 'home'
    const notActive = ['create post', 'logout', 'search']
    if (notActive.includes(activeLink))
      activeLink = localStorage.getItem('previousLink') as SidebarOptionStrings
    return activeLink
  }

  const activeLinkHandler = (name: SidebarOptionStrings) => {
    const notActive = ['create post', 'logout', 'search']
    if (!notActive.includes(name)) localStorage.setItem('previousLink', name)
    setActiveLink(name)
  }

  return (
    <StorageContext.Provider
      value={{
        authenticationToken,
        handleChangeAuthentication,

        activeLink,
        setActiveLink,
        getActiveLink,
        activeLinkHandler,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export function useStorageContext() {
  return useContext(StorageContext)
}
