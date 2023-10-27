import { concatMap, fromEvent, interval, take } from "rxjs";

//! concatMap operator

const interval$ = interval(500).pipe(take(3));
const click$ = fromEvent<MouseEvent>(document, "click");

//; concatMap is other flattering operator. It will generate a new observable for each click.
//; and put each one in a tail. When the first observable is completed, the next one will start.
//; and so on until the last one is completed. All of those in the order that they were emitted.
//* In this example, if we click 6 times, concatMap will generate 6 different observables.
//* And put them in a tail.
//, Output: 0,1,2 (first click) 0,1,2 (second click) and so on ... 0,1,2 (last click)

click$.pipe(concatMap(() => interval$)).subscribe(console.log);
