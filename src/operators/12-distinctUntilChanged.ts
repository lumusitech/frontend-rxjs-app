import { distinctUntilChanged, from, of } from "rxjs";

const numbers$ = of(1, "1", 1, 3, 3, 3, 2, 2, 4, 4, 5, 3, "1");
// Returns an Observable that emits all items emitted by the
// source Observable that are distinct by comparison from previous item only, not all.
// [1 (pass), 1 (not pass), 2 (pass), 1 (pass), 2 (pass), 2 (not pass)]
numbers$.pipe(distinctUntilChanged()).subscribe(console.log);

interface Character {
  name: string;
}

const characters: Array<Character> = [
  { name: "Megaman" },
  { name: "Megaman" },
  { name: "Zero" },
  { name: "Dr. Willy" },
  { name: "X" },
  { name: "X" },
  { name: "Zero" },
];

//! Warning: when using distinctUntilChanged to compare objects
//? for working with objects we needs to pass a predicate with the two properties to compare
from(characters)
  .pipe(
    distinctUntilChanged((previous, current) => previous.name === current.name)
  )
  .subscribe({
    next: console.log,
    complete: () => console.log("complete"),
  });
