import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

interface ProtectedRouteProps extends RouteProps {
  component: React.FC<any>;
}

/**
 * Renombrar a Component es importante porque por convención los componentes en React se escriben con mayúscula
 * Y las etiquetas HTML con minúscula
 * Así garantizamos que Component es un componente de React y no una etiqueta HTML
 *
 * Rest: hace referencia al resto de propiedades de RouteProps
 */
const GuardRoutes: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { auth } = useAuth();
  const { token } = auth;

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default GuardRoutes;
