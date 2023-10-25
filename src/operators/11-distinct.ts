import { distinct, from, of } from "rxjs";

const numbers$ = of(1, "1", 1, 3, 3, 3, 2, 2, 4, 4, 5, 3, "1");
// Returns an Observable that emits all items emitted by the
// source Observable that are distinct by comparison from previous items.
// distinct operator removes duplicated emissions (use ===)
// so, 1 === 1 -> true (not pass), 1 === "1" -> false (pass)
numbers$.pipe(distinct()).subscribe(console.log);

interface Character {
  name: string;
}

const characters: Array<Character> = [
  { name: "Megaman" },
  { name: "X" },
  { name: "Zero" },
  { name: "Dr. Willy" },
  { name: "X" },
  { name: "Megaman" },
  { name: "Zero" },
];

//! Warning: when using distinct to compare objects
//? for working with objects we needs to pass a predicate with the property to compare
from(characters)
  .pipe(distinct((character) => character.name))
  .subscribe({
    next: (character) => console.log(character.name),
    complete: () => console.log("complete"),
  });
