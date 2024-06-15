import { useState, useContext, createContext } from 'react';
import type { ReactProps } from '../types';

const GlobalContext = createContext(
  {} as {
    loading: {
      start: () => void;
      end: () => void;
      isLoading: boolean;
    };
  },
);

const Global = ({ children }: ReactProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const loading = {
    start: () => setIsLoading(true),
    end: () => setIsLoading(false),
    isLoading,
  };

  return (
    <GlobalContext.Provider
      value={{
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Global;
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
