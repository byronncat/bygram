import { useState, useContext, createContext } from 'react'
import { ToastContainer } from 'react-toastify'

import { StorageProvider } from '../providers'
import { toast } from '../libraries'
import { ReactProps } from '../types'

import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/js/bootstrap.min'
import '../styles/hocs/global.sass'
import '@assets/icons/css/fontello.css'

type GlobalContext = {
  refreshPage: () => void
}
const GLOBAL_CONTEXT = createContext({} as GlobalContext)

export function Global({ children }: ReactProps) {
  // Refresh page
  const [refresh, setRefresh] = useState(false)
  const refreshPage = () => setRefresh(!refresh)

  return (
    <StorageProvider>
      <GLOBAL_CONTEXT.Provider
        value={{
          refreshPage,
        }}
      >
        <ToastContainer {...toast.settings} />
        {children}
      </GLOBAL_CONTEXT.Provider>
    </StorageProvider>
  )
}

export function useGlobalContext() {
  return useContext(GLOBAL_CONTEXT)
}
