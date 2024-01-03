// TODO: Important change!
// TODO: use debounce of searchBar in ionic instead of useDebounce because breaks the UI
import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonButton,
  IonSearchbar,
} from "@ionic/react";
import { useDebouncedCallback } from "use-debounce";
import ConfirmationAllergenSheeAction from "./ConfirmationAllergernModal";
import useApiDebouncedRequest from "../services/useApiDebouncedRequest";
import { AxiosRequestConfig } from "axios";
import { ArrayAllergens } from "../models/types/types";

interface AddAllergenModalProps {
  closeModal: () => void;
}

const AddAllergenModal: React.FC<AddAllergenModalProps> = ({ closeModal }) => {
  console.log("render AddAllergenModal");
  const [searchTerm, setSearchTerm] = useState("");
  //TODO: change to string[]
  const [componentes, setComponentes] = useState<string[]>([]);

  /**
   * Logic to confirmation modal
   */
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState("");
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setSearchTerm(value);
    },
    // delay in ms
    500
  );

  // Isolate DATA to globals
  const optionsGet: AxiosRequestConfig = {
    method: "GET",
    url: `http://192.168.33.22:3007/alergenos/${searchTerm}`,
    headers: { "Content-Type": "application/json" },
  };

  // This hook refreshes the data when the searchTerm changes
  // TODO: Implement loadings
  const { data, loading, error } = useApiDebouncedRequest<ArrayAllergens>(
    optionsGet,
    2
  );

  useEffect(() => {
    // We refresh data when hook of useApiDebouncedRequest changes
    // TODO: Implement toasts of errors
    if (error) {
      console.log("Error");
      return;
    }

    setComponentes(data?.allergens ?? []);
  }, [data, error]);

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Añadir Alérgeno</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="ion-padding">
        <IonItem>
          <IonSearchbar
            placeholder="Busca un alérgeno"
            onKeyUp={(e: any) => debounced(e.target.value)}
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
        <IonButton
          expand="block"
          onClick={closeModal}
          className="ion-margin-top"
        >
          Añadir
        </IonButton>
        <IonButton
          expand="block"
          color="medium"
          onClick={closeModal}
          className="ion-margin-top"
        >
          Cancelar
        </IonButton>
      </div>

      <ConfirmationAllergenSheeAction
        isOpen={isConfirmationModalOpen}
        allergen={selectedAllergen}
        onClose={closeConfirmationModal}
      />
    </IonContent>
  );
};

export default AddAllergenModal;
