"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

const useSessionData = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const result = document.cookie.match(new RegExp("(^| )auth_token=([^;]+)"));
    if (result?.[2]) {
      setAuthToken(result[2]);
    }
  }, []);

  const { data, error, isLoading } = api.user.getUser.useQuery(
    { token: authToken || "" },
    {
      enabled: !!authToken,
    },
  );

  return { data, isLoading, error };
};

export default useSessionData;
