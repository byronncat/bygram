import ReactDOM from 'react-dom/client';
import { GlobalStyles } from './common/components/index';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </BrowserRouter>
);