import { Observable, debounceTime, fromEvent, map, mergeMap, of } from "rxjs";
import { AjaxError, ajax } from "rxjs/ajax";
import { GithubUser } from "../interfaces/github-user.interface";
import { GithubUsersResponse } from "../interfaces/github-users.interface";

// references from document object model (DOM)
const body = document.querySelector("body");
const textInput = document.createElement("input");
const orderList = document.createElement("ol");

// adding all elements to the body
body.append(textInput, orderList);

// Helpers
const showUsers = (users: GithubUser[]) => {
  orderList.innerHTML = "";

  for (let user of users) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = user.avatar_url;

    const anchor = document.createElement("a");
    anchor.href = user.html_url;
    anchor.text = "read more...";
    anchor.target = "_blank";

    li.append(img, "\n" + user.login + " ", anchor);

    orderList.append(li);
  }
};

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup");

const manageError = (error: AjaxError) => {
  console.warn(error.message);
  return of([]);
};

input$.pipe(
  debounceTime<KeyboardEvent>(500),
  map<KeyboardEvent, string>((val) => val.target["value"]),
  mergeMap<string, Observable<GithubUsersResponse>>((text) =>
    ajax.getJSON(`https://api.github.com/search/users?q=${text}`)
  ),
  map<GithubUsersResponse, GithubUser[]>((resp) => resp["items"])
);

// .subscribe(showUsers);

// Other example:
const url = "https://httpbin.org/delay/1?arg=";

input$
  .pipe(
    map<KeyboardEvent, string>(
      (event) => (event.target as HTMLInputElement).value
    ),
    // mergeMap flattens the Observable and subscribes to it for emits data ready to be consumed

    // In this case, is not util, because mergeMap subscribe to each keyup event emitted
    // We want only do one subscription and later do the request with axios.
    // And avoid do multiple unnecessary requests
    // Better, use SwitchMap, because this cancel the ajax request in course when is emitted a new keyup
    mergeMap<string, Observable<GithubUsersResponse>>((text) =>
      ajax.getJSON(`${url}${text}`)
    )
  )

  .subscribe({
    next: (val) => console.log("next: ", val),
    complete: () => console.log("complete"),
  });
