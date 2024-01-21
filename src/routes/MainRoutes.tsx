import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserTab from "../components/UserTab";
import ExploreContainer from "../components/ExploreContainer";
import BarCode from "../components/BarCode";
import SearchComponent from "../components/SearchComponent";
import GuardRoutes from "../routes/GuardRoutes";
import LoginPage from "../components/LoginWithGoogleComponent";
import LoginPageModalComponent from "../components/LoginPageModalComponent";
import BarCodeComponent from "../components/BarCodeComponent";

interface RouteConfig<T = any> {
  path: string;
  component: React.FC<T | any>;
  isRequiredAuth?: boolean;
}

const inyectingComponents = {
  UserTab,
  BarCode,
  ExploreContainer,
  SearchComponent,
  LoginPage,
  BarCodeComponent,
};

export const mappingRoutes: {
  [key in keyof typeof inyectingComponents]: RouteConfig<
    keyof typeof inyectingComponents
  >;
} = {
  LoginPage: {
    path: "/login",
    component: LoginPageModalComponent,
  },
  UserTab: {
    path: "/profile",
    component: UserTab, // Supongamos que UserTab es un React.FC sin props específicos
    isRequiredAuth: true,
  },
  BarCode: {
    path: "/findcode",
    component: BarCode, // ExploreContainer es un React.FC<ContainerProps>
    isRequiredAuth: true,
  },
  //TODO: remove this component only for learning purposes
  ExploreContainer: {
    path: "/explorecomponent",
    component: ExploreContainer, // ExploreContainer es un React.FC<ContainerProps>
    isRequiredAuth: true,
  },
  SearchComponent: {
    path: "/search",
    component: SearchComponent,
    isRequiredAuth: true,
  },
  BarCodeComponent: {
    path: "/barcode",
    component: BarCodeComponent,
    isRequiredAuth: true,
  },
};

// <Route path="*" render={() => <Redirect to="/perfil" />} />

const MainRoutes = (
  <>
    <Route
      exact
      path={"/"}
      render={() => <Redirect to={mappingRoutes.BarCode.path} />}
    />
    <Route
      exact
      path="*"
      render={() => <Redirect to={mappingRoutes.BarCode.path} />}
    />
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
