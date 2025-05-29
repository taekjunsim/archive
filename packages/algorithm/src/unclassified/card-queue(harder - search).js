// https://www.acmicpc.net/problem/2164

const input = 7;
const n = Number(input);

{
  class Queue {
    constructor() {
      this.queue = {};
      this.front = 0;
      this.rear = 0;
      this.size = 0;
    }

    enQueue(value) {
      this.rear++;
      this.queue[this.rear] = value;
      this.size = this.rear - this.front;
    }

    deQueue() {
      if (this.size === 0) {
        this.front = 0;
        return;
      }
      this.front++;
      this.size = this.rear - this.front;

      const value = this.queue[this.front];
      delete this.queue[this.front];
      return value;
    }
  }

  // BETTER
  const queue = new Queue();
  for (let i = 1; i <= n; i++) {
    queue.enQueue(i);
  }
  if (n % 2) {
    queue.enQueue(queue.deQueue());
  }

  while (queue.size > 1) {
    queue.deQueue();
    queue.enQueue(queue.deQueue());
  }

  console.log(queue.queue[queue.rear]);

  // GOOD - 시간복잡도 O(n) 1/2n과 n은 O(n)이므로 홀수를 뺄 이유가 없다.
  if (n === 1) {
    console.log(1);
  } else {
    const queue = new Queue();
    for (let i = 1; i <= n / 2; i++) {
      queue.enQueue(i * 2);
    }
    if (n % 2) {
      queue.enQueue(queue.deQueue());
    }

    while (queue.size > 1) {
      queue.deQueue();
      queue.enQueue(queue.deQueue());
    }

    console.log(queue.queue[queue.rear]);
  }

  // BAD - 99% (input: 1일 때, output: undefined, answer: 1)
  const queue = new Queue();
  for (let i = 1; i <= n / 2; i++) {
    queue.enQueue(i * 2);
  }
  if (n % 2) {
    queue.enQueue(queue.deQueue());
  }

  while (queue.size > 1) {
    queue.deQueue();
    queue.enQueue(queue.deQueue());
  }

  console.log(queue.queue[queue.rear]);
}

  
// BAD - 시간 초과
const arr = Array.from({ length: Number(input) }, (_, i) => i + 1);

while (arr.length > 1) {
  arr.shift();
  const last = arr.shift();
  arr.push(last);
}

console.log(arr);

/*
Queue를 생각하지 못하고 공식을 찾느라 30분 허비
Queue를 배열로 구현해서 시간초과

앞으로 **Queue는 객체**로 구현하는걸로

p.s. 나중에 다시 한 번 읽어도 좋을 글이라 남겨둠
알고리즘 문제 풀이의 즐거움 중 하나는 꼭 출제자가 의도한 대로 풀지 않더라도 제한 시간 안에 항상 올바르게 동작하는 코드라면 
다 정답이 된다는 점이 아닐까 싶습니다. 현실에서 우리가 마주하게 되는 문제들에서 대개의 경우 
"출제자의 의도" 같은 것이 없다는 것을 생각하면 오히려 이것이 문제 풀이의 본질에 가까울 수도 있겠다는 생각을 해봅니다.
이와 별개로, 시간복잡도의 개념을 정확히 이해하는 것이 중요합니다. 
문제에서 요구하는 시간복잡도가 어떻게 되는지 알고, 내가 떠올린 풀이가 최악의 경우에도 시간 안에 돌아갈 지를 
직접 코드를 짜보지 않고도 알 수 있어야 합니다.
예컨대, '리스트를 이용하여 문제에 주어진 방식 그대로 시뮬레이션 한다면 
리스트의 맨 앞에서 원소를 지우는 연산이 O(N)이므로 총 시간복잡도가 O(N^2)이 되어서 시간 초과여서 안된다' 라고 생각하셨다면 훌륭합니다. 
여기에서 큐라는 자료구조를 알고 있고, 큐의 맨 앞에서 원소를 지우는 연산은 리스트와 다르게 O(1)이므로 
총 시간복잡도가 O(N)이어서 괜찮다는 사실까지 떠올릴 수 있으면 완벽합니다.

큐를 떠올리지 못해서 다른 풀이를 고민하기 시작했었다면 자료구조 공부를 더 하면 되는 것인데, 
만약 큐를 떠올렸음에도 '큐를 이용해도 결과적으로 문제에서 시키는 그대로 막노동을 시키면 시간 초과가 될거야'라는 
막연한 생각으로 이를 배제했다면 시간복잡도에 대한 이해가 필요한 상황입니다.
작성하신 풀이는 왜 시간 안에 동작하는지 또한 시간복잡도의 개념으로 정확히 파악할 수 있어야 합니다.
출처: https://www.acmicpc.net/board/view/160086
*/
