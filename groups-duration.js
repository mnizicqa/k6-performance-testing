import http from "k6/http";
import { sleep, check, group } from "k6";

export const options = {
  thresholds: {
    http_req_duration: ["p(95)<300"],
    "group_duration{group:::Main page}": ["p(95)<8000"],
    "group_duration{group:::News page}": ["p(95)<6000"],
    "group_duration{group:::Main page::Assets}": ["p(95)<3000"],
  },
};

export default () => {
  group("Main page", () => {
    let res = http.get(
      "https://run.mocky.io/v3/cbf15cc2-6601-4e6f-9d80-e323f29fffae?mocky-delay=5000ms"
    );
    check(res, {
      "status is 200": (r) => res.status === 200,
    });
    group("Assets", () => {
      http.get(
        "https://run.mocky.io/v3/cbf15cc2-6601-4e6f-9d80-e323f29fffae?mocky-delay=1000ms"
      );
      http.get(
        "https://run.mocky.io/v3/cbf15cc2-6601-4e6f-9d80-e323f29fffae?mocky-delay=1000ms"
      );
    });
  });

  group("News page", () => {
    http.get(
      "https://run.mocky.io/v3/cbf15cc2-6601-4e6f-9d80-e323f29fffae?mocky-delay=5000ms"
    );
  });
  sleep(1);
};
