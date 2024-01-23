import React, { useEffect, useState } from "react";
import { IonButton, IonSearchbar, IonItem, IonList } from "@ionic/react";
import { CustomModalComponent } from "../services/customModalComposer";
import { AxiosRequestConfig } from "axios";
import useApiDebouncedRequest from "../services/useApiDebouncedRequest";
import { ArrayAllergens } from "../models/types/types";
import ConfirmationAllergenSheeAction from "./ConfirmationAllergernModal";

import { ModalComposer } from "../services/customModalComposer";
import useModalHelper from "../hooks/useModalHelper";

import useGlobalInfoContext from "../hooks/useGlobalInfoContext";

export interface AddAllergenComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAllergenComponentModal: React.FC<AddAllergenComponentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isModalOpen, openModal, closeModal } = useModalHelper();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [componentes, setComponentes] = useState<string[]>([]);

  const { headerTitle, setHeaderTitle } = useGlobalInfoContext();

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
    // Cambiar miVariable justo después de la primera renderización
    setHeaderTitle("Add Allergen");
  }, []);

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);

  useEffect(() => {
    // We refresh data when hook of useApiDebouncedRequest changes

    if (error) {
      console.log("Error");
      return;
    }

    setComponentes(data?.allergens ?? []);
  }, [data, error]);

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
      <CustomModalComponent
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
