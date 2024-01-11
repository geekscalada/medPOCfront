import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import UserTab from "./components/UserTab";
import { personCircle } from "ionicons/icons";
import MainRoutes from "./routes/MainRoutes";
import { mappingRoutes } from "./routes/MainRoutes";
import TabBar from "./components/TabBar";
import TabBarComponent from "./components/TabBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./hooks/AuthContext";

import "./styles/customIonModal.scss";

setupIonicReact();

//TODO: check if login works well in mobile

// TODO: insert searchBar component

// TODO: header ionic with options, and logout

// TODO: management of errors

// todo: why this sintax? all document

// todo: use render like in the ionic documentation example?

// todo: check all scafolding

// TODO: change views for web

// TODO: height should be fixed to show all the content

// TODO: when api is down, then profile page is re-rendering and doing calls in a bucle

//TODO: when API calls fails, then don't show component?
const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="1097625209618-uikanbbdb42pc3h221vev6qpb6vdtr09.apps.googleusercontent.com">
      <AuthProvider>
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
              {/* TabBar es un componente que además sirve de entrypoint para el resto,
          de pages 
          Podemos traernos la constante en vez de el componentes para evitar compatibilidades
          de hijo-padre
          */}
              {TabBar}
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
