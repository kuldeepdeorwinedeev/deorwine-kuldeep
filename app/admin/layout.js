"use client";
import DashboardLayout from "./layout/dashboard";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>{children}</DashboardLayout>
    </QueryClientProvider>
  );
}
