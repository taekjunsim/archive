// https://www.acmicpc.net/problem/24417

const n = 45;

const divider = 1000000007;
let dpCount = 0;

const dpFib = (max) => {
  let a = 1;
  let b = 1;
  let temp = 0;
  
  for (let i = 3; i <= max; i++) {
    dpCount++;
    
    if(a > divider || b > divider) {
      a %= divider
      b %= divider
    }
    temp = a + b;
    a = b;
    b = temp
  }
  
  return b % divider;
};

console.log(`${dpFib(n)} ${dpCount}`);

// 재귀로 계산하더라도 f(5) = f(4) + f(3)이므로 f(4)의 실행횟수와 f(3)의 실행횟수를 더하면 f(5)의 실행횟수가 된다.
// 즉 재귀로 연산한 횟수는 n번째 피보나치 수와 같다.
