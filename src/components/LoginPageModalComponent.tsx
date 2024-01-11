import React, { useState } from "react";

import {
  CustomModalComponent,
  ModalComposer,
} from "../services/customModalComposer";

import LoginWithGoogleComponent from "./LoginWithGoogleComponent";
import { IonText } from "@ionic/react";
import useModalHelper from "../hooks/useModalHelper";
import { infinite } from "ionicons/icons";

const LoginPageModalComponent: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModalHelper({
    initialState: true,
  });

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

  return (
    <CustomModalComponent modalComposer={modalComposer} isOpen={isModalOpen} />
  );
};

export default LoginPageModalComponent;
