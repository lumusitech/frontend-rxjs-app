//! merge function:
//| It concatenates multiple observables.
//| It returns a new observable that emits all of the source observables, but combined.
//| Example:
//| concat(observable1, observable2, observable3);
//| if observable1 emits its  first value, concat emits that value, if observable2 emits its first value,
//| concat emits that value, if observable1 emits its second value, concat emits that value, if
//| observable3 emits its first value, concat emits that value, if observable3 emits its second value,
//| concat emits that value. In other words, concat combine all of the observables in a new observable.
//, WARNING: We must don't confuse merge function with merge operator. This last one is deprecated.

import { fromEvent, map, merge } from "rxjs";

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup");
const click$ = fromEvent<MouseEvent>(document, "click");

//| If keyup and click emits at the same time, merge will take into account the given order
merge(
  keyup$.pipe(map((evt) => evt?.type)),
  click$.pipe(map((evt) => evt?.type))
).subscribe(console.log);
