const input = 8
const arr = new Array(input + 1).fill(0);

for(let i = 1; i <= input; i++) {
  const half = i / 2;
  if(i % 2 === 1) {
    // 홀수
    const floor = Math.floor(half)
    const ceil = Math.ceil(half)
    arr[i] = floor * ceil + arr[floor] + arr[ceil]
  } else {
    // 짝수
    arr[i] = half * half + arr[half] * 2
  }
}

console.log(arr[input])

// https://www.acmicpc.net/problem/14606
// 계산이 중복으로 발생해서 이전 계산 값을 저장해놓고 재사용하는게 더 낫겠다는 생각이 들면 우선 dp를 의심
// 그리고 아래 조건을 모두 만족할 때 dp를 적용
// 1. 최적 부분 구조 - 큰 문제의 최적해가 작은 문제들의 최적해로 구성됨
// 2. 중복되는 부분 문제 - 동일한 작은 문제를 여러 번 계산하게 됨	
