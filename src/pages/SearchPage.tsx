import React, { FC, useEffect, useState, useCallback } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonMenuButton,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosRequests from "../services/useAxiosRequests";
import { AxiosRequestConfig } from "axios";

// Suponiendo que tienes una interfaz para tus ítems
interface Item {
  // Define las propiedades de tus ítems aquí
}

// Suponiendo que tienes un tipo para la respuesta de tu API
interface ApiResponse {
  newItems: Item[];
  // Agrega más propiedades si es necesario
}

const SearchCompoment: FC = () => {
  console.log("Rendering search component");
  const [valor, setValor] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const [options, setOptions] = useState<AxiosRequestConfig>({
    method: "GET",
    url: "/medicamentos/paracetamol",
  });

  //TODO: Implement this
  const totalDataCount = 100; // Ajusta esto según tu API

  const { data, loading, error } = useAxiosRequests<any>(
    {
      method: "GET",
      url: "/medicamentos/paracetamol",
    },
    true
  );

  const fetchMoreData = () => {
    console.log("fetching data");

    setOptions({
      method: "GET",
      url: "/medicamentos/paracetamol",
    });
  };

  useEffect(() => {
    if (data) {
      console.log("useEffect to set data");
      setItems(data.resultados);
      console.log(data.resultados);
    }
  }, [data]);

  useEffect(() => {
    console.log("useEffect");
    fetchMoreData();
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Busca un medicamento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonSearchbar
        placeholder="Busca por principio activo, marca..."
        value={valor}
        onIonChange={(e) => setValor(e.detail.value!)}
      />
      <IonContent>
        <IonList>
          <InfiniteScroll
            dataLength={96}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Cargando...</h4>}
          >
            <p>asfasdfsdf</p>
            {items.map((item, index) => (
              <p key={index}>{index}</p>
            ))}
          </InfiniteScroll>
        </IonList>
      </IonContent>
    </>
  );
};

export default SearchCompoment;
