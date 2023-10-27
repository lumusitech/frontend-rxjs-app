//! concat function:
//| It concatenates multiple observables.
//| It returns a new observable that emits all of the source observables.
//| Example:
//| concat(observable1, observable2, observable3);
//| concat emits all of observable 1, then all of observable 2, then all of observable 3.
//| if any of the observables not completed, the rest never emits.
//, WARNING: We must don't confuse concat function with concat operator. This last one is deprecated.

import { concat, interval, of, take } from "rxjs";

const interval$ = interval(500);

concat(
  interval$.pipe(take(3)),
  interval$.pipe(take(2)),
  interval$.pipe(take(4)),
  [1, 2, 3, 4],
  of("ready")
).subscribe({
  next: (val) => console.log("next", val),
  complete: () => console.log("complete"),
  error: (err) => console.log("error", err),
});
