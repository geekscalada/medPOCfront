// ConfirmationModal.js

import { IonActionSheet } from "@ionic/react";
import "../styles/confirmationAllergenSheet.scss";

interface ConfirmationAllergenSheeActionProps {
  isOpen: boolean;
  allergen: string;
  onClose: () => void;
}

const ConfirmationAllergenSheeAction: React.FC<
  ConfirmationAllergenSheeActionProps
> = ({ isOpen, allergen, onClose }) => {
  return (
    <>
      <IonActionSheet
        isOpen={isOpen}
        header={`¿ Deseas añadir el elemento ${allergen} ?`}
        buttons={[
          {
            text: "Añadir",
            data: {
              action: "share",
            },
          },
          {
            text: "Cancelar",
            role: "cancel",
            data: {
              action: "cancel",
            },
          },
        ]}
        onDidDismiss={onClose}
      ></IonActionSheet>
    </>
  );
};

export default ConfirmationAllergenSheeAction;
