//! combineLatest function
//| It takes two or more observables and emits an array with the latest values from each observable.
//| Example:
//| combineLatest(observable1, observable2);
//| if observable1 emits a value --> 1, combineLatest will not emit anything until observable2 emits
//| its value --> "a" too.
//| when that happens, combineLatest will emit the latest value from both observables in an array ->> [1, "a"]
//| if then, observable2 emits another value --> "b", combineLatest will emit the latest value from both ->[1, "b"]
//| if observable1 emits another value -> 2, combineLatest will emit the latest value from both -> [2, "b"]

import { combineLatest, fromEvent, map } from "rxjs";

// const keyup$ = fromEvent<KeyboardEvent>(document, "keyup");
// const click$ = fromEvent<MouseEvent>(document, "click");

//| If keyup and click emits at the same time, merge will take into account the given order
// combineLatest([
//   keyup$.pipe(map((evt) => evt?.type)),
//   click$.pipe(map((evt) => evt?.type)),
// ]).subscribe(console.log);

const body = document.querySelector("body");
const input1 = document.createElement("input");
const input2 = document.createElement("input");

input1.placeholder = "email@email.com";
input2.placeholder = "*************";
input2.type = "password";

body?.append(input1, input2);

//* Helper

const getInputStream = (input: HTMLInputElement) =>
  fromEvent<KeyboardEvent>(input, "input").pipe(
    map<KeyboardEvent, string>((evt) => (evt.target as HTMLInputElement).value)
  );

//; Subscription

combineLatest([getInputStream(input1), getInputStream(input2)]).subscribe({
  next: (val) => console.log("next", val),
  complete: () => console.log("complete"),
  error: (err) => console.log("error", err),
});
