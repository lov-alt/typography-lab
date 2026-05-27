import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "./i18n/index";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import TypeScale from "./pages/TypeScale";
import FontPairing from "./pages/FontPairing";
import MeasureRhythm from "./pages/MeasureRhythm";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [
    { index: true, element: <Home /> },
    { path: "type-scale", element: <TypeScale /> },
    { path: "font-pairing", element: <FontPairing /> },
    { path: "measure-rhythm", element: <MeasureRhythm /> },
  ]},
]);

createRoot(document.getElementById("root")!).render(
  <I18nProvider><RouterProvider router={router} /></I18nProvider>
);
