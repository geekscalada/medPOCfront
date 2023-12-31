import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { addCircle } from "ionicons/icons";

import useModal from "../hooks/useModal";
import AddAllergenModal from "./AddAllergenModal";
import useAxiosRequests from "../services/useAxiosRequests";
import { UserDataDTO } from "../models/types/types";

const apiUrl = import.meta.env.VITE_API_URL;

//TODO: use redux to manage user data for all the app

const UserTab: React.FC = () => {
  // Estados para almacenar los datos del usuario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreDeUsuario, setNombreDeUsuario] = useState("");
  const [alergenos, setAlergenos] = useState<string[]>([]);

  const { isModalOpen, openModal, closeModal } = useModal();

  const { data, loading, error } = useAxiosRequests<UserDataDTO>({
    method: "GET",
    url: apiUrl,
    headers: { "Content-Type": "application/json" },
  });

  //generate tyoe of data

  // La función que pasas a useEffect se ejecutará después de que el renderizado esté completo.
  // Esto asegura que no bloqueará la visualización de la interfaz de usuario, incluso si
  // la operación tarda un tiempo.
  // useEffect precisamente se usa para "efectos secundarios" es decir
  // operaciones que pueden afectar a otros componentes o no pueden ser realizadas durante el renderizado
  // Tenemos un array que es donde definimos las dependencias de useEffect.
  // Si no le pasamos nada, se ejecuta cada vez que se renderiza el componente (sin array)
  // Si le pasamos un array vacío, se ejecuta solo la primera vez que se renderiza el componente
  // Si le pasamos un array con alguna variable, y Si alguna de estas dependencias cambia entre renderizados,
  // React volverá a ejecutar el efecto después de actualizar el DOM.
  // Es decir primero renderiza las lógicas del componente para determinar que debe de verse a nivel de UI
  // Después actualiza lo que ha de verse en el DOM, si algo ha cambiado, por ejemplo un mensaje
  // Después, ejecuta la función del efecto.
  useEffect(() => {
    if (data) {
      console.log(data);
      setNombre(data.nombre);
      setApellido(data.apellido);
      setNombreDeUsuario(data.nombreDeUsuario);
      setAlergenos(data.alergenos);
    }
  }, [data]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>Nombre: {nombre}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Apellido: {apellido}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Nombre de Usuario: {nombreDeUsuario}</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel>
              <h1>Alérgenos</h1>
            </IonLabel>
            <IonIcon
              aria-hidden="true"
              icon={addCircle}
              slot="end"
              onClick={openModal}
              color="primary"
            ></IonIcon>
          </IonItem>

          {alergenos.map((alergeno, index) => (
            <IonItem key={index}>
              <IonLabel>{alergeno}</IonLabel>
            </IonItem>
          ))}
          <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
            {/* Aqui closeModal = es una prop, porque así la hemos definido como prop
            y de hecho se ha definido (a través de la interfaz) que sea de tipo () => void, es decir, una función
            que no recibe ningún argumento y no devuelve nada.
            Así que esta prop recibe la funcion closeModal que es de ese tipo
            y viene del hook useModal.          
            */}
            <AddAllergenModal closeModal={closeModal} />
          </IonModal>
        </IonList>
      </IonContent>
    </>
  );
};

//TODO: this is not in use now!
UserTab.defaultProps = {
  nombre: "NombreDefault",
};

export default UserTab;
