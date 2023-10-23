import { of } from "rxjs";

/**
 * the rxjs function called 'of' creates an observable and emits
 */

// const obs$ = of(1, 2, 3, 4, 5, 6);
const obs$ = of<number[]>(...[1, 2, 3, 4, 5, 6], 2, 3, 4);
// const obs$ = of(
//   [1, 2],
//   { a: 1, b: 2 },
//   function () {},
//   true,
//   Promise.resolve(true)
// );

console.log("obs$ start");

obs$.subscribe({
  next: (next) => console.log("next", next),
  complete: () => console.info("complete"),
});

console.log("obs$ finish");
