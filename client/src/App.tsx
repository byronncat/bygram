import { Authentication, GlobalStyles } from '@components';
import Router from './router';

function App() {
  return (
    <GlobalStyles>
      <Authentication>
        <Router />
      </Authentication>
    </GlobalStyles>
  );
}

export default App;
