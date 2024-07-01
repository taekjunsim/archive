/**
 * 식량 털기(개미 전사)
 *  n은 창고의 개수 (3 <= n <= 100)
 *  k는 식량의 양 (0 <= k <= 1000)
 */

function soldierAnts(n, arr) {
  let maxArr = new Array(n).fill(0);

  maxArr[0] = arr[0];
  maxArr[1] = Math.max(arr[0], arr[1]);

  for (let i = 2; i < n; i++) {
    maxArr[i] = Math.max(maxArr[i - 1], maxArr[i - 2] + arr[i]);
  }

  return maxArr[n - 1];
}

export default { soldierAnts };

/*
  maxArr[i - 1]은 항상 최대값이기 때문에 이전 값들의 합계가 모두 포함되어 있다.
  그러므로 비교값은 항상 maxArr[i - 1]이지만, arr[i]과 더하는 값은 조건에 따라 달라진다.
  위의 문제는 바로 옆의 값을 더할 수 없었기 때문에 더하는 값이 maxArr[i - 2]이었지만,
  2칸 옆의 값까지 더할 수 없다면 더하는 값은 maxxArr[i - 3]이 된다.
*/
