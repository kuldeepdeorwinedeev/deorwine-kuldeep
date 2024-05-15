"use client";
import DashboardLayout from "./layout/dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import ThemeProvider from "./theme";

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
