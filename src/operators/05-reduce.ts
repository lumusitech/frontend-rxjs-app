import { interval, range, reduce, take, tap } from "rxjs";

// reduce operator receives a reducer function and an initial value
// reduce((accumulator, currentValue)=> accumulator + currentValue, initialValueOfAccumulator)
// range(1, 3)
//   .pipe(reduce<number, number>((acc, val) => acc + val, 0))
//   .subscribe(console.log);

const totalReducer = (acc: number, curr: number) => acc + curr;

const initialAccumulator = 5;

interval(500)
  .pipe(take(6), tap(console.log), reduce(totalReducer, 5))
  .subscribe({
    next: (val) => console.log("+ ", initialAccumulator, " Total: ", val),
    complete: () => console.log("complete"),
  });
