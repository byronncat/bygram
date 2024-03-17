import { ReactNode, useContext, createContext, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@sass/global.sass';

const GlobalContext = createContext(
  {} as {
    displayToast: (message: string, type: ToastType) => void;
  }
);

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';
function Global({ children }: { children: ReactNode }) {
  const displayToast = useCallback((message: string, type: ToastType) => {
    toast[type](message);
  }, []);

  return (
    <GlobalContext.Provider value={{ displayToast }}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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

function useGlobal() {
  return useContext(GlobalContext);
}

export { useGlobal };
export default Global;
