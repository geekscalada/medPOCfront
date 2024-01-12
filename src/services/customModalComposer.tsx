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

export interface ButtonConfig {
  color?: string;
  disabled?: boolean;
  expand?: "full" | "block";
  fill?: "clear" | "outline" | "solid" | "default";
  href?: string;
  mode?: "ios" | "md";
  rel?: string;
  routerDirection?: "forward" | "back" | "root";
  shape?: "round";
  size?: "small" | "default" | "large";
  strong?: boolean;
  type?: "submit" | "reset" | "button";
  download?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  onClick?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  callBackButtonCustomFunction?: () => void;
  text: string; // propiedad personalizada que no está en la API de Ionic
}

export type FlexStyle = {
  flexDirection: "column" | "row";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
};

type ButtonContainerStyle = FlexStyle & {
  display: string;
  gap: string;
  flex: string;
};

export type ModalSize = {
  width: string;
  height: string;
};

export type ModalComposer = {
  titleModal: string;
  headerModal?: React.ReactNode;
  content?: React.ReactNode;
  buttons?: ButtonConfig[];
  containerButtonStyle?: FlexStyle;
  modalSize: ModalSize;
  canDismissModal?: any;
  closeButtonHeader?: boolean;
};

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
      modalComposer.containerButtonStyle?.flexDirection ?? "column",
    gap: "3px",
    flex: "0.5",
    justifyContent:
      modalComposer.containerButtonStyle?.justifyContent ?? "center",
  };

  const renderButtons = () => {
    if (modalComposer.buttons) {
      return modalComposer?.buttons.map((buttonConfig, index) => (
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
