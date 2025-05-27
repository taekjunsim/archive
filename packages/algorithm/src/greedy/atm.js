export default function ATM() {
  const question = `5
3 1 4 3 2`;

  const [n, times] = question.trim().split("\n");
  const time = times
    .trim()
    .split(" ")
    .map((el) => Number(el))
    .sort((a, b) => a - b);
  let sum = 0;
  let result = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      sum += time[j];
    }

    result += sum;
    sum = 0;
  }

  // 시간이 제일 적게 걸리는 사람은 a * n
  // 그 다음 사람은 b * (n - 1)
  // 마지막은 c * 1
  // 결과를 모두 더하면 answer
  console.log(result);
}
