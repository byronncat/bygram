import { useState, useContext, createContext } from 'react'
import { ToastContainer } from 'react-toastify'

import { StorageProvider } from '../providers'
import { displayToast, toastSettings } from '../services'
import { ReactProps, SidebarOptionStrings } from '../types'

import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/js/bootstrap.min'
import '../styles/hocs/global.sass'
import '@assets/icons/css/fontello.css'

type GlobalContext = {
  displayToast: Function
  refreshPage: () => void
  activeLink: SidebarOptionStrings
  setActiveLink: React.Dispatch<React.SetStateAction<SidebarOptionStrings>>
  getActiveLink: () => SidebarOptionStrings
  activeLinkHandler: (name: SidebarOptionStrings) => void
}
const GLOBAL_CONTEXT = createContext({} as GlobalContext)

export function Global({ children }: ReactProps) {
  // Refresh page
  const [refresh, setRefresh] = useState(false)
  const refreshPage = () => setRefresh(!refresh)

  // Sidebar active link
  const [activeLink, setActiveLink] = useState<SidebarOptionStrings>(
    getActiveLink()
  )
  function getActiveLink() {
    let activeLink
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
    <StorageProvider>
      <GLOBAL_CONTEXT.Provider
        value={{
          refreshPage,
          displayToast,
          activeLink,
          setActiveLink,
          getActiveLink,
          activeLinkHandler,
        }}
      >
        <ToastContainer {...toastSettings} />
        {children}
      </GLOBAL_CONTEXT.Provider>
    </StorageProvider>
  )
}

export function useGlobalContext() {
  return useContext(GLOBAL_CONTEXT)
}
