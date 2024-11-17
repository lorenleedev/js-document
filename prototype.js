/**
 * 1. prototype
 * 2. [[Prototype]] -> 프로토
 * 3. constructor
 *
 *
 * 생성자 함수(Constructor)를 new연산자를 이용해 호출하면 일어나는 일
 *
 * Constructor--prototype
 * |           /
 * |         /
 * |       /
 * instance--[[Prototype]]
 *
 * Constructor의 프로토타입이라는 프로퍼티 네용이
 * instance의 [[Prototype]]에 참조로 전달된다.
 * 즉, Constructor.prototype과 instance.[[Prototype]]이 같은 객체를 바라본다.
 *
 * [[Prototype]]는 정보를 보여줄 뿐이다. 수정은 불가하다.
 */

/**
 * 프로토타입에 접근하는 다섯가지 방식
 */
function Person(n, a) {
  this.name = n;
  this.age = a;
}

var roy = new Person('로이', 30);

var royClone1 = new roy.__proto__constructor('로이 1', 40);

var royClone2 = new roy.constructor('로이 2', 50);

var royClone3 = new Object.getPrototypeOf(roy).constructor('로이 3', 60);

var royClone4 = new Person.prototype.constructor('로이 4', 15);

