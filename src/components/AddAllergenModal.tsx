import React, { useEffect, useState } from "react";
import { IonButton, IonSearchbar, IonItem, IonList } from "@ionic/react";
import { ButtonConfig, CustomComponent } from "../hooks/useModal2";
import { AxiosRequestConfig } from "axios";
import useApiDebouncedRequest from "../services/useApiDebouncedRequest";
import { ArrayAllergens } from "../models/types/types";
import ConfirmationAllergenSheeAction from "./ConfirmationAllergernModal";

import { ModalComposer } from "../hooks/useModal2";

export interface AddAllergenComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAllergenComponentModal: React.FC<AddAllergenComponentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [componentes, setComponentes] = useState<string[]>([]);

  /**
   * Logic to confirmation modal
   */
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState("");
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const optionsGet: AxiosRequestConfig = {
    method: "GET",
    url: apiUrl + "/alergenos/" + searchTerm,
    headers: { "Content-Type": "application/json" },
  };

  // This hook refreshes the data when the searchTerm changes
  // TODO: Implement loadings
  const { data, loading, error } = useApiDebouncedRequest<ArrayAllergens>(
    optionsGet,
    2
  );

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    // We refresh data when hook of useApiDebouncedRequest changes
    // TODO: Implement toasts of errors
    if (error) {
      console.log("Error");
      return;
    }

    setComponentes(data?.allergens ?? []);
  }, [data, error]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const modalComposer: ModalComposer = {
    titleModal: "Añadir alérgeno",
    headerModal: null,
    content: (
      <>
        <div className="ion-padding">
          <IonItem>
            <IonSearchbar
              color={"medium"}
              debounce={500}
              data-testid="allergens-searchbar"
              placeholder="Search"
              onIonInput={(e) => setSearchTerm(e.detail.value!)}
              value={searchTerm}
              onIonClear={() => setSearchTerm("")}
            ></IonSearchbar>
          </IonItem>
          <IonList>
            {componentes.map((componente) => (
              <IonItem
                key={componente + "id"}
                button
                onClick={() => {
                  setSelectedAllergen(componente);
                  setIsConfirmationModalOpen(true);
                }}
              >
                {componente} {/* Ajusta según la estructura de tus datos */}
              </IonItem>
            ))}
          </IonList>
        </div>
      </>
    ),
    buttons: [],
    modalSize: {
      width: "550px",
      height: "650px",
    },
    canDismissModal: true,
    closeButtonHeader: true,
  };

  return (
    <>
      <CustomComponent
        modalComposer={modalComposer}
        isOpen={isModalOpen}
        onClose={onClose} // Callback
      />
      <ConfirmationAllergenSheeAction
        isOpen={isConfirmationModalOpen}
        allergen={selectedAllergen}
        onClose={closeConfirmationModal}
      />
    </>
  );
};

export default AddAllergenComponentModal;
