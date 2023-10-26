import { ajax } from "rxjs/ajax";

const url = "https://httpbin.org/delay/1";

const formData = new FormData();
formData.append("id", "1");
formData.append("name", "luciano");

// const obs$ = ajax.post(url, formData, { "my-token": "ABC123" });
// const obs$ = ajax.put(url, formData, { "my-token": "ABC123" });
// const obs$ = ajax.delete(url, formData, { "my-token": "ABC123" });
// etc.

// obs$.subscribe(console.log);

// Other way to do post, put, etc is adding a first object with details
const obs$ = ajax({
  url,
  method: "POST", // POST, PUT, DELETE, GET, etc.
  headers: {
    "my-token": "ABC123",
  },
  body: formData,
});

obs$.subscribe(console.log);
