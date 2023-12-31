import { IonIcon, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { mappingRoutes } from "../routes/MainRoutes";
import { personCircleSharp } from "ionicons/icons";
import { barcodeSharp } from "ionicons/icons";
import { searchSharp } from "ionicons/icons"; 


const TabBar = (
        <IonTabBar slot="bottom">
          {/* tab es usado para referenciarlo en otras partes del código
          también por react para el manejo del estado y otras cosas */}
            <IonTabButton tab="perfil" href={mappingRoutes.UserTab.path}>
            <IonIcon icon={personCircleSharp} size="large"  />
              {/* <IonLabel>Perfil</IonLabel> */}
            </IonTabButton>
            <IonTabButton tab="barcode" href={mappingRoutes.BarCode.path}>
            <IonIcon icon={barcodeSharp} size="large"  />
              {/* <IonLabel>Perfil</IonLabel> */}
            </IonTabButton>
            <IonTabButton tab="search" href={mappingRoutes.ExploreContainer.path}>
            <IonIcon icon={searchSharp} size="large"  />
              {/* <IonLabel>Perfil</IonLabel> */}
            </IonTabButton>                     
          </IonTabBar>
);

export default TabBar;

