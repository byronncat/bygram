import { useState, useContext, createContext } from 'react';
import { ReactProps } from '../types';

const GlobalContext = createContext(
  {} as {
    refreshPage: () => void;
  },
);

export default function Global({ children }: ReactProps) {
  // Refresh page
  const [refresh, setRefresh] = useState(false);
  const refreshPage = () => setRefresh(!refresh);

  return (
    <GlobalContext.Provider
      value={{
        refreshPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
