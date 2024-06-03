import { ToastContainer } from 'react-toastify';

import '../styles/hocs/global.sass';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticationProvider } from '@authentication';
import { toast } from '../libraries';
import { GlobalProvider, ThemeProvider } from '../providers';
import type { ReactProps } from '../types';

export default function Global({ children }: ReactProps) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <AuthenticationProvider>{children}</AuthenticationProvider>
        <ToastContainer {...toast.settings} />
      </ThemeProvider>
    </GlobalProvider>
  );
}
