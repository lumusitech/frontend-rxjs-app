import { Observable, Subject, Subscriber, Subscription, interval } from "rxjs";
import { take, map, share } from "rxjs/operators";
/**
 * Ejercicio: Realizar que los dos observables finales,
 * emitan exactamente el mismo valor
 *
 * Tip: Hot Observable? subjects?
 */

//* Solution using share operator
// (() => {
//   // == NO TOCAR este bloque ====================
//   const reloj$ = interval(1000).pipe(
//     take(5),
//     map((val) => Math.round(Math.random() * 100)),
//     share()
//   );
//   // No tocar la creación del observable
//   // ============================================

//   // Estos dos observables deben de emitir exactamente los mismos valores
//   // reloj$.pipe(share());
//   reloj$.subscribe((val) => console.log("obs1", val));
//   reloj$.subscribe((val) => console.log("obs2", val));
//   reloj$.subscribe((val) => console.log("obs3", val));
//   reloj$.subscribe((val) => console.log("obs4", val));
// })();

//* Solution Fernando Herrera: using a subject
(() => {
  // == NO TOCAR este bloque ====================
  const reloj$ = interval(1000).pipe(
    take(5),
    map((val) => Math.round(Math.random() * 100))
  );
  // No tocar la creación del observable
  // ============================================

  // subject will be a hot observable
  const subject$ = new Subject();
  reloj$.subscribe(subject$);

  // Estos 4 observables deben de emitir exactamente los mismos valores
  // reloj$.pipe(share());
  subject$.subscribe((val) => console.log("obs1", val));
  subject$.subscribe((val) => console.log("obs2", val));
  subject$.subscribe((val) => console.log("obs3", val));
  subject$.subscribe((val) => console.log("obs4", val));
})();
