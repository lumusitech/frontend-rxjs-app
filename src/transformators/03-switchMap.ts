import { Observable, fromEvent, map, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { GithubUsersResponse } from "../interfaces/github-users.interface";

// references from document object model (DOM)
const body = document.querySelector("body");
const textInput = document.createElement("input");

// adding input to the body
body.append(textInput);

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup");

const url = "https://httpbin.org/delay/1?arg=";

input$
  .pipe(
    map<KeyboardEvent, string>(
      (event) => (event.target as HTMLInputElement).value
    ),
    // switchMap flattens the Observable and subscribes to it for emits data ready to be consumed

    // In this case, mergeMap is not util because it subscribes to each keyup event emitted
    // and it does multiple request
    // We want only do one subscription and later do one request with rxjs.
    // And avoid do multiple unnecessary requests
    // Better, use SwitchMap, because this cancel the ajax request in course when is emitted a new keyup
    // Not good: mergeMap<string, Observable<GithubUsersResponse>>((text) =>
    // Better:
    switchMap<string, Observable<GithubUsersResponse>>((text) =>
      ajax.getJSON(`${url}${text}`)
    )
  )

  .subscribe({
    next: (val) => console.log("next: ", val),
    complete: () => console.log("complete"),
  });
