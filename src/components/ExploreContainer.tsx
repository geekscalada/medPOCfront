import React, { FC, useState } from "react";
import { IonInput, IonSearchbar } from "@ionic/react";
import useApiRequest from "../services/useApiDebouncedRequest";

const ExploreContainer: any = () => {
  console.log("renderizando componente");

  const [valor, setValor] = useState("");

  // const { data, loading, error } = useApiRequest(
  //   "http://192.168.33.22:3007/alergenos/pl"
  // );

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
