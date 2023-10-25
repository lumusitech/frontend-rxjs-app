// debounceTime operator stops the emissions of the observable until the time given as an argument expires.
// Then, it emits the last emitted value of the observable, not others emitted before the time expires.
// if the emissions do not stop for the time specified in debounceTime, it will never let anything through

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
} from "rxjs";

const click$ = fromEvent<MouseEvent>(document, "click");

click$.pipe(debounceTime(2000));
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
    // tap is used to debug and know what type of event is being emitted
    // tap(console.log),
    map<KeyboardEvent, string>(
      // we need to cast to HTMLInputElement because the type of the event is KeyboardEvent
      // and typescript does not recognize it
      (event) => (event?.target as HTMLInputElement)?.value
    ),
    debounceTime(1000),
    filter((text) => text.length > 0),
    // only emits the distinct values. if I write "house", it will emit the "house". But if then I delete "house",
    // and quickly write "house" again, it will not emit the "house" and we avoid do,
    // for example,  repetition of http request. We gain better performance.
    distinctUntilChanged()
  )
  .subscribe({
    next: (evt) => console.log(evt),
    // never complete, always listen the emissions
    complete: () => console.info("complete"),
  });
