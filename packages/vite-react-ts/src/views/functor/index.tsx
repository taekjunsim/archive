import React from "react";

export default function Functor() {
  return <></>;
}

interface Functor<T> {
  map<U>(f: (x: T) => U): Functor<U>;
  // test<U>(f: (x: T) => U): Functor<U>;
}

class Just<T> implements Functor<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
  map<U>(callback: (x: T) => U) {
    return new Just<U>(callback(this.value));
  }
  // test<U>(callback: (x: T) => U) {
  //   return new Just<U>(callback(this.value));
  // }
}

class Test<T> extends Just<T> {
  value: T;

  constructor(value: T) {
    super(value);
    this.value = value;
  }
  map<U>(callback: (x: T) => U) {
    return new Just<U>(callback(this.value));
  }
  // test<U>(callback: (x: T) => U) {
  //   return new Test<U>(callback(this.value));
  // }
  test = <U extends unknown>(callback: (x: T) => U) => {
    return new Test<U>(callback(this.value));
  };
}

const test = new Just(3).map((v) => v + 1000);

const check = new Test(3)
  .test((v) => v + 1000)
  .test((v) => {
    return v.toString();
  })
  .test((v) => {
    return v.length;
  });

// console.log(check);

/**
 * 참고: https://hoilzz.github.io/javascript/arrow-functions-in-class-properties/
 */

class A {
  handleClick = () => {
    // handleClick은 window 객체에 this binding 됨, 고로 A 클래스에는 handleClick이 존재하지 않는다고 판단한다.
    console.log("A.handleClick", this);
  };
  handleLongClick() {
    console.log("A.handleLLLLongClick", this);
  }
}

class B extends A {
  // 오버라이딩, B 클래스의 handleClick은 A 클래스에 this binding 됨.
  handleClick = () => {
    super.handleLongClick();
    // A 클래스의 handleClick을 호출 (참)
    // super는 A 클래스의 prototype을 참조 (참)
    // ** 하지만 A 클래스의 prototype에 handleClick이 없음 **

    // public도 아니고 protected도 아니라서 super 키워드로 접근이 불가능하다.
    // 화살표 함수로 선언하면 public도 아니고 protected도 아니다.
    // 왜 public과 protected가 아니지? 이게 this와 연관이 있는건가?

    console.log("B.handleClick");
  };
}

new B().handleClick();

class C {
  handleClick() {
    console.log("C.handleClick");
  }
}

class D extends C {
  // 오버라이딩
  handleClick() {
    super.handleClick();

    console.log("D.handleClick");
  }
}

new D().handleClick();

///////////

// class Overloading {
//   test(a: number) {
//     console.log("a:", a);
//   }

//   test(a: number, b: number) {
//     console.log("a:", a, "b:", b);
//   }
// }

// new Overloading().test = function (a: number, b: number) {
//   console.log("a:", a, "b:", b);
// };

/** Overloading
 *  	하나의 클래스 내에서 파라미터의 개수 또는 타입은 다르지만 메소드명은 동일한 메소드를 정의하는 것을 말한다.
 */
class Overloading {
  // 함수 시그니처
  test(a: number): void;
  test(a: number, b: number): void;
  test(a: number, b?: number): void {
    // 함수 구현부
    if (b === undefined) {
      console.log("a:", a);
    } else {
      console.log("a:", a, "b:", b);
    }
  }
}

// // 테스트
// const instance: {
//   test(a: number, b: number, c: number): void;
// } = new Overloading();
// instance.test(10); // 출력: a: 10
// instance.test(10, 20); // 출력: a: 10 b: 20
