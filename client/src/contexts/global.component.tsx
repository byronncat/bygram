import { useState, useContext, createContext, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ReactProps, ToastTypeStrings } from '@types';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@styles/global.sass';

const GlobalContext = createContext(
  {} as {
    displayToast: (message: string, type: ToastTypeStrings) => void;
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

function Global({ children }: ReactProps) {
  const [refresh, setRefresh] = useState(false);
  const displayToast = useCallback((message: string, type: ToastTypeStrings) => {
    toast[type](message);
  }, []);

  return (
    <GlobalContext.Provider value={{ refresh, setRefresh, displayToast }}>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        limit={4}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobalContext() {
  return useContext(GlobalContext);
}

export { useGlobalContext };
export default Global;
