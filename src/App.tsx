import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
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

import UserTab from "./pages/UserTab";
import { personCircle } from "ionicons/icons";
import MainRoutes from "./routes/MainRoutes";

import TabBar from "./components/TabBar";
import TabBarComponent from "./components/TabBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, useAuth } from "./hooks/AuthContext";

import "./styles/customIonModal.scss";
import IonicHeaderComponent from "./components/MenuComponent";

setupIonicReact();

//TODO: check if login works well in mobile

// TODO: header ionic with options, and logout with https://ionicframework.com/docs/api/menu
// and header should change depending on the page

// TODO: management of errors with custom exceptions (new error), handLeError (with axios)  and then show toatss
// toast with the message. Maybe not custom exceptions, but just a new error with the message because
// it will be better do that in the backend

// TODO: use react-redux with this approx???? to show dark mode?
// https://www.youtube.com/watch?v=fMiFnbufAP4&t=124s&ab_channel=CarlosAzaustre-AprendeJavaScript

// TODO: change views for web design

// TODO: height should be fixed to show all the content

// TODO: when api is down, then profile page is re-rendering and doing calls in a bucle?

//TODO: when API calls fails, then don't show component?
const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="1097625209618-uikanbbdb42pc3h221vev6qpb6vdtr09.apps.googleusercontent.com">
      <AuthProvider>
        <IonApp>
          <IonicHeaderComponent />
          <IonReactRouter>
            <IonPage id="main-content">
              {/* <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                  </IonButtons>
                  <IonTitle>headerTitle</IonTitle>
                </IonToolbar>
              </IonHeader> */}
              <IonContent className="ion-padding">
                <IonTabs>
                  {/* IonRouterOutlet siempre envuelve las rutas
    gestiona la pila de navegación y las transiciones de manera eficiente, 
    permitiendo comportamientos como mantener 
    el estado de las páginas cuand
    o navegas hacia adelante y hacia atrás          
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
              </IonContent>
            </IonPage>
          </IonReactRouter>
        </IonApp>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
