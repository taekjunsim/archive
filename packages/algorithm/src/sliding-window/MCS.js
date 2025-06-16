// https://www.acmicpc.net/problem/8933
/*
- join을 쓸 때 구분자를 넣지 않은 경우 발생할 수 있는 문제
  i.g. [0, 11, 2, 1].join('') === [0, 1, 12, 1].join('') === '01121'
*/

const [n, ...lines] = input.split("\n");
const indexs = {
  A: 0,
  G: 1,
  T: 2,
  C: 3,
};

// GOOD
for (let i = 0; i < Number(n); i++) {
  const [k, w] = lines[i].split(" ");
  const K = Number(k);
  if (K > w.length) {
    console.log(0);
    continue;
  }
  const dna = Array.from({ length: 4 }, () => 0); // A, G, T, C
  const result = {};

  for (let j = 0; j < w.length; j++) {
    const currentDnaStr = indexs[w[j]];
    dna[currentDnaStr]++;
    if (j >= K) {
      const prevDnaStr = indexs[w[j - K]];
      dna[prevDnaStr]--;
    }
    result[dna.join(",")] = result[dna.join(",")] ? result[dna.join(",")] + 1 : 1;
  }

  console.log(Math.max(...Object.values(result)));
}


// BAD
for (let i = 0; i < Number(n); i++) {
  const [k, w] = lines[i].split(" ");
  const K = Number(k);
  if (K > w.length) {
    console.log(0);
    continue;
  }
  const dna = Array.from({ length: 4 }, () => 0); // A, G, T, C
  const result = {};

  for (let j = 0; j < w.length; j++) {
    const currentDnaStr = indexs[w[j]];
    dna[currentDnaStr]++;
    if (j >= K) {
      const prevDnaStr = indexs[w[j - K]];
      dna[prevDnaStr]--;
    }
    // [0, 11, 2, 1].join('') === '01121'
    // [0, 1, 12, 1].join('') === '01121'
    result[dna.join("")] = result[dna.join("")] ? result[dna.join("")] + 1 : 1;
  }

  console.log(Math.max(...Object.values(result)));
}

