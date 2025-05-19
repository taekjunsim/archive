// https://www.acmicpc.net/problem/2670
const question = `8
1.1
0.7
1.3
0.9
1.4
0.8
0.7
1.4`

const [n, ...arr] = question.split('\n').map(Number);

// 11492KB 메모리를 더 많이 차지하네 
for(let i = 0; i < n - 1; i++) {
  arr[i + 1] = arr[i] * arr[i + 1] >= arr[i + 1] ? arr[i] * arr[i + 1] : arr[i + 1]
}

// 11488KB
for(let i = 0; i < n - 1; i++) {
  const multiple = arr[i] * arr[i + 1]
  arr[i + 1] = multiple >= arr[i + 1] ? multiple : arr[i + 1]
}

console.log(Math.max(...arr).toFixed(3))

// 사람이 문제를 푸는 과정을 잘게 쪼개서 알고리즘으로 만드는게 맞네
// 1.1과 0.7을 곱한 후에 1.1과 0.7 그리고 1.3을 곱할지, 0.7과 1.3을 곱할지 구별하는 방법을 !!직관에서 로직!!으로 풀어내는게 중요한거구나.
