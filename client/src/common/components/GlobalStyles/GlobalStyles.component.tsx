import { ReactNode } from "react";
import './global.sass';

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