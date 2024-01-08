import { useState } from 'react';

const useAuthToken = () => {
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const [authToken, setAuthToken] = useState<string | null>(getToken());

  const saveToken = (userToken: string) => {
    localStorage.setItem('token', userToken);
    setAuthToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return {
    setToken: saveToken,
    token: authToken,
    removeToken
  };
};

export default useAuthToken;
