import { ReactNode } from "react";
import './global.sass';
import 'bootstrap/dist/js/bootstrap.min.js'

interface ComponentProps {
  children: ReactNode;
}

export default function GlobalStyles({ children }: ComponentProps) {  
  return (
    <>
      {children}
    </>
  );
}