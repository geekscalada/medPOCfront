import { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

interface dataResponse {
  alergenos: string[];
}

//TODO: implementar axios
//TODO: implement generics for dataType
// TODO: implement options to AxiosRequestConfig
// TODO: check dataErrorValidations

const useApiDebouncedRequest = (
  url: string,
  searchTerm: string,
  minimumCharacters?: number,
  options?: AxiosRequestConfig
): { data: dataResponse | null; loading: boolean; error: any } => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const composedUrl = `${url}/${searchTerm}`;

  async function fetchData() {
    try {
      const response = await fetch(composedUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setData(json);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      (minimumCharacters && searchTerm.length < minimumCharacters) ||
      !searchTerm
    ) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    fetchData();
  }, [searchTerm]);

  return { data, loading, error };
};

export default useApiDebouncedRequest;
