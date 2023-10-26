import {
  Observable,
  catchError,
  debounceTime,
  filter,
  fromEvent,
  map,
  mergeAll,
  of,
} from "rxjs";
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
    // img.setAttribute("src", user.avatar_url);
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

input$
  .pipe(
    debounceTime<KeyboardEvent>(500),
    // map is not convenient, we can use flattering operators like mergeAll
    // for join the multiple observables that the main source emits and then simplify the subscription
    // map emits an observable (ajax) that emits an observable, so we need join all of this
    // for simplification, we can use mergeAll operator for this cases.
    map<KeyboardEvent, string>((val) => val.target["value"]),
    filter((text) => text.length > 0),
    map<string, Observable<GithubUsersResponse>>((text) =>
      ajax.getJSON(`https://api.github.com/search/users?q=${text}`)
    ),
    // MergeAll receives an observable and emits a concrete result
    // In this case, mergeAll receive an observable of GithubUsersResponse and emit an array of GithubUser
    mergeAll<Observable<GithubUsersResponse>>(),
    map<GithubUsersResponse, GithubUser[]>((resp) => resp["items"]),
    catchError(manageError)
  )

  .subscribe(showUsers);
