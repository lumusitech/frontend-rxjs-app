import { from, of } from "rxjs";

/**
 * of takes args and generates a sequence of values
 *
 * from takes array, promise, observer or iterable and generates a sequence of values
 */

const observer = {
  next: (next: any) => console.log({ next }),
  complete: () => console.log("complete"),
};

// generator function - iterator - using function*()
const myGenerator = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
};

const myIterable = myGenerator();

// traditional mode
// for (let item of myIterable) {
//   console.log(item);
// }

// using from with the ventage of observables
from(myIterable).subscribe(observer);

// same result - with arrays
// const source$ = from([1, 2, 3]);
// const source$ = of(...[1, 2, 3]);

// same result - with strings
// const source$ = from("Luciano");
// const source$ = of(..."Luciano");

// more interesting things with from
const source$ = from(fetch("https://api.github.com/users/lumusitech"));

// source$.subscribe(observer); // fetch the basic response

// get data in json format
source$.subscribe((resp) => {
  resp.json().then((data) => console.log({ data }));
});
