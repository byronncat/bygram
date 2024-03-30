import { ToastContainerProps, toast } from 'react-toastify';
import { ToastTypeStrings } from '../types';

export const toastSettings = {
  position: 'top-right',
  autoClose: 3000,
  limit: 4,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'colored',
} as ToastContainerProps;

export function displayToast(message: string, type: ToastTypeStrings) {
  toast.dismiss();
  toast[type](message);
}
