import React from 'react';
import { Route } from 'react-router-dom';
import UserTab from '../components/UserTab';
import ExploreContainer from '../components/ExploreContainer';


// Importa otros componentes que necesites
  //TODO: mejorar esto. 

interface RouteConfig<T = any> {
  path: string;
  component: React.FC<T | any>;
}

export const mappingRoutes: { [key: string]: RouteConfig<any> } = {
  userTab: {
    path: '/perfil',
    component: UserTab,  // Supongamos que UserTab es un React.FC sin props específicos
  },
  exploreContainer: {
    path: '/explorar',
    component: ExploreContainer,  // ExploreContainer es un React.FC<ContainerProps>
  },
};

const MainRoutes = (
  <>
    {Object.entries(mappingRoutes).map(([key, route]) => (
      <Route path={route.path} component={route.component} exact />
    ))}
  </>
);

export default MainRoutes;



