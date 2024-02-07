import React, { useState } from "react";

import { CustomModalComponent } from "../services/customModalComposer";

import { IonText } from "@ionic/react";
import useModalHelper from "../hooks/useModalHelper";
import GoogleCapacitorLogin from "./GoogleCapacitorLoginButton";
import { ModalComposer } from "../services/types.services";

const LoginPageModalComponent: React.FC = () => {
  const { isModalOpen, openModal, closeModal } = useModalHelper({
    initialState: true,
  });

  const [canDismiss, setCanDismiss] = useState<boolean>(false);

  const closeModalCallback = () => {
    setCanDismiss(true);
    closeModal();
  };

  const { loginWithCapacitorGoogle } = GoogleCapacitorLogin(closeModalCallback);

  const modalComposer: ModalComposer = {
    titleModal: "Login",
    headerModal: (
      <IonText color="primary">
        <h3>You need to login with google.</h3>
      </IonText>
    ),
    content: null,
    buttonContainer: {
      buttons: [loginWithCapacitorGoogle],
      containerButtonStyle: {
        flexDirection: "column",
        justifyContent: "center",
      },
    },
    modalSize: {
      width: "400px",
      height: "200px",
    },
    canDismissModal: canDismiss,
    closeButtonHeader: false,
  };

  return (
    <CustomModalComponent modalComposer={modalComposer} isOpen={isModalOpen} />
  );
};

export default LoginPageModalComponent;
