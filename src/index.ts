import { Observable, Observer } from "rxjs";

const observer: Observer<string> = {
  next: (next) => console.log("next", next),
  error: (error) => console.warn("error: ", error),
  complete: () => console.info("complete"),
};

const obs$ = new Observable<string>((subs) => {
  subs.next("Hola");
  subs.next("Mundo");
  subs.next("Hola");
  subs.next("Mundo");

  // Forzar un error
  //   const a = undefined;
  //   a.nombre = "Luciano";

  subs.complete();
  subs.next("este valor ya no lo ven");
});

// obs$.subscribe({
//   next: (next) => console.log("next", next),
//   error: (error) => console.warn("error: ", error),
//   complete: () => console.log("complete"),
// });

obs$.subscribe(observer);
