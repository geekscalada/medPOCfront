import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


import UserTab from './components/UserTab';
import { personCircle } from 'ionicons/icons';
import  MainRoutes from './routes/MainRoutes';
import { mappingRoutes } from './routes/MainRoutes';

setupIonicReact();


//todo: why this sintax? all document

// todo: use render like in the ionic documentation example?

// todo: other mangement of the routes?

// todo: check all scafolding
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          {/* IonRouterOutlet siempre envuelve las rutas
          gestiona la pila de navegación y las transiciones de manera eficiente, 
          permitiendo comportamientos como mantener 
          el estado de las páginas cuando navegas hacia adelante y hacia atrás          
          */}
          <IonRouterOutlet>
            {MainRoutes}
            {/* Aquí puedes añadir más rutas secundarias */}
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="perfil" href={mappingRoutes.userTab.path}>
            <IonIcon icon={personCircle} size="large"  />
              {/* <IonLabel>Perfil</IonLabel> */}
            </IonTabButton>
            <IonTabButton tab="explore" href={mappingRoutes.exploreContainer.path}>
            <IonIcon icon={personCircle} size="large"  />
              {/* <IonLabel>Perfil</IonLabel> */}
            </IonTabButton>            
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>      
    </IonApp>
  );
};

export default App;
