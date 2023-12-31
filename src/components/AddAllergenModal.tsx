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
import useDebounce from "../hooks/useDebounce";

interface AddAllergenModalProps {
  closeModal: () => void;
}

const AddAllergenModal: React.FC<AddAllergenModalProps> = ({ closeModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 3000); // 500 ms de debounce
  const [medicamentos, setMedicamentos] = useState<any[]>([]); // Cambia 'any' por el tipo adecuado

  const handleInputChange = (e: CustomEvent) => {
    console.log("searchtermPre", searchTerm);
    setSearchTerm(e.detail.value);
    console.log("searchtermPost", searchTerm);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLIonInputElement>) => {
    console.log("se ha pulsado el boton");
    if (e.currentTarget.value) {
      const newValue = (e.target as HTMLInputElement).value;
      console.log("newValue", newValue);
      setSearchTerm(newValue);
    }
  };

  const updateSearchTerm = (searchTerm: any) => {
    console.log("searchterm cambiado", searchTerm);
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Llamada a la API
      console.log("llamando a la API con ," , debouncedSearchTerm);
      fetch(`http://192.168.33.22:3007/alergenos/${debouncedSearchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.alergenos, "data.alergenos");
          setMedicamentos(data.alergenos);
          console.log("medicamentos", medicamentos);
        })
        .catch((error) => {
          console.error("Error al buscar medicamentos:", error);
        });
    }
  }, [debouncedSearchTerm]);

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
            label="Nombre del alérgeno"
            onKeyDown={(e: any) => setSearchTerm(e.target.value)}
            value={searchTerm}
            clearInput
          />
        </IonItem>
        <IonList>
          {medicamentos.map((medicamento) => (
            <IonItem
              key={medicamento}
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
