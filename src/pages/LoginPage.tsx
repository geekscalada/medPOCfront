import {
  GoogleLogin,
  useGoogleLogin,
  useGoogleOAuth,
} from "@react-oauth/google";
import { useAuth } from "../hooks/AuthContext";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";

const LoginPage: React.FC = () => {
  const { setToken, token, removeToken } = useAuth();
  const history = useHistory();

  //TODO: We need to use auth-code flow to get the code and send it to the backend
  // backend will create a token and refresh token and send it to the frontend

  //TODO: TabBar shouldn't be visible in login page or maybe ir should be visible only some tabs
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (codeResponse) {
        setToken(codeResponse.code);
        history.push("/findcode");
      }
    },
    flow: "auth-code",
  });

  return (
    console.log("Render"),
    (
      <>
        <IonButton onClick={() => login()} color="primary" strong={true}>
          Sign in with Google 🚀
        </IonButton>
      </>
    )
  );
};

export default LoginPage;
