// https://www.acmicpc.net/problem/24499

/*
원이라 순환이 가능하니 나머지로 인덱스를 잡아야겠네
for(let i = 0; i < n + k; i++)
  i % n
*/

const input = `4 3
5 2 3 4`;

const [nk, line] = input.split("\n");
const [n, k] = nk.split(" ").map(Number);
const pieValues = line.split(" ").map(Number);

let sum = 0;
for (let i = 0; i < k; i++) {
  sum += pieValues[i % n];
}

let result = sum;
for (let i = k; i < n + k; i++) {
  sum += pieValues[i % n] - pieValues[i - k];
  result = Math.max(result, sum);
}

console.log(result);
