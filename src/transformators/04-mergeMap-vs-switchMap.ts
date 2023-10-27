import { fromEvent, interval, mergeMap, switchMap } from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");
const interval$ = interval(1000);

//* mergeMap Vs. switchMap:

//? mergeMap generates a new observable for each click. For example: if we click 6 times,
//? the observable will generate 6 different observables.
//? In other words, mergeMap still running all the observables at the same time.

// click$.pipe(mergeMap(() => interval$)).subscribe(console.log);

//? switchMap generates a new observable for each click, but cancel the previous one.
//? For example: if we click 6 times, the observable will generate only 1 observable based in the last click.

click$.pipe(switchMap(() => interval$)).subscribe(console.log);
