import { asyncScheduler } from "rxjs";

// asyncScheduler can do the same that setTimeout and setInterval

// setTimeout(() => {}, 3000); using asyncScheduler
// basic use
const greet1 = () => console.log("hello");
asyncScheduler.schedule(greet1, 3000);

// with a parameter
const greet2 = (name: string) => console.log(`hello ${name}`);
asyncScheduler.schedule(greet2, 3000, "Lucho");

// with multiple parameters (use an object)
const greet3 = ({ name, surname }: { name: string; surname: string }) =>
  console.log(`hello ${name}, ${surname}`);
asyncScheduler.schedule(greet3, 3000, { name: "Lucho", surname: "Figueroa" });

/////////////////////////////////////////////////////////////////////////////////

// setInterval(() => {}, 3000); using asyncScheduler
// basic use
const subs = asyncScheduler.schedule(
  function (state) {
    console.log("with unsubscribe outside");
    console.log({ state });

    this.schedule(state + 1, 1000);
  },
  4000,
  0
);

// finish at 9 seconds
// setTimeout(() => subs.unsubscribe(), 9000);

// finish at 9 seconds using asyncScheduler
asyncScheduler.schedule(() => subs.unsubscribe(), 9000);

/////////////////////////////////////////////////////////////////////////////////

// the same with unsubscribe inside
asyncScheduler.schedule(
  function (state) {
    if (state === 5) this.unsubscribe();

    console.log("with unsubscribe inside");
    console.log({ state });
    console.log("\n");

    this.schedule(state + 1, 1000);
  },
  4000,
  0
);
