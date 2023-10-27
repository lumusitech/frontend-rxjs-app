//! forkJoin function
//| It joins the latest values of multiple observables.
//| It returns a new observable that emits the latest values the source observables,
//|but combined in an array or object.
//| Example:
//| forkJoin([observable1, observable2, observable3]);
//| when all the observables are completed, forkJoin emits an array or object with the latest values
//| from each observable.
//; WARNING: the observables passed to forkJoin must be finite. If they are infinite, forkJoin will never complete
//; and never emit an array or object.

import { delay, forkJoin, interval, of, take } from "rxjs";

const numbers$ = of(1, 2, 3, 4);
const interval$ = interval(1000).pipe(take(3));
const letters$ = of("a", "b", "c").pipe(delay(3500));

// forkJoin([numbers$, interval$, letters$]).subscribe({
//   next: (val) => console.log("next", val),
//   complete: () => console.log("complete"),
//   error: (err) => console.log("error", err),
// });

// forkJoin([numbers$, interval$, letters$]).subscribe((resp) => {
//   console.log("number", resp[0]);
//   console.log("interval", resp[1]);
//   console.log("letter", resp[2]);
// });

//. We can pass object with direct names
// forkJoin({ numbers$, interval$, letters$ }).subscribe((resp) => {
//   console.log(resp);
// });

//. We can pass object with keys and values
forkJoin({ num: numbers$, int: interval$, let: letters$ }).subscribe(
  console.log
);
