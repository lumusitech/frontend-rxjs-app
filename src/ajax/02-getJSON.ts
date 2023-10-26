import { ajax } from "rxjs/ajax";

const url = "https://httpbin.org/delay/1";
// const url = "https://api.github.com/users?per_page=5";

// ajax.getJSON allow us to get JSON data and pass headers like Content-type, my-token, etc
const obs$ = ajax.getJSON(url, {
  "Content-type": "application/json",
  "my-token": "ABC",
});

obs$.subscribe((data) => console.log("data", data));
