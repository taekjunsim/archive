import { useState } from "react";
import "./count.css";

export default function Count() {
  const [count, setCount] = useState(0);

  // console.log(count);

  return (
    <div className="test">
      Count: {count}
      <button onClick={() => setCount((count) => count + 1)}>test</button>
    </div>
  );
}
