import '../styles/global.sass';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '../libraries';
import { GlobalProvider, ThemeProvider } from '../providers';
import type { ReactProps } from '../types';

const Global = ({ children }: ReactProps) => {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <Toast />
        {children}
      </ThemeProvider>
    </GlobalProvider>
  );
};

export default Global;
