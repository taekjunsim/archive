import Count from "./Count";

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
        <Count />
      </body>
    </html>
  );
}
