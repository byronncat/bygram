import { createContext, useContext } from 'react';
import { PROTECTED_ROUTE, useCurrentPath } from '@route';
import { useStateWithHistory } from '../hooks';
import { SIDEBAR_OPTION, SidebarOptionStrings } from '../constants';
import type { ReactProps } from '@global';

const SidebarOptionsContext = createContext(
  {} as {
    option: SidebarOptionStrings;
    setOption: (name: SidebarOptionStrings) => void;
    optionBack: () => void;
  },
);

const SidebarOptions = ({ children }: ReactProps) => {
  const path = useCurrentPath();
  const [option, setOption, { back }] =
    useStateWithHistory<SidebarOptionStrings>(() => {
      if (path === PROTECTED_ROUTE.EXPLORE) return SIDEBAR_OPTION.EXPLORE;
      if (path === PROTECTED_ROUTE.PROFILE) return SIDEBAR_OPTION.PROFILE;
      return SIDEBAR_OPTION.HOME;
    });

  return (
    <SidebarOptionsContext.Provider
      value={{
        option,
        setOption,
        optionBack: back,
      }}
    >
      {children}
    </SidebarOptionsContext.Provider>
  );
};

export default SidebarOptions;
export const useSidebarOptionsContext = () => useContext(SidebarOptionsContext);
