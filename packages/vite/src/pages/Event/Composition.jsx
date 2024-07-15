/** @jsxImportSource @emotion/react */
import { useState } from "react";
import useQueue from "./useQueue";
import Queue from "./Queue";

export default function Composition() {
  const [text, setText] = useState("");
  const { queue, handleQueue, handleRunQueue } = useQueue();

  const handleCompositionStart = () => {
    handleQueue("start");
  };

  const handleCompositionEnd = () => {
    handleQueue("end");
  };

  const handleInput = () => {
    handleQueue("input");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    handleQueue("change");
  };

  return (
    <div css={container}>
      <h3>Composition Event</h3>
      <input
        style={{ marginBottom: "20px" }}
        value={text}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onInput={handleInput}
        onChange={handleChange}
      />
      <button onClick={() => handleRunQueue(true)}>Start Queue</button>
      <button onClick={() => handleRunQueue(false)}>Stop Queue</button>
      <button onClick={() => handleQueue()}>Empty Queue</button>
      <Queue queue={queue} />
    </div>
  );
}
const container = {
  marginBottom: "40px",
};
