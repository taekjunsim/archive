const arr = new Array(input).fill(0);
arr[1] = 1;

for(let i = 2; i <= input; i++) {
  arr[i] = arr[i - 2] + arr[i - 1]
}

console.log(`${arr[input - 1]} ${arr[input]}`)

// https://www.acmicpc.net/problem/9625
// A가 B로 바뀐다는 사실을 문제에 명시했기 때문에 수월했지만 이 규칙을 직접 찾아야하는 경우라면 문제 난이도가 더욱 올라갔을 것이다.
