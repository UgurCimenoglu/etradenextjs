import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const CustomQueryClient = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
        onError(err) {
          router.push("/notFound404");
        },
      },
      mutations: {},
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default CustomQueryClient;
