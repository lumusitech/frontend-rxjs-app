import { map, range, tap } from "rxjs";

const obs$ = range(1, 5);
// tap operator is used to do side effects like log data. It receives a observer
const observer = {
  next: (val: number) => console.log("tap -->", val),
  complete: () => console.log("complete"),
};

obs$.pipe(tap(observer)).subscribe((val) => console.log("subs$ -->", val));

console.log("\n");

// Optionally, tap receives only the next function
obs$
  .pipe(
    tap((val) => console.log("tap before map -->", val)),
    map((val) => val * 10),
    tap({
      next: (val) => console.log("tap after map -->", val),
      complete: () => console.log("complete"),
    })
  )
  .subscribe((val) => console.log("subs$ -->", val));
