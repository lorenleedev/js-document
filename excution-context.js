/**
 * Execution Context 코드가 실행이되는데 필요한 환경
 * Execution: 동일한 조건(환경)을 지니는 코드뭉치
 * Context: 를 실행할 때 필요한 조건/환경정보
 *
 * 자바스크립트에서 동일한 조건을 가질 수 있는 것은 전역공간, 함수, eval, module 네 가지이다.
 * 전역공간: 자바스크립트 코드가 실행되는 순간 전역 콘텍스트가 생성, 전체 코드가 끝날 때 전역 콘텍스트가 종료된다. 하나의 거대한 함수 공간.
 * module: 어딘가에서 module 코드가 import되는 순간에 module 콘텍스트가 생성되고, 그 module 코드가 전부 끝났을 때 module 콘텍스트가 종료된다. 하나의 함수 공간.
 * 즉, 전역공간 module 모두 함수다. 다시 말하면 실행 컨텍스트는 함수를 실행할 때 필요한 환경 정보를 담은 객체이다.
 * if/for/switch/white문은 블록스코프로 별개의 실행 컨텍스트를 생성하지는 않는다.
 */

var a = 1;
function outer() {
  console.log(a); // 1] 1

  function inner() {
    console.log(a); // 2] undefined
    var a = 3;
  }

  inner();

  console.log(a); // 3] 1
}
outer();
console.log(a); // 4] 1

/**
 * call stack
 * 현재 어떤 함수가 동작중인디, 다음에 어떤 함수가 호출될 예정인지 등을 제어하는 자료구조
 */

/**
 * 실행 컨텍스트의 내부에는 세 가지 환경정보가 담긴다.
 * VariableEnvironment: 현재 환경과 관련된 식별자 정보들, 식별자 정보 수집
 * LexicalEnvironment: 현재 환경과 관련된 식별자 정보들, 각 식별자의 '데이터'추적
 * ThisBinding
 */

/**
 * Lexical Environment는 어휘적/사전적 환경
 * 실행컨텍스트를 구성하는 황경 정보들을 모아 사전처럼 구성한 객체
 * 예) 실행컨텍스트 A의 사전
 * 내부식별자 a: 현재 값은 undefined이다.
 * 내부식별자 b: 현재 값은 20이다.
 * 외부 정보: D를 참조한다.
 *
 * Lexical Environment안에는 두 가지가 있다.
 * 1. environmentRecord: 현재 문맥의 식별자 정보
 * 실행컨텍스트가 생성될 때 가장 먼저 현재 문맥의 식별자 정보를 수집한다. => hoisting
 * 호이스팅: 식별자 정보를 실행컨텍스트의 가장 위로 끌어올린다.
 */

console.log(aa());
console.log(bb());
console.log(cc());

function aa() {
  return 'a';
}

var bb = function b() {
  return 'b';
}

var cc = () => {
  return 'c';
}

/**
 * 위 코드가 실행 될 때, 실행컨텍스트는 다음 처럼 코드를 만든다.
 * function aa() {} -> 함수 선언문은 전체를 끌어올림.
 * var bb; -> 이외의 것들은 변수만 끌어올림
 * var cc;
 * console.log(aa());
 * console.log(bb());
 * console.log(cc());
 *
 * b = function b() {...}
 * c = () => {...}
 *
 * 결과
 * environmentRecord
 * {
 *   function a() {...},
 *   b: undefined,
 *   c: undefined
 * }
 */


/**
 * outerEnvironmentReference 외부 환경 참조
 * 현재 문맥과 관련있는 외부 식별자 정보를 참조한다. 예를 들어 위에 inner함수가 콜스택에 있는 동안에는
 * outer함수의 LexicalEnvironment를 참조한다. ==> 스코프(변수의 유효범위) 체인 현상이 만들어짐.
 * 스코프 체인 형상은? 변수를 찾을 때 먼저 자기 자신부터 멀리있는 스코프로 변수를 찾아나가는 것을 말한다.
 */

/**
 * 위 코드의 실행 순서
 * 0. Global Execution Context 활성화
 * [전역컨텍스트] 1. 변수 a 선언
 *             2. 함수 outer 선언
 *             3 변수 a에 1 할당
 *             4. outer함수 호출 -> Outer Execution Context 활성화
 *    [Outer컨텍스트] 5. 함수 inner 선언
 *                  6. a를 탐색, 전역컨텍스트에서 찾아 1출력
 *                  7. inner함수 호출, Inner Execution Context 활성화
 *      [Inner컨텍스트] 8. 변수 a선언
 *                    9. inner컨텍스트에서 a를 탐색, undefined 출력
 *                    10. a에 3할당
 *                  11. inner 컨텍스트 종료
 *                  12. outer 컨텍스트에서 a 탐색 -> 전역 컨텍스트에서 탐색, 1출력
 *              13. outer 컨텍스트 종료
 *              14. 전역컨텍스트에서 a 탐색 -> 1 출력
 * 15. 전역컨테스트 종료
 */

