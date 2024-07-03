const fs = require("fs");
const path = require("path");
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../client/App";

const app = express();

app.use("/", express.static("dist/client"));

function getManifest() {
  const manifestPath = path.resolve(__dirname, "../client/asset-manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  return manifest;
}

app.use("/", (req, res) => {
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App assetMap={getManifest()} />
    </StaticRouter>,
    {
      bootstrapScripts: [getManifest()["main.js"]],
      bootstrapScriptContent: `window.assetMap = ${JSON.stringify(
        getManifest()
      )};`,
      onShellReady() {
        res.setHeader("content-type", "text/html");
        pipe(res);
      },
    }
  );
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
