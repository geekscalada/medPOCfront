import axios, { AxiosError } from "axios";

// Crear una instancia de Axios
const responseMiddleware = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

// Agregar interceptores de respuesta
responseMiddleware.interceptors.response.use(
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
      customError = new Error(
        error.response.data.message ||
          `Error ${error.response.status}: ${error.response.statusText}`
      );
    } else if (error.request) {
      // Errores que suceden al no recibir respuesta
      console.log("No se recibió respuesta:", error.request);
      customError = new Error(
        "Error in the request, please try again in a while"
      );
    } else {
      // Errores que suceden al configurar la solicitud
      console.log("Error en la solicitud:", error.message);
      customError = new Error(
        "Error in the request, please try again in a while"
      );
    }

    return Promise.reject(customError);
  }
);

export default responseMiddleware;
