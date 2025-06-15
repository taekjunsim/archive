// https://www.acmicpc.net/problem/10025

const [nk, ...lines] = input.split("\n");
const [n, k] = nk.split(" ").map(Number);

// BETTER - 시간복잡도 O(maxK)
const arr = Array.from({ length: 1000001 }, () => 0);
let sum = 0;
let maxPosition = 0;
let result = 0;

lines.forEach((line) => {
  const [iceValue, position] = line.split(" ").map(Number);
  arr[position] = iceValue;
  maxPosition = Math.max(position, maxPosition);
});

let K = 2 * k + 1

for (let i = 0; i <= maxPosition; i++) {
  if (i >= K) {
    sum -= arr[i - K];
  }
  sum += arr[i];
  result = Math.max(result, sum)
}

console.log(result);

// GOOD - 시간복잡도 O(nlog n + maxPosition)
const icesObj = lines.reduce((acc, cur) => {
  const [iceValue, position] = cur.split(" ").map(Number);
  acc[position] = iceValue;
  return acc;
}, {});

let sum = 0;
for (let i = 0; i < 2 * k + 1; i++) {
  if (!icesObj[i]) continue;
  sum += icesObj[i];
}

let max = sum;

const maxPosition = lines
  .sort((a, b) => { // O(nlog n)
    const [, aPosition] = a.split(" ").map(Number);
    const [, bPosition] = b.split(" ").map(Number);
    return aPosition - bPosition;
  })
  [lines.length - 1].split(" ")
  .map(Number)[1];

for (let i = 2 * k + 1; i <= maxPosition; i++) {
  const currentValue = icesObj[i] || 0;
  const prevValue = icesObj[i - (2 * k + 1)] || 0;
  sum += currentValue - prevValue;
  max = Math.max(sum, max);
}

console.log(max);

// BAD - position 0을 누락
const icesObj = lines.reduce((acc, cur) => {
  const [iceValue, position] = cur.split(" ").map(Number);
  acc[position] = iceValue;
  return acc;
}, {});

let sum = 0;
for (let i = 1; i <= 2 * k + 1; i++) {
  if (!icesObj[i]) continue;
  sum += icesObj[i];
}

let max = sum;

const maxPosition = lines
  .sort((a, b) => {
    const [, aPosition] = a.split(" ").map(Number);
    const [, bPosition] = b.split(" ").map(Number);
    return aPosition - bPosition;
  })
  [lines.length - 1].split(" ")
  .map(Number)[1];

for (let i = 2 * k + 2; i <= maxPosition; i++) {
  const currentValue = icesObj[i] || 0;
  const prevValue = icesObj[i - (2 * k + 1)] || 0;
  sum += currentValue - prevValue;
  max = Math.max(sum, max);
}

console.log(max);
