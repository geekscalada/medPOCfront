import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

interface ProtectedRouteProps extends RouteProps {
  component: React.FC<any>;
}

const GuardRoutes: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { token } = useAuth();

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