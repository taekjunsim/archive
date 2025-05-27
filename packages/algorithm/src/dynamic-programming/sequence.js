// https://www.acmicpc.net/problem/2491;

const question = `9
1 2 2 4 4 5 7 7 2`

const [[n], [...arr]] = question.split('\n')
	.map((v) => v.split(' ').map(Number));

const increaseArr = new Array(n).fill(1);
const decreaseArr = new Array(n).fill(1);

for(let i = 0; i < n; i++) {
  if(arr[i] <= arr[i + 1]) {
    increaseArr[i + 1] += increaseArr[i]
  }
  
  if(arr[i] >= arr[i + 1]) {
    decreaseArr[i + 1] += decreaseArr[i]
  }
}

console.log(Math.max(...increaseArr, ...decreaseArr))

// 같은 경우는 중첩 계산이 되게 하면 되는데 커지는 경우, 작아지는 경우, 같은 경우 세 가지로 나누는 바람에 중첩을 놓쳤다. 
// 어떤 값을 저장해야 하는가? - 구하려고 하는 연속적으로 증가한 수의 개수와 연속적으로 감소한 수의 개수를 값으로 저장해야 한다.
