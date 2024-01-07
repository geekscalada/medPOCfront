import React, { createContext, useContext } from "react";
import useAuthToken from "./useAuthToken";

//TODO: next steps
// Next step: crear isLogged based on useAuthToken
// next step: revisar como consumir authContext
// next step: revisar como cambiar componentes según login or not
// next step: revisar como proteger rutas según login or not.

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  
  // Aquí accedemos al context
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { token, setToken, removeToken } = useAuthToken();

  return (
    <AuthContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};
