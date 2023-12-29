import { IonIcon, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { mappingRoutes } from "../routes/MainRoutes";
import { personCircle } from "ionicons/icons";

const TabBar = (
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
);

export default TabBar;

