import { ReactNode, useContext, useState, createContext } from 'react';
// import { ToastContainer, toast, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@sass/global.sass';
import { ToastMessage } from '@components';

const GlobalContext = createContext(
  {} as {
    // toastMessage: string[];
    // setToastMessage: Dispatch<SetStateAction<string>>;
    // showToast: boolean;
    // setShowToast: Dispatch<SetStateAction<boolean>>;

    displayToast: (message: string) => void;
  }
);

function Global({ children }: { children: ReactNode }) {
  const [toastMessages, setToastMessages] = useState([] as { content: string; id: number }[]);

  function displayToast(message: string) {
    // toast(message, {
    //   position: 'top-right',
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: 'light',
    //   transition: Bounce,
    // });
    setToastMessages([...toastMessages, { content: message, id: Math.random() }]);
  }

  function removeToast(id: number) {
    setToastMessages((prev) => prev.filter((_, i) => _.id !== id));
  }

  return (
    <>
      <GlobalContext.Provider value={{ displayToast }}>
        <ToastMessage
          header="Error"
          messages={toastMessages}
          removeToast={removeToast}
          className="position-absolute top-0 end-0 m-5"
        />
        {/* <ToastContainer /> */}
        {children}
      </GlobalContext.Provider>
    </>
  );
}

function useGlobal() {
  return useContext(GlobalContext);
}

export { useGlobal };
export default Global;
