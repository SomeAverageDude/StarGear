import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import SeConnecterPage from "./SeConnecterPage.tsx";
import InscriptionPage from "./InscriptionPage.tsx";
import HomePage from "./HomePage.tsx";
import JeuxPage from "./jeuxPage.tsx";
import PagePrincipale from "./PagePrincipale.tsx";
import AdminPage from "./AdminPage.tsx";
import AproposPage from "./AproposPage.tsx";
import PanierPage from "./PanierPage.tsx";


const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/Jeu/:id", element: <JeuxPage /> },
  { path: "/SeConnecterPage", element: <SeConnecterPage /> },
  { path: "/InscriptionPage", element: <InscriptionPage /> },
  { path: "/PagePrincipale", element: <PagePrincipale /> },
  { path: "/AdminPage", element: <AdminPage /> },
  { path: "AproposPage", element: <AproposPage /> },
  { path: "/PanierPage", element: <PanierPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer position="top-right" autoClose={3000} theme="dark" />
  </StrictMode>,
);
