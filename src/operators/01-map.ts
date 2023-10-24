import { fromEvent, range } from "rxjs";
import { map, mapTo, pluck } from "rxjs/operators";

// basic use
// map<inputType, outputType> --> in this example, the input type is number
// and the output type is number

// const obs$ = range(1, 10);
// obs$.pipe(map<number, number>((val) => val * 10)).subscribe(console.log);

// map<inputType, outputType> --> in this example, the input type is keyboard event
// and the output type is string
const keyup$ = fromEvent<KeyboardEvent>(document, "keyup");
// keyup$
//   .pipe(map<KeyboardEvent, string>((val) => val.key.toUpperCase()))
//   .subscribe(console.log);

// Or i can create other observable using base observable called keyup$ and add pipe and map
// const keyupCode$ = keyup$.pipe(
//   map<KeyboardEvent, string>((event) => event.code)
// );

// Then, subscribe to the new observable
// keyupCode$.subscribe(console.log);

// Pluck operator is deprecated. Use map instead with optional chaining
// Pluck operator take a property of an object
// const keyupPluck$ = keyup$.pipe(pluck("code"));
// keyupPluck$.subscribe(console.log);

// Better with map and optional chaining (?)
const keyupCodeWithMap$ = keyup$.pipe(
  map<KeyboardEvent, string>((event) => event?.code)
);
keyupCodeWithMap$.subscribe(console.log);

// mapTo operator is deprecated. Use map instead
// mapTo operator return always the same value
// const keyupMapTo$ = keyup$.pipe(mapTo("keyup"));
// keyupMapTo$.subscribe(console.log);

// Better with map
const keyupCodeInsteadMapTo$ = keyup$.pipe(
  map<KeyboardEvent, string>((event) => "keyup")
);
keyupCodeInsteadMapTo$.subscribe(console.log);
