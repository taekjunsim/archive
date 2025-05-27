export default function Movie() {
  const n = 10000;
  let number = 666;
  let result = 1;

  while (result < n) {
    number++;

    if (number.toString().includes("666")) {
      result++;
    }

    if (result === n) {
      console.log(number);
      break;
    }
  }
}
