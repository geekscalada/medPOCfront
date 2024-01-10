import { useState, ReactNode, useRef } from "react";
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

  // Eventos
  onClick?: (event: React.MouseEvent) => void; // Manejador para clicks
  onFocus?: (event: React.FocusEvent) => void; // Manejador para cuando el botón obtiene focus
  onBlur?: (event: React.FocusEvent) => void; // Manejador para cuando el botón pierde focus
  // ... cualquier otro evento que necesites

  text: string; // Texto del botón, una propiedad personalizada que no está en la API de Ionic
}

export interface FlexStyle {
  flexDirection: "column" | "row";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
}

export interface ButtonContainerStyle extends FlexStyle {
  display: string;
  gap: string;
  flex: string;
}

const useIonModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [buttonsConfig, setButtonsConfig] = useState<ButtonConfig[]>([]);
  const [containerButtonStyle, setContainerButtonStyle] =
    useState<ButtonContainerStyle>();
  const [modalWidth, setModalWidth] = useState<any>();

  const modalRef = useRef(null);

  const openModal = (
    content: ReactNode,
    buttons: ButtonConfig[],
    containerButtonStyle: FlexStyle,
    modalWidth: any
  ) => {
    const buttonContainerStyle: ButtonContainerStyle = {
      display: "flex",
      flexDirection: containerButtonStyle.flexDirection,
      gap: "3px",
      flex: "0.5",
      justifyContent: containerButtonStyle.justifyContent,
    };

    setContainerButtonStyle(buttonContainerStyle);
    setModalContent(content);
    setButtonsConfig(buttons);
    setModalWidth(modalWidth);
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

  const CustomIonModal: React.FC = (modalStyle) => (
    console.log("modalStyleComponent!!!", modalStyle),
    (
      <IonModal
        isOpen={isOpen}
        className="mi-modal-personalizado"
        style={{ "--customwidth": modalWidth }}
      >
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Modal</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {modalContent}
            {renderButtons()}
          </IonContent>
        </IonContent>
      </IonModal>
    )
  );

  return { CustomIonModal, openModal, closeModal };
};

export default useIonModal;

//  return (
//   <IonPage>
//   <IonHeader>
//     <IonToolbar>
//       <IonTitle>Inline Modal</IonTitle>
//     </IonToolbar>
//   </IonHeader>
//   <IonContent className="ion-padding">
//     <IonButton expand="block" onClick={() => setIsOpen(true)}>
//       Open
//     </IonButton>

//   </IonContent>
// </IonPage>

// <IonModal
//       isOpen={isOpen}
//       onDidDismiss={closeModal}

//     >

//         <div className="customIonModal">
//           <div className="container-content" style={{ display: "flex" }}>
//             {modalContent}
//           </div>
//           <div className="container-buttons" style={containerButtonStyle}>
//             {renderButtons()}
//           </div>
//         </div>

//     </IonModal>
