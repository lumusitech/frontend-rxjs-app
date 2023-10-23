import { Observable, Observer, Subject } from "rxjs";

const observer: Observer<number> = {
  next: (next) => console.log("next", next),
  error: (error) => console.warn("error: ", error),
  complete: () => console.info("complete"),
};

const interval$ = new Observable<number>((subs) => {
  const intervalID = setInterval(() => {
    // cold observable: Flow data INSIDE of the main observable called interval$
    subs.next(Math.random());
  }, 1000);

  return () => {
    clearInterval(intervalID);
    console.log("interval destroyed");
  };
});

/**
 * features of Subject: is a special type of Observable
 * 1-Multiple casting: equal value for all observers
 * 2-Is an Observer too
 * 3-As Observer, has next, error and complete too
 */
const subject$ = new Subject<number>();
// in place of a simple observer, we can use a subject
const subscription = interval$.subscribe(subject$);

// const subs1 = interval$.subscribe((rnd) => console.log("subs1", rnd));
// const subs2 = interval$.subscribe((rnd) => console.log("subs2", rnd));

// const subs1 = subject$.subscribe(observer);
// const subs2 = subject$.subscribe(observer);

setTimeout(() => {
  // hot observable: Insert flow data OUTSIDE of the main observable called interval$
  subject$.next(10);
  subject$.complete();
  subscription.unsubscribe();
}, 3500);
