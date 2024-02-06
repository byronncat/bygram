import { useState, useContext, createContext, ReactNode } from "react";
import { AuthState } from "@/types";

interface ComponentProps {
  children: ReactNode;
}

const AuthenticationContext = createContext(
  {} as { authentication: AuthState; setAuthentication: (value: AuthState) => void }
);

export default function Authentication({ children }: ComponentProps) {
  const [authentication, setAuthentication] = useState<AuthState>({
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true" ? true : false,
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
  });
  console.log(authentication);

  return (
    <AuthenticationContext.Provider value={{ authentication, setAuthentication }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthenticationContext);
}
