// https://www.acmicpc.net/problem/1920

const input = `5
4 1 5 2 3
5
1 3 7 9 5`;

const [n, nInput, m, mInput] = input.split("\n");
const dp = {};
const nArr = nInput.trim().split(" ");
const mArr = mInput.trim().split(" ");

nArr.forEach((str) => {
  dp[str] = true;
});

const result = mArr.reduce((acc, cur) => {
  return `${acc}\n${dp[cur] ? 1 : 0}`;
}, "");

console.log(result.trim());
