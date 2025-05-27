export default function CoinSum() {
  const question = `1 600
100`;

  const [nm, ...kind] = question.trim().split("\n");
  let [count, sum] = nm.split(" ").map((el) => Number(el));
  let result = 0;

  for (let i = count - 1; i >= 0; i--) {
    if (Number(kind[i]) > sum) {
      continue;
    }

    if (sum % Number(kind[i]) === 0) {
      result += Math.floor(sum / Number(kind[i]));
      break;
    }

    const divider = Math.floor(sum / Number(kind[i]));
    result += divider;
    sum -= Number(kind[i]) * divider;
  }
  console.log(result);
}
