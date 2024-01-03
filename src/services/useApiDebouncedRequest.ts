import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

// TODO: check dataErrorValidations

const useApiDebouncedRequest = <T>(
  options: AxiosRequestConfig,
  minimumCharacters?: number
): { data: T | null; loading: boolean; error: any } => {
  try {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let url = "";
    let searchTerm: string | undefined = "";

    if (options.url) {
      url = options.url;
      searchTerm = url.split("/").pop();
    } else {
      throw new Error("url is required");
    }

    async function fetchData() {
      try {
        const response = await axios(options);
        console.log("response.data", response.data);
        setData(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      console.log("ejecutando el useEffect con searchTerm", searchTerm);

      if (
        (minimumCharacters &&
          searchTerm &&
          searchTerm.length < minimumCharacters) ||
        !searchTerm
      ) {
        setData(null);
        setLoading(false);
        setError(null);
        return;
      }

      fetchData();
    }, [options.url]);

    return { data, loading, error };
  } catch (error: any) {
    console.log("Error in useApiDebouncedRequest", error);
    return error;
  }
};

export default useApiDebouncedRequest;
