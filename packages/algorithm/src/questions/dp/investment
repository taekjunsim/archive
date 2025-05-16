// https://www.acmicpc.net/problem/19947
const investment = 25542;
const period = 10;
const arr = [];

// BAD - dp 요건을 찾지 못하고 수학으로 시도
{
for (let i = 0; i <= period / 5; i++) {
  for (let j = 0; j <= period / 3; j++) {
    if (5 * i + 3 * j > period) break;
    arr.push([i, j, period - (5 * i + 3 * j)]);
  }
}
const rate5y = 1.35;
const rate3y = 1.2;
const rate1y = 1.05;

const contrastArray = arr.map(([n5, n3, n1]) => {
  return rate5y ** n5 * rate3y ** n3 * rate1y ** n1;
});

const max = Math.max(...contrastArray);
const index = contrastArray.indexOf(max);

const result = arr[index].reduce((acc, cur, index) => {
  const rate = index === 2 ? rate1y : index === 1 ? rate3y : rate5y;
  let price = acc;
  for (let i = 1; i <= cur; i++) {
    price = Math.floor(price * rate);
  }
  return price;
}, cost);

console.log(result);
}

// GOOD - 당해 최대 금액은 1년 전, 3년 전, 5년 전 최대 금액에서 이율을 곱한 결과 중 최대값이다.
{
const arr = new Array(period + 1).fill(0);

arr[0] = investment;

for (let i = 1; i <= period; i++) {
  if (i >= 5) {
    arr[i] = Math.floor(
      Math.max(arr[i - 5] * 1.35, arr[i - 3] * 1.2, arr[i - 1] * 1.05)
    );
    continue;
  }

  if (i >= 3) {
    arr[i] = Math.floor(Math.max(arr[i - 3] * 1.2, arr[i - 1] * 1.05));
    continue;
  }

  arr[i] = Math.floor(arr[i - 1] * 1.05);
}

console.log(Math.max(...arr));
}

// 참고: https://small-stap.tistory.com/7
