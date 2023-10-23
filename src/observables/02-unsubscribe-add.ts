import { Observable, Observer, Subscription } from "rxjs";

const observer: Observer<number> = {
  next: (next) => console.log("next", next),
  error: (error) => console.warn("error: ", error),
  complete: () => console.info("complete"),
};

const interval$ = new Observable<number>((subs) => {
  let count = 0;

  const interval = setInterval(() => {
    count++;

    subs.next(count);
  }, 1000);

  setTimeout(() => {
    subs.complete();
  }, 2500);

  // is called when the observable is unsubscribed by the observers
  return () => {
    clearInterval(interval);
    console.log("interval destroyed");
  };
});

const subs1: Subscription = interval$.subscribe(observer);
const subs2: Subscription = interval$.subscribe(observer);
const subs3: Subscription = interval$.subscribe(observer);

// join all subs in subs1
subs1.add(subs2);
subs2.add(subs3);

setTimeout(() => {
  subs1.unsubscribe(); // call return function of main observable called interval$

  console.log("setTimeout completed");
}, 6000);
