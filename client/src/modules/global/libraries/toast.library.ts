import { toast, ToastContainerProps } from 'react-toastify';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  LOADING = 'loading',
}
export type ToastTypeStrings = `${ToastType}`;

export const settings = {
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

export function display(message: string, type: ToastTypeStrings) {
  toast.dismiss();
  toast[type](message);
}
