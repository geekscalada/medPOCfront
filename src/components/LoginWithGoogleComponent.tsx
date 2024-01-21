import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/AuthContext";
import { useHistory } from "react-router-dom";

import { ButtonConfig } from "../services/customModalComposer";

const LoginWithGoogleComponent = (
  onLoginSuccessCallbackToModal: () => void
) => {
  const { setToken, token, removeToken } = useAuth();
  const history = useHistory();

  //TODO: We need to use auth-code flow to get the code and send it to the backend
  // backend will create a token and refresh token and send it to the frontend

  //TODO: TabBar shouldn't be visible in login page or maybe ir should be visible only some tabs

  const loginWithGoogleButton: ButtonConfig = {
    text: "Sign in with Google 🚀",
    onClick: () => loginGoogleHandler(),
    strong: true,
    disabled: false,
    shape: "round",
  };

  const loginGoogleHandler = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (codeResponse) {
        setToken(codeResponse.code);
        onLoginSuccessCallbackToModal();
        history.push("/findcode");
      }
    },
    flow: "auth-code",
    //ux_mode: "redirect",
  });

  return { loginWithGoogleButton };
};

export default LoginWithGoogleComponent;
