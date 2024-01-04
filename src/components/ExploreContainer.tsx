import React, { FC, useState } from "react";
import { IonInput, IonSearchbar } from "@ionic/react";
import useApiRequest from "../services/useApiDebouncedRequest";

const ExploreContainer: any = () => {
  console.log("renderizando componente");

  const [valor, setValor] = useState("");

  return (
    <>
      <IonSearchbar
        placeholder="Busca un alérgeno"
        value={valor}
        onKeyUp={(e: any) => setValor(e.target.value)}
      ></IonSearchbar>
      <p>Valor actual: {valor}</p>
    </>
  );
};

export default ExploreContainer;
