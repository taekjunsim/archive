/**
 * 금광
 *  nm = 금광 넓이 (1 <= n, m <= 20)
 *  count = 각 금광에 매장된 금의 개수 (1 <= count <= 100)
 */

/**
 * [
 *   [1, 3, 3, 1],
 *   [2, 1, 4, 1],
 *   [0, 6, 4, 7]
 * ]
 *
 * n(행)이 모두 이동한 후에 m(열)이 하나씩 이동
 * up&down은 n이 변경, left는 m이 변경
 * n의 index가 0일 때 leftUp은 0
 * n의 index가 n - 1일 때 leftDown은 0
 */

function goldMine(nm, count) {
  const [n, m] = nm.split(" ");
  const countArr = count.split(" ");
  const arr = [];
  const intN = Number(n);
  const intM = Number(m);

  for (let i = 0; i < countArr.length / m; i++) {
    const startIndex = i * m;
    arr.push(countArr.slice(startIndex, startIndex + intM));
  }

  for (let j = 1; j < intM; j++) {
    for (let i = 0; i < intN; i++) {
      let leftDown = 0;
      let left = Number(arr[i][j]) + Number(arr[i][j - 1]);
      let leftUp = 0;

      if (i !== 0) {
        leftUp = Number(arr[i][j]) + Number(arr[i - 1][j - 1]);
      }

      if (i !== n - 1) {
        leftDown = Number(arr[i][j]) + Number(arr[i + 1][j - 1]);
      }

      arr[i][j] = Math.max(leftDown, left, leftUp);
    }
  }

  return Math.max(arr[n]);
}

export default goldMine;
