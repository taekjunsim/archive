// https://www.acmicpc.net/problem/15829

const input = `22
zzzzzzzzzzzzzzzzzzzzzz`;

const [n, strings] = input.split("\n");
const r = BigInt(31);
const m = BigInt(1234567891);
const arr = strings.split("");
let result = BigInt(0);
for (let i = 0; i < Number(n); i++) {
  const charAscii = BigInt(arr[i].charCodeAt() - 96)

  // GOOD
  result = (result + BigInt(charAscii % m) * BigInt(r ** BigInt(i) % m)) % m;

  // BAD: r ** i에서 오버플로우 발생
  // result += BigInt((charAscii * r ** i) % m);
}

console.log(result.toString());

// (a * b) % m = ((a % m) * (b % m)) % m
