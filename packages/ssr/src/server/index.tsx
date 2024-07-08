const fs = require("fs");
const path = require("path");
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../client/App";

const app = express();

app.use("/", express.static("dist/client"));

const cssFile = fs.readFileSync(
  path.resolve(__dirname, "../client/static/css/main.css"),
  "utf8"
);

const manifest = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../client/asset-manifest.json"),
    "utf8"
  )
);

app.use("/", (req, res) => {
  console.log(cssFile);
  const { pipe } = renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App assetMap={manifest} />
    </StaticRouter>,
    {
      bootstrapScripts: [manifest["main.js"]],
      bootstrapScriptContent: `window.assetMap = ${JSON.stringify(manifest)};`,
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
