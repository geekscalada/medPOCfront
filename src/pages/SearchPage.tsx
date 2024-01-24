import React, { FC, useState } from "react";
import {
  IonButtons,
  IonHeader,
  IonInput,
  IonMenuButton,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";



const SearchCompoment: any = () => {
  console.log("renderizando componente");

  const [valor, setValor] = useState("");

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Busca un medicamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonSearchbar
        placeholder="Busca un alérgeno"
        value={valor}
        onKeyUp={(e: any) => setValor(e.target.value)}
      ></IonSearchbar>
      <p>Valor actual: {valor}</p>
    </>
  );
};

export default SearchCompoment;
