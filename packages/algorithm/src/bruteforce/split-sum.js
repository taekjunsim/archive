export default function SplitSum() {
  const question = 256;
  // let b = question.toString().length * 9;
  let result = 0;

  // while (true) {
  //   let a = (question - b).toString();

  //   const sum = a
  //     .split("")
  //     .map((el) => Number(el))
  //     .reduce((acc, cur) => acc + cur);

  //   if (sum === b) {
  //     result = Number(a);
  //     break;
  //   }

  //   if (b === 1) {
  //     break;
  //   }

  //   b--;
  // }

  const check = (a, b) => {
    let c = (a - b).toString();
    const sum = c
      .split("")
      .map((el) => Number(el))
      .reduce((acc, cur) => acc + cur);

    if (sum === b) {
      return (result = Number(c));
    }

    if (b === 1) {
      return;
    }

    check(a, b - 1);
  };

  check(question, question.toString().length * 9);

  console.log(result);
}

// N = a + b, b = 1, a = N - 1
// a의 자리수 확인 후 b의 최대값 계산
// a의 각각의 자리수의 합이 b와 일치하면 result에 a 값을 저장
// b에 1씩 더하면서 b가 최대값에 도달할 때까지 반복
// result에 값이 없을 때는 0을 반환
