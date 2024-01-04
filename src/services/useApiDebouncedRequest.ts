import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

// TODO: check dataErrorValidations

const useApiDebouncedRequest = <T>(
  options: AxiosRequestConfig,
  minimumCharacters?: number
): { data: T | null; loading: boolean; error: any } => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | AxiosError | null>(null);

  let url = "";
  let searchTerm: string | undefined = "";

  async function fetchData() {
    try {
      const response = await axios(options);
      setData(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (options.url) {
      url = options.url;
      searchTerm = url.split("/").pop();
    } else {
      const error = new Error("An url is needed to make the request");

      setError(error);
      setLoading(false);
      return;
    }

    if (
      (minimumCharacters &&
        searchTerm &&
        searchTerm.length < minimumCharacters) ||
      !searchTerm
    ) {
      // If the searchTerm is less than the minimumCharacters, we don't want to make the request
      // and we want send null data and set loading to false.
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    fetchData();
  }, [options.url]);

  return { data, loading, error };
};

export default useApiDebouncedRequest;
