// GoogleLogin.tsx
import React from "react";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { IonButton } from "@ionic/react";

const GoogleCapacitorLogin: React.FC = () => {
  GoogleAuth.initialize({
    clientId:
      "1097625209618-uikanbbdb42pc3h221vev6qpb6vdtr09.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    grantOfflineAccess: true,
  });

  const signIn = async () => {
    try {
      const user = await GoogleAuth.signIn();
      console.log(user);
      // Maneja aquí el usuario logueado

      // TODO: we can add  GoogleAuth.refresh
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <>
      <IonButton onClick={signIn}>
        Iniciar sesión con Google Capacitor
      </IonButton>
    </>
  );
};

export default GoogleCapacitorLogin;
