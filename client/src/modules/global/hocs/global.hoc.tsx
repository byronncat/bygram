import '../styles/global.sass';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticationProvider } from '@authentication';
import { Toast } from '../libraries';
import { GlobalProvider, ThemeProvider } from '../providers';
import type { ReactProps } from '../types';

const Global = ({ children }: ReactProps) => {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <Toast />
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </ThemeProvider>
    </GlobalProvider>
  );
};

export default Global;
