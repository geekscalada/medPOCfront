import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/AuthContext";
import { useHistory } from "react-router-dom";

import { ButtonConfig } from "../services/customModalComposer";

const LoginWithGoogleComponent = () => {
  const { setToken, token, removeToken } = useAuth();
  const history = useHistory();

  //TODO: We need to use auth-code flow to get the code and send it to the backend
  // backend will create a token and refresh token and send it to the frontend

  //TODO: fix because when onSucces, modal is not closing, just redirecting, we need a callback
  //TODO: TabBar shouldn't be visible in login page or maybe ir should be visible only some tabs
  const loginGoogleHandler = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (codeResponse) {
        setToken(codeResponse.code);
        history.push("/findcode");
      }
    },
    flow: "auth-code",
  });

  const loginWithGoogleButton: ButtonConfig = {
    text: "Sign in with Google 🚀",
    onClick: () => loginGoogleHandler(),
    strong: true,
    disabled: false,
    shape: "round",
    onBlur: () => console.log("Botón perdió focus"),
    onFocus: () => console.log("Botón obtuvo focusssss"),
  };

  return { loginWithGoogleButton };
};

export default LoginWithGoogleComponent;

// Todo: maybe expose loginGoogleHandler to isolate ButtonConfig in another file
// and pass handler as a prop to the button
