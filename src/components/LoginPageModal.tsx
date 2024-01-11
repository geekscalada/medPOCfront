import React, { useEffect } from "react";
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

const LoginPageModalComponent: React.FC = () => {
  const { CustomIonModal, openModal } = useIonModal();
  const { loginWithGoogleButton } = LoginWithGoogleComponent();

  const modalComposer: ModalComposer = {
    titleModal: "Login",
    headerModal: (
      <IonText color="primary">
        <h3>You need to login with google.</h3>
      </IonText>
    ),
    content: null,
    buttons: [loginWithGoogleButton],
    containerButtonStyle: {
      flexDirection: "column",
      justifyContent: "center",
    },
    modalSize: {
      width: "400px",
      height: "200px",
    },
    canDismissModal: false,
    closeButtonHeader: false,
  };

  const handleOpenModal = () => {
    openModal(modalComposer);
  };

  useEffect(() => {
    handleOpenModal();
  }, []);

  return <CustomIonModal />;
};

export default LoginPageModalComponent;

// TODO: rename as a modalLoginComponent
