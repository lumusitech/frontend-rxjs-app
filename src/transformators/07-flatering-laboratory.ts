//! Differences between concatMap, switchMap, mergeMap and exhaustMap:

import {
  catchError,
  concatMap,
  exhaustMap,
  fromEvent,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from "rxjs";
import { AjaxResponse, ajax } from "rxjs/ajax";

//? Helpers: ⏩
const loginHttpRequest = (userPass) =>
  ajax.post("https://reqres.in/api/login?delay=1", userPass).pipe(
    map((resp: AjaxResponse<any>) => resp.response["token"]),
    catchError((err) => of("xxxx"))
  );

// Reference to body
const body = document.querySelector("body");

// Create form
const form = document.createElement("form");
const inputEmail = document.createElement("input");
const inputPassword = document.createElement("input");
const submitBtn = document.createElement("button");

//? Configs: ⏩
//, inputEmail
inputEmail.type = "email";
inputEmail.placeholder = "email";
inputEmail.value = "eve.holt@reqres.in";

//, inputPassword
inputPassword.type = "password";
inputPassword.placeholder = "password";
inputPassword.value = "cityslicka";

//, submitBtn
submitBtn.innerHTML = "login";

//? Appending: ⚓
form.append(inputEmail, inputPassword, submitBtn);
body?.append(form);

//| Streams
const submitForm$ = fromEvent<Event>(form, "submit");

//= Subscription: ⬆
submitForm$
  .pipe(
    tap((ev) => ev.preventDefault()),
    map<Event, any>((ev) => ({
      email: (ev.target as HTMLInputElement)[0].value,
      password: (ev.target as HTMLInputElement)[1].value,
    })),

    //! for each click throws a request. Is not convenient.
    // mergeMap(loginHttpRequest),

    //! for each click puts a request in a tail. So, if we click 3 times, concatMap will wait for the
    //! first request to finish before it will start the second request and so on.
    // concatMap(loginHttpRequest),

    //! for each click throws a request and it will cancel the previous one.
    // switchMap(loginHttpRequest),

    //! for each click throws a request only if the previous one is completed, if not, ignore it
    exhaustMap(loginHttpRequest)
  )
  .subscribe((token) => console.log(token));
