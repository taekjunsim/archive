import { insertionSort } from "util/sorts/insertionSort";
import { selectionSort } from "util/sorts/selectionSort";

export default function App() {
  insertionSort([4, 3, 2, 1, 5, -5, 20, 17]);
  selectionSort([4, 3, 2, 1, 5, -5, 20, 17]);

  return <div>Algorithm Packages</div>;
}
