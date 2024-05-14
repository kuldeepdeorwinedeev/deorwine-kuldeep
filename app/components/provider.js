"use client";
import React, { useState } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "react-query";

function Provider({ children }) {
  const [client] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={client}>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export { Provider };
