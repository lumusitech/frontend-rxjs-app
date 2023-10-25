// throttleTime operator emits the first value and then waits for the specified time before emitting the next value.
import {
  asyncScheduler,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  throttleTime,
} from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

click$.pipe(throttleTime(1000));
// .subscribe({
//   next: ({ x, y }) => console.log({ x, y }),
//   complete: () => console.info("complete"),
// });

// Example 2
const input = document.createElement("input");
input.setAttribute("type", "text");
document.querySelector("body").append(input);

const inputEmit$ = fromEvent<KeyboardEvent>(input, "keyup");

inputEmit$
  .pipe(
    map<KeyboardEvent, string>(
      (event) => (event?.target as HTMLInputElement)?.value
    ),
    // If we pass it a second argument asyncScheduler, and then a third argument { trailing: true }
    // it will emit the last value too. if we want to avoid the first value, we can pass { leading: true }
    throttleTime(2000, asyncScheduler, {
      trailing: true,
    }),
    filter((text) => text.length > 0),

    distinctUntilChanged()
  )
  .subscribe({
    next: (evt) => console.log(evt),
    complete: () => console.info("complete"),
  });
