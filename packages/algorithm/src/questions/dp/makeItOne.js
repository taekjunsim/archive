/**
 * 1로 만들기
 *  1 <= x <= 30,000
 */

function makeItOne(x) {
  // 0을 제외
  const arr = new Array(x + 1).fill(0);

  for (let i = 2; i < x + 1; i++) {
    arr[i] = arr[i - 1] + 1;

    if (i % 2 === 0) {
      arr[i] = Math.min(arr[i], arr[i / 2] + 1);
    }

    if (i % 3 === 0) {
      arr[i] = Math.min(arr[i], arr[i / 3] + 1);
    }

    if (i % 5 === 0) {
      arr[i] = Math.min(arr[i], arr[i / 5] + 1);
    }
  }

  return arr;
}

export default makeItOne;
