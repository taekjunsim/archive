// https://www.acmicpc.net/problem/10816

const input = `10
6 3 2 10 10 10 -10 -10 7 3
8
10 9 -5 2 3 4 5 -10`;

const [n, nInput, m, mInput] = input.split("\n");

// GOOD - 시간복잡도 O(n + m)
const nDp = nInput
  .trim()
  .split(" ")
  .reduce((acc, cur) => {
    if (cur in acc) {
      acc[cur] += 1;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});

const result = mInput
  .trim()
  .split(" ")
  .map((num) => {
    if (num in nDp) {
      return nDp[num];
    } else {
      return 0;
    }
  });

console.log(result.join(" "));


// BAD - 시간 초과
const mArray = mInput.trim().split(" ");
const mDp = mArray.reduce((acc, cur) => {
  if (acc[cur]) return acc;
  return {
    ...acc, // 객체를 새로 복사하기 때문에 시간복잡도 O(m^2)
    [cur]: 0,
  };
/*
- 개선 코드: 시간복잡도 O(n + m)
  if (!(cur in acc)) acc[cur] = 0;
  return acc;
*/
}, {});



nInput
  .trim()
  .split(" ")
  .forEach((num) => {
    if (num in mDp) {
      mDp[num] += 1;
    } else {
      mDp[num] = 0;
    }
  });

const result = mArray.map((num) => mDp[num]);
console.log(result.join(" "));
