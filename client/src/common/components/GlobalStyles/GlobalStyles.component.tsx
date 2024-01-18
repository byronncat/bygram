import React, { ReactNode } from "react";
import './global.sass';

interface ComponentProps {
  children: ReactNode;
}

const GlobalStyles: React.FC<ComponentProps> = ({ children }) => {
  return <div className="h-100 w-100">{children}</div>;
};

export default GlobalStyles