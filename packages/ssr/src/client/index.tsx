import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(document, <App assetMap={(window as any).assetMap} />);
