// https://www.acmicpc.net/problem/13699

const input = 25;
const arr = new Array(input + 1).fill(0);
arr[0] = BigInt(1);

for(let i = 1; i <= input; i++) {
  for(let j = 0; j < i; j++) {
    if(arr[i]) {
      arr[i] += arr[j] * arr[i - 1 - j]
    } else {
      arr[i] = arr[j] * arr[i - 1 - j]
    }
  }
}

console.log(arr[input].toString())

// 수열 = 특정 규칙에 따라 배열된 숫자의 나열
// 점화식 = 수열의 규칙을 식으로 표현 
// i.g. 수열 1, 3, 5, 7, 9, ... 가 있을 때 2n - 1이라는 점화식으로 표현이 가능
