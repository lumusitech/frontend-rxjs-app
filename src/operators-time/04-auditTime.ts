import { auditTime, fromEvent, map, tap } from "rxjs";

// auditTime operator emits the most recent value from the source observable after
// complete the time that we pass it as an argument

interface Coords {
  x: number;
  y: number;
}

const click$ = fromEvent<MouseEvent>(document, "click");

click$
  .pipe(
    map<MouseEvent, Coords>(({ x, y }) => ({ x, y })),
    tap(({ x, y }) => console.log("tap: ", { x, y })),
    auditTime(2000)
  )
  .subscribe({
    next: (val) => console.log("click", val),
    complete: () => console.log("complete"),
  });
