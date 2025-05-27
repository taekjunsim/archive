// https://www.acmicpc.net/problem/1181

const input = `13
but
i
wont
hesitate
no
more
no
more
it
cannot
wait
im
yours`;

const [n, ...strings] = input.split("\n");

// 2 - 시간복잡도 O(nlog n)
const setArr = [...new Set(strings)];

const result = setArr.sort((a, b) => {
  if (a.length !== b.length) {
    return a.length - b.length;
  } else {
    return a.localeCompare(b);
  }
});
console.log(result);

// 1 - 시간복잡도 O(n^2)
const max = Math.max(...strings.map((str) => str.length));
const arr = new Array(max + 1).fill([]); // Array.from({ length: max + 1 }, () => [])로 수정

strings.forEach((str) => {
  if (arr[str.length].includes(str)) return;
  arr[str.length] = [...arr[str.length], str].sort();
});

const result = arr.reduce((acc, cur) => {
  if (!cur.length) return acc;
  return acc ? `${acc}\n${cur.join("\n")}` : cur.join("\n");
}, "");

console.log(result);

/*
// fill: 하나의 배열 객체를 모든 요소에 복사
const arr = new Array(3).fill([])
arr[0].push(1);
console.log(arr) // [1], [1], [1] // arr[0] === arr[1] === arr[2]

// from: 매 요소마다 새로운 배열 생성
const arr = Array.from({ length: 3 }, () => []);
arr[0].push(1);
console.log(arr) // [1], [], [] // arr[0] !== arr[1] !== arr[2]
*/

