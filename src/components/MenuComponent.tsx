import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { settingsOutline, powerOutline, femaleSharp } from "ionicons/icons";
import { mappingRoutes } from "../routes/MainRoutes";

interface MenuItem {
  label: string;
  icon: string;
  button: boolean;
  href?: string; // URL opcional para redireccionar
  hidden?: boolean; // Si el item del menú debe estar oculto
  disabled?: boolean; // Si el item del menú debe estar deshabilitado
}

/**
 * If you want a not clicable item, then you must not set the href property
 */

const menuItems: MenuItem[] = [
  {
    label: "Configuración",
    icon: settingsOutline,
    button: true,
    href: mappingRoutes.configuration.path,
    hidden: false,
  },
  {
    label: "Cerrar sesión",
    icon: powerOutline,
    button: true,
    href: mappingRoutes.logout.path,
    hidden: false,
  },
];

function IonicHeaderComponent() {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {menuItems.map((item, index) => (
              <div key={index} hidden={item.hidden}>
                <IonItem
                  key={index}
                  href={item.href}
                  button={item.button}
                  disabled={item.disabled}
                >
                  <IonIcon aria-hidden="true" slot="start" icon={item.icon} />
                  <IonLabel>{item.label}</IonLabel>
                </IonItem>
              </div>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
}
export default IonicHeaderComponent;
