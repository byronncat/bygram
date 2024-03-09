import { Overlay } from '@components';
import { useState } from 'react';

function Menu() {
  const [, setMenu] = useState(false);

  return (
    <Overlay closeFunction={setMenu}>
      <h1>Menu</h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </Overlay>
  );
}

export default Menu;
