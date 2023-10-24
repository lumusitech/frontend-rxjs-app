import { range, from, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";

// filter operator takes a predicate and only emits values that satisfy the predicate
// range(1, 10)
//   .pipe(filter((val) => val % 2 === 1)) // Return only the odd numbers
//   .subscribe(console.log);

// console.log("\n");

// range(1, 10)
//   .pipe(filter((val) => val % 2 === 0)) // Return only the even numbers
//   .subscribe(console.log);

range(20, 30)
  //filter give us an index number too as second argument
  .pipe(
    filter((val, index) => {
      console.log("index", index);

      return val % 2 === 0;
    })
  ) // Return only the even numbers
  .subscribe(console.log);

interface character {
  name: string;
  type: string;
}
const characters: Array<character> = [
  {
    name: "batman",
    type: "hero",
  },
  {
    name: "robin",
    type: "hero",
  },
  {
    name: "joker",
    type: "villain",
  },
];

// only pass the heros
from(characters)
  .pipe(filter((c) => c.type === "hero"))
  .subscribe(console.log);

// only pass when the key pressed is Enter
const keyup$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
  map<KeyboardEvent, string>((event) => event.code),
  filter((keyCode: string) => keyCode === "Enter")
);

keyup$.subscribe(console.log);
