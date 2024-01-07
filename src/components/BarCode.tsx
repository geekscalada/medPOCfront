import { useAuth } from "../hooks/AuthContext";

const BarCode: React.FC = () => {
  const { setToken, token, removeToken } = useAuth();

  return (
    <>
      <button onClick={() => setToken("newToken")}>setToken</button>
      <button onClick={() => removeToken()}>clearToken</button>
      <h3>mi token: {token}</h3>
    </>
  );
};

export default BarCode;
