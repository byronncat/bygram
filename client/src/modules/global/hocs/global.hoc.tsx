import { useState, useContext, createContext } from 'react';
import { ToastContainer } from 'react-toastify';

import Storage from '../providers/storage.context';
import { displayToast, toastSettings } from '../services/toast.service';
import { ReactProps, ToastTypeStrings, SidebarBtnStrings } from '../types';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.min';
import '../styles/global.sass';
import '@assets/icons/css/fontello.css';

interface GlobalContext {
  displayToast: (message: string, type: ToastTypeStrings) => void;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  activeLink: SidebarBtnStrings;
  setActiveLink: React.Dispatch<React.SetStateAction<SidebarBtnStrings>>;
  getActiveLink: () => SidebarBtnStrings;
  activeLinkHandler: (name: SidebarBtnStrings) => void;
}
const GlobalContext = createContext({} as GlobalContext);

export default function Global({ children }: ReactProps) {
  // Refresh page
  const [refresh, setRefresh] = useState(false);

  // Sidebar active link
  const [activeLink, setActiveLink] = useState<SidebarBtnStrings>(getActiveLink());
  function getActiveLink() {
    let activeLink;
    if (localStorage.getItem('activeLink'))
      activeLink = localStorage.getItem('activeLink') as SidebarBtnStrings;
    else return 'home';
    const notActive = ['create post', 'logout', 'search'];
    if (notActive.includes(activeLink))
      activeLink = localStorage.getItem('previousLink') as SidebarBtnStrings;
    return activeLink;
  }

  const activeLinkHandler = (name: SidebarBtnStrings) => {
    const notActive = ['create post', 'logout', 'search'];
    if (!notActive.includes(name)) localStorage.setItem('previousLink', name);
    setActiveLink(name);
  };

  return (
    <Storage>
      <GlobalContext.Provider
        value={{
          refresh,
          setRefresh,
          displayToast,
          activeLink,
          setActiveLink,
          getActiveLink,
          activeLinkHandler,
        }}
      >
        <ToastContainer {...toastSettings} />
        {children}
      </GlobalContext.Provider>
    </Storage>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
