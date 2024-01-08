import { useAuth } from "../hooks/AuthContext";

const SearchComponent: React.FC = () => {
  const { token, setToken, removeToken } = useAuth();

  // Puedes usar 'token', 'setToken' y 'removeToken' según sea necesario
  // Por ejemplo, para mostrar contenido condicionalmente:
  if (token) {
    return <div>Usuario autenticado. Token: {token}</div>;
  } else {
    return <div>Usuario no autenticado.</div>;
  }
};

export default SearchComponent;
