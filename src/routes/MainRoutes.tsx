import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserTab from "../components/UserTab";
import ExploreContainer from "../components/ExploreContainer";
import BarCode from "../components/BarCode";
import SearchComponent from "../components/SearchComponent";

// Importa otros componentes que necesites
//TODO: mejorar esto.

interface RouteConfig<T = any> {
  path: string;
  component: React.FC<T | any>;
}

const inyectingComponents = {
  UserTab,
  BarCode,
  ExploreContainer,
  SearchComponent,
};

export const mappingRoutes: {
  [key in keyof typeof inyectingComponents]: RouteConfig<
    keyof typeof inyectingComponents
  >;
} = {
  UserTab: {
    path: "/profile",
    component: UserTab, // Supongamos que UserTab es un React.FC sin props específicos
  },
  BarCode: {
    path: "/findcode",
    component: BarCode, // ExploreContainer es un React.FC<ContainerProps>
  },
  //TODO: remove this component only for learning purposes
  ExploreContainer: {
    path: "/explorecomponent",
    component: ExploreContainer, // ExploreContainer es un React.FC<ContainerProps>
  },
  SearchComponent: {
    path: "/search",
    component: SearchComponent, // ExploreContainer es un React.FC<ContainerProps>
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
    {Object.entries(mappingRoutes).map(([key, route]) => (
      <Route key={key} path={route.path} component={route.component} exact />
    ))}
  </>
);

export default MainRoutes;
