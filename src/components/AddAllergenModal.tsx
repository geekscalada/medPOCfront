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
} from "@ionic/react";
import { useDebouncedCallback } from "use-debounce";
import { idCardOutline } from "ionicons/icons";

interface AddAllergenModalProps {
  closeModal: () => void;
}

const AddAllergenModal: React.FC<AddAllergenModalProps> = ({ closeModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  //TODO: change to string[]
  const [medicamentos, setMedicamentos] = useState<any[]>([]);

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
          setMedicamentos(data.alergenos);
          console.log("medicamentos", medicamentos);
        })
        .catch((error) => {
          console.error("Error al buscar medicamentos:", error);
        });
    } else {
      setMedicamentos([]);
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
          <IonInput
            label="Busca tu alérgeno"
            onKeyUp={(e: any) => debounced(e.target.value)}
            value={searchTerm}
            clearInput
          />
        </IonItem>
        <IonList>
          {/* //TODO: add new modal to ask if you want to add a alergen */}
          {medicamentos.map((medicamento) => (
            <IonItem
              key={medicamento + "id"}
              button
              onClick={() => {
                /* Lógica para seleccionar el medicamento */
              }}
            >
              {medicamento} {/* Ajusta según la estructura de tus datos */}
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
    </IonContent>
  );
};

export default AddAllergenModal;
