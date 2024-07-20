/**
 * 색종이
 *  처음에는 모든 색종이의 넓이를 더한 후 중첩되는 영역을 계산해서 총 넓이 - 중첩되는 영역으로 면적을 구하는 로직을 짰다.
 *  하지만 특정 영역이 여러 번 중첩되는 경우 중첩될 때마다 해당 영역을 빼버려서 실제 면적보다 적은 값이 나오는 이슈가 있었다.
      e.g. 
      (3, 7), (3, 7), (5, 2)일 때 총 면적은 160이 나와야 하지만 120을 리턴
 *  
 *  그래서 도화지를 2차원 배열로 생성 후 이미 색칠된 영역은 pass하는 방법으로 로직을 수정    
 */

const test = `3
    3 7
    15 7
    5 2`;

const [testCase, ...coloredPaper] = test.trim().split("\n");
const width = 10;
const height = 10;

function nestingArea() {
  const matrix = new Array(100).fill([]).map((_) => new Array(100).fill(0));
  let sum = 0;

  for (let i = 0; i < testCase; i++) {
    const [minX, minY] = coloredPaper[i].trim().split(" ").map(Number);

    for (let x = minX; x < minX + width; x++) {
      for (let y = minY; y < minY + height; y++) {
        if (matrix[x][y] === 1) continue;

        matrix[x][y] = 1;
        sum += 1;
      }
    }
  }

  console.log(`${sum}`);
}

export default nestingArea;

// nestingArea가 중첩되는 경우에 대한 예외처리 필요
function draft() {
  const area = 100 * Number(testCase);
  const matrix = coloredPaper.map((el) => {
    return el.trim().split(" ").map(Number);
  });
  let nestingArea = 0;

  for (let i = 0; i < matrix.length - 1; i++) {
    for (let x = i + 1; x < matrix.length; x++) {
      const minX = Math.min(matrix[i][x], matrix[x][x]);
      const maxX = Math.max(matrix[i][x], matrix[x][x]);
      const minY = Math.min(matrix[i][y], matrix[x][y]);
      const maxY = Math.max(matrix[i][y], matrix[x][y]);

      const xDiff = minX + width - maxX;
      const yDiff = minY + height - maxY;
      if (xDiff < 0 || yDiff < 0) continue;

      nestingArea += xDiff * yDiff;
    }
  }

  console.log(`${area - nestingArea}`);
}
