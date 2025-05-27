// https://www.acmicpc.net/problem/11050

const input = `5 2`;
const [n, r] = input.split(" ").map(Number);

// 2 - 0부터 시작하므로 array가 파스칼의 삼각형과는 모양이 다르지만 더 직관적으로 이해 가능
const arr = new Array(n + 2).fill(0).map((_, i) => {
  return new Array(i + 1).fill(1);
});

for (let i = 2; i < n + 2; i++) {
  for (let j = 1; j < i; j++) {
    arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
  }
}
console.log(arr[n][r]);


// 1 - 2부터 시작하므로 array가 파스칼의 삼각형과 동일하지만 헷갈릴 여지가 많음
const arr = new Array(n).fill(0).map((_, i) => {
  return new Array(i + 2).fill(1);
});

for (let i = 1; i < n; i++) {
  for (let j = 1; j < i + 2; j++) {
    if (i + 1 === j) continue;
    arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
  }
}
console.log(arr[n - 1][r]);
