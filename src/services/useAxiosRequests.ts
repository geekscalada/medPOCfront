import { AxiosError, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import useToastService from "../hooks/useToastService";
import responseMiddleware from "../middlewares/responseMiddleware";

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
      const response = await responseMiddleware(options);
      // Check to avoid errors when the response is not a JSON
      // for example in dev environment
      if (response.headers["content-type"]?.includes("application/json")) {
        setData(response.data);
      } else {
        throw new Error("Received non-JSON responseEEEEE");
      }
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
