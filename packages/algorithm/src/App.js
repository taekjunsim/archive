import { insertionSort } from "util/sorts/insertionSort";
import { selectionSort } from "util/sorts/selectionSort";
import { bubbleSort } from "util/sorts/bubbleSort";
import questions from "questions";
import matrixAddition from "matrix";

// const arr = new Array(10000).fill(0).map((_, i) => i + 1);
export default function App() {
  // questions.dp.soldierAnts(5, [4, 3, 1, 5, 5])
  // questions.dp.makeItOne(26);
  // questions.dp.currencyComposition([3, 15], 3, 5, 7)
  // questions.dp.goldMine("3 4", "1 3 3 2 2 1 4 1 0 6 4 7");
  questions.dp.arraySoldier(9, "15 11 8 20 17 16 15 7 2");
  // questions.dp.arraySoldier(7, "15 11 4 8 5 2 4");

  console.log(matrixAddition());
  return <div>Algorithm Packages</div>;
}
