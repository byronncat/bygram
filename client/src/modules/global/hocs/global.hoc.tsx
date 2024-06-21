import '../styles/global.sass';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticationProvider } from '@authentication';
import { ThemeSelection } from '../components';
import { Toast } from '../libraries';
import { GlobalProvider, ThemeProvider } from '../providers';
import type { ReactProps } from '../types';

const Global = ({ children }: ReactProps) => {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <Toast />
        <ThemeSelection />
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </ThemeProvider>
    </GlobalProvider>
  );
};

export default Global;
