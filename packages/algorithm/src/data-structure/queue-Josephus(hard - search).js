// https://www.acmicpc.net/problem/11866

const input = `7 3`;
const [n, k] = input.split(" ").map(Number);
const result = [];

// GOOD
const arr = Array.from({ length: n }, (_, i) => i + 1);
let idx = 0;

while (arr.length) {
  idx = (idx + k - 1) % arr.length;
  result.push(arr.splice(idx, 1)[0]);
}

console.log(`<${result.join(", ")}>`);


// BAD - 시간 초과: index를 모두 돌기 때문에 O(n * k)
const dp = Array.from({ length: n }, (_, i) => {
  return i + 1;
}).reduce((acc, cur) => {
  acc[cur] = 1;
  return acc;
}, {});
let i = 1;
let gap = 1;

while (result.length < n) {
  const key = i % n || 7;
  if (dp[key]) {
    if (gap === k) {
      result.push(key);
      delete dp[key];
      gap = 1;
    } else {
      gap++;
    }
  }

  i++;
}

console.log(`<${result.join(", ")}>`);

/*
Queue를 구현할 때 항상 객체 형식이 최선인 것은 아니다.
요세푸스 문제처럼 **순환 구조와 인덱스 기반 삭제**가 필요한 경우엔 배열을 쓰는 게 훨씬 효율적이다.
*/
