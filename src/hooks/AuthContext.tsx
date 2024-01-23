import React, { createContext, useContext } from "react";
import useAuthToken from "./useAuthToken";
import useGlobalInfoContext from "./useGlobalInfoContext";

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

interface ContextGlobalType {
  headerTitle: string;
  setHeaderTitle: (title: string) => void;
}

interface ContextType {
  global: ContextGlobalType;
  auth: AuthContextType;
}

const AuthContext = createContext<ContextType | undefined>(undefined);

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
  const { headerTitle, setHeaderTitle } = useGlobalInfoContext();

  return (
    <AuthContext.Provider
      value={{
        auth: { token, setToken, removeToken },
        global: { headerTitle, setHeaderTitle },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
