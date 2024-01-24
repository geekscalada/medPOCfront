import React from "react";

import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const ConfigurationPage: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Configuration page</IonTitle>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default ConfigurationPage;
