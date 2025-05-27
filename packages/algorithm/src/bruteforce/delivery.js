export default function SugarDelivery() {
  const n = "9";
  const num = Number(n);
  let result = Infinity;
  let a = 0;
  while (3 * a < num) {
    if ((num - 3 * a) % 5) {
      if (num % 3 === 0) {
        result = Math.min(num / 3, result);
      }
      a++;
      continue;
    }

    const divider = (num - 3 * a) / 5;
    result = Math.min(a + divider, result);
    a++;
  }

  console.log(result === Infinity ? -1 : result);

  return <div>Algorithm Packages</div>;
}
