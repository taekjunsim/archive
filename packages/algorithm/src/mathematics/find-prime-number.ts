function findPrimeNumber() {
  const test = `4
  1 3 5 7`;

  const [testCount, ...testCase] = test.trim().split("\n");
  const arr = testCase.join("").trim().split(" ").map(Number);
  const max = Math.max(...arr);
  const primeNumber = new Array(max + 1).fill(1);
  primeNumber[0] = 0;
  primeNumber[1] = 0;

  for (let i = 2; i <= Math.sqrt(max); i++) {
    let j = 2;
    if (primeNumber[i] === 0) continue;
    while (i * j <= max) {
      primeNumber[i * j] = 0;
      j++;
    }
  }
}
