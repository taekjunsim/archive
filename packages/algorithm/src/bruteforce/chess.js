export default function Chess() {
  const question = `
11 12
BWWBWWBWWBWW
BWWBWBBWWBWW
WBWWBWBBWWBW
BWWBWBBWWBWW
WBWWBWBBWWBW
BWWBWBBWWBWW
WBWWBWBBWWBW
BWWBWBWWWBWW
WBWWBWBBWWBW
BWWBWBBWWBWW
WBWWBWBBWWBW
  `;

  const [mn, ...board] = question.trim().split("\n");
  const [m, n] = mn.split(" ");
  const boardArr = board.map((row) => row.split(""));

  let rowIndex = 0;
  let columnIndex = 0;
  let bFirstCount = 0;
  let wFirstCount = 0;
  let result = Infinity;
  const bFirst = ["B", "W", "B", "W", "B", "W", "B", "W"];
  const wFirst = ["W", "B", "W", "B", "W", "B", "W", "B"];

  while (true) {
    if (columnIndex + 8 > n) {
      columnIndex = 0;
      rowIndex++;
      continue;
    }

    if (rowIndex + 8 > m) {
      console.log(result);
      break;
    }

    for (let row = rowIndex; row < rowIndex + 8; row++) {
      const boardRow = boardArr[row].slice(columnIndex, columnIndex + 8);

      (row % 2 ? wFirst : bFirst).forEach((el, index) => {
        if (el !== boardRow[index]) bFirstCount++;
      });

      (row % 2 ? bFirst : wFirst).forEach((el, index) => {
        if (el !== boardRow[index]) wFirstCount++;
      });
    }

    result = Math.min(result, bFirstCount, wFirstCount);
    bFirstCount = 0;
    wFirstCount = 0;

    columnIndex++;
  }
}
