import { useState, useContext, createContext } from 'react';
import { AuthenticationStorage, ReactProps, SidebarBtn } from '@types';

const StorageContext = createContext(
  {} as {
    authenticationStorage: AuthenticationStorage;
    setAuthenticationStorage: (data: AuthenticationStorage) => void;
    activeLink: SidebarBtn;
    setActiveLink: React.Dispatch<React.SetStateAction<SidebarBtn>>;
    getActiveLink: () => SidebarBtn;
    handleActiveLink: (name: SidebarBtn) => void;
  }
);

export default function Storage({ children }: ReactProps) {
  const [activeLink, setActiveLink] = useState<SidebarBtn>(getActiveLink());
  function getActiveLink() {
    let activeLink;
    if (localStorage.getItem('activeLink'))
      activeLink = localStorage.getItem('activeLink') as SidebarBtn;
    else return 'home';
    const notActive = ['create post', 'logout', 'search'];
    if (notActive.includes(activeLink))
      activeLink = localStorage.getItem('previousLink') as SidebarBtn;
    return activeLink;
  }

  function handleActiveLink(name: SidebarBtn) {
    const notActive = ['create post', 'logout', 'search'];
    if (!notActive.includes(name)) localStorage.setItem('previousLink', name);
    setActiveLink(name);
  }

  const [authenticationStorage, setAuthenticationState] = useState<AuthenticationStorage>({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' ? true : false,
  });

  const setAuthenticationStorage = ({ user, isAuthenticated }: AuthenticationStorage) => {
    const authentication: AuthenticationStorage = {
      user: user,
      isAuthenticated: isAuthenticated,
    };

    setAuthenticationState(authentication);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  };

  return (
    <StorageContext.Provider
      value={{
        authenticationStorage,
        setAuthenticationStorage,
        activeLink,
        setActiveLink,
        getActiveLink,
        handleActiveLink,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorageContext() {
  return useContext(StorageContext);
}
