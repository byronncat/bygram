import { ReactNode } from 'react';
import 'bootstrap/dist/js/bootstrap.min';
import '@sass/global.sass';

export default function GlobalStyles({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
