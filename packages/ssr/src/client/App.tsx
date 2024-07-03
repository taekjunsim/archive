import Count from "./Count";
import { Routes, Route } from "react-router-dom";
import Main from "./Main";

type PropsType = {
  assetMap: { [key: string]: string };
};

export default function App({ assetMap }: PropsType) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={assetMap["main.css"]}></link>
        <title>My app</title>
      </head>
      <body>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Count />} />
        </Routes>
      </body>
    </html>
  );
}
