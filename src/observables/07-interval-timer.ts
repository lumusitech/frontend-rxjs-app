import { interval, timer } from "rxjs";

const observer = {
  next: (next: number) => console.log("next", next),
  complete: () => console.log("complete"),
};

// interval is an observable that emits numbers from 0 to n asynchronously every 3 seconds
const interval$ = interval(5000);

// timer is an observable that emits a value after n milliseconds given
const timer$ = timer(3000);

// in this case, timer begins emitting a value after 3 seconds from 0 to n each second
// timer(initAt, millisecondsToNextValue) similarly to interval but begins to emits a value after initAt
const timerWithDelay$ = timer(3000, 2000);

// timer with delay of 0
const timerWithDelayZero$ = timer(0);

// timer with init date
const todayAt5Seconds = new Date();
todayAt5Seconds.setSeconds(todayAt5Seconds.getSeconds() + 5);
const timerWithDate$ = timer(todayAt5Seconds);

console.log("start");
// interval$.subscribe(observer);
// timer$.subscribe(observer);
// timerWithDelay$.subscribe(observer);
// timerWithDelayZero$.subscribe(observer);
timerWithDate$.subscribe(observer);

console.log("end");
