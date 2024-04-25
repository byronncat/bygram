import { useState, useContext, createContext } from 'react'
import { ToastContainer } from 'react-toastify'

import '../styles/hocs/global.sass'
import { AuthenticationProvider } from '@authentication'
import { SidebarOptionsProvider } from '@core'
import { toast } from '../libraries'
import { ReactProps } from '../types'

import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/js/bootstrap.min'
import '@assets/icons/css/fontello.css'

type GlobalContext = {
  refreshPage: () => void
}
const GLOBAL_CONTEXT = createContext({} as GlobalContext)
document.body.id = 'bootstrap-overrides'

export default function Global({ children }: ReactProps) {
  // Refresh page
  const [refresh, setRefresh] = useState(false)
  const refreshPage = () => setRefresh(!refresh)

  return (
    <SidebarOptionsProvider>
      <GLOBAL_CONTEXT.Provider
        value={{
          refreshPage,
        }}
      >
        <AuthenticationProvider>{children}</AuthenticationProvider>
        <ToastContainer {...toast.settings} />
      </GLOBAL_CONTEXT.Provider>
    </SidebarOptionsProvider>
  )
}

export function useGlobalContext() {
  return useContext(GLOBAL_CONTEXT)
}
