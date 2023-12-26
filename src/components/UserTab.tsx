import React from 'react';
import { IonContent, IonPage, IonLabel, IonList, IonItem } from '@ionic/react';

// Tipos para las props del componente
interface UserTabProps {
  nombre: string;
  apellido: string;
  nombreDeUsuario: string;
  alergenos: string[];
}

const UserTab: React.FC<UserTabProps> = ({ nombre, apellido, nombreDeUsuario, alergenos }) => {
  return (
    <IonPage>
      <IonContent>
        <h2>Perfil del Usuario</h2>
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
    </IonPage>
  );
};

export default UserTab;
