import { fromEvent, interval, takeUntil, skip, tap } from "rxjs";

// takeUntil operator takes an observable and let pass emissions of other observable
// until this observable emits its first value
// example with interval (first observable) and takeUntil (second observable)

// const click$ = fromEvent<MouseEvent>(document, "click");

// interval(1000)
//   .pipe(takeUntil(click$))
//   .subscribe({
//     next: (val) => console.log("interval", val),
//     complete: () => console.log("complete"),
//   });

// Other example that takes click on a button to stop emissions of interval observable
const button = document.createElement("button");
button.innerHTML = "click me";
const body = document.querySelector("body");
body.append(button);

// skip operator omits the amount of emissions given as argument
const clickButton$ = fromEvent<MouseEvent>(button, "click").pipe(
  tap(() => console.log("tap before skip")),
  skip(1),
  tap(() => console.log("tap after skip"))
);

interval(1000)
  .pipe(takeUntil(clickButton$))
  .subscribe({
    next: (val) => console.log("click", val),
    complete: () => console.log("complete"),
  });
