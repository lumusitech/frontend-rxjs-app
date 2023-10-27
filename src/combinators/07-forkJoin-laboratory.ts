import { catchError, forkJoin, of } from "rxjs";
import { AjaxError, ajax } from "rxjs/ajax";

const GITHUB_API_URL = "https://api.github.com/users";
const GITHUB_USER = "lumusitech";

forkJoin({
  user: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}`),
  repos: ajax.getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/repos`),
  gists: ajax
    .getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gists`)
    //; .getJSON(`${GITHUB_API_URL}/${GITHUB_USER}/gistsErrorForce`)

    // We can use catchError to manage the error independently way
    // With this, We still receive the others data, and emit
    // an empty array, for example.
    .pipe(catchError(() => of([]))),
})
  .pipe(catchError((err: AjaxError) => of(err.message)))

  .subscribe({
    next: (val) => console.log("next", val),
    complete: () => console.log("complete"),
    error: (err) => console.log("error", err),
  });
