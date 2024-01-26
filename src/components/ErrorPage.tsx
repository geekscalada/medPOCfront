import React from "react";
import {
  IonContent,
  IonPage,
  IonText,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";

const ErrorPage = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "50px",
          }}
        >
          {/* Contenedor de la tarjeta */}
          <div
            style={{
              border: "1px solid #ccc", // Borde de la tarjeta
              borderRadius: "8px", // Bordes redondeados
              padding: "20px", // Espaciado interno
              maxWidth: "400px", // Ancho máximo
              width: "100%", // Ancho completo
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Sombra sutil
              textAlign: "center", // Texto centrado
              backgroundColor: "#ffffff", // Fondo blanco
              marginBottom: "20px", // Separación con otros elementos
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Centra horizontalmente
                marginBottom: "10px", // Separación entre los elementos
              }}
            >
              <IonText>
                <h2>Error</h2>
              </IonText>
              <IonIcon
                icon={alertCircleOutline}
                style={{
                  fontSize: "30px",
                  marginLeft: "10px",
                }}
              />
            </div>
            <IonText>
              <h2>La ventana no pudo ser cargada</h2>
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;
