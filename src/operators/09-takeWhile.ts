import { fromEvent, map, takeWhile } from "rxjs";

interface Coords {
  x: number;
  y: number;
}

const click$ = fromEvent<MouseEvent>(document, "click");

// takeWhile operator takes emissions from observable while condition is true
// takeWhile operator can receive a second boolean argument (false by default)
// when this second is true take the emission that breaks the condition, too
click$
  .pipe(
    map<MouseEvent, Coords>(({ x, y }) => ({ x, y })),
    takeWhile(({ y }) => y <= 300, true)
  )
  .subscribe({
    next: (val) => console.log("next", val),
    complete: () => console.log("complete"),
  });
