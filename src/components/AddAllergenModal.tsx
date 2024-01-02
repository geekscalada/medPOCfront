import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonButton,
  IonSearchbar,
} from "@ionic/react";
import { useDebouncedCallback } from "use-debounce";
import { idCardOutline } from "ionicons/icons";
import ConfirmationAllergenModal from "./ConfirmationAllergernModal";

interface AddAllergenModalProps {
  closeModal: () => void;
}

const AddAllergenModal: React.FC<AddAllergenModalProps> = ({ closeModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  //TODO: change to string[]
  const [componentes, setComponentes] = useState<any[]>([]);

  /**
   * Logic to confirmation modal
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState("");

  const handleAllergenClick = (allergen: string) => {
    setSelectedAllergen(allergen);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    // Lógica para añadir el alérgeno seleccionado a la lista del usuario
    setIsModalOpen(false);
  };

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setSearchTerm(value);
    },
    // delay in ms
    500
  );

  //TODO: isolate to services
  // TODO: change to axios
  // TODO: async await ?
  // TODO: only search if we have at least 3 characters
  useEffect(() => {
    if (searchTerm) {
      fetch(`http://192.168.33.22:3007/alergenos/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.alergenos, "data.alergenos");
          setComponentes(data.alergenos);
          console.log("medicamentos", componentes);
        })
        .catch((error) => {
          console.error("Error al buscar medicamentos:", error);
        });
    } else {
      setComponentes([]);
    }
  }, [searchTerm]);

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
          ></IonSearchbar>
        </IonItem>
        <IonList>
          {/* //TODO: add new modal to ask if you want to add a alergen */}
          {componentes.map((componente) => (
            <IonItem
              key={componente + "id"}
              button
              onClick={() => {
                setSelectedAllergen(componente);
                setIsModalOpen(true);
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
      //TODO: could be this props be in the component?
      <ConfirmationAllergenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        allergen={selectedAllergen}
      />
    </IonContent>
  );
};

export default AddAllergenModal;
