import { Outlet, Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "../layout/dashboard/index";
import IndexPage from "src/pages/app";
import BlogPage from "src/pages/blog";
import UserPage from "src/pages/user";
import LoginPage from "src/pages/login";
import ProductsPage from "src/pages/products";
import Page404 from "src/pages/page-not-found";

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
