// https://www.acmicpc.net/problem/11650

const input = `5
3 4
1 1
1 -1
2 2
3 3`;

const [n, ...lines] = input.split("\n");

// 2 - 시간복잡도 O(nlog n), 다만 불필요하게 반복하는 split/parse를 제거
const points = lines.map(line => line.split(" ").map(Number));
points.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

console.log(points.map(([x, y]) => `${x} ${y}`).join("\n"));


// 1 - 시간복잡도 O(nlog n)
lines.sort((a, b) => {
  const [aX, aY] = a.split(" ");
  const [bX, bY] = b.split(" ");
  const aXNum = Number(aX);
  const aYNum = Number(aY);
  const bXNum = Number(bX);
  const bYNum = Number(bY);
  if (aXNum === bXNum) {
    return aYNum - bYNum;
  }
  return aXNum - bXNum;
});

console.log(lines.join(`\n`));

/*
map 함수가 중첩된다고 무조건 O(n^2)은 아니다.

map과 split 함수 자체는 O(1)의 시간복잡도를 가진다.
lines.map 함수가 O(n)인 이유는 map이 lines의 length인 n번 실행되기 때문이다.

즉, lines.map이 O(n)이고 내부의 split과 map은 1번만 실행되기 때문에 O(1)이다.
*/
