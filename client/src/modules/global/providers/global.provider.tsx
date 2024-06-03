import { useState, useContext, createContext } from 'react';
import type { ReactProps } from '../types';

const GlobalContext = createContext(
  {} as {
    refreshPage: () => void;
    loading: {
      start: () => void;
      end: () => void;
      get: boolean;
    };
  },
);

export default function Global({ children }: ReactProps) {
  const [refresh, setRefresh] = useState(false);
  const refreshPage = () => setRefresh(!refresh);

  const [isLoading, setIsLoading] = useState(false);
  const loading = {
    start: () => setIsLoading(true),
    end: () => setIsLoading(false),
    get: isLoading,
  };

  return (
    <GlobalContext.Provider
      value={{
        refreshPage,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
