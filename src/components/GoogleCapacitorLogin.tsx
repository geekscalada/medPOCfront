// GoogleLogin.tsx
import React from "react";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { IonButton } from "@ionic/react";
import { ButtonConfig } from "../services/customModalComposer";
import { useHistory } from "react-router";
import { useAuth } from "../hooks/AuthContext";
import { mappingRoutes } from "../routes/MainRoutes";

const GoogleCapacitorLogin = (onLoginSuccessCallbackToModal: () => void) => {
  const { setToken, token, removeToken } = useAuth();
  const history = useHistory();

  GoogleAuth.initialize({
    clientId:
      "1097625209618-uikanbbdb42pc3h221vev6qpb6vdtr09.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    grantOfflineAccess: true,
  });

  const loginWithCapacitorGoogle: ButtonConfig = {
    text: "Sign in with capacitorrr",
    onClick: () => signIn(),
    strong: true,
    disabled: false,
    shape: "round",
  };

  //TODO: Add backend login implementation

  const signIn = async () => {
    try {
      const user = await GoogleAuth.signIn();
      console.log(user);
      setToken("codeResponse.code");
      onLoginSuccessCallbackToModal();
      history.push(mappingRoutes.barcode.path);

      // TODO: we can add  GoogleAuth.refresh
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return { loginWithCapacitorGoogle };
};

export default GoogleCapacitorLogin;
