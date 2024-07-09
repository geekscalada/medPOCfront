import React, { FC, useState } from "react";
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonList,
  IonMenuButton,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useEffect } from "react";
import useApiDebouncedRequest from "../services/useApiDebouncedRequest";
import { AxiosRequestConfig } from "axios";
import { ApiResponseMedicineDTO } from "../DTOs/ApiResponseDTO";

//TODO: Due to we can retrieve medicines against the public API,
// we need to implement a call to retirve user excipients to do the logic
// at the client

//TODO: WE need pagination

// TODO: WE NEED at the backend a mix of calls to retrieve med + excipients og these meds

// TODO: this is our domain, we need to move this to a domain folder
export type medicine = {
  id: number;
  name: string;
  labName: string;
  excipients: string[];
  photo: string;
  cpresc: string;
};

const SearchCompoment: any = () => {
  const FAKE_API_SEARCH_MEDICAMENTOS = import.meta.env
    .VITE_REACT_APP_API_SEARCH_MEDICAMENTOS_FAKE;

  const [searchTerm, setsearchTerm] = useState("");
  const [medicines, setMedicines] = useState<medicine[]>([]);

  //TODO: change this searchTerm string for a real searchTerm
  const optionsGet: AxiosRequestConfig = {
    method: "GET",
    url: FAKE_API_SEARCH_MEDICAMENTOS + "/searchTerm",
    headers: { "Content-Type": "application/json" },
  };

  const { data, loading, error } =
    useApiDebouncedRequest<ApiResponseMedicineDTO>(optionsGet, 2);

  useEffect(() => {
    if (error) {
      return;
    }

    if (data?.resultados) {
      console.log("Recibiendo data");

      //TODO: we are using any because we aren't using APIresponseDTO because we will
      // use our own API
      const mappedMedicines = data.resultados.map((element: any) => {
        return {
          id: parseInt(element.nregistro, 10),
          name: element.nombre,
          labName: element.labtitular,
          photo: element.fotos[0].url,
          excipients: element.excipientes,
        } as medicine;
      });

      setMedicines(mappedMedicines);

      // Log the mapped medicines
      mappedMedicines.forEach((medicine) => {
        console.log(medicine);
      });
    }
  }, [data, error]);

  //TODO: extract this component

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
        debounce={500}
        placeholder="Busca un medicamento"
        value={searchTerm}
        onIonInput={(e: any) => setsearchTerm(e.detail.value)}
        // onKeyUp={(e: any) => setsearchTerm(e.target.value)}
      ></IonSearchbar>
      <p>searchTerm actual: {searchTerm}</p>

      {medicines.map((element) => (
        <IonCard>
          <IonCardContent>
            <IonRow>
              <IonCol size="4">
                <IonImg src={element.photo} className="medicine-photo" />
              </IonCol>
              <IonCol size="8">
                <IonCardHeader>
                  <IonCardTitle>{element.name}</IonCardTitle>
                  <IonCardSubtitle>Autorizado: Yes</IonCardSubtitle>
                </IonCardHeader>
                <p>Principios Activos: {element.excipients.join(", ")}</p>
                <p>Excipientes: {element.excipients.join(", ")}</p>
                <p>{element.cpresc ? "Requiere Receta" : "Sin Receta"}</p>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

export default SearchCompoment;
