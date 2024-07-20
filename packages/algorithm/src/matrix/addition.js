/**
 * Array의 fill 메소드에 인자로 참조 타입(객체, 배열 등)을 전달하면
 * 배열의 각 요소는 하나의 주소값을 가진다.
    e.g. 
    const arr = Array(3).fill({}); // [{}, {}, {}]
    arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
 * 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
 */

const matrixAddition = () => {
  const test = `3 3
  1 1 1
  2 2 2
  0 1 0
  3 3 3
  4 4 4
  5 5 100`;

  const [nm, ...arr] = test.trim().split("\n");
  const [n, m] = nm.trim().split(" ").map(Number);
  const matrix = [];
  const result = new Array(n).fill(0).map((_) => []);

  for (let i = 0; i < arr.length / n; i++) {
    matrix[i] = arr.slice(i * n, (i + 1) * n).map((el) => {
      return el.trim().split(" ").map(Number);
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result[i][j] = matrix[0][i][j] + matrix[1][i][j];
    }
    result[i] = result[i].join(" ");
  }

  console.log(result.join("\n"));
};

export default matrixAddition;
