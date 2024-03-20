import { Storage, Global } from '@contexts';
import Router from './router';

function App() {
  return (
    <Global>
      <Storage>
        <Router />
      </Storage>
    </Global>
  );
}

export default App;
