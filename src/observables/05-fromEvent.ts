import { fromEvent } from "rxjs";

const obs1$ = fromEvent<MouseEvent>(document, "click");
const obs2$ = fromEvent<KeyboardEvent>(document, "keyup");

const observer1 = {
  next: ({ x, y }: MouseEvent) => console.log({ x, y }),
};

const observer2 = {
  next: ({ key }: KeyboardEvent) => console.log({ key }),
};

obs1$.subscribe(observer1);

obs2$.subscribe(observer2);
