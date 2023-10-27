import { fromEvent, interval, sample, take } from "rxjs";

// sample operator emits the most recent value from the source observable after
// receiving an emission from the source observable that we pass it as argument
interface Coords {
  x: number;
  y: number;
}

const click$ = fromEvent<MouseEvent>(document, "click");

interval(500)
  // sample emits value of interval when click$ emits value
  .pipe(take(10), sample(click$))
  .subscribe({
    next: (val) => console.log("click", val),
    complete: () => console.log("complete"),
  });
