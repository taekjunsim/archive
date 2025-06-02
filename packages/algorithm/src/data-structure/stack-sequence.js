// https://www.acmicpc.net/problem/1874

const input = `8
4
3
6
8
7
5
2
1`;

const [n, ...lines] = input.split("\n").map(Number);
let max = 0;
let stack = [];
let result = [];

// BETTER - 가독성
let isValid = true;

for (let i = 0; i < n; i++) {
  const num = lines[i];
  while (num >= max) {
    stack.push(max++);
    result.push("+");
  }

  const popped = stack.pop();
  if (popped !== num) {
    isValid = false
    break;
  }
  result.push("-");
}

console.log(isValid ? result.join("\n") : 'NO');


// GOOD - 시간복잡도 O(n)
for (let i = 0; i < n; i++) {
  const num = lines[i];
  if (num > max) { // 2-1. push된 적이 없다면 해당 요소의 숫자까지 스택에 push
    for (let j = max + 1; j <= num; j++) {
      stack.push(j);
      result.push("+");
    }
    stack.pop();
    result.push("-");
    max = num;
  }

  if (num < max) { // 2-2. push된 적이 있다면 스택에서 pop한 value와 num을 비교
    const value = stack.pop();
    if (num === value) {
      result.push("-");
    } else {
      result = "NO";
      break;
    }
  }
}

console.log(typeof result === "string" ? result : result.join("\n"));

/*
1. 수열([4, 3, 6, 8, 7, 5, 2, 1])에서 첫 번째 요소인 4에 pointer(index) 위치

2. pointer가 가리키는 요소(이하 num)가 스택에 push된 적이 있는지 체크
  2-1. push된 적이 없다면 해당 요소의 숫자까지 스택에 push
    2-1-1. 스택에서 pop

2-2. push된 적이 있다면 스택에서 pop한 value와 num을 비교
  2-2-1. value와 num이 같다면 pass
    2-2-2. value와 num이 다르다면 실행 종료

3. 1에서 2의 과정을 수열의 마지막 요소까지 반복
*/
