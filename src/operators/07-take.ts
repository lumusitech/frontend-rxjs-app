import { of, take, tap } from "rxjs";

const numbers$ = of(1, 2, 3, 4, 5);

// take operator takes the first 3 values and then cancel the emission and call complete function
numbers$.pipe(tap(console.log), take(3)).subscribe({
  next: (val) => console.log("next", val),
  complete: () => console.log("complete"),
});
