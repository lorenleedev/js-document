/**
 * callback함수에게 제어권을 위임
 * 제어권: 1. 실행 시점, 2. 매개변수, 3. this
 */

/**
 * 1. setInterval에게 실행 시점 제어권을 넘김.
 */

setInterval(function() {
  console.log('콜백함수를 1초 마다 실행');
}, 1000);

/**
 * 2. 매개변수 제어권을 넘김.
 */

var arr = [1, 2, 3];
var entries = [];
arr.forEach(function(v, i) {
  entries.push([i, v, this[i]]);
}, [10, 20, 30]);

console.log(entries); // [[0, 1, 10], [1, 2, 20], [2, 3, 30]]
/**
 arr.forEach(function(v, i, a) {}, thisArg);
 thisArg: 선택사항. callback을 실행할 때 this로서 사용할 값
 */

/**
 * 3. this
 */
document.body.innerHTML = '<div id="a">abc</div>';
function cbFunc(x) {
  console.log(this, x); // <div id="a">abc</div>
}
document.getElementById('a').addEventListener('click', cbFunc);

const obj = {a: 1};
document.getElementById('a').addEventListener('click', cbFunc.bind(obj));

/**
 * addEventListener(type, callback, options)
 * callback에는 currentTarget이 바인딩된다.
 */

