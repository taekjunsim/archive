// https://www.acmicpc.net/problem/24418

const input = `6
1 1 1 1 1 1
2 2 2 2 2 2
3 3 3 3 3 3
4 4 4 4 4 4 
5 5 5 5 5 5
6 6 6 6 6 6`;

const [n] = input.split("\n");
const arr = Array.from({ length: Number(n) + 1 }, (_, rowIndex) => {
  return Array.from({ length: Number(n) + 1 }, (_, columnIndex) => {
    return 1;
  });
});

let dpCount = 0;
for (let i = 1; i <= Number(n); i++) {
  for (let j = 1; j <= Number(n); j++) {
    dpCount++;
    arr[i][j] = arr[i - 1][j] + arr[i][j - 1];
  }
}

console.log(arr[Number(n)][Number(n)], dpCount);

/*
1. 총 이동 횟수는 오른쪽으로 (n-1)번, 아래쪽으로 (n-1)번 가능하기 때문에 총 2(n-1)번
i.g. n = 3일 때, (1, 1)에서 (3, 3)까지 가기 위해서는 총 4번을 이동해야 한다.

2. 오른쪽을 R, 아래쪽을 D라고 하면 R 또는 D를 최대 n-1번까지 선택 가능
i.g. n = 3일 때, 오른쪽으로 최대 2칸, 아래쪽으로 최대 2칸 움직일 수 있다.

3. 즉, (n x n) 행렬에서 (1, 1)부터 (n, n)까지 경로의 수는 2(n-1)Combination(n-1)개
i.g. n = 5일 때, 8Combination4
*/

