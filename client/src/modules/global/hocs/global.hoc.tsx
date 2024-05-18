import { ToastContainer } from 'react-toastify';

import '../styles/hocs/global.sass';
import { AuthenticationProvider } from '@authentication';
import { SidebarOptionsProvider } from '@core';
import { toast } from '../libraries';
import { GlobalProvider, ThemeProvider } from '../providers';
import type { ReactProps } from '../types';

import 'react-toastify/dist/ReactToastify.css';
import '@assets/icons/css/fontello.css';

export default function Global({ children }: ReactProps) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <SidebarOptionsProvider>
          <AuthenticationProvider>{children}</AuthenticationProvider>
          <ToastContainer {...toast.settings} />
        </SidebarOptionsProvider>
      </ThemeProvider>
    </GlobalProvider>
  );
}
