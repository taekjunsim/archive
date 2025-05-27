/** @jsxImportSource @emotion/react */

export default function Queue({ queue }) {
  return (
    <>
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
    </>
  );
}

const queueWrapper = {
  position: "relative",
  display: "flex",
  gap: "12px",
  minHeight: "50px",
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
    default:
      return "white";
  }
};

const task = (el) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90px",
  border: "1px solid black",
  color: backgroundColor(el) === "white" ? "black" : "white",
  backgroundColor: backgroundColor(el),
});
