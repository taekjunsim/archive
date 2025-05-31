// https://www.acmicpc.net/problem/10845
const input = `15
push 1
push 2
front
back
size
empty
pop
pop
pop
size
empty
pop
push 3
empty
front`;

const [n, ...lines] = input.split("\n");

// GOOD
class Queue {
  constructor() {
    this.queue = {};
    this.head = 0;
    this.rear = 0;
  }

  push(value) {
    this.rear += 1;
    this.queue[this.rear] = value;
  }

  pop() {
    if (this.head === this.rear) {
      return -1;
    }

    this.head += 1;
    const value = this.queue[this.head];
    delete this.queue[this.head];
    return value;
  }

  size() {
    return this.rear - this.head;
  }

  empty() {
    return this.rear - this.head ? 0 : 1;
  }

  front() {
    return this.queue[this.head + 1] || -1;
  }

  back() {
    return this.queue[this.rear] || -1;
  }
}

const queue = new Queue();
const arr = [];

lines.forEach((line) => {
  const [command, value] = line.trim().split(" ");
  if (value) {
    queue[command](value);
  } else {
    arr.push(queue[command]());
  }
});

console.log(arr.join("\n"));


// BAD  - head === 0 && rear === 0일 때와 hear === 1 && rear === 1일 때 결과가 달라서 예외처리가 추가로 필요
class Queue {
  constructor() {
    this.queue = {};
    this.head = 0;
    this.rear = 0;
  }

  push(value) {
    if (this.head === 0) this.head = 1;
    this.rear += 1;
    this.queue[this.rear] = value;
  }

  pop() {
    if (this.head > this.rear) {
      return -1;
    }

    const value = this.queue[this.head];
    delete this.queue[this.head];
    this.head += 1;
    return value;
  }

  size() {
    if (!this.rear || !this.head) return 0;
    return this.rear - this.head + 1;
  }

  empty() {
    if (!this.rear || !this.head) return 1;
    return this.rear >= this.head ? 0 : 1;
  }

  front() {
    return this.queue[this.head] || -1;
  }

  back() {
    return this.queue[this.rear] || -1;
  }
}

const queue = new Queue();
const arr = [];

lines.forEach((line) => {
  const [command, value] = line.trim().split(" ");
  if (value) {
    queue[command](value);
  } else {
    arr.push(queue[command]());
  }
});

console.log(arr.join("\n"));


/*
if (this.head === 0) this.head = 1; 하나의 예외로 인해 더 많은 예외처리가 필요해졌다.
**예외처리는 함부로 하지 말자. 편법은 통하지 않는다.**
*/
