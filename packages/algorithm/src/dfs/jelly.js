// https://www.acmicpc.net/problem/16173
const input = `3
1 1 1
1 1 1
1 1 -1`;

const [n, ...lines] = input.split("\n");
const visited = {};

for (let y = 0; y < Number(n); y++) {
  for (let x = 0; x < Number(n); x++) {
    visited[`${x} ${y}`] = false;
  }
}

const dx = 1;
const dy = 1;

// GOOD
const dfs = (map, [x, y], visited) => {
  const key = `${x} ${y}`;
  if(x >= n || y >= n || visited[key]) return;
  if (map[y][x] === -1) {
    result = 'HaruHaru'
    return null;
  }

  visited[key] = true;

  const newX = map[y][x] * dx + x;
  const newY = map[y][x] * dy + y;
  dfs(map, [newX, y], visited);
  dfs(map, [x, newY], visited);
};

// BAD - 테스트 케이스는 통과하지만 fail
const dfs = (map, [x, y], visited) => {
  if (map[y][x] === -1) {
    return "HaruHaru";
  }

  const key = `${x} ${y}`;

  if (visited[key]) {
    return null;
  }

  visited[key] = true;

  const newX = map[y][x] * dx + x;
  if (newX >= n) {
    return null;
  } else {
    dfs(map, [newX, y], visited);
  }

  const newY = map[y][x] * dy + y;
  if (newY >= n) {
    return null;
  } else {
    dfs(map, [x, newY], visited);
  }
};

dfs(
  lines.map((line) => line.split(" ").map(Number)),
  [0, 0],
  visited
);

/*
예외처리는 시작 단계에서 하는게 안전하다.
*/
