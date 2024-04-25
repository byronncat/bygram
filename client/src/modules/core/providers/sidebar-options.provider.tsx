import { createContext, useContext, useState } from 'react'
import { ReactProps, SidebarOptionStrings } from '../../global/types'

const SidebarOptionsContext = createContext(
  {} as {
    activeLink: SidebarOptionStrings
    setActiveLink: React.Dispatch<React.SetStateAction<SidebarOptionStrings>>
    getActiveLink: () => SidebarOptionStrings
    activeLinkHandler: (name: SidebarOptionStrings) => void
  }
)

export function SidebarOptionsProvider({ children }: ReactProps) {
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
    <SidebarOptionsContext.Provider
      value={{
        activeLink,
        setActiveLink,
        getActiveLink,
        activeLinkHandler,
      }}
    >
      {children}
    </SidebarOptionsContext.Provider>
  )
}

export function useSidebarOptionsContext() {
  return useContext(SidebarOptionsContext)
}
