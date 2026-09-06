import { useState, useEffect } from "react";


export const useReliableFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();
    setIsLoading(true);

    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (isActive) {
          setData(data);
          setError(null);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isActive && err.name !== 'AbortError') {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
      controller.abort()
    }
  }, [url]);
  return { data, error, isLoading };
}