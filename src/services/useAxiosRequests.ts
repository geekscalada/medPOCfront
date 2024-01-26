import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { useIonToast } from "@ionic/react";
import useToastService from "../hooks/useToastService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});



api.interceptors.response.use(
  (response) => {
    // Manejar respuestas exitosas
    return response;
  },
  (error) => {
    let customError;

    // Manejar errores
    if (error.response) {
      // Errores que provienen del servidor
      console.log("Error en la respuesta del servidor:", error.response.status);
      customError = new Error(error.response.data.message);
    } else if (error.request) {
      // Errores que suceden al no recibir respuesta
      console.log("No se recibió respuesta:", error.request);
      customError = new Error(
        "Error in the request, plese try again in a while"
      );
    } else {
      // Errores que suceden al configurar la solicitud
      console.log("Error en la solicitud:", error.message);
      customError = new Error(
        "Error in the request, plese try again in a while"
      );
    }

    return Promise.reject(customError);
  }
);

const useAxiosRequests = <T>(
  options: AxiosRequestConfig,
  showToast: boolean = true
): { data: T | null; loading: boolean; error: any } => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | AxiosError | null>(null);
  const { standardErrorToast } = useToastService();

  if (!options.headers) {
    options.headers = { "Content-Type": "application/json" };
  }

  async function fetchData() {
    try {
      const response = await api(options);
      setData(response.data);
    } catch (error: any) {
      setError(error);
      if (showToast) {
        standardErrorToast(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!options.url) {
      const error = new Error("An url is needed to make the request");
      setError(error);
      setLoading(false);
      return;
    }

    fetchData();
  }, [options.url]);

  return { data, loading, error };
};

export default useAxiosRequests;
