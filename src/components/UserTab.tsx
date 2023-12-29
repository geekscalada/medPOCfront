//TODO: what is this sintax all document????

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonContent, IonPage, IonLabel, IonList, IonItem, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const UserTab: React.FC = () => {
  // Estados para almacenar los datos del usuario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombreDeUsuario, setNombreDeUsuario] = useState("");
  const [alergenos, setAlergenos] = useState<string[]>([]);

  useEffect(() => {
    const apiUrl = 'http://192.168.33.22:3007'; // Asegúrate de que la URL sea correcta

    axios.get(apiUrl)
      .then(response => {
        const { data } = response;
        setNombre(data.nombre);
        setApellido(data.apellido);
        setNombreDeUsuario(data.nombreDeUsuario);
        setAlergenos(data.alergenos);
      })
      .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
      });
  }, []);

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
        <h3>Alérgenos</h3>
        <IonList>
          {alergenos.map((alergeno, index) => (
            <IonItem key={index}>
              <IonLabel>{alergeno}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      </>
    
  );
};

export default UserTab;