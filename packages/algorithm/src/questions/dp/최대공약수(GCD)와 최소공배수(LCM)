const input = "24 30";
const [a, b] = input.split(" ").map(Number);

// 3 - 유클리드 호제법(ChatGPT, 시간복잡도 O(log n), 공간복잡도 O(1))
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// 4 - 유클리드 호제법(시간복잡도 O(log n), 공간복잡도 O(1))
function gcd(a, b) {
  let c = a;
  let d = b;
  while (d !== 0) {
    let temp = d;
    d = c % d;
    c = temp;
  }
  return c;
}

// 2 - 구현(시간복잡도 O(n), 공간복잡도 O(1))
if (a % b === 0) {
  console.log(`${b}\n${a}`);
} else if (b % a === 0) {
  console.log(`${a}\n${b}`);
} else {
  let goc = 0;

  for (let i = 1; i < Math.max(a, b) / 2; i++) {
    if (a % i === 0 && b % i === 0) {
      goc = goc > i ? goc : i;
    }
  }
  console.log(`${goc}\n${(a * b) / goc}`);
}

// 1 - 구현(시간복잡도 O(n), 공간복잡도 O(1))
if (a % b === 0) {
  console.log(`${b}\n${a}`);
} else if (b % a === 0) {
  console.log(`${a}\n${b}`);
} else {
  const aMeasures = [];
  const bMeasures = [];
  const aSqrt = Math.sqrt(a);
  const bSqrt = Math.sqrt(b);

  for (let i = 1; i < Math.max(aSqrt, bSqrt); i++) {
    if (i <= aSqrt && a % i === 0) {
      aMeasures.push(i);
      aMeasures.push(a / i);
    }

    if (i <= bSqrt && b % i === 0) {
      bMeasures.push(i);
      bMeasures.push(b / i);
    }
  }
  aMeasures.sort((a, b) => a - b);
  bMeasures.sort((a, b) => a - b);

  const shorterArr =
    aMeasures.length >= bMeasures.length ? bMeasures : aMeasures;
  const longerArr = aMeasures.length < bMeasures.length ? bMeasures : aMeasures;
  const goc = shorterArr.reduce((acc, cur) => {
    if (longerArr.includes(cur)) {
      return cur > acc ? cur : acc;
    }
    return acc;
  }, 0);

  console.log(`${goc}\n${(a * b) / goc}`);
}





const lcm = (a * b) / gcd(a, b);
console.log(gcd(a, b), lcm);
