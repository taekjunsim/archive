// https://www.acmicpc.net/problem/12891

const input = `5 3
GATGA
1 0 0 1`;

const [ps, dnaString, min] = input.split("\n");
const [p, s] = ps.split(" ").map(Number);
const [A, C, G, T] = min.split(" ").map(Number);
const charIndex = {
  A: "0",
  C: "1",
  G: "2",
  T: "3",
};
const charCountArr = Array.from(
  { length: Object.keys(charIndex).length },
  () => 0
);

let result = 0;

// GOOD
for (let i = 0; i < p; i++) {
  const char = dnaString[i];
  const index = charIndex[char];
  charCountArr[index]++;

  if (i >= s) {
    const prevChar = dnaString[i - s];
    const prevIndex = charIndex[prevChar];
    charCountArr[prevIndex]--;
  }

  if (i >= s - 1) {
    if (
      charCountArr[charIndex["A"]] >= A &&
      charCountArr[charIndex["C"]] >= C &&
      charCountArr[charIndex["G"]] >= G &&
      charCountArr[charIndex["T"]] >= T
    )
      result++;
  }
}


// BAD
for (let i = 0; i < p; i++) {
  const char = dnaString[i];
  const index = charIndex[char];
  charCountArr[index]++;

  if (i >= s) {
    const prevChar = dnaString[i - s];
    const prevIndex = charIndex[prevChar];
    charCountArr[prevIndex]--;
  }

  if (charCountArr.join(" ") === min) {
    result++;
  }
}


console.log(result);
