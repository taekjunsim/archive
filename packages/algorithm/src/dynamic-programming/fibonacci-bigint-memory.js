const input = 40;

let a = BigInt(0)
let b = BigInt(1)

for(let i = 2; i <= input + 1; i++) {
  let temp = a
  a = b
  b = a + temp
}

console.log((a * BigInt(2) + b * BigInt(2)).toString())

// 이전 값을 사용하는게 아니라면 array 대신 temp 변수를 사용하는게 메모리 측면에서 이득
// BigInt는 무조건 BigInt 자료형끼리만 연산이 가능하다.
// BigInt와 Int를 연산하면 Cannot mix BigInt and other types, use explicit conversions 에러가 노출
