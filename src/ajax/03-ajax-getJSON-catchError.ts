import { catchError, of } from "rxjs";
import { AjaxError, ajax } from "rxjs/ajax";

// const url = "https://httpbincscd.org/delay/1";
const url = "https://api.github.com/usersXXX?per_page=5";

const manageAjaxError = (error: AjaxError) => {
  console.warn(error.message);
  return of({
    ok: false,
    users: [],
  });
};

// ajax.getJSON allow us to get JSON data and pass headers like Content-type, my-token, etc
// const obs$ = ajax(url).pipe(catchError(manageAjaxError));
// const obs2$ = ajax.getJSON(url).pipe(catchError(manageAjaxError));
const obs$ = ajax(url);

// obs2$.subscribe((data) => console.log("ajax.getJSON(url): ", data));
obs$.pipe(catchError(manageAjaxError)).subscribe({
  next: (data) => console.log("ajax(url): ", data),
  // When we use catchError this property "error" is ignored
  error: (err) => console.warn("error in subscription: ", err),
  complete: () => console.log("ajax(url): complete"),
});
