import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.tsx";
import SeConnecterPage from "./SeConnecterPage.tsx";
import InscriptionPage from "./InscriptionPage.tsx";
import HomePage from "./HomePage.tsx";
import AdminPage from "./AdminPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/App", element: <App /> },
  { path: "/SeConnecterPage", element: <SeConnecterPage /> },
  { path: "/InscriptionPage", element: <InscriptionPage /> },
  { path: "/AdminPage", element: <AdminPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
