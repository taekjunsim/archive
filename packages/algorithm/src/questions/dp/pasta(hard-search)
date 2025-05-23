// https://www.acmicpc.net/problem/25214

const input = `6
50 100 70 110 10 100`;
const [n, question] = input.split("\n");
const arr = question.trim().split(" ").map(Number);

// GOOD
let min = arr[0];
let result = [0];

for (let i = 1; i < Number(n); i++) {
  min = Math.min(min, arr[i]);
  result[i] = Math.max(arr[i] - min, result[i - 1]);
}

console.log(result.join(" "));


// BAD
let min = Infinity;
let max = 0;
let result = [];

for (let i = 0; i < Number(n); i++) {
  min = Math.min(min, arr[i]);
  max = max > arr[i] ? 0 : arr[i];
  result[i] = max ? max - min : result[i - 1];
}

console.log(result.join(" "));

/*
// BAD Case 반례
input
- `6
4 4 1 3 1 2`;

answer 
- 0 0 0 2 2 2

ouput
- 0 0 0 2 2 1
 */

 // 이전의 최대 diff가 항상 갱신되는 것은 아니다
