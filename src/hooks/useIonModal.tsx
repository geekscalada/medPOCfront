import React, { useState, ReactNode, useRef } from "react";
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
  containerButtonStyle: FlexStyle;
  modalSize: ModalSize;
  canDismissModal?: boolean;
  closeButtonHeader?: boolean;
};

const useIonCustomModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [buttonsConfig, setButtonsConfig] = useState<ButtonConfig[]>([]);
  const [headerModal, setHeaderModal] = useState<React.ReactNode>("");
  const [containerButtonStyle, setContainerButtonStyle] =
    useState<ButtonContainerStyle>();
  const [modalSize, setModalSize] = useState<ModalSize>();
  const [titleModal, setTitleModal] = useState<string>("");
  const [canDismissModal, setCanDismissModal] = useState<boolean>(false);
  const [closeButtonHeader, setCloseButtonHeader] = useState<boolean>(false);

  // const modalRef = useRef(null);

  const openModal = (modalComposer: ModalComposer) => {
    const buttonContainerStyle: ButtonContainerStyle = {
      display: "flex",
      flexDirection: modalComposer.containerButtonStyle.flexDirection,
      gap: "3px",
      flex: "0.5",
      justifyContent: modalComposer.containerButtonStyle.justifyContent,
    };

    setContainerButtonStyle(buttonContainerStyle);
    setTitleModal(modalComposer.titleModal);
    setHeaderModal(modalComposer.headerModal);
    setModalContent(modalComposer.content);
    setButtonsConfig(modalComposer.buttons ?? []);
    setModalSize(modalComposer.modalSize);
    setCanDismissModal(canDismissModal);
    setCloseButtonHeader(modalComposer.closeButtonHeader ?? true);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  /**
   * La prop buttonConfig desestructura todas las propiedades que tuviera
   * el boton con la interfaz ButtonConfig
   */
  const renderButtons = () =>
    buttonsConfig.map((buttonConfig, index) => (
      <IonButton key={index} {...buttonConfig}>
        {buttonConfig.text}
      </IonButton>
    ));

  const CustomIonModal: React.FC = () => (
    <IonModal
      isOpen={isOpen}
      className="customModalIonic"
      style={{
        "--customwidth": modalSize?.width,
        "--customheight": modalSize?.height,
      }}
      canDismiss={canDismissModal}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{titleModal}</IonTitle>
          {closeButtonHeader && (
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          )}
          {/* <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {headerModal}
        <p>{modalContent}</p>
        <div style={containerButtonStyle}>{renderButtons()}</div>
      </IonContent>
    </IonModal>
  );

  return { CustomIonModal, openModal, closeModal };
};

export default useIonCustomModal;
