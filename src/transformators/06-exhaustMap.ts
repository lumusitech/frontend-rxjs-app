import { concatMap, exhaustMap, fromEvent, interval, take } from "rxjs";

//! concatMap operator

const interval$ = interval(500).pipe(take(3));
const click$ = fromEvent<MouseEvent>(document, "click");

//* exhaustMap will generate a new instance of observable passed as argument when a source event emits
//; If before the instance finished, the source emits more events, those will be ignored.
//. In this example, if we click, exhaustMap will generate a new observable, it subscribe to it
//. and it will emit the 3 numbers of the interval, but if before that observable finished, the source
//. emits more events, those will be ignored Until the previous observable finished.

click$.pipe(exhaustMap(() => interval$)).subscribe(console.log);
