import { useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useHistory } from "react-router";
import { mappingRoutes } from "../routes/MainRoutes";

const LogoutComponent = () => {
  const { removeToken } = useAuth();
  const history = useHistory();

  useEffect(() => {
    console.log("Ejecutando logout");

    removeToken();
    history.push(mappingRoutes.login.path);
  }, []);

  // No se retorna ningún elemento visible
  return null;
};

export default LogoutComponent;
