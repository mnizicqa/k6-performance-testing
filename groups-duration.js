import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    "http_req_duration{expected_response:true}": ["p(95)<1000"],
    "group_duration{group:::Main page}": ["p(95)<3000"],
    "group_duration{group:::News page}": ["p(95)<1000"],
    "group_duration{group:::Main page::Assets}": ["p(95)<1000"],
  },
};

export default function () {
  group("Main page", () => {
    let res = http.get(
      "https://run.mocky.io/v3/fc903f7d-a71b-426a-b3fa-bf7bace31496?mocky-delay=900ms"
    );
    check(res, {
      "status is 200": (r) => res.status === 200,
    });
    group("Assets", () => {
      http.get(
        "https://run.mocky.io/v3/fc903f7d-a71b-426a-b3fa-bf7bace31496?mocky-delay=900ms"
      );
      http.get(
        "https://run.mocky.io/v3/fc903f7d-a71b-426a-b3fa-bf7bace31496?mocky-delay=900ms"
      );
    });
  });

  group("News page", () => {
    http.get("https://run.mocky.io/v3/a07f515d-bc6c-477e-a4d0-fc86f9850d4f");
  });
  sleep(1);
}
