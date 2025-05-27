const question = 100;
// BAD
const arr = new Array(question || 1).fill(0);
arr[1] = 1

for(let i = 2; i <= question; i++) {
  arr[i] = arr[i - 1] + arr[i - 2];
}

console.log(BigInt(arr[question]).toString())
// 런타임에러(RangeError) 발생 원인
// - 정수 오버플로우 발생 가능
// - Number 타입의 덧셈을 사용하기 때문에 arr[question]이 커질수록 정확도 손실이 생김
// - 특히 question이 커지면 (>= 80 이상부터) 오차 또는 오버플로우가 발생함
// - 마지막에만 BigInt()로 감싸봤자 이미 잘못된 값이므로 무의미

// GOOD
const arr = new Array(question || 1).fill(BigInt(0));
arr[1] = BigInt(1)

for(let i = 2; i <= question; i++) {
  arr[i] = arr[i - 1] + arr[i - 2];
}

console.log(question ? arr[question].toString() : 0)

// BEST
let a = BigInt(0), b = BigInt(1);

for (let i = 2; i <= question; i++) {
  const temp = a + b;
  a = b;
  b = temp;
}

console.log(question ? b.toString() : 0);
