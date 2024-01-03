import React, { FC, useState } from "react";
import { IonInput } from "@ionic/react";
import useApiRequest from "../services/useApiDebouncedRequest";

const ExploreContainer: any = () => {
  console.log("renderizando componente");
  // const { data, loading, error } = useApiRequest(
  //   "http://192.168.33.22:3007/alergenos/pl"
  // );

  return (
    <div>
      <p>Hola</p>
      {/* Renderiza tu data aquí */}
      {/* <p>{JSON.stringify(data)}</p> */}
    </div>
  );
};

export default ExploreContainer;
