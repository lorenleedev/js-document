/**
 * closure란
 * 외부함수에서 선언한 변수를 참조하는 내부함수를
 * 외부함수의 외부로 전달(리턴)할 경우
 * 외부함수가 종료된 이후에도 그 변수가 유지되는 현상
 *
 * 원래대로라면, 사라져야할 변수지만 참조카운트가 0이 아니니까
 * 나중에 사용하겠구나 하고 남겨두는 것
 *
 * 클로저의 이점과 활용:
 * 지역변수가 함수 종료 후에도 사라지지 않게 할 수 있다.
 * 함수 종료 후에도 사라지지 않는 지역변수를 만들 수 있다!
 * 이것을 이용해 외부로부터 내부 변수 보호(캡슐화)
 */

var outer = function () {
  var a = 1; // 내부함수가 참조하고 있는 외부함수의 렉시컬환경
  var inner = function() {
    return ++a;
  }
  return inner; // 내부함수를 외부로 전달
}
var outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3

/**
 * 활용
 */
function user (_name) {
  var _logged = true;
  return {
    get name() {return _name},
    set name(v) {_name = v},
    login() {_logged = true},
    logout() {_logged = false},
    get status() {
      return _logged ? 'login' : 'logout';
    }
  }
}

var roy = user('ㅎㅎ');
console.log(roy.name) // 'ㅎㅎ'

roy.name = 'ㄱㄱ'; // set함수가 실행되면서 _name을 변경
console.log(roy.name) // 'ㄱㄱ'

roy._name = '??';
console.log(roy.name) // 'ㄱㄱ' -> '??'로 바뀌지 않음.
/**
 * user함수 내부에는 _name이라는 필드가 없기 때문
 */

console.log(roy.status) // 'login'
/**
 * _logged라는 변수는 외부로 공개하고 있지 않음.
 * 내부 return의 status에서 참조하고 있으므로 클로져가 발생해서
 * _logged를 참조해 'login'을 리턴
 */

roy.logout();
console.log(roy.status) // 'logout'

roy.status = true; // setter가 없으므로 작동안하고 무시
console.log(roy.status) // 그대로 'logout'