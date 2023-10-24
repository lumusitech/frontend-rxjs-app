import { first, fromEvent, map, of, tap } from "rxjs";

// first operator take first emission from observable or first emission that match the predicate
const obs$ = of(1, 2, 3, 4, 5);

// Without predicate it will take first emission
obs$.pipe(first()).subscribe((val) => console.log("first", val));

// With predicate it will take first emission that match the predicate
obs$.pipe(first((n) => n > 3)).subscribe((val) => console.log("first", val));

// Other examples
const click$ = fromEvent<MouseEvent>(document, "click");

interface Coords {
  clientX: number;
  clientY: number;
}

click$
  .pipe(
    tap<MouseEvent>((event) => console.log("tap y:", event.clientY)),
    // map<MouseEvent, Coords>((event) => ({
    //   clientX: event.clientX,
    //   clientY: event.clientY,
    // })),
    // Better:
    map<MouseEvent, Coords>(({ clientX, clientY }) => ({ clientX, clientY })),
    // takes first emission that match the predicate clientY > 250
    first<Coords>(({ clientY }) => clientY > 250)
  )
  .subscribe({
    next: (val) => console.log("click", val),
    complete: () => console.log("complete"),
  });
