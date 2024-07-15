/** @jsxImportSource @emotion/react */
import { useState } from "react";
import useQueue from "./useQueue";

export default function Composition() {
  const [text, setText] = useState("");
  const { queue, handleQueue, handleRunQueue } = useQueue();

  const handleCompositionStart = (e) => {
    handleQueue("start");
  };

  const handleCompositionEnd = (e) => {
    handleQueue("end");
  };

  const handleInput = (e) => {
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
      <p>Queue</p>
      <div css={queueWrapper}>
        {queue.map((el, index) => {
          return (
            <div css={task(el)} key={`${el}_${index}`}>
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
}
const container = {
  marginBottom: "40px",
};

const queueWrapper = {
  position: "relative",
  display: "flex",
  gap: "12px",
  height: "50px",
  margin: "0 40px",
  padding: "8px 0",
  borderTop: "1px solid black",
  borderBottom: "1px solid black",

  "&::before": {
    content: "'→'",
    position: "absolute",
    top: "22px",
    left: "-20px",
    transform: "rotate(180deg)",
  },
};

const backgroundColor = (el) => {
  switch (el) {
    case "start":
      return "green";
    case "end":
      return "black";
    case "input":
      return "blue";
    case "change":
      return "red";
  }
};

const task = (el) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "60px",
  border: "1px solid black",
  color: "white",
  backgroundColor: backgroundColor(el),
});
