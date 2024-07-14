/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

export default function Event() {
  const [text, setText] = useState("");
  const [eventFire, setEventFire] = useState([]);
  const [activeQueue, setActiveQueue] = useState(false);

  const handleCompositionStart = (e) => {
    setEventFire((prev) => [...prev, "start"]);
  };

  const handleCompositionEnd = (e) => {
    setEventFire((prev) => [...prev, "end"]);
  };

  const handleInput = (e) => {
    setEventFire((prev) => [...prev, "input"]);
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setEventFire((prev) => [...prev, "change"]);
  };

  const handleQueue = (isActive) => {
    setActiveQueue(isActive);
  };

  useEffect(() => {
    if (!eventFire.length) return;
    if (!activeQueue) return;

    const interval = setInterval(() => {
      setEventFire((prev) => {
        const arr = [...prev];
        return arr.slice(1, prev.length);
      });
    }, 500);

    return () => {
      clearInterval(interval);
    }; // strictMode에서는 cleanup 함수가 필요한거구나.
  }, [activeQueue]);

  return (
    <div>
      <h1>Event</h1>
      <input
        style={{ marginBottom: "20px" }}
        value={text}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onInput={handleInput}
        onChange={handleChange}
      />
      <button onClick={() => handleQueue(true)}>Start Queue</button>
      <button onClick={() => handleQueue(false)}>Stop Queue</button>
      <button onClick={() => setEventFire([])}>Empty Queue</button>
      <p>Queue</p>
      <div
        css={{
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
        }}
      >
        {eventFire.map((el, index) => {
          return (
            <div
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60px",
                border: "1px solid black",
                color: "white",
                backgroundColor: backgroundColor(el),
              }}
              key={`${el}_${index}`}
            >
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
