import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<300"],
    "group_duration{group:::Main page}": ["p(95)<800"],
    "group_duration{group:::Main page::Assets}": ["p(95)<300"],
    "group_duration{group:::Contacts page}": ["p(95)<300"],
    "group_duration{group:::News page}": ["p(95)<250"],
  },
};

export default function () {
  group("Main page", () => {
    let res = http.get("https://test.k6.io");
    check(res, {
      "status is 200": (r) => res.status === 200,
    });
    group("Assets", () => {
      http.get("https://test.k6.io/static/css/site.css");
      http.get("https://test.k6.io/static/js/prisms.js");
    });
  });

  group("Contacts page", () => {
    http.get("https://test.k6.io/contacts.php");
  });

  group("News page", () => {
    http.get("https://test.k6.io/news.php");
  });
  sleep(1);
}
