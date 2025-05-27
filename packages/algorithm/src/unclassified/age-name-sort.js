// https://www.acmicpc.net/problem/10814

const input = `3
21 Junkyu
21 Dohyun
20 Sunyoung`;

// 2. 시간복잡도: O(n)
const [n, ...lines] = input.trim().split("\n");

const members = lines.map((line, index) => {
  const [age, name] = line.split(" ");
  return { age: Number(age), name, index };
});

members.sort((a, b) => {
  if (a.age === b.age) return a.index - b.index;
  return a.age - b.age;
});

let result = "";
for (const member of members) {
  result += `${member.age} ${member.name}\n`;
}

console.log(result);

// 1. 시간복잡도: O(n^2)
const [n, ...questions] = input.split("\n");
const dp = {};
questions.forEach((question) => {
  const [age, name] = question.split(" ");
  if (dp[age]) {
    return (dp[age] = [...dp[age], name]); // 배열 복사로 인해 O(n^2)
  }
  return (dp[age] = [name]);
});

const result = Object.keys(dp)
  .map(Number)
  .sort((a, b) => a - b)
  .map((key) => {
    return dp[key]
      .map((el) => {
        return `${key} ${el}\n`;
      })
      .join("");
  });

console.log(result.join(""));
