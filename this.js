/**
 * this바인딩은 실행컨텍스트가 활성화될 때 한다.
 * this는 함수가 호출될때 결정된다. 호출되는 방식에 따라 결정된다. = 동적 바인딩
 *
 * 호출되는 방식
 * 1. 전역공간에서: window/global 전역 객체를 가리킨다.
 * 2. 함수 호출시: window/global
 * 3. 메서드 호출시: 메서드를 호출한 주체
 * 4. callback 호출시: 기본적으로 함수내부에서와 동일
 * 5. 생성자함수 호출시: 인스턴스
 */

/**
 * 2. 함수 호출시: window/global
 */

function a() {
  console.log(this) // window/global
}
a(); // a() === window.a()

function b() {
  function c() {
    console.log(this) // ES5환경에서 window/global
    // b객체여야하는게 아니냐는 의견이 분분, ES6에서는 이 문제를 해결하기 위해 arrow function이 나옴
  }
  c();
}
b();

/**
 * 3. 메서드 호출시: 메서드를 호출한 주체
 */

var d = {
  e: function() {
    console.log(this); // d, 클래스처럼 동작하는 거임.
    function f() {
      console.log(this); // window/global
    }
    f();
  }
}
d.e();

var a = {
  b: {
    c: function() {
      console.log(this); // a.c
    }
  }
}
a.b.c();

/**
 * call, apply, bind
 * 첫번째 인자로 this가 될 것을 넘긴다.
 */
function a(x, y, z) {
  console.log(this, x, y, z);
}
var b = {
  bb: 'bbb'
}

a.call(b, 1, 2,3);
a.apply(b, [1, 2, 3]);

var c = a.bind(b);
c(1, 2, 3);

var d = a.bind(b, 1, 2);
d(3);

/**
 * 결과
 * {bb: 'bbb'} 1 2 3
 */

/**
 * 4. callback 호출시: 기본적으로 함수내부에서와 동일
 * call, apply, bind등으로 바꿀 수 있다.
 */
var callback = function() {
  console.dir(this);
};
var obj = {
  a: 1,
  b: function(cb) {
    cb(); // window/global
    cb.call(this); // obj
  }
}
obj.b(callback);

/**
 * 5. 생성자함수 호출시: 인스턴스
 */

function Person(n, a) {
  this.name = n;
  this.age = a;
}
var roy = new Person('kk', 22);
console.log(roy) // Person {name: 'kk', age: 22}





