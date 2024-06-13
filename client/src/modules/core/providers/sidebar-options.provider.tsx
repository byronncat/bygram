import { createContext, useContext, useState } from 'react';
import { SIDEBAR_OPTION, SidebarOptionStrings } from '../constants';
import type { ReactProps } from '@global';
import { PROTECTED_ROUTE, useCurrentPath } from '@route';

const SidebarOptionsContext = createContext(
  {} as {
    currentLink: SidebarOptionStrings;
    setLink: (name: SidebarOptionStrings) => void;
    getLink: () => SidebarOptionStrings;
    setBackToPreviousLink: () => void;
  },
);

export function SidebarOptionsProvider({ children }: ReactProps) {
  const path = useCurrentPath();
  const [link, setLink] = useState<SidebarOptionStrings>(getLink());
  const [previousLink, setPreviousLink] = useState<SidebarOptionStrings>(
    SIDEBAR_OPTION.HOME,
  );

  function getLink(): SidebarOptionStrings {
    if (path === PROTECTED_ROUTE.EXPLORE) return SIDEBAR_OPTION.EXPLORE;
    if (path === PROTECTED_ROUTE.PROFILE) return SIDEBAR_OPTION.PROFILE;
    return SIDEBAR_OPTION.HOME;
  }

  function setLinkHandler(name: SidebarOptionStrings) {
    previousLinkHandler(link);
    setLink(name);
  }

  function previousLinkHandler(name: SidebarOptionStrings) {
    if (!SIDEBAR_OPTION.CANNOT_ACTIVATED.find((option) => option === name))
      setPreviousLink(name);
  }

  function setBackToPreviousLink() {
    setLink(previousLink);
  }

  return (
    <SidebarOptionsContext.Provider
      value={{
        currentLink: link,
        setLink: setLinkHandler,
        getLink,
        setBackToPreviousLink,
      }}
    >
      {children}
    </SidebarOptionsContext.Provider>
  );
}

export function useSidebarOptionsContext() {
  return useContext(SidebarOptionsContext);
}
