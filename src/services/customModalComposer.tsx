import React, { useState, ReactNode, useRef, useEffect } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";

import "../styles/customIonModal.scss";
import { ModalComposer, ButtonContainerStyle } from "./types.services";

export interface CustomIonModalProps {
  modalComposer: ModalComposer;
  isOpen: boolean;
  onClose?: () => void;
  onCallBackModalCustomFunction?: () => void;
}

export const CustomModalComponent: React.FC<CustomIonModalProps> = ({
  modalComposer,
  isOpen,
  onClose,
  //TODO: implementar onCallBack
  onCallBackModalCustomFunction,
}) => {
  const [isModalOpen, setIsOpen] = useState<boolean>(isOpen);

  const buttonContainerStyle: ButtonContainerStyle = {
    display: "flex",
    flexDirection:
      modalComposer.buttonContainer.containerButtonStyle?.flexDirection ?? "column",
    gap: "3px",
    flex: "0.5",
    justifyContent:
      modalComposer.buttonContainer.containerButtonStyle?.justifyContent ?? "center",
  };

  const renderButtons = () => {
    if (modalComposer.buttonContainer.buttons) {
      return modalComposer?.buttonContainer.buttons.map((buttonConfig, index) => (
        <IonButton key={index} {...buttonConfig}>
          {buttonConfig.text}
        </IonButton>
      ));
    }
  };
  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const modal = (
    <IonModal
      isOpen={isModalOpen}
      className="customModalIonic"
      style={{
        "--customwidth": modalComposer.modalSize?.width,
        "--customheight": modalComposer.modalSize?.height,
      }}
      canDismiss={modalComposer.canDismissModal ?? true}
      onDidDismiss={closeModal}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{modalComposer.titleModal}</IonTitle>
          {modalComposer.closeButtonHeader && (
            <IonButtons slot="end">
              <IonButton onClick={closeModal}>Close</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {modalComposer.headerModal}
        {modalComposer.content}
        <div style={buttonContainerStyle}>{renderButtons()}</div>
      </IonContent>
    </IonModal>
  );

  return modal;
};
