import { useState } from "react";

export default function Count() {
  const [count, setCount] = useState(0);

  console.log(count);

  return (
    <div>
      Count: {count}
      <button onClick={() => setCount((count) => count + 1)}>test</button>
    </div>
  );
}
