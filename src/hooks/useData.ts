import { AxiosRequestConfig } from "axios";
import { useEffect, useRef, useState } from "react";
import apiClient from "../services/api-client";

const useData = <T>(
  endpoint: string,
  requestConfig: AxiosRequestConfig = {},
  deps: any[] = []
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef<number>(0);

  useEffect(
    () => {
      const currentRequestId = ++requestIdRef.current;
      let isMounted = true;

      const fetchData = async () => {
        // Only abort if we have a previous controller
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        // Create new controller
        controllerRef.current = new AbortController();

        try {
          setLoading(true);
          setError("");

          const res = await apiClient.get<T>(endpoint, {
            signal: controllerRef.current.signal,
            ...requestConfig,
          });

          // Only update state if this is still the most recent request
          // and the component is still mounted
          if (isMounted && currentRequestId === requestIdRef.current) {
            setData(res.data);
            setError("");
            setLoading(false);
          }
        } catch (err: any) {
          // Only set error if the request wasn't aborted and this is still
          // the most recent request and component is mounted
          if (
            isMounted &&
            currentRequestId === requestIdRef.current &&
            err.name !== "CanceledError" &&
            err.name !== "AbortError"
          ) {
            setError(err.response?.data?.status_message || err.message);
            setLoading(false);
          }
        }
      };

      fetchData();

      return () => {
        isMounted = false;
        if (controllerRef.current) {
          controllerRef.current.abort();
        }
      };
    },
    deps ? [...deps, endpoint] : [endpoint]
  );

  return { data, error, isLoading };
};

export default useData;
