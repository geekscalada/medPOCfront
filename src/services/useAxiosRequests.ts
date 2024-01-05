import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

// TODO: check dataErrorValidations

const useAxiosRequests = <T>(
  options: AxiosRequestConfig
): { data: T | null; loading: boolean; error: any } => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | AxiosError | null>(null);

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
