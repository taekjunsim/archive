// https://www.acmicpc.net/problem/2108

const input = `5
1
3
8
-2
2`;

// 시간복잡도 O(nlog n)
const [n, ...lines] = input.split("\n").map(Number);
const length = lines.length;
const dp = {};
const sum = Math.round(lines.reduce((acc, cur) => acc + cur) / length);
const range = Math.max(...lines) - Math.min(...lines);

let mode = 0;
lines.forEach((num) => {
  if (dp[num]) {
    dp[num]++;
  } else {
    dp[num] = 1;
  }
});
const maxCount = Math.max(...Object.values(dp));
const arr = [];
for (const key in dp) {
  if (dp[key] === maxCount) {
    arr.push(key);
  }
}
if (arr.length > 1) {
  arr.sort((a, b) => a - b); // 시간복잡도 O(nlog n)
  mode = arr[1];
} else {
  mode = arr[0];
}

lines.sort((a, b) => a - b);
const mid = lines[Math.floor(length / 2)];

console.log(`${sum}\n${mid}\n${mode}\n${range}`);
