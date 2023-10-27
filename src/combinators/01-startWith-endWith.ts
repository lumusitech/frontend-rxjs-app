import { endWith, of, startWith } from "rxjs";

//! startWith and endWith
//| Are simple operators that start or end an observable with a given values. Values can be any type.
//| And can receive any number of arguments.
const numbers$ = of(1, 2, 3);

numbers$
  .pipe(
    //* startWith(startValue): start with a value given, in this case, 0
    startWith(0),
    //* endWith(endValue): finish with a value given, in this case, 4
    endWith(4)
  )
  .subscribe(console.log);

console.log("\n");

numbers$
  .pipe(
    //, No matter what operator we put first in the pipe, the result will be the same
    endWith("x", "y", "z"),

    startWith("a", "b", "c")
  )
  .subscribe(console.log);
