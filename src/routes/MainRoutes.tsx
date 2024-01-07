import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserTab from "../components/UserTab";
import ExploreContainer from "../components/ExploreContainer";
import BarCode from "../components/BarCode";
import SearchComponent from "../components/SearchComponent";
import GuardRoutes from "../routes/GuardRoutes";
import LoginPage from "../pages/LoginPage";

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
};

export const mappingRoutes: {
  [key in keyof typeof inyectingComponents]: RouteConfig<
    keyof typeof inyectingComponents
  >;
} = {
  LoginPage: {
    path: "/login",
    component: LoginPage,
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
    component: SearchComponent, // ExploreContainer es un React.FC<ContainerProps>
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
