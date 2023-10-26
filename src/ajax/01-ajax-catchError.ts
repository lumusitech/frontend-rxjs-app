import { catchError, map, of } from "rxjs";
import { AjaxError, AjaxResponse, ajax } from "rxjs/ajax";

// const url = "https://api.github.com/users?per_page=5";
const url = "https://api.github.com/userXXXXXs?per_page=5"; // bad url

// const fetchPromise = fetch(url);

// with this, we try to catch the error that fetch can't catch
// catch is called when promise throw an error
// const manageError = (response: Response) => {
//   if (!response.ok) throw new Error(response.statusText);

//   return response;
// };

// fetch can't catch the error when we pass a wrong url. Only when we use
// a custom method that throw an error when the response is not ok
// fetchPromise
//   .then((resp) => resp.json())
//   .then(console.log)
//   .catch(console.warn);

// fetchPromise
//   .then(manageError)
//   .then((resp) => resp.json())
//   .then(console.log)
//   .catch(console.warn);

const catchAjaxError = (err: AjaxError) => {
  console.warn(err.message);

  return of(err);
};

ajax(url)
  .pipe(
    map((resp) => resp?.response),
    catchError(catchAjaxError)
  )
  .subscribe((users) => console.log(`users: ${users}`));
