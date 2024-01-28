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
  const [valor, setValor] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const totalDataCount = 100; // Ajusta esto según tu API

  const { data, loading, error } = useAxiosRequests<ApiResponse>(
    {
      method: "POST",
      url: "https://cima.aemps.es/cima/rest/buscarEnFichaTecnica?pagina=1",
      data: [{ seccion: "4.1", texto: "paracetamol", contiene: "1" }],
      headers: {
        "Access-Control-Allow-Origin": "*",
        origin: "x-requested-with",
        "Access-Control-Allow-Headers":
          "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
        "Content-Type": "application/json",
      },
    },
    true
  );

  const fetchMoreData = useCallback(async () => {
    if (items.length >= totalDataCount) {
      setHasMore(false);
      return;
    }

    if (!loading && data && !error) {
      setItems((prevItems) => [...prevItems, ...data.newItems]);
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, items]);

  useEffect(() => {
    fetchMoreData();
  }, [fetchMoreData]);

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
        placeholder="Busca un alérgeno"
        value={valor}
        onIonChange={(e) => setValor(e.detail.value!)}
      />
      <IonContent>
        <IonList>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Cargando...</h4>}
          >
            {items.map((item, index) => (
              <div key={index}>
                {/* Renderiza tu ítem aquí. Asegúrate de ajustar esta parte según tu estructura de datos. */}
                <p>{index}</p>
              </div>
            ))}
          </InfiniteScroll>
        </IonList>
      </IonContent>
    </>
  );
};

export default SearchCompoment;
