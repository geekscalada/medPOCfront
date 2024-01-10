import React from "react";
import useIonModal, {
  ButtonConfig,
  ButtonContainerStyle,
  FlexStyle,
} from "../hooks/useIonModal";
import LoginPage from "../pages/LoginPage";
import LoginWithGoogleComponent from "../pages/LoginPage";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const SearchComponent: React.FC = () => {
  const { CustomIonModal, openModal } = useIonModal();

  const { loginWithGoogleButton } = LoginWithGoogleComponent();

  // const buttonOpen: ButtonConfig = {
  //   text: "Sign in with Google 🚀",
  //   onClick: () => login(),
  //   strong: true,
  //   disabled: false,
  //   shape: "round",
  //   onBlur: () => console.log("Botón perdió focus"),
  //   onFocus: () => console.log("Botón obtuvo focusssss"),
  // };

  const buttonClose: ButtonConfig = {
    text: "Cerrar",
    onClick: () => console.log("Modal cerrado"),
    strong: true,
    disabled: false,
    onBlur: () => console.log("Botón perdió focus"),
    onFocus: () => console.log("Botón obtuvo focus"),
    color: "secondary",
  };

  const ButtonContainerStyle: FlexStyle = {
    flexDirection: "column",
    justifyContent: "center",
  };

  const handleOpenModal = () => {
    openModal(
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
        quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos,
        dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque,
        dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
        illum quidem recusandae ducimus quos reprehenderit. Veniam, molestias
        quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui.
        Eaque, dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Magni illum quidem recusandae ducimus quos reprehenderit. Veniam,
        molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum
        qui. Eaque, dicta.
      </p>,
      [
        loginWithGoogleButton,
        buttonClose,

        // más botones según sea necesario
      ],
      ButtonContainerStyle,
      "600px"
    );
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

// TODO: rename as a modalLoginComponent
