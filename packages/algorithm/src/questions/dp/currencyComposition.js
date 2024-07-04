/**
 * 효율적인 화폐구성: 최소값 찾기
 *  n = 화폐의 개수, (1 <= n <= 100)
 *  m = 가치의 합, (1 <= m <= 10,000)
 *  currency = 화폐 가치의 종류
 */

function currencyComposition(nm, ...currency) {
  const [n, m] = nm;
  const arr = new Array(m + 1).fill(10001);
  arr[0] = 0;

  currency.forEach((price) => {
    for (let i = price; i < m + 1; i++) {
      if (arr[i - price] !== 10001) {
        arr[i] = Math.min(arr[i], arr[i - price] + 1);
      }
    }
  });

  console.log(arr);
  return arr[m] === 10001 ? -1 : arr[m];
}

export default currencyComposition;

/**
 * 빈 값으로 0 대신 10,001을 넣는 이유
 *  1. arr[0]의 값과 구분
 *  2. arr[i]가 0일 경우 Math.min의 return 값은 항상 0
 */
