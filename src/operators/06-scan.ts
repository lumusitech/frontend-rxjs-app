import { from, map, reduce, scan, take, tap } from "rxjs";

const totalAccumulator = (acc: number, cur: number, index: number) => acc + cur;

// reduce operator give us only final total
console.log("Reduce operator:");
from([1, 2, 3, 4, 5])
  .pipe(reduce(totalAccumulator, 0))
  .subscribe({ next: (val) => console.log("next", val) });

console.log("\n");

// scan operator give us accumulated total in every step
console.log("Scan operator:");
from([1, 2, 3, 4, 5])
  .pipe(scan(totalAccumulator, 0))
  .subscribe({ next: (val) => console.log("next", val) });

// scan operator could be used to generate a Redux pattern
interface User {
  id?: string;
  authenticated?: boolean;
  token?: string;
  age?: number;
}

const user: User[] = [
  {
    id: "abc123",
    authenticated: false,
    token: null,
  },
  {
    id: "abc123",
    authenticated: true,
    token: "XYZ",
  },
  {
    id: "abc123",
    authenticated: true,
    token: "XYZ123",
  },
];

const state$ = from(user).pipe(
  scan<User, User>((acc: User, cur: User) => ({ ...acc, ...cur }), { age: 42 })
);

const id$ = state$.pipe(map((user: User) => user.id));

id$.subscribe((id) => console.log(id)); // give us the user id
