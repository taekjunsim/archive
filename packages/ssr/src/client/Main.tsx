import { useState } from "react";
import styles from "./Main.module.css";

export default function Main() {
  const [count, setCount] = useState(0);

  return (
    <div>
      Main Page Count: {count}
      <button onClick={() => setCount((count) => count + 1)}>button</button>
    </div>
  );
}
