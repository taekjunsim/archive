export default function ThreeCard() {
  const test = `5 21
5 6 7 8 9`;

  const [a, nums] = test.split("\n");
  const [count, target] = a.split(" ").map((el) => Number(el));
  const cards = nums
    .trim()
    .split(" ")
    .map((el) => Number(el));
  let score = 0;
  let firstCard = 0;
  let secondCard = 1;
  let thirdCard = 2;

  // 루프
  // while (firstCard < cards.length - 2) {
  //   const sum = cards[firstCard] + cards[secondCard] + cards[thirdCard];

  //   if (sum === target) {
  //     score = target;
  //     console.log(score);
  //     break;
  //   }

  //   if (sum < target) {
  //     score = score > sum ? score : sum;
  //   }

  //   if (firstCard === cards.length - 3) {
  //     console.log(score);
  //     break;
  //   }

  //   if (secondCard === cards.length - 2) {
  //     firstCard++;
  //     secondCard = firstCard + 1;
  //     thirdCard = secondCard + 1;
  //     continue;
  //   }

  //   if (thirdCard === cards.length - 1) {
  //     secondCard++;
  //     thirdCard = secondCard + 1;
  //     continue;
  //   }

  //   thirdCard++;
  // }

  // 재귀
  const check = (first, second, third) => {
    const sum = cards[first] + cards[second] + cards[third];
    if (sum === target) {
      score = target;
      console.log(score);
      return;
    }

    if (sum < target) {
      score = score > sum ? score : sum;
    }

    if (first === cards.length - 3) {
      console.log(score);
      return;
    }

    if (second === cards.length - 2) {
      check(first + 1, first + 2, first + 3);
      return;
    }

    if (third === cards.length - 1) {
      check(first, second + 1, second + 2);
      return;
    }

    check(first, second, third + 1);
  };

  check(0, 1, 2);
}

// 숫자를 3개 고른다.
// 고른 숫자를 더한다.
// 고른 숫자가 target보다 크면 pass
// 고른 숫자가 target보다 작고 keep한 숫자보다 크면 keep
