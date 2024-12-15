import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";
import { Counter } from "k6/metrics";

export const options = {
  thresholds: {
    http_errors: ["count==0"],
    http_req_duration: ["p(95) < 1000"],
    "http_req_duration{page:order}": ["p(95) < 1000"],
    checks: ["rate>=0.99"],
    "checks{page:order}": ["rate>=0.99"],
  },
};

let http_errors = new Counter("http_errors");

export default function () {
  let res = http.get(
    "https://run.mocky.io/v3/011d6b25-28c4-4933-b954-50d6c95252ca"
  );

  if (res.error) {
    http_errors.add(1);
  }

  check(res, {
    "status is 200": (r) => res.status === 200,
  });

  res = http.get(
    "https://run.mocky.io/v3/43bd631e-4e09-458d-946c-3c8b08e7dfee?mocky-delay=2000ms",
    {
      tags: {
        page: "order",
      },
    }
  );

  if (res.error) {
    http_errors.add(1);
  }

  check(
    res,
    {
      "status is 201": (r) => res.status === 201,
    },
    { page: "order" }
  );

  sleep(1);
}
