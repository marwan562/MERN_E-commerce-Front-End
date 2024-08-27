"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export function useAuthToken() {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };
    fetchToken();
  }, [getToken]);

  return token;
}
