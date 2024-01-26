import React, { Profiler } from "react";
import { Redirect, Route } from "react-router-dom";
import UserTab from "../pages/UserTab";
import ExploreContainer from "../pages/SearchPage";

import GuardRoutes from "../routes/GuardRoutes";
import LoginPage from "../components/LoginWithGoogleComponent";
import LoginPageModalComponent from "../components/LoginPageModalComponent";
import BarCodeComponent from "../pages/BarCodeComponent";
import ConfigurationPage from "../pages/ConfigurationPage";
import LogoutComponent from "../components/LogoutComponent";
import GoogleCapacitorLogin from "../components/GoogleCapacitorLogin";

interface RouteConfig<T = any> {
  path: string;
  component: React.FC<T | any>;
  isRequiredAuth?: boolean;
}

const paths = {
  profile: "/profile",
  configuration: "/configuration",
  explorecomponent: "/explorecomponent",
  login: "/login",
  barcode: "/barcode",
  logout: "/logout",
  loginCapacitor: "/loginCapacitor",
} as const; // Esto es un truco para que TS infiera el tipo de paths como un objeto con los valores de las rutas
// cada valor es un literal y no un string

export const mappingRoutes: {
  [key in keyof typeof paths]: RouteConfig<keyof typeof paths>;
} = {
  profile: {
    path: paths.profile,
    component: UserTab, // Supongamos que UserTab es un React.FC sin props específicos
    isRequiredAuth: true,
  },
  configuration: {
    path: paths.configuration,
    component: ConfigurationPage, // ExploreContainer es un React.FC<ContainerProps>
    isRequiredAuth: true,
  },
  explorecomponent: {
    path: paths.explorecomponent,
    component: ExploreContainer, // ExploreContainer es un React.FC<ContainerProps>
    isRequiredAuth: true,
  },

  login: {
    path: paths.login,
    component: LoginPageModalComponent,
  },
  barcode: {
    path: paths.barcode,
    component: BarCodeComponent,
    isRequiredAuth: true,
  },
  logout: {
    path: paths.logout,
    component: LogoutComponent,
  },
  loginCapacitor: {
    path: paths.loginCapacitor,
    component: GoogleCapacitorLogin,
  },
};

const MainRoutes = (
  <>
    <Route
      exact
      path={"/"}
      render={() => <Redirect to={mappingRoutes.barcode.path} />}
    />
    {/* <Route
      exact
      path="*"
      render={() => <Redirect to={mappingRoutes.BarCode.path} />}
    /> */}
    {/* Key evita el warning de React sobre el uso del mismo valor como key en los hijos */}
    {/* Aquí usamos ProtectedRoute para las rutas que deben estar protegidas */}
    {Object.entries(mappingRoutes).map(([key, route]) => {
      /**
       * RouteComponents será del tipo Route que es el componente de react-router-dom normal
       * o bien del tipo GuardRoutes que es el componente que hemos creado para las rutas protegidas
       * que lo que hace es devolver la ruta normal si el usuario está autenticado o bien
       * redirigir a una ruta alternativa si no lo está
       */
      const RouteComponent = route.isRequiredAuth ? GuardRoutes : Route;
      return (
        <RouteComponent
          key={key}
          path={route.path}
          component={route.component}
          exact
        />
      );
    })}
  </>
);

export default MainRoutes;
