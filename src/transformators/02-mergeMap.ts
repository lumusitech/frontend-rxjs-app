import { fromEvent, interval, map, mergeMap, of, take, takeUntil } from "rxjs";

const letters$ = of("a", "b", "c");

letters$.pipe(
  mergeMap((letter) =>
    interval(1000).pipe(
      map((i) => letter + i),
      take(3)
    )
  )
);
// .subscribe({
//   next: (val) => console.log("next: ", val),
//   complete: () => console.log("complete"),
// });

const mousedown$ = fromEvent<MouseEvent>(document, "mousedown");
const mouseup$ = fromEvent<MouseEvent>(document, "mouseup");
const interval$ = interval();

// mergeMap --> merge all the observables and return data, not a new observable
//when mousedown is emitted, take numbers emitted by the interval until mouseup
mousedown$.pipe(mergeMap(() => interval$.pipe(takeUntil(mouseup$)))).subscribe({
  next: console.log,
  complete: () => console.log("complete"),
});
