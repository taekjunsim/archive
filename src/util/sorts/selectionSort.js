// [4, 3, 2, 1, 5, -5, 20, 17]

// 선택정렬: 제일 작은 수를 선택해서 가장 왼쪽으로 보내는 방법
export function selectionSort(arr) {
  const result = [...arr];

  // swap 방법
  // 1. 임시 변수 선언 (currentVal)
  result.forEach((currentVal, i) => {
    const sliceArr = result.slice(i);
    const min = Math.min(...sliceArr);
    const minIndex = result.findIndex((num) => num === min);

    result[i] = min;
    result[minIndex] = currentVal;
  });

  // 2. 구조 분해 할당
  //    ex) const arr = [1, 2, 3, 4, 5];
  //        [arr[1], arr[2], arr[4]] = [arr[2], arr[4], arr[1]];
  //        1, 2, 4번 index에 원본 배열의 2, 4, 1 index의 값을 삽입
  // for (let i = 0; i < result.length; i++) {
  //   const sliceArr = result.slice(i);
  //   const min = Math.min(...sliceArr);
  //   const minIndex = result.findIndex((num) => num === min);

  //   [result[i], result[minIndex]] = [min, result[i]];
  // }

  return result;
}

// [4, 3, 2, 1, 5, -5, 20, 17]
// i = 0, [-5, 3, 2, 1, 5, 4, 20, 17]
// i = 1, [-5, 1, 2, 3, 5, 4, 20, 17]
// i = 2, [-5, 1, 2, 3, 5, 4, 20, 17]
// i = 3, [-5, 1, 2, 3, 5, 4, 20, 17]
// i = 4, [-5, 1, 2, 3, 4, 5, 20, 17]
// i = 5, [-5, 1, 2, 3, 4, 5, 20, 17]
// i = 6, [-5, 1, 2, 3, 4, 5, 17, 20]
// i = 7, [-5, 1, 2, 3, 4, 5, 17, 20]
