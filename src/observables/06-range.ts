import { asyncScheduler, of, range, scheduled } from "rxjs";

// Sync emits
console.log('Sync emits using "of" and "range"');
const src1$ = of(1, 2, 3, 4, 5);
const src2$ = range(1, 5);

console.log("start of:");

src1$.subscribe({
  next: (next) => console.log("next", next),
});
console.log("end of:");

console.log("\n");

console.log("start range:");
src2$.subscribe({
  next: (next) => console.log("next", next),
});

console.log("end range:");

console.log("\n");

// Async emits using scheduled and asyncScheduler
const src3$ = scheduled(range(1, 5), asyncScheduler);

console.log(
  'Async emits using "range" and "asyncScheduler" inside "scheduled"'
);

// async emits
console.log("start async range:");

src3$.subscribe({
  next: (next) => console.log("next", next),
});

console.log("end async range:");
