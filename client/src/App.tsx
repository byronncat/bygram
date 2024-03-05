import { Authentication, Global } from '@components';
import Router from './router';

function App() {
  return (
    <Global>
      <Authentication>
        <Router />
      </Authentication>
    </Global>
  );
}

export default App;
