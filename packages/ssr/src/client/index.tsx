import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

hydrateRoot(
  document,
  <BrowserRouter>
    <App assetMap={(window as any).assetMap} />
  </BrowserRouter>
);
