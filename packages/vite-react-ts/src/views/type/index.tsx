{
  // 타입 앨리어스에서 interface로 타입 확장
  // 1. 타입 앨리어스에서 타입을 병합하는 방법 = &
  // 2. interface에서 타입을 상속받아 확장하는 방법 = extends
  type TestType = { name: string };

  interface TypeAssignTest extends TestType {
    age: number;
  }

  const Test = () => {
    const person: TypeAssignTest = {
      name: "",
      age: 0,
    };
  };
}

{
  // 타입 호환
  // 교집합일 떄만 할당이 가능하다.
  interface Empty<T> {}

  interface NotEmpty<T> {
    data: T;
  }

  const Test = () => {
    let empty1: Empty<string> = {};
    let empty2: Empty<number> = {};
    empty2 = empty1;
    empty1 = empty2;

    let notempty1: NotEmpty<string> = { data: "" };
    let notempty2: NotEmpty<number> = { data: 0 };
    // notempty2 = notempty1; // error, Type 'NotEmpty<string>' is not assignable to type 'NotEmpty<number>'. Type 'string' is not assignable to type 'number'.
  };
}

export default function Test() {
  return (
    <>
      <div>Test</div>
    </>
  );
}
