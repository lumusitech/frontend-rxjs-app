import { distinctUntilChanged, distinctUntilKeyChanged, from } from "rxjs";

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

from(characters)
  .pipe(
    // before
    // distinctUntilChanged((previous, current) => previous.name === current.name)
    // Now, better
    distinctUntilKeyChanged("name") // pass the property or key to compare
  )
  .subscribe({
    next: console.log,
    complete: () => console.log("complete"),
  });
