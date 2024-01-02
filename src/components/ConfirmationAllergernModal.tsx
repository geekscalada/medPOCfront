// ConfirmationModal.js

import React from "react";
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

interface ConfirmationAllergenModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    allergen: string;
    }

const ConfirmationAllergenModal : React.FC<ConfirmationAllergenModalProps> = ({ isOpen, onClose, onConfirm, allergen }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Confirmar Acción</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding  " class="ion-justify-content-center">
        <p>¿Quieres añadir <b>{allergen}</b> a tu lista de alérgenos?</p>
        <IonButton onClick={onConfirm}>Confirmar</IonButton>
        <IonButton onClick={onClose}>Cancelar</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ConfirmationAllergenModal;
