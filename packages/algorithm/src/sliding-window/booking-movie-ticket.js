// https://www.acmicpc.net/problem/29700
/*
나란히 앉을 수 있는 최대 좌석 수를 구하는 경우는 범위가 가변적이기 때문에 투포인터를 사용하는 것이 적합
*/

// 가로줄(m)이 동아리원 수(k)보다 큰 경우
// 가로줄(m)이 동아리원 수(k)보다 작은 경우

const input = `3 4 3
1101
0000
0101`;

const [nmk, ...lines] = input.split("\n");
const [n, m, k] = nmk.split(" ").map(Number);
const seats = lines.map((line) => line.split("").map(Number));

const caculateCases = (seats, columns, rows, numbers) => {
  if (numbers > rows) {
    return 0;
  }

  let result = [];
  let count = 0;

  for (let i = 0; i < columns; i++) {
    const emptySeatCount = seats[i].filter((seat) => seat === 0).length;
    if (numbers > emptySeatCount) {
      result.push(count);
      continue;
    }

    let sum = 0;
    for (let j = 0; j < numbers; j++) {
      sum += seats[i][j];
    }

    if (sum === 0) {
      count += 1;
    }

    for (let j = numbers; j < rows; j++) {
      sum += seats[i][j] - seats[i][j - numbers];
      if (sum === 0) {
        count += 1;
      }
    }

    result.push(count);
  }

  return result.reduce((acc, cur) => acc + cur);
};

const cases = caculateCases(seats, n, m, k);
console.log(cases);


