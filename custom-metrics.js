import http from "k6/http";
import { sleep } from "k6";
import { Counter, Trend } from "k6/metrics";

export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<250"],
    my_counter: ["count >= 10"],
    response_time_contacts_page: ["p(95)<200" && "p(99)<250"],
  },
};

let myCounter = new Counter("my_counter");
let contactsPageResponseTime = new Trend("response_time_contacts_page");

export default () => {
  let res = http.get("https://test.k6.io");
  myCounter.add(1);
  sleep(1);

  res = http.get("https://test.k6.io/contacts.php");
  contactsPageResponseTime.add(res.timings.duration);
  sleep(1);
};
