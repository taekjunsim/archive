// https://www.acmicpc.net/problem/9012


const input = `6
(())())
(((()())()
(()())((()))
((()()(()))(((())))()
()()()()(()()())()
(()((())()(`;

const [n, ...lines] = input.split("\n");

// GOOD
lines.forEach((line) => {
  const stack = [];
  const result = line
    .trim()
    .split("")
    .map((parenthesis) => {
      if (parenthesis === "(") {
        stack.push("(");
      } else {
        return stack.length ? stack.pop() : parenthesis
      }
    });
    console.log(stack.length || result.includes(")") ? 'NO' : 'YES');
});


// BAD - input: '))', output: 'YES', answer: 'NO'
lines.forEach((line) => {
  const stack = [];
  line
    .trim()
    .split("")
    .forEach((parenthesis) => {
      if (parenthesis === "(") {
        stack.push("(");
      } else {
        stack.length ? stack.pop() : stack.push(")"); // '('가 들어가지 않고 ')'가 짝수로 들어가면 stack이 비워지는 경우가 발생
      }
    });
  console.log(stack.length ? "NO" : "YES");
});
