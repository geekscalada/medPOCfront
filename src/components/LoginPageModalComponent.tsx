import React, { useState } from "react";

import { CustomComponent, ModalComposer } from "../hooks/useModal2";

import LoginWithGoogleComponent from "../pages/LoginPage";
import { IonText } from "@ionic/react";

const LoginPageModalComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
    <CustomComponent
      modalComposer={modalComposer}
      isOpen={true}
      onClose={handleModalClose} // Callback
    />
  );
};

export default LoginPageModalComponent;
