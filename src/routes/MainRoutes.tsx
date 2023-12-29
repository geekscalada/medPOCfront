import React from 'react';
import { Route } from 'react-router-dom';
import UserTab from '../components/UserTab';
import ExploreContainer from '../components/ExploreContainer';


// Importa otros componentes que necesites

interface RouteConfig {
  path: string;
  component: React.FC<any>;
}

interface PropsModel {
  [key: string]: any;
}


export const mappingRoutes : { [key: string]: RouteConfig } = {
  userTab: {
    path: '/perfil',
    component: UserTab,
  }, 
  exploreContainer:{
    path: '/explorar',
    component: ExploreContainer,
  },  
} 

const MainRoutes = (
  <>
    {Object.entries(mappingRoutes).map(([key, route]) => (
      <Route path={route.path} component={route.component} exact />
    ))}
  </>
);

export default MainRoutes;



