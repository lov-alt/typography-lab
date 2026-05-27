import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { I18nProvider } from "./i18n/index";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import Editor from "./pages/Editor";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [
    { index: true, element: <Home /> },
    { path: ":id", element: <Editor /> },
  ]},
]);

createRoot(document.getElementById("root")!).render(
  <I18nProvider><RouterProvider router={router} /></I18nProvider>
);
