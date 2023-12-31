import React, { useState } from "react";
import { IonInput } from "@ionic/react";

const ExploreContainer = () => {
  const [valor, setValor] = useState("hola");

  const manejarCambio = (e: any) => {
    console.log(e);
    setValor(e.detail.value);
  };

  return (
    <div>
      <IonInput
        value={valor}
        onKeyDown={(e: any) => setValor(e.target.value)}
      ></IonInput>
      <p>Valor actual: {valor}</p>
    </div>
  );
};

export default ExploreContainer;
