"use client";
import { UserView } from "../sections/user/view";
import { QueryClient, QueryClientProvider } from "react-query";
export default function UserPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserView />
    </QueryClientProvider>
  );
}
