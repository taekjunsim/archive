// https://www.acmicpc.net/problem/7568

const input = `5
55 185
58 183
88 186
60 175
46 155`;

const [n, ...lines] = input.split("\n");

// GOOD
const result = Array.from({ length: n }, () => 1);
for (let i = 0; i < n; i++) {
  const [aWeight, aHeight] = lines[i].split(" ").map(Number);
  for (let j = 0; j < n; j++) {
    const [bWeight, bHeight] = lines[j].split(" ").map(Number);
    if (aWeight > bWeight && aHeight > bHeight) {
      result[j]++;
    }
  }
}

console.log(result.join(" "));


// BAD - fail이 되는 이유가 뭘까
const obj = lines.reduce((acc, cur) => {
  acc[cur] = 1;
  return acc;
}, {});

const sortedLines = lines.sort((a, b) => {
  const [aWeight] = a.split(' ').map(Number);
  const [bWeight] = b.split(' ').map(Number);
  return aWeight - bWeight
});

sortedLines.forEach((target, index) => {
  const [targetWeight, targetHeight] = target.split(" ").map(Number);
  for (let i = index + 1; i < sortedLines.length; i++) {
    const [weight, height] = sortedLines[i].split(" ").map(Number);
    if (targetWeight < weight && targetHeight < height) {
      obj[target]++;
    }
  }
});

console.log(Object.values(obj).join(" "));

/*
몸무게와 키 둘 다 큰 경우에만 등수에 +1을 해주기 때문에 몸무게로 정렬하고 키를 비교하기로 가정
예시는 통과하지만 제출했을 때 fail
아직 반례는 찾지 못함
*/
