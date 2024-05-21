import { createContext, useContext, useState } from 'react';
import { SIDEBAR_OPTION, SidebarOptionStrings } from '../constants';
import type { ReactProps } from '@global';

const SidebarOptionsContext = createContext(
  {} as {
    currentLink: SidebarOptionStrings;
    setLink: (name: SidebarOptionStrings) => void;
    getLink: () => SidebarOptionStrings;
  },
);

export function SidebarOptionsProvider({ children }: ReactProps) {
  const [link, setLink] = useState<SidebarOptionStrings>(getLink());

  function getLink(): SidebarOptionStrings {
    if (localStorage.getItem('active_link')) {
      let activeLink: SidebarOptionStrings;
      activeLink = localStorage.getItem('active_link') as SidebarOptionStrings;
      if (
        !SIDEBAR_OPTION.CANNOT_ACTIVATED.find((option) => option === activeLink)
      )
        activeLink = localStorage.getItem(
          'previous_link',
        ) as SidebarOptionStrings;
      return activeLink;
    } else return SIDEBAR_OPTION.HOME;
  }

  function setLinkHandler(name: SidebarOptionStrings) {
    localStorage.setItem('active_link', name);
    setHistory(link);
    setLink(name);
  }

  function setHistory(name: SidebarOptionStrings) {
    if (!SIDEBAR_OPTION.CANNOT_ACTIVATED.find((option) => option === name))
      localStorage.setItem('previous_link', name);
  }

  return (
    <SidebarOptionsContext.Provider
      value={{
        currentLink: link,
        setLink: setLinkHandler,
        getLink,
      }}
    >
      {children}
    </SidebarOptionsContext.Provider>
  );
}

export function useSidebarOptionsContext() {
  return useContext(SidebarOptionsContext);
}
