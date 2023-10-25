import { fromEvent, map, sampleTime } from "rxjs";

// sampleTime operator emits the most recent value from the source observable after
// a specified amount of time that we pass it as an argument
interface Coords {
  x: number;
  y: number;
}

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(
    sampleTime(2000), // Better at top of the chain of operators because we don't want to process all emissions
    // better put map operator after sampleTime because we don't want map all emissions
    // only those that pass the sampleTime. Better performance
    map<MouseEvent, Coords>(({ x, y }) => ({ x, y }))
  )
  .subscribe({
    next: (val) => console.log("next: ", val),
    complete: () => console.log("complete"),
  });
