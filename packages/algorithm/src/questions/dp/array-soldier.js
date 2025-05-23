/**
 * 병사 배치하기
 *  n = 병사의 수 (1 <= n <= 2000)
 *  str = 병사의 전투력
 */

function arraySoldier(n, str) {
  const soldierApArr = str.split(" ");
  const arr = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (Number(soldierApArr[j]) > Number(soldierApArr[i])) {
        arr[i] = Math.max(arr[i], arr[j] + 1);
      }
    }
  }

  return n - Math.max(...arr);
}

/**
 * 단편적으로 접근
 * 문제의 핵심은 전투력을 내림차순으로 나열할 수 있는 병사의 최대 수를 구하는 것 (LIS알고리즘)
 * 총 병사의 수에서 나열된 병사의 수를 제외하면 열외시킨 병사의 수를 파악할 수 있다.
 */
function wrong(n, str) {
  const arr = str.split(" ");

  const result = arr.reduce((sum, soldier, i) => {
    const nextSoldier = arr[i + 1];
    if (Number(soldier) < Number(nextSoldier)) {
      return sum + 1;
    }

    return sum;
  }, 0);

  return result;
}

export default arraySoldier;
