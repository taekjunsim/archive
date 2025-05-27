// https://www.acmicpc.net/problem/15624

const input = 100000;
let index = 0;

// 2
let result = 0;
let b = 1;
let temp = 0;
const divider = 1000000007;

while (input > index) {
  if (result >= divider) result %= divider;
  if (b >= divider) b %= divider;
  temp = result + b;
  result = b;
  b = temp;
  index++;
}

console.log(result.toString());


// 1 - 시간 초과
let result = BigInt(0);
let b = BigInt(1);
let temp = BigInt(0);
const divider = BigInt(1000000007);

while (input > index) {
  temp = result + b;
  result = b;
  b = temp;
  index++;
}

console.log(
  result >= divider ? (result % divider).toString() : result.toString()
);

// BigInt의 연산이 Number의 연산보다 느리기 때문에 시간 초과 발생
// ** n번째 수를 구하는 문제와 n번째 수를 r로 나눈 나머지를 구하라는 문제는 접근 방법이 다르다. **
