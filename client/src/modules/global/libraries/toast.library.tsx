import { toast, ToastContainerProps, ToastContainer } from 'react-toastify';
import clsx from 'clsx';

const settings = {
  position: 'top-right',
  autoClose: 3000,
  limit: 4,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  draggable: true,
  pauseOnHover: true,
  closeButton: false,
  theme: 'colored',
} as ToastContainerProps;

const contextClass = {
  success:
    'bg-success text-on-success dark:bg-dark-success dark:text-on-dark-success',
  error: 'bg-error text-on-error dark:bg-dark-error dark:text-on-dark-error',
  info: '',
  warning: '',
  dark: '',
  default:
    'bg-on-background/[0.56] text-background dark:bg-dark-on-background/[0.09] dark:text-on-dark-background',
};

const Toast = () => {
  return (
    <ToastContainer
      className="font-medium text-lg"
      {...settings}
      toastClassName={(context) =>
        clsx(
          contextClass[context?.type || 'default'],
          'relative',
          'p-2 mb-4 rounded-md',
          'flex justify-between',
          'overflow-hidden cursor-pointer',
        )
      }
    />
  );
};

const loading = (message: string) => {
  toast.loading(message);
};
const success = (message: string) => {
  toast.dismiss();
  toast.success(message);
};
const error = (message: string) => {
  toast.dismiss();
  toast.error(message);
};

export default Toast;
export { loading, success, error };
