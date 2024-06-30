import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import App from "../client/App";

const app = express();

app.use("/", express.static("dist/client"));

app.use("/", (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ["/main.js"], // localhost.com/main.js, html을 받자마자 스크립트를 다운로드
    onShellReady() {
      res.setHeader("content-type", "text/html");
      pipe(res); // pipe 메소드의 output이 html
    },
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
