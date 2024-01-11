import React from "react";
import useIonModal, {
  ButtonConfig,
  FlexStyle,
  ModalComposer,
  ModalSize,
} from "../hooks/useIonModal";
import LoginWithGoogleComponent from "../pages/LoginPage";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";

const SearchComponent: React.FC = () => {
  const { CustomIonModal, openModal } = useIonModal();
  const { loginWithGoogleButton } = LoginWithGoogleComponent();

  const buttonClose: ButtonConfig = {
    text: "Cerrar",
    onClick: () => console.log("Modal cerrado"),
    strong: true,
    disabled: false,
    onBlur: () => console.log("Botón perdió focus"),
    onFocus: () => console.log("Botón obtuvo focus"),
    color: "secondary",
  };

  const buttonClose3: ButtonConfig = {
    text: "Cerrar",
    onClick: () => console.log("Modal cerrado"),
    strong: true,
    disabled: false,
    onBlur: () => console.log("Botón perdió focus"),
    onFocus: () => console.log("Botón obtuvo focus"),
    color: "secondary",
  };

  const modalComposer: ModalComposer = {
    titleModal: "TitleModal",
    headerModal: (
      <IonText color="primary">
        <h1>H1: Prueba</h1>
      </IonText>
    ),
    content: "TextModal",
    buttons: [loginWithGoogleButton, buttonClose, buttonClose3],
    containerButtonStyle: {
      flexDirection: "column",
      justifyContent: "center",
    },
    modalSize: {
      width: "500px",
      height: "700px",
    },
  };

  const handleOpenModal = () => {
    openModal(modalComposer);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inline Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={handleOpenModal}>
          Open
        </IonButton>
        <CustomIonModal />
      </IonContent>
    </IonPage>
  );
};

export default SearchComponent;

// TODO: remove this component because it is a proof of concept
